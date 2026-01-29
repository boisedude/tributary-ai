/**
 * Tributary.ai FTP Deployment Script
 *
 * ⚠️  BACKUP ONLY - Use SSH/rsync for primary deployment:
 *     npm run deploy        (uses ./deploy-rsync.sh)
 *
 * This FTP script is kept as a fallback if SSH is unavailable.
 *
 * Features:
 *   - Only uploads changed files (compares by size)
 *   - Shows progress and statistics
 *   - Much faster for incremental deploys
 *
 * Usage:
 *   npm run deploy:ftp      (build + deploy via FTP)
 *   node deploy-ftp.js      (deploy only, assumes build exists)
 *
 * Options:
 *   --full    Force full upload (ignore change detection)
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION
// ============================================
const config = {
    host: process.env.FTP_HOST || 'ftp.thetributary.ai',
    user: process.env.FTP_USER || 'u951885034.tribFTPuser',
    password: process.env.FTP_PASS || 'e&fEBrHO+tSU0:eV',
    secure: false,
    remoteDir: '/',
    localDir: './out'
};

// Check for --full flag
const forceFullUpload = process.argv.includes('--full');

// Stats tracking
const stats = {
    uploaded: 0,
    skipped: 0,
    errors: 0,
    totalBytes: 0
};

/**
 * Get all files recursively from a directory
 */
function getLocalFiles(dir, baseDir = dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

        if (entry.isDirectory()) {
            files.push(...getLocalFiles(fullPath, baseDir));
        } else {
            const stat = fs.statSync(fullPath);
            files.push({
                localPath: fullPath,
                remotePath: relativePath,
                size: stat.size,
                mtime: stat.mtime
            });
        }
    }
    return files;
}

/**
 * Get remote file listing recursively
 */
async function getRemoteFiles(client, remoteDir = '/') {
    const files = new Map();

    async function listDir(dir) {
        try {
            await client.cd(dir);
            const list = await client.list();

            for (const item of list) {
                const remotePath = path.posix.join(dir, item.name);

                if (item.isDirectory) {
                    await listDir(remotePath);
                } else {
                    // Store with path relative to root
                    const relativePath = remotePath.startsWith('/') ? remotePath.slice(1) : remotePath;
                    files.set(relativePath, {
                        size: item.size,
                        mtime: item.modifiedAt
                    });
                }
            }
        } catch (err) {
            // Directory might not exist yet
        }
    }

    await listDir(remoteDir);
    return files;
}

/**
 * Ensure remote directory exists
 */
async function ensureRemoteDir(client, remotePath) {
    const dir = path.posix.dirname(remotePath);
    if (dir && dir !== '.' && dir !== '/') {
        try {
            await client.ensureDir('/' + dir);
        } catch (err) {
            // Ignore errors - directory might already exist
        }
    }
}

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = false; // Quiet mode for cleaner output

    try {
        console.log('==========================================');
        console.log('Tributary.ai FTP Deployment');
        console.log(forceFullUpload ? '(Full upload mode)' : '(Smart upload - changed files only)');
        console.log('==========================================\n');

        // Check if build exists
        if (!fs.existsSync(config.localDir)) {
            console.error(`ERROR: Build directory '${config.localDir}' not found!`);
            console.log('Run "npm run build" first.\n');
            process.exit(1);
        }

        // Connect to FTP
        console.log(`Connecting to ${config.host}...`);
        await client.access({
            host: config.host,
            user: config.user,
            password: config.password,
            secure: config.secure
        });
        console.log('Connected!\n');

        // Get local files
        console.log('Scanning local files...');
        const localFiles = getLocalFiles(config.localDir);
        console.log(`Found ${localFiles.length} local files\n`);

        // Get remote files (for comparison)
        let remoteFiles = new Map();
        if (!forceFullUpload) {
            console.log('Scanning remote files for comparison...');
            remoteFiles = await getRemoteFiles(client, config.remoteDir);
            console.log(`Found ${remoteFiles.size} remote files\n`);
        }

        // Compare and upload
        console.log('Uploading changed files...\n');

        for (const file of localFiles) {
            const remoteFile = remoteFiles.get(file.remotePath);

            // Check if file needs uploading
            const needsUpload = forceFullUpload ||
                !remoteFile ||
                remoteFile.size !== file.size;

            if (needsUpload) {
                try {
                    // Ensure directory exists
                    await ensureRemoteDir(client, file.remotePath);

                    // Upload file
                    await client.cd('/');
                    await client.uploadFrom(file.localPath, file.remotePath);

                    stats.uploaded++;
                    stats.totalBytes += file.size;

                    const sizeKB = (file.size / 1024).toFixed(1);
                    console.log(`  ✓ ${file.remotePath} (${sizeKB} KB)`);
                } catch (err) {
                    stats.errors++;
                    console.log(`  ✗ ${file.remotePath} - ${err.message}`);
                }
            } else {
                stats.skipped++;
            }
        }

        // Summary
        console.log('\n==========================================');
        console.log('Deployment complete!');
        console.log('==========================================');
        console.log(`  Uploaded: ${stats.uploaded} files (${(stats.totalBytes / 1024 / 1024).toFixed(2)} MB)`);
        console.log(`  Skipped:  ${stats.skipped} files (unchanged)`);
        if (stats.errors > 0) {
            console.log(`  Errors:   ${stats.errors} files`);
        }
        console.log('\nSite: https://www.thetributary.ai');

    } catch (err) {
        console.error('\nERROR:', err.message);
        console.log('\nTroubleshooting:');
        console.log('1. Check your FTP credentials');
        console.log('2. Make sure the remote directory exists');
        console.log('3. Try connecting via FileZilla first to verify');
        process.exit(1);
    } finally {
        client.close();
    }
}

deploy();
