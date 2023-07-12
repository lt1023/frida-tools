function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}


// import
import('./hook/share_prefs.js')
import('./hook/log.js')

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

function onActivityResult() {
    var Activity = Java.use("android.app.Activity");
    Activity.onActivityResult.overload('int', 'int', 'android.content.Intent').implementation = function (arg1, arg2, intent) {
        console.log("---------------------------" + arg1 + " " + arg2)
        if (arg1 !== 7) {
            this.onActivityResult(arg1, arg2, intent);
        }
        console.log("---------------------------")
        showStacks()
    }
}

function startActivityForResult() {
    var Activity = Java.use("android.app.Activity");
    Activity.startActivityForResult.overload('android.content.Intent', 'int').implementation = function (arg1, arg2) {
        console.log("---------------------------" + arg2)
        this.startActivityForResult(arg1, arg2);
        console.log("---------------------------")
        showStacks()
    }
}

function startActivity(is_show_stack) {
    var Context = Java.use("android.content.Context");
    Context.startActivity.overload('android.content.Intent').implementation = function (arg1) {
        console.log("-----------1----------------")
        this.startActivity(arg1);
        console.log("---------------------------")
        if (is_show_stack) {
            showStacks()
        }

    }
    Context.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1, arg2) {
        console.log("------------2---------------")
        this.startActivity(arg1, arg2);
        console.log("---------------------------")
        if (is_show_stack) {
            showStacks()
        }
    }

    var Activity = Java.use("android.app.Activity");
    Activity.startActivity.overload('android.content.Intent').implementation = function (arg1) {
        console.log("------------3---------------")
        console.log(arg1.getExtras().toString())
        if (is_show_stack) {
            showStacks()
        }
        console.log("---------------------------")
        this.startActivity(arg1);

    }
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1, arg2) {
        console.log("------------4---------------")
        console.log(arg1.getExtras().toString())
        if (is_show_stack) {
            showStacks()
        }
        console.log("---------------------------")
        this.startActivity(arg1, arg2);

    }
}

function getPackageInfo() {
    var ApplicationPackageManager = Java.use("android.app.ApplicationPackageManager");
    ApplicationPackageManager.getPackageInfo.overload('java.lang.String', 'int').implementation = function (arg1, arg2) {
        console.log("---------------------------")
        var result = this.getPackageInfo(arg1, arg2);
        console.log("getPackageInfo 2 = " + result);
        console.log("---------------------------")
        showStacks()
        return result;
    }
}

function viewOnClick() {
    var View = Java.use("android.view.View");
    View.performClick.implementation = function () {
        console.log("---------------------------")
        showStacks()
        console.log("---------------------------")
        this.performClick();
    }

    // View.setVisibility.implementation = function () {
    //     console.log("---------------------------")
    //     showStacks()
    //     console.log("---------------------------")
    //     return  this.setVisibility();
    // }

    // View.setOnClickListener.implementation = function (listener) {
    //     console.log("---------------------------")
    //     showStacks()
    //     console.log("---------------------------")
    //     this.setOnClickListener(listener);
    // }


    var OnClickListener = Java.use("android.view.View$OnClickListener");
    OnClickListener.onClick.implementation = function (view) {
        console.log("---------------------------")
        showStacks()
        console.log("---------------------------")
        console.log(view)
        this.onClick(view);
    }

    var OnTouchListener = Java.use("android.view.View$OnTouchListener");
    OnTouchListener.onTouch.implementation = function (view, event) {
        console.log("---------------------------")
        showStacks()
        console.log("---------------------------")
        console.log(view)
        this.onTouch(view, event);
    }


}


function UnitySendMessage() {
    var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer");
    UnityPlayer.UnitySendMessage.implementation = function (str, str1, str2) {
        console.log("---------------------------")
        console.log('UnitySendMessage ' + str)
        console.log('UnitySendMessage ' + str1)
        console.log('UnitySendMessage ' + str2)
        console.log("---------------------------")

        // showStacks()
        // return true;
        this.UnitySendMessage(str, str1, str2);
    }
}

function exit() {
    var System = Java.use("java.lang.System");
    System.exit.implementation = function () {
        console.log("---------------------------")
        showStacks()
        console.log("---------------------------")

    }

    var Process = Java.use("android.os.Process");
    Process.killProcess.implementation = function () {
        console.log("---------------------------")
        showStacks()
        console.log("---------------------------")

    }


}

function loadLibrary() {
    var System = Java.use("java.lang.System");
    System.loadLibrary.implementation = function (str) {
        console.log("--------------------------->")
        console.log('loadLibrary:' + str)

        showStacks()
        console.log("---------------------------<")
        this.loadLibrary(str)
    }
    System.load.implementation = function () {
        console.log("--------------------------->")
        console.log('load:' + str)
        showStacks()
        console.log("---------------------------<")
        this.load(str)
    }
}

function get_package_info() {
    var ApplicationPackageManager = Java.use("android.app.ApplicationPackageManager");
    ApplicationPackageManager.getPackageInfo.overload('java.lang.String', 'int').implementation = function (arg1, arg2) {
        console.log("---------------------------")
        var result = this.getPackageInfo(arg1, arg2);
        var sig = result.signatures[0]//.toCharsString()
        console.log("getPackageInfo  = " + sig);
        console.log("---------------------------")
        showStacks()
        return result;
    }
}


// require("dialog.js")
Java.perform(function () {

    // init_dialog()
    // init_toast()
    startActivity(false)
    // startActivityForResult()
    // onActivityResult()
    // viewOnClick()
    // exit()
    // get_package_info()
    // UnitySendMessage();
    // loadLibrary()
    // initLog();
    // initSharedPreferencesEditor();


    // var aaa="android.content.pm.Signature";
    // var Base64str="android.util.Base64";
    // var Signature = Java.use(aaa);
    // var Base64 = Java.use(Base64str);
    // // Signature.toByteArray.implementation = function (){
    // //     console.log("Signature")
    // //     var result = this.toByteArray()
    // //
    // //     var base64 = Base64.encodeToString(result, 2)
    // //     console.log('base64='+base64)
    // //
    // //     return result
    // // }
    //
    // var GameHelper = Java.use('com.zhangyangjing.starfish.util.GameHelper$ll1I1i');
    // GameHelper.call.implementation = function (lli1I1){
    //     console.log('GameHelper->'+lli1I1.Oo0O0O.size());
    //
    // }

    var EmulatorActivity = Java.use('com.zhangyangjing.starfish.ui.EmulatorActivity');
    EmulatorActivity.onCreate.implementation = function (arg) {
        this.onCreate(arg);

        console.log('EmulatorActivity onCreate')
        var placeholder = this.getIntent().getStringExtra("placeholder");
        console.log("placeholder=" + placeholder)

        var game_path = this.getIntent().getStringExtra("game_path");
        console.log("game_path=" + game_path)

        var game_emulator = this.getIntent().getStringExtra("game_emulator");
        console.log("game_emulator=" + game_emulator)

        var account_type = this.getIntent().getStringExtra("account_type");
        console.log("account_type=" + account_type)

        var game_id = this.getIntent().getIntExtra("game_id", -1);
        console.log("game_id=" + game_id)

    }

    //   var NativeLibrary = Java.use("xyz.aethersx2.android.NativeLibrary");
    // NativeLibrary.getGameListEntries.implementation = function () {
    //     console.log("---------------------------")
    //     var result = this.getGameListEntries();
    //     console.log(result)
    //     console.log("---------------------------")
    //     // showStacks()
    //     return result
    // }

    //   var GameListEntry = Java.use("xyz.aethersx2.android.GameListEntry");
    // GameListEntry.$init.implementation = function ( i3,  i4,  str,  str2,  str3,  j3,  str4,  i5,  i6,  str5) {
    //     console.log("---------------------------")
    //     var result = this.$init(i3,  i4,  str,  str2,  str3,  j3,  str4,  i5,  i6,  str5);
    //     console.log(i3)
    //     console.log(i4)
    //     console.log(str)
    //     console.log(str2)
    //     console.log(str3)
    //     console.log(j3)
    //     console.log(str4)
    //     console.log(i5)
    //     console.log(i6)
    //     console.log(str5)
    //     console.log("---------------------------")
    //     // showStacks()
    //     // return result
    // }

    // var View = Java.use("android.view.View");
    // View.setEnabled.implementation = function (arg) {
    //     console.log("---------------------------" + arg)
    //     showStacks()
    //     console.log("---------------------------")
    //     this.setEnabled(arg);
    // }

    // var TextView = Java.use("android.widget.TextView");
    // TextView.setText.overload('java.lang.CharSequence').implementation = function (arg) {
    //     console.log("---------------------------" + arg)
    //     showStacks()
    //     console.log("---------------------------")
    //     this.setText(arg);
    // }
    //
    // TextView.setText.overload('java.lang.CharSequence', 'android.widget.TextView$BufferType').implementation = function (arg, arg2) {
    //     console.log("---------------------------1")
    //     // showStacks()
    //     var str = arg.toString()
    //     console.log(str)
    //    showStacks()
    //     console.log("---------------------------2")
    //     this.setText(arg,arg2);
    // }

    // var MainActivity = Java.use("com.epicgames.ue4.d");
    // MainActivity.c.overload('java.lang.String').implementation = function (arg) {
    //     console.log("---------------------------" + arg)
    //     // showStacks()
    //     console.log("---------------------------")
    //     return this.c(arg);
    // }
    // var SecretKey = Java.use("    javax.crypto.SecretKey");
    // SecretKey.$init.overload('java.lang.String').implementation = function (arg) {
    //     console.log("---------------------------" + arg)
    //     // showStacks()
    //     console.log("---------------------------")
    //     return this.c(arg);
    // }
    // var SecretKey = Java.use("com.epicgames.ue4.GameActivity");
    // SecretKey.nativeSetObbInfo.implementation = function (arg, arg2, arg3, arg4, arg5) {
    //     console.log("---------------------------" + arg + '   ' + arg2)
    //     console.log("---------------------------" + arg3 + '   ' + arg4+ '   ' + arg5)
    //     // showStacks()
    //
    //     console.log("---------------------------")
    //     return this.nativeSetObbInfo(arg, arg2, arg3, arg4, arg5);
    // }


//  var signature = Java.use('android.content.pm.Signature')
//     signature.toByteArray.implementation = function(){
//         var char = this.toCharsString();
//         console.log('\n' + char + "----------")
//         showStacks()
//         return this.toByteArray()
//     }
// signature.$init.overload('[B').implementation = function(str){
//     // var char = this.toCharsString();
//     console.log('\n' + char)
//
//     return this.$init(str)
// }
// signature.$init.implementation = function(str){
//     // var char = this.toCharsString();
//     console.log('\n' + char)
//
//     return this.$init(str)
// }

// var SoundButtonListener = Java.use("com.gsr.utils.listeners.SoundButtonListener");
// SoundButtonListener.touchUpEffect.implementation = function () {
//     showStacks()
//     // return true;
//     this.touchUpEffect();
// }


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


})
;