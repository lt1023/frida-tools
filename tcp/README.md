cd tcp
frida -U -l capture.js -f com.huitouche.android.app --no-pause

frida -U -l socket.js -f com.huitouche.android.app --no-pause