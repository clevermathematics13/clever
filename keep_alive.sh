#!/bin/bash
# This script prints a timestamp every 25 minutes to keep the session active.
while true; do
    echo "Keep-alive ping at $(date)"
    sleep 1500  # 1500 seconds = 25 minutes
done
