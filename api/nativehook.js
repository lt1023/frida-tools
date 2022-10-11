function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

function print_c_stack(context, str_tag)
{
    // console.log('');
    console.log("=============================" + str_tag + " Stack strat=======================");
    console.log(Thread.backtrace(context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join('\n'));
    console.log("=============================" + str_tag + " Stack end  =======================");
}

// 程序入口
Java.perform(function () {
    // var Modules = Process.enumerateModules();
    // for (let i = 0; i < Modules.length; i++) {
    //     const Module = Modules[i];
    //     console.log(JSON.stringify(Module));
    // }

    // 获取模块
    var module = Process.getModuleByName("libcocosmini.so")
    // 转为函数地址
    // var addr = module.base.add("0x11641");
    var addr = module.base.add("0x12925");
    // var addr = module.base.add("0x62ca9");
    // 获取函数入口
    var func = new NativePointer(addr.toString());

    console.log('[+] hook ' + func.toString())

    // 函数hook钩子附加
    Interceptor.attach(func, {
        onEnter: function (args) {
            // var env = args[0];
            // var java_class = args[1];
            console.log('onEnter ')
            print_c_stack(this.context, '');
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
            // console.log('method onleave')
         // Java.vm.tryGetEnv()
         //    console.log()
         //    print_c_stack(this.context, '');
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