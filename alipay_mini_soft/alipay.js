function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

Java.perform(function () {
    var H5EventDispatcher = Java.use("com.alipay.mobile.nebulacore.core.H5EventDispatcher");
    var methods = H5EventDispatcher.class.getDeclaredMethods(); // 获取类中的所有方法可使用反射获得
    console.log(methods);
    H5EventDispatcher.dispatch.overload('com.alipay.mobile.h5container.api.H5Event', 'com.alipay.mobile.h5container.api.H5BridgeContext',
        'com.alipay.mobile.nebulacore.core.H5EventDispatcher$Policy').implementation = function (event, context, policy) {
        // showStacks()
        // console.log('-------------------------------------')
        // console.log(event.getAction());
        // console.log(event.getParam());
        // console.log(event.getTarget());
        // console.log(event);
        // console.log(context)
        // console.log(policy)
        // console.log('-------------------------------------')
        return this.dispatch(event, context, policy);
    }
    var H5ShareUtil$4 = Java.use("com.alipay.mobile.nebulabiz.shareutils.H5ShareUtil$4");
    H5ShareUtil$4.onItemClick.implementation = function (index) {
        console.log('H5ShareUtil$4 index: ' + index)
        showStacks()
        return this.onItemClick(index);
    }
    var H5ShareUtil = Java.use("com.alipay.mobile.nebulabiz.shareutils.H5ShareUtil");//.overload('')
    H5ShareUtil.a.overload('com.alipay.mobile.h5container.api.H5Event', 'com.alipay.mobile.h5container.api.H5BridgeContext',
        'com.alibaba.fastjson.JSONObject', 'com.alipay.mobile.h5container.api.H5Page', 'java.lang.String').implementation = function (
        h5Event, h5BridgeContext, jSONObject, h5Page, str
    ) {
        console.log('H5ShareUtil a: ')
        console.log(jSONObject)
        console.log(str)
        console.log(h5Page.getUrl())
        showStacks()
        return this.a(h5Event, h5BridgeContext, jSONObject, h5Page, str);
    }

    // var UCWebChromeClient = Java.use("com.alipay.mobile.nebulauc.impl.UCWebChromeClient");
    // UCWebChromeClient.onConsoleMessage.implementation = function (consoleMessage) {
    //     console.log(consoleMessage)
    //     return this.onConsoleMessage(consoleMessage);
    // }

    var ConsoleMessage = Java.use("android.webkit.ConsoleMessage");
    ConsoleMessage.$init.overload('java.lang.String', 'java.lang.String', 'int', 'android.webkit.ConsoleMessage$MessageLevel')
        .implementation = function (arg0, arg1, arg2, arg3) {
        // console.log(arg0)
        // console.log(arg1)
        // console.log(arg2)
        // console.log(arg3)
        return this.$init(arg0, arg1, arg2, arg3)
    }

    var H5ShareCallback = Java.use("com.alipay.mobile.nebula.callback.H5ShareCallback");
    H5ShareCallback.onCallBack.implementation = function (jSONObject2) {
        console.log(jSONObject2)
        return this.onCallBack(jSONObject2);
    }
    H5ShareCallback.$init.implementation = function (h5Page, shareResult) {
        console.log('H5ShareCallback $init')
        var JSONObject = Java.use("com.alibaba.fastjson.JSONObject");
        var jsonObj = JSONObject.$new()
        jsonObj.put("desc", "支付宝生活缴费,水费,电费,煤气费,固定电话,宽带,有线电视,物业费");
        jsonObj.put("fromMeta", true);
        jsonObj.put("imgUrl", "");
        jsonObj.put("link", "");
        jsonObj.put("ready", true);
        jsonObj.put("title", "支付宝生活缴费");
        this.onCallBack(jsonObj)
        return this.$init(h5Page, shareResult)
    }


// H5EventDispatcher.

});
// setImmediate(function () {
//     console.log("[*] Starting script to InetSocketAddress");
//
//
// });