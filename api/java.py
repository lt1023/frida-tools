import frida, sys

# frida_server_15.1.17_arm64 -l 0.0.0.0:15122
# adb forward tcp:27042 tcp:27042

host = '127.0.0.1:1234'

package_name = "com.cookapps.taileddemonslayer"

jscode = """
Java.perform(function(){
    var UnityPlayerActivity = Java.use('com.inlinehook.demo.MainActivity')
    UnityPlayerActivity.showText.implementation = function(){
        console.log('onCreate')
        send('aaaa')
    }
});
"""


def message(msg, data):
    if msg['type'] == 'send':
        print('[*]  {0}'.format(msg['payload']))
    else:
        print(msg)


# print(frida.get_local_device())
# print(frida.get_usb_device())
# print(frida.get_remote_device())

# manager = frida.get_device_manager()
# device = manager.add_remote_device(host)
# print(device)
device = frida.get_remote_device()
# processs = device.enumerate_processes()
# print(processs)
front_app = device.get_frontmost_application()
print(front_app)

process = device.attach(front_app.pid)
script = process.create_script(jscode)
script.on('message', message)
script.load()
sys.stdin.read()
