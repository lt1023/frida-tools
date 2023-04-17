// var module = Process.getModuleByName("libUE4.so");
//FAES::DecryptData(uchar *,uint,char const*)	01A97380
//FJavaAndroidMessageBox::Show(void)	.text	0195E42C	00000034	00000020	00000000	R	.	.	.	B	T	.

function print_c_stack(context, str_tag) {
    // console.log('');
    console.log("=============================" + str_tag + " Stack strat=======================");
    console.log(Thread.backtrace(context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n'));
    console.log("=============================" + str_tag + " Stack end  =======================");
}

//           adb forward tcp:27042 tcp:27042
//          frida -U --no-pause -f net.mintry.hsio -l  ./nativeEntryHook.js


// var modulrName = "libCore.so"
// var modulrName = "libgame.so"
var modulrName = "libil2cpp.so"

var id;
function hook_native() {
    var module;
    while (true) {
        try {
            module = Process.getModuleByName(modulrName);
            console.log(module.base);
            break
        } catch (e) {

        }
    }
    // var addr = module.base.add(0x00195D64).add(1);

    // var addr = module.base.add(0x2508E14);
    var addr = module.base.add(0x2508E38);


    var func = new NativePointer(addr.toString());
    console.log(func.toString());
    start(func)

}


function start(pointer) {
    Interceptor.attach(pointer, {
        onEnter: function (args) {
            // console.log("*_md5 onEnter", args[0])
            // console.log("*_md5 onEnter", args[1])
            console.log("*_md5 onEnter", args[2])
            // console.log("*_md5 onEnter", args[3])
            // console.log("*_md5 onEnter", args[4])
            // console.log("onEnter", Memory.readCString(args[0]))
            // console.log("*_md5 onEnter", Memory.readCString(args[1]))
            console.log("*_md5 onEnter", Memory.readCString(args[2]))
            // console.log("*_md5 onEnter", Memory.readCString(args[3]))
            // console.log("*_md5 onEnter", Memory.readCString(args[4]))
            print_c_stack(this.context, '');
            // return 1;
        },
        onLeave: function (retvalue) {
            // console.log("*_md5 onLeave", Memory.readCString(retvalue))
            console.log(" onLeave", retvalue)
            // console.log(" onLeave")
            // retvalue = true
        }
    })

}

console.log('setTimeout')
setTimeout(function () {
    console.log('hook_native')
    hook_native();
}, 1000)

// id = setInterval(hook_native,1000);

