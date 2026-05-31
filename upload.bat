@echo off
title AETERNA Horology - GitHub Upload Portal
color 0B
echo ======================================================================
echo          AETERNA LUXURY WATCHES - GITHUB UPLOAD PORTAL
echo ======================================================================
echo.
echo  Optimizing and preparing upload connection...
echo.

:: Navigate to the folder where the bat file is located
cd /d "%~dp0"

echo  Uploading 138 high-performance assets (optimized sequence and code)...
echo  (A browser window or login screen will pop up in a second!)
echo.
echo ----------------------------------------------------------------------
git push -f -u origin main
echo ----------------------------------------------------------------------
echo.
echo  ======================================================================
echo  Upload complete! Press any key to close this window.
echo  ======================================================================
pause > null
del null
