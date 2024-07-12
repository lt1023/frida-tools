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
    var module = Process.getModuleByName("libgame.so")


    // var module = Process.getModuleByName("libminecraftpe.so")
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
    // var module = Process.getModuleByName("libCore.so")

    // 转为函数地址
    var addr = module.base.add(0x002E6A64).add(1);


/**
 * LocalServerListItemElement::serverMainPressed(MinecraftClient *)    .text    002E6A64    00000012            R    .    .    .    .    T    .
 * LocalServerListItemElement::pointerReleased(MinecraftClient *,int,int)    .text    00303F5C    000000BA    00000028    FFFFFFE8    R    .    .    .    .    T    .
 * LocalServerListItemElement::pointerPressed(MinecraftClient *,int,int)    .text    002F0CAC    0000008E    00000028    FFFFFFD8    R    .    .    .    .    T    .
 * ScreenChooser::_pushScreen(std::shared_ptr<BaseScreen>,std::unique_ptr<AbstractScreenSetupCleanupStrategy,std::default_delete<AbstractScreenSetupCleanupStrategy>>,bool)    .text    0037D3EC    000000AC    00000020    FFFFFFE9    R    .    .    .    .    .    .
 * //ScreenChooser::popScreen(AbstractScreen &,int)    .text    0037CF28    00000008            R    .    .    .    .    T    .
 * CreateWorldScreen::init(void)    .text    003581C8    000011D4    000000F8    FFFFFFD5    R    .    .    .    .    T    .
 * PlayScreen::_buttonClicked(Button &)    .text    004199E4    0000008A    00000018    FFFFFFF0    R    .    .    .    .    T    .
 * PlayScreen::setReloadLocalListFlag(bool)    .text    0037A6EC    00000006            R    .    .    .    .    T    .
 * ChooseLevelScreen::_loadLevelSource(void)    .text    003542CC    00000068    00000010    FFFFFFF0    R    .    .    .    .    T    .
 *
 *
 * PauseScreen::_buttonClicked(Button &)    .text    003FCD0C    00000100    00000048    FFFFFFE8    R    .    .    .    .    T    .
 * MinecraftClient::handleSuspendResumeButtonPress(void)    .text    002E1078    00000018    00000008    FFFFFFF8    R    .    .    .    .    T    .
 *
 *
 * InventoryScreen::init(void)    .text    003D51A4    00000F32    00000120    FFFFFFD5    R    .    .    .    .    T    .
 *
 *
 * InventoryScreen::handleButtonPress(short)    .text    003D4A30    000002A2    00000038    FFFFFFE0    R    .    .    .    .    T    .
 * InventoryScreen::_renderGridItem(ItemInstance *,InventoryScreen::IngredientSlotStatus,int,int)    .text    00378654    00000056    00000030    00000004    R    .    .    .    .    T    .
 * InventoryScreen::handleScrollWheel(float)    .text    0036010C    0000003C            R    .    .    .    .    T    .
 * InventoryScreen::_updateTabButtonSelection(void)    .text    0036083C    00000046    00000010    FFFFFFF0    R    .    .    .    .    T    .
 *
 *
 * SkinPack::isPremiumUnlocked(void)    .text    003956B4    00000004            R    .    .    .    .    T    .
 * ShowSkinPackScreen::openBuySkinPackDialogue(MinecraftClient &,Skin const&)    .text    003B87DC    000000CA    00000048    FFFFFFD8    R    .    .    .    .    T    .
 *
 *
 *
 *
 * SkinRepository::buySkinPack(SkinPack const&,std::function<void ()(PurchaseResult)>)    .text    00395F8C    000000C2    00000048    FFFFFFE0    R    .    .    .    .    .    .
 * BuySkinPackDialogue::buttonClicked(Button const*,MinecraftClient *)    .text    003340B4    00000054    00000020    FFFFFFF0    R    .    .    .    .    T    .
 * BuySkinPackDialogue::buySkinPack(MinecraftClient *)    .text    00333FA4    000000F8    00000048    FFFFFFE0    R    .    .    .    .    T    .
 * BuySkinPackDialogue::onPurchaseFail(MinecraftClient *)    .text    003342C0    0000006E    00000028    FFFFFFF0    R    .    .    .    .    T    .
 * SkinRepository::buySkinPack(SkinPack const&,std::function<void ()(PurchaseResult)>)    .text    00395F8C    000000C2    00000048    FFFFFFE0    R    .    .    .    .    .    .
 *
 *
 * ScreenChooser::pushShowSkinPackScreen(SkinPack const&,std::string const&,bool)    .text    003B6474    00000062    00000030    FFFFFFE0    R    .    .    .    .    T    .
 * Button::clicked(MinecraftClient *,int,int)    .text    002CABC4    00000034    00000008    FFFFFFF8    R    .    .    .    .    .    .
 * CreateWorldScreen::_createWorldClicked(void)    .text    0035A268    0000007A    000000A0    FFFFFFA5    R    .    .    .    .    T    .
 *
 *
 * */


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

            // console.log(args[0].readCString())
            // console.log(args[1])
            // console.log(args[2])

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
            // 修改返回值
            // retval.replace(1);
            // retval.replace(false);
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