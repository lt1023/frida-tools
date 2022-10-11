function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

function init_dialog() {
    var Dialog = Java.use("android.app.Dialog");
    Dialog.show.implementation = function () {
        console.log("---------------------------")
        this.show();
        console.log("---------------------------")
        showStacks()
    }
}

function init_toast() {
    var Toast = Java.use("android.widget.Toast");
    Toast.makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation = function (str, str2, arg3) {
        console.log('makeText ' + str2)
        showStacks()
        // console.log('dispatchStatusEventAsync2 ' + str2)
        this.makeText(str, str2, arg3);
    }
}

function startActivity() {
    var Context = Java.use("android.content.Context");
    Context.startActivity.overload('android.content.Intent').implementation = function (arg1) {
        console.log("---------------------------")
        this.startActivity(arg1);
        console.log("---------------------------")
        showStacks()
    }
    Context.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1, arg2) {
        console.log("---------------------------")
        this.startActivity(arg1, arg2);
        console.log("---------------------------")
        showStacks()
    }

    var Activity = Java.use("android.app.Activity");
    Activity.startActivity.overload('android.content.Intent').implementation = function (arg1) {
        console.log("---------------------------")
        this.startActivity(arg1);
        console.log("---------------------------")
        showStacks()
    }
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1, arg2) {
        console.log("---------------------------")
        this.startActivity(arg1, arg2);
        console.log("---------------------------")
        showStacks()
    }
}


// require("dialog.js")
Java.perform(function () {

    // init_dialog()
    init_toast()

    var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer");
    UnityPlayer.UnitySendMessage.implementation = function (str, str1, str2) {
        console.log("---------------------------")
        console.log('UnitySendMessage ' + str)
        console.log('UnitySendMessage ' + str1)
        console.log('UnitySendMessage ' + str2)
        console.log("---------------------------")

        showStacks()
        // return true;
        this.UnitySendMessage(str, str1, str2);
    }
//
//     var TextView =  Java.use("android.widget.TextView");
// TextView.setText.overload('java.lang.CharSequence').implementation = function (str){
//     console.log("setText:"  + str);
//     //showStacks()
//     this.setText(str)
// }


    // var UnityAdsImplementation = Java.use("com.unity3d.services.ads.UnityAdsImplementation");
    // UnityAdsImplementation.show.overload('android.app.Activity', 'java.lang.String', 'com.unity3d.ads.UnityAdsShowOptions', 'com.unity3d.ads.IUnityAdsShowListener').implementation = function (activity, str, unityAdsShowOptions , iUnityAdsShowListener) {
    //     console.log("---------------------------")
    //     console.log('show ' + str)
    //     console.log("---------------------------")
    //
    //     // showStacks()
    //     // return true;
    //     this.show(activity, str, unityAdsShowOptions , iUnityAdsShowListener);
    // }



    // startActivity();
    //
    // var ApplicationPackageManager = Java.use("android.app.ApplicationPackageManager");
    // ApplicationPackageManager.getPackageInfo.overload('java.lang.String', 'int').implementation = function (arg1, arg2) {
    //     console.log("---------------------------")
    //     var result = this.getPackageInfo(arg1, arg2);
    //     console.log("getPackageInfo 2 = " + result);
    //     console.log("---------------------------")
    //     showStacks()
    //     return result;
    // }


    // var MessageDigest = Java.use("java.security.MessageDigest");
    // MessageDigest.digest.overload().implementation = function () {
    //     console.log("---------------------------")
    //     var result = this.digest();
    //     console.log("digest = " + result);
    //     console.log("---------------------------")
    //     showStacks()
    //     return result;
    // }
    // MessageDigest.digest.overload('[B').implementation = function (bt) {
    //     console.log("---------------------------")
    //     var result = this.digest(bt);
    //     console.log("digest bt = " + result);
    //     console.log("---------------------------")
    //     showStacks()
    //     return result;
    // }
    // MessageDigest.digest.overload('[B', 'int', 'int').implementation = function (bt,arg1, arg2) {
    //     console.log("---------------------------")
    //     var result = this.digest(bt,arg1, arg2);
    //     console.log("digest bt arg1 = " + result);
    //     console.log("---------------------------")
    //     showStacks()
    //     return result;
    // }
    //
    //
    // var Utilities = Java.use("com.unity3d.services.core.misc.Utilities");
    // Utilities.Sha256.overload('[B').implementation = function (bArr) {
    //     console.log("---------------------------")
    //     var result = this.Sha256(bArr);
    //     console.log("Sha256  = " + result);
    //     console.log("---------------------------")
    //     showStacks()
    //     return result;
    // }
    //
    //     Utilities.Sha256.overload('java.io.InputStream').implementation = function (inputStream) {
    //     console.log("---------------------------")
    //     var result = this.Sha256(inputStream);
    //     console.log("Sha256   InputStream  = " + result);
    //     console.log("---------------------------")
    //         showStacks()
    //     return result;
    // }


    //
    // var DeviceUtils = Java.use("com.centurygame.sdk.utils.DeviceUtils");
    // DeviceUtils.getSHA1Signature.implementation = function (context) {
    //     var result = this.getSHA1Signature(context);
    //     console.log("getSHA1Signature = " + result)
    //     return result;
    // }
    // DeviceUtils.getSHA256Signature.implementation = function (context) {
    //     var result = this.getSHA256Signature(context);
    //     console.log("getSHA256Signature = " + result)
    //     return result;
    // }
    // DeviceUtils.getSignMd5Str.implementation = function (context) {
    //     var result = this.getSignMd5Str(context);
    //     console.log("getSHA256Signature = " + result)
    //     return result;
    // }
    //
    // var d = Java.use("talefun.cd.sdk.o.d");
    // d.u.implementation = function (context) {
    //     var result = this.u(context);
    //     console.log("u = " + result)
    //     return result;
    // }


});