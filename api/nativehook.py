from time import sleep

import frida, sys

#frida -U --no-pause -f com.ArckonArts.StickInfiniteKingdom -l  ./nativeEntryHook.js


#  adb shell /data/local/tmp/fs64

# adb forward tcp:27042 tcp:27042
# adb forward tcp:31928 tcp:31928
host = '127.0.0.1:1234'
# package_name = "com.linktower.application"
package_name = "com.secg.terracraft2"
# package_name = "com.Gaea.HostelManagment"
script_file_name = 'nativehook.js'


def message(msg, data):
    if msg['type'] == 'send':
        print('[*]  {0}'.format(msg['payload']))
    else:
        print(msg)


device = frida.get_remote_device()
# front_app = device.get_frontmost_application()
# print(front_app)
# process = device.attach(front_app.pid)

pid = device.spawn([package_name])
process = device.attach(pid)
device.resume(pid)

sleep(10)
with open(script_file_name, encoding='UTF-8') as f:
    script = process.create_script(f.read())

script.on('message', message)
script.load()
sys.stdin.read()
