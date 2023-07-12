import frida, sys


def demo():
    arr = [
        [1, 9, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22],
        [2, 8, 12, 18, 22],
        [3, 7, 12, 13, 14, 15, 16, 18, 22],
        [4, 6, 16, 18, 22],
        [5, 5, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22],
    ]
    s = ""
    for line in arr:
        s += "".join(["█" if x in line else " " for x in range(30)])
        s += "\n"
    print(s)


demo()

#./fs64 -l 0.0.0.0:1234
#./fs64 -l 127.0.0.1:12345
#  adb shell /data/local/tmp/fs64
#  adb shell /data/local/frida/fs64
#  adb shell /data/local/frida/fs64

# adb forward tcp:27042 tcp:27042
# adb forward tcp:1234 tcp:1234
# adb forward tcp:12345 tcp:12345
# adb forward tcp:4396 tcp:4396
host = '127.0.0.1:1234'
# package_name = "com.candyrufusgames.survivalcraftchs"
# package_name = "com.coffeestainstudios.goatsimulator.payday.elm"
package_name = "com.zhangyangjing.starfish"
script_file_name = 'test.js'


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

with open(script_file_name, encoding='UTF-8') as f:
    script = process.create_script(f.read())

script.on('message', message)
script.load()
sys.stdin.read()
