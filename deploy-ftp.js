/**
 * Tributary.ai FTP Deployment Script
 *
 * Usage:
 *   1. npm install basic-ftp
 *   2. Update the config below with your Hostinger FTP credentials
 *   3. npm run build
 *   4. node deploy-ftp.js
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

// ============================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================
const config = {
    host: process.env.FTP_HOST || 'ftp.thetributary.ai',
    user: process.env.FTP_USER || 'u951885034.tribFTPuser',
    password: process.env.FTP_PASS || 'e&fEBrHO+tSU0:eV',
    secure: false, // Set to true if using FTPS
    remoteDir: '/',
    localDir: './out'
};
// ============================================

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Show FTP commands

    try {
        console.log('==========================================');
        console.log('Tributary.ai FTP Deployment');
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

        // Navigate to remote directory
        console.log(`Changing to remote directory: ${config.remoteDir}`);
        await client.cd(config.remoteDir);

        // Upload all files to current directory (.)
        console.log(`\nUploading files from ${config.localDir}...`);
        console.log('This may take a few minutes...\n');

        await client.uploadFromDir(config.localDir);

        console.log('\n==========================================');
        console.log('Deployment complete!');
        console.log('==========================================');
        console.log('Site: https://www.thetributary.ai');

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
