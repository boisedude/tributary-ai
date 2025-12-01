#!/bin/bash

# Tributary.ai FTP Deployment Script
# Deploys the Next.js static build to Hostinger via FTP

# Configuration - UPDATE THESE VALUES
FTP_HOST="ftp.thetributary.ai"  # or your Hostinger FTP server
FTP_USER="your_ftp_username"
FTP_PASS="your_ftp_password"
FTP_DIR="/public_html"          # Remote directory

# Local build directory
LOCAL_DIR="out"

echo "=========================================="
echo "Tributary.ai FTP Deployment"
echo "=========================================="

# Step 1: Build the site
echo ""
echo "[1/3] Building Next.js static site..."
npm run build

if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi

# Verify build output exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo "ERROR: Build output directory '$LOCAL_DIR' not found!"
    exit 1
fi

echo "Build complete. Files in $LOCAL_DIR:"
ls -la $LOCAL_DIR

# Step 2: Upload via FTP
echo ""
echo "[2/3] Uploading to FTP server..."
echo "Host: $FTP_HOST"
echo "Directory: $FTP_DIR"

# Using lftp for reliable FTP uploads (handles directories recursively)
lftp -c "
set ftp:ssl-allow no;
set ssl:verify-certificate no;
open -u $FTP_USER,$FTP_PASS $FTP_HOST;
mirror --reverse --delete --verbose $LOCAL_DIR $FTP_DIR;
bye
"

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: FTP upload failed!"
    echo ""
    echo "If lftp is not installed, install it with:"
    echo "  Ubuntu/Debian: sudo apt install lftp"
    echo "  macOS: brew install lftp"
    echo ""
    echo "Or use manual FTP upload via FileZilla"
    exit 1
fi

# Step 3: Done
echo ""
echo "[3/3] Deployment complete!"
echo "=========================================="
echo "Site deployed to: https://www.thetributary.ai"
echo "=========================================="
