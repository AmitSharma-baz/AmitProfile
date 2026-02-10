@echo off
echo.
echo ===================================================
echo   Updating Gallery...
echo   Scanning assets/gallery folder for new images...
echo ===================================================
echo.
python update_gallery.py
echo.
echo ===================================================
echo   Update Complete!
echo   Refresh your gallery.html page in the browser.
echo ===================================================
pause
