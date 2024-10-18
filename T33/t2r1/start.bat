@echo off

start "backend" cmd /c "npm run --prefix tech-store-backend start"
start "frontend" cmd /c "npm run --prefix tech-store-frontend start"

pause