#!/bin/bash
# Запустить ОДИН РАЗ на сервере для установки Node.js
# ssh opc@79.76.120.221 'bash -s' < setup-server.sh

set -e
echo "=== Installing Node.js 20 ==="
if command -v node &>/dev/null; then
    echo "Node.js already installed: $(node -v)"
    exit 0
fi
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs
echo "Node.js installed: $(node -v)"
