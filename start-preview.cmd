@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 24 LTS, then open this file again.
  pause
  exit /b 1
)
if not exist "node_modules\astro\astro.js" (
  call npm ci
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Keep this window open while previewing. Press Ctrl+C to stop.
call npm run dev -- --open
pause
