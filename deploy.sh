#!/bin/bash

# Deploy script for ProgrammerSites (Next.js)
# Optimized for weak server (1GB RAM) - no Docker

set -e

APP_NAME="programmersites"
APP_DIR="/home/opc/programmersites"
PID_FILE="$APP_DIR/app.pid"
LOG_FILE="$APP_DIR/app.log"
PORT="${PORT:-3000}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
echo_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
echo_error() { echo -e "${RED}[ERROR]${NC} $1"; }

stop_app() {
    echo_info "Stopping application..."
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            kill $PID || true
            sleep 2
            kill -9 $PID || true
        fi
        rm -f "$PID_FILE"
    fi
    pkill -9 -f "node.*programmersites" || true
    pkill -9 -f "node.*server.js" || true
    sleep 1
    sync
    sudo sh -c 'echo 3 > /proc/sys/vm/drop_caches' 2>/dev/null || true
    echo_info "Application stopped"
}

build_app() {
    echo_info "Building application..."
    cd "$APP_DIR"
    export NODE_OPTIONS="--max-old-space-size=512"
    npm ci
    npm run build
    if [ ! -d ".next/standalone" ]; then
        echo_error "Build failed: standalone not found"
        exit 1
    fi
    cp -r .next/static .next/standalone/.next/ 2>/dev/null || true
    cp -r public .next/standalone/ 2>/dev/null || true
    echo_info "Build completed"
}

start_app() {
    echo_info "Starting application..."
    cd "$APP_DIR"
    if [ -f "$APP_DIR/variables.env" ]; then
        set -a
        source "$APP_DIR/variables.env" 2>/dev/null || true
        set +a
    fi
    export PORT="${PORT:-3000}"
    cd .next/standalone
    nohup node server.js >> "$LOG_FILE" 2>&1 &
    echo $! > "$PID_FILE"
    echo_info "Started PID $(cat $PID_FILE)"
    sleep 3
    if ! ps -p $(cat "$PID_FILE") > /dev/null 2>&1; then
        echo_error "Application failed to start"
        tail -30 "$LOG_FILE"
        exit 1
    fi
    echo_info "Application is running on port $PORT"
}

status_app() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo_info "Application is running (PID: $PID)"
            return 0
        fi
        rm -f "$PID_FILE"
    fi
    echo_warn "Application is not running"
    return 1
}

case "${1:-}" in
    stop)   stop_app ;;
    build)  stop_app; build_app ;;
    start)  stop_app; start_app ;;
    restart) stop_app; start_app ;;
    deploy) stop_app; build_app; start_app ;;
    status) status_app ;;
    logs)   tail -f "$LOG_FILE" ;;
    *)
        echo "Usage: $0 {stop|build|start|restart|deploy|status|logs}"
        exit 1
        ;;
esac
