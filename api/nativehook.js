function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

function print_c_stack(context, str_tag) {
    // console.log('');
    console.log("=============================" + str_tag + " Stack strat=======================");
    console.log(Thread.backtrace(context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n'));
    console.log("=============================" + str_tag + " Stack end  =======================");
}

function print_dump(addr, size) {
    //console(Memory.methods());
    var buf = Memory.readByteArray(addr, size)
    console.log("[function] send[*] " + addr.toString() + "  " + "length: " + size.toString() + "\n[data]")
    console.log(hexdump(buf, {
        offset: 0,
        length: size,
        header: false,
        ansi: false
    }));
    console.log("")
}

// 程序入口
Java.perform(function () {
    // var Modules = Process.enumerateModules();
    // for (let i = 0; i < Modules.length; i++) {
    //     const Module = Modules[i];
    //     console.log(JSON.stringify(Module));
    // }

    // 获取模块
    // var module = Process.getModuleByName("libil2cpp.so")
    var module = Process.getModuleByName("libminecraftpe.so")
    // var module;
    // console.log('module start')
    // while (true){
    //     try {
    //         console.log('module '+module)
    //
    //         module = Process.getModuleByName("libUE4.so");
    //     }catch (e) {
    //
    //     }
    //     if (module){
    //         break;
    //     }
    // }
    //   console.log('module '+module)

    // var module = Process.getModuleByName("libminecraftpe.so")
    var module = Process.getModuleByName("libCore.so")

    // 转为函数地址
    var addr = module.base.add(0x505224 + 1);
    //GameControllerManager::feedButton(int,int,GameControllerButtonState,bool)	.text	0304E77E	0000002A	00000010	00000004	R	.	.	.	.	.	.

    // 获取函数入口
    var func = new NativePointer(addr.toString());

    console.log('[+] hook ' + func.toString())


    //拦截函数
    // Interceptor.replace(func, new NativeCallback(function (a) {
    //     print_c_stack()
    //     return this(a);
    // }));

    // 函数hook钩子附加
    Interceptor.attach(func, {
        onEnter: function (args) {
            // var env = args[0];
            // var java_class = args[1];
            console.log('onEnter ')

            console.log(args[0])

            // var str = FURL8ToString(args[1]);
            // console.log(str)
            // console.log(args[1])
            // console.log(Memory.readCString(args[1]))
            // console.log(args[2])
            // console.log(args[3])
            // console.log(args[4])
            // print_dump(args[0], 64);
            print_c_stack(this.context, '');
            // return;

            // PremiumUnlockFromProgression(args[1])

            // console.log('args[0] = ' + args[0])
            // var class_name = Java.vm.tryGetEnv().getClassName(java_class);
            // console.log('args[1] = ' + class_name)
            // // var methods_ptr = ptr(args[2]);
            // var methodId = args[2];
            // var clazz = methodId.clazz;
            // console.log('method_count= ' + method_count)
            // console.log('args[3] = ' + args[3])
            // console.log('args[4] = ' + args[4])
            // console.log('args[5] = ' + args[5])

            //console.log(typeof args[1])

            // if (args[1] === 0x5){
            //     console.log(" arg == 5  ")
            //     return
            // }
            // //输入参数
            // args[1] = ptr(6)
            // args[2] = ptr(888)

        },
        onLeave: function (retval) {
            // console.log('method onleave' + Memory.readCString(retval))
            //  print_c_stack(this.context, '');
            console.log('method onleave' + retval)

            // retval.replace(0x1);
            // Java.vm.tryGetEnv()
            //    console.log()
            //    print_c_stack(this.context, '');
            //    retval = false;
        }
    });
});


// Java.perform(function () {
//     // 获取模块
//     var module = Process.getModuleByName("libCore.so")
//     // 转为函数地址
//     var addr = module.base.add("0x7742A0");
//     // 获取函数入口
//     var func = new NativePointer(addr.toString());
//
//     console.log('[+] hook ' + func.toString())
//
//     // 函数hook钩子附加
//     Interceptor.attach(func, {
//         onEnter: function (args) {
//             console.log('hook success ')
//             console.log(args[0])
//             console.log(args[1])
//             console.log(typeof args[1])
//
//             // if (args[1] === 0x5){
//             //     console.log(" arg == 5  ")
//             //     return
//             // }
//             // //输入参数
//             // args[1] = ptr(6)
//             // args[2] = ptr(888)
//
//         },
//         onLeave: function (retval) {
//             console.log('method onleave')
//             // console.log(retval)
//         }
//     });
// });