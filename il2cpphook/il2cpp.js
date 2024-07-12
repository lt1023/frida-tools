function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

// 程序入口
Java.perform(function () {
    // var Modules = Process.enumerateModules();
    // for (let i = 0; i < Modules.length; i++) {
    //     const Module = Modules[i];
    //     console.log(JSON.stringify(Module));
    // }

    // 获取模块
    var module = Process.getModuleByName("libil2cpp.so")
        console.log('[+] base ' + module.base)

    // 转为函数地址
    // var addr = module.base.add("0x1D275A8");
    var addr = module.base.add("0x1A58230");
    // 获取函数入口
    var func = new NativePointer(addr.toString());

    console.log('[+] hook ' + func.toString())

    // 函数hook钩子附加
    Interceptor.attach(func, {
        onEnter: function (args) {
            console.log('hook success ')
            console.log('args[0] = ' + args[0])
            console.log('args[1] = ' + args[1])
            console.log('args[2] = ' + args[2])

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
            console.log('method onleave')
            console.log(retval)
            return true;
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