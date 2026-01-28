#!/bin/bash

# ============================================
# Tributary.ai Rsync Deployment Script
# ============================================
# Much faster than FTP - only transfers changed bytes
#
# Setup:
#   1. Enable SSH in Hostinger hPanel (Websites → Dashboard → SSH Access)
#   2. Add your SSH public key to Hostinger
#   3. Update the config below with your SSH details
#   4. chmod +x deploy-rsync.sh
#
# Usage:
#   ./deploy-rsync.sh          # Build and deploy
#   ./deploy-rsync.sh --dry    # Preview what would be uploaded (no changes)
#   ./deploy-rsync.sh --skip-build  # Deploy without rebuilding
# ============================================

# CONFIGURATION - Update these with your Hostinger SSH details
SSH_USER="u951885034"              # Your Hostinger SSH username
SSH_HOST="191.101.13.61"           # SSH host (from hPanel)
SSH_PORT="65002"                   # SSH port (usually 65002 for Hostinger)
REMOTE_DIR="/home/${SSH_USER}/public_html"  # Remote directory
LOCAL_DIR="./out"                  # Local build directory

# Parse arguments
DRY_RUN=""
SKIP_BUILD=false

for arg in "$@"; do
    case $arg in
        --dry)
            DRY_RUN="--dry-run"
            ;;
        --skip-build)
            SKIP_BUILD=true
            ;;
    esac
done

echo "=========================================="
echo "Tributary.ai Rsync Deployment"
if [ -n "$DRY_RUN" ]; then
    echo "(DRY RUN - no files will be transferred)"
fi
echo "=========================================="
echo ""

# Step 1: Build (unless skipped)
if [ "$SKIP_BUILD" = false ]; then
    echo "[1/2] Building Next.js static site..."
    npm run build

    if [ $? -ne 0 ]; then
        echo "ERROR: Build failed!"
        exit 1
    fi
else
    echo "[1/2] Skipping build (--skip-build)"
fi

# Verify build output exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo "ERROR: Build output directory '$LOCAL_DIR' not found!"
    echo "Run 'npm run build' first."
    exit 1
fi

# Step 2: Deploy with rsync
echo ""
echo "[2/2] Deploying to ${SSH_HOST}..."
echo "      Local:  ${LOCAL_DIR}/"
echo "      Remote: ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"
echo ""

rsync -avz --progress --delete \
    $DRY_RUN \
    -e "ssh -p ${SSH_PORT}" \
    "${LOCAL_DIR}/" \
    "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Rsync failed!"
    echo ""
    echo "Troubleshooting:"
    echo "  1. Ensure SSH is enabled in Hostinger hPanel"
    echo "  2. Add your SSH public key: ssh-keygen -t rsa -b 4096"
    echo "  3. Test SSH connection: ssh -p ${SSH_PORT} ${SSH_USER}@${SSH_HOST}"
    exit 1
fi

echo ""
echo "=========================================="
if [ -n "$DRY_RUN" ]; then
    echo "Dry run complete! Run without --dry to deploy."
else
    echo "Deployment complete!"
fi
echo "=========================================="
echo "Site: https://www.thetributary.ai"
