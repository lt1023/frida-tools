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
        showStacks()
        console.log("---------------------------")
        this.show();
    }
}

function init_windowmanager() {
    var WindowManager = Java.use("android.view.WindowManager");
    WindowManager.addView.implementation = function (view, params) {
        console.log("---------------------------")
        showStacks()
        console.log("---------------------------")
        this.addView(view, params);
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
        //  var name = intent.getComponent();
        // console.log(name.toString())
        console.log(arg1)
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
    Activity.startActivity.overload('android.content.Intent').implementation = function (intent) {
        console.log("------------3---------------")
        if (is_show_stack) {
            showStacks()
        }

        // if (intent) {
        //     if (intent.getExtras()) {
        //         console.log(intent.getExtras().toString())
        //     }
        // }
        // var data = intent.getData()
        // if (data) {
        //     console.log('data=' + data)
        // }
        // console.log(intent.getComponent().getClassName())
        // console.log(intent.getComponent().getPackageName())
        // if (intent.getComponent().getClassName() === "com.hbg.tool.app.MainActivity"){
        //     this.startActivity(null);
        //     return;
        // }

        console.log("---------------------------")
        this.startActivity(intent);

    }
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1, arg2) {
        console.log("------------4---------------")
        // if (arg1 != null) {
        //     var extras = arg1.getExtras()
        //     if (extras != null) {
        //         console.log(arg1)
        //         // extras.putString("Contact_Alias", null);
        //         // extras.putString("Contact_User", "@stranger");
        //         // extras.putString("AntispamTicket", null);
        //         //
        //         //
        //         // arg1.putExtras(extras);
        //         console.log(extras.toString())
        //     }
        // }

        // if (arg2!= null){
        //       console.log(arg2.toString())
        // }


        this.startActivity(arg1, arg2);

        console.log("------------4---------------")


        // console.log(arg2)

        // console.log(arg1.getExtras().toString())

        if (is_show_stack) {
            showStacks()
        }
        console.log("---------------------------")

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

function init_intent() {
    var Intent = Java.use('android.content.Intent');
    Intent.putExtra.overload('java.lang.String', 'byte').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }

    Intent.putExtra.overload('java.lang.String', 'char').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }

    Intent.putExtra.overload('java.lang.String', 'double').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }

    Intent.putExtra.overload('java.lang.String', 'float').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'int').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }

    Intent.putExtra.overload('java.lang.String', 'long').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'android.os.Bundle').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'android.os.IBinder').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'android.os.Parcelable').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'java.io.Serializable').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'java.lang.CharSequence').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'java.lang.String').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', 'short').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[B').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[C').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[D').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[F').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[I').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[J').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[Landroid.os.Parcelable;').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[Ljava.lang.CharSequence;').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[Ljava.lang.String;').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
    Intent.putExtra.overload('java.lang.String', '[S').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }

    Intent.putExtra.overload('java.lang.String', '[Z').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }

    Intent.putExtra.overload('java.lang.String', 'boolean').implementation = function (str, arg) {
        console.log('putExtra key->' + str);
        console.log('putExtra arg->' + arg);
        return this.putExtra(str, arg)
    }
}

function init_provider() {
    var ContentResolver = Java.use('android.content.ContentResolver');
    ContentResolver.insert.overload('android.net.Uri', 'android.content.ContentValues').implementation = function (arg, arg2) {
        console.log("insert1", arg.toString())
        console.log("insert1", arg2.toString())
        return this.insert(arg, arg2);
    }

    ContentResolver.insert.overload('android.net.Uri', 'android.content.ContentValues', 'android.os.Bundle').implementation = function (arg, arg2, arg3) {
        console.log("insert2", arg.toString())
        console.log("insert2", arg2.toString())
        // console.log("insert2", arg3.toString())
        return this.insert(arg, arg2, arg3);
    }

    ContentResolver.update.overload('android.net.Uri', 'android.content.ContentValues', 'android.os.Bundle').implementation = function (arg, arg2, arg3) {
        console.log("update", arg.toString())
        console.log("update", arg2.toString())
        // console.log("update", arg3.toString())
        return this.update(arg, arg2, arg3);
    }

    ContentResolver.update.overload('android.net.Uri', 'android.content.ContentValues', 'java.lang.String', '[Ljava.lang.String;').implementation = function (arg, arg2, arg3, arg4) {
        console.log("update2", arg.toString())
        console.log("update2", arg2.toString())
        console.log("update2", arg3.toString())
        console.log("update2", arg4.toString())
        return this.update(arg, arg2, arg3, arg4);
    }
}

function initURL() {
    var URL = Java.use("java.net.URL");
    URL.$init.overload('java.lang.String').implementation = function (arg) {
        console.log("URL1=" + arg)
        if (arg.contains("auth-api.heibaige.com") || arg.contains(".databeauti.com")) {
            arg = "www.baidu.com"
        }
        this.$init(arg);
    }
    URL.$init.overload('java.net.URL', 'java.lang.String').overload('java.lang.String').implementation = function (arg, arg2) {
        console.log("URL2=" + arg)
        this.$init(arg, arg2);
    }

    URL.$init.overload('java.lang.String', 'java.lang.String', 'java.lang.String').implementation = function (arg, arg2, arg3) {
        console.log("URL3=" + arg)
        this.$init(arg, arg2, arg3);
    }

}

function initLog() {
    var Log = Java.use("android.util.Log");
    Log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log("Logw:tag=" + tag + "->meesage=" + message);
        showStacks();
        return this.w(tag, message);
    }
}

function initAds() {
    var UnityAds = Java.use("com.unity3d.ads.UnityAds");

    UnityAds.initialize.overload('android.content.Context', 'java.lang.String').implementation = function (context, str) {
        showStacks();
        this.initialize(context, str)
    }
    UnityAds.initialize.overload('android.content.Context', 'java.lang.String', 'com.unity3d.ads.IUnityAdsInitializationListener').implementation = function (context, str, bool) {
        showStacks();
        this.initialize(context, str, bool)
    }
    UnityAds.initialize.overload('android.content.Context', 'java.lang.String', 'boolean').implementation = function (context, str, bool) {
        showStacks();
        this.initialize(context, str, bool)
    }
    UnityAds.initialize.overload('android.content.Context', 'java.lang.String', 'boolean', 'com.unity3d.ads.IUnityAdsInitializationListener').implementation = function (context, str, bool, listener) {
        showStacks();
        this.initialize(context, str, bool, listener)
    }


    var SMAAdMobInterstitialAd = Java.use("com.smaato.sdk.adapters.admob.interstitial.SMAAdMobInterstitialAd");

    SMAAdMobInterstitialAd.$init.implementation = function () {
        showStacks();
        return this.$init()
    }

    var BaseInterstitialAd = Java.use("com.my.target.ads.BaseInterstitialAd");

    BaseInterstitialAd.$init.implementation = function () {
        showStacks();
        return this.$init()
    }
    var FunctionLibrary = Java.use("com.linkdesks.toolkit.FunctionLibrary");

    FunctionLibrary.init.implementation = function (appActivity) {
        showStacks();
        return this.init(appActivity)
    }

    var BaseAdView = Java.use("com.google.android.gms.ads.BaseAdView");

    BaseAdView.loadAd.implementation = function (adRequest) {
        showStacks();
        return this.loadAd(adRequest)
    }


}


function hookdouyin() {
    // Java.enumerateClassLoaders({
    //     onMatch: function (loader) {
    //         try {
    //             // console.log(loader)
    //             if (loader.findClass("com.mod.plugin.iiii.tg")) {
    //                 console.log(loader);
    //                 Java.classFactory.loader = loader; //切换classloader
    //             }
    //         } catch (error) {
    //         }
    //     }, onComplete: function () {
    //     }
    // });
    // Java.enumerateClassLoaders({
    //     onMatch: function (loader) {
    //         try {
    //             console.log(loader)
    //             if (loader.findClass("lab.galaxy.yahfa.ApkSign")) {
    //                 console.log(loader);
    //                 Java.classFactory.loader = loader; //切换classloader
    //
    //                 var ApkSign = Java.classFactory.use("lab.galaxy.yahfa.ApkSign");
    //                 ApkSign.getApkSignInfo.implementation = function () {
    //                     showStacks();
    //                     var result = this.getApkSignInfo();
    //                     console.log("getApkSignInfo:" + result);
    //                     return result;
    //                 }
    //                 ApkSign.getApkSignInfo_bak.implementation = function () {
    //                     showStacks();
    //                     var result = this.getApkSignInfo_bak();
    //                     console.log("getApkSignInfo_bak:" + result);
    //                     return result;
    //                 }
    //             }
    //         } catch (error) {
    //         }
    //     }, onComplete: function () {
    //     }
    // });
    var SsRetrofitClient = Java.use("com.bytedance.ttnet.retrofit.SsRetrofitClient");
    console.log('SsRetrofitClient = ', SsRetrofitClient)
    SsRetrofitClient.newSsCall.implementation = function (request) {
        console.log("newSsCall", request)
        return this.newSsCall(request);
    }
}

// require("dialog.js")
Java.perform(function () {

    // init_dialog()
    // init_windowmanager()
    // init_toast()
    // init_intent()
    // init_provider()
    // startActivity(true)
    // startActivityForResult()
    // onActivityResult()
    // viewOnClick()
    // exit()
    // get_package_info()
    // UnitySendMessage();
    // loadLibrary()
    // initLog();
    // initSharedPreferencesEditor();
    // initURL();
    // initAds();
    // hookdouyin()


    //     var MyAccountFragment = Java.use("com.sahibinden.arch.ui.account.myaccount.MyAccountFragment");
    // MyAccountFragment.D7.implementation = function (action) {
    //     console.log("D7:",  action)
    //    // showStacks();
    //     // return true;
    //     this.D7(action);
    // }

    Java.enumerateClassLoaders({
        onMatch: function (loader) {
            try {
                // console.log(loader)
                if (loader.findClass("com.bytedance.sdk.openadsdk.component.reward.mb")) {
                    console.log(loader);
                    Java.classFactory.loader = loader; //切换classloader
                    var mb = Java.classFactory.use("com.bytedance.sdk.openadsdk.component.reward.mb");
                    mb.onError.implementation = function (code, str) {
                        console.log("code=", onError, "  str=", str)
                        showStacks();
                    }
                    //     console.log("D7:", action)
                    //     // console.log("D7:", this.r)
                    //     // console.log("D7:", this.s)
                    //     // console.log("D7:", this.t)
                    //     // console.log("D7:", this.u)
                    //     // console.log("D7:", this.v)
                    //     console.log("D7:", this.x)
                    //     console.log("D7:", this.x.B4().getValue())
                    //     // console.log("D7:", this.x.F.getValue().getEmail())
                    //     // showStacks();
                    //     // return true;
                    //     this.D7(action);
                    //     }

                }
            } catch
                (error) {
            }
        }
        ,
        onComplete: function () {
        }
    });
    // Java.enumerateClassLoaders({
    //     onMatch: function (loader) {
    //         try {
    //             console.log(loader)
    //             if (loader.findClass("lab.galaxy.yahfa.ApkSign")) {
    //                 console.log(loader);
    //                 Java.classFactory.loader = loader; //切换classloader
    //
    //                 var ApkSign = Java.classFactory.use("lab.galaxy.yahfa.ApkSign");
    //                 ApkSign.getApkSignInfo.implementation = function () {
    //                     showStacks();
    //                     var result = this.getApkSignInfo();
    //                     console.log("getApkSignInfo:" + result);
    //                     return result;
    //                 }
    //                 ApkSign.getApkSignInfo_bak.implementation = function () {
    //                     showStacks();
    //                     var result = this.getApkSignInfo_bak();
    //                     console.log("getApkSignInfo_bak:" + result);
    //                     return result;
    //                 }
    //             }
    //         } catch (error) {
    //         }
    //     }, onComplete: function () {
    //     }
    // });



    // var Log = Java.use("android.util.Log");
    //
    // Log.e.overload('java.lang.String', 'java.lang.String').implementation = function (p1, p2) {
    //     console.log("p1=",p1, "  p=",p2)
    //     showStacks();
    // }


    // var TextView = Java.use("android.widget.TextView");
    // TextView.setText.overload('java.lang.CharSequence').implementation = function (action) {
    //     console.log("setText:",  action)
    //    showStacks();
    //     // return true;
    //     this.setText(action);
    // }

    // var GameHallActivity = Java.use("com.huazhen.barcode.app.GameHallActivity");
    // GameHallActivity.onCreate.implementation = function () {
    //     console.log("GameHallActivity onCreate")
    //     this.onCreate();
    //     console.log("GameHallActivity onCreate", this.z)
    //
    // }
    // var JavaHookTools = Java.use("com.huazhen.barcode.engine.BarcodeJNI");
    // JavaHookTools.nativeAA.implementation = function () {
    //     console.log("nativeAA")
    //     return this.nativeAA();
    // }
    //
    // JavaHookTools.nativeBB.implementation = function (p1) {
    //     console.log("nativeBB")
    //     return this.nativeBB(p1);
    // }
    //
    // JavaHookTools.nativeCC.implementation = function (p1) {
    //     console.log("nativeCC")
    //     return this.nativeCC(p1);
    // }
    //
    // JavaHookTools.nativeDD.implementation = function (p1) {
    //     console.log("nativeDD")
    //     return this.nativeDD(p1);
    // }
    //
    // JavaHookTools.nativeEE.implementation = function (p1, p2) {
    //     console.log("nativeEE")
    //     return this.nativeEE(p1, p2);
    // }
    //
    // JavaHookTools.nativeFF.implementation = function (p1, p2) {
    //     console.log("nativeFF")
    //     return this.nativeFF(p1, p2);
    // }
    //
    // JavaHookTools.nativeGG.implementation = function (p1, p2, p3) {
    //     console.log("nativeGG p1=", p1)
    //     console.log("nativeGG p2=", p2)
    //     console.log("nativeGG p3=", p3)
    //     showStacks()
    //     var result = this.nativeGG(p1, p2, p3);
    //     console.log("nativeGG 2 p3=", p3)
    //     return result;
    // }
    // JavaHookTools.nativeHH.implementation = function (p1, p2, p3) {
    //     console.log("nativeHH p1=", p1)
    //     console.log("nativeHH p2=", p2)
    //     console.log("nativeHH p3=", p3)
    //     showStacks()
    //     var result = this.nativeHH(p1, p2, p3);
    //     console.log("nativeHH 2 p3=", p3)
    //     return result;
    // }
    //
    // JavaHookTools.nativeII.implementation = function (p1, p2) {
    //     console.log("nativeII")
    //     return this.nativeII(p1, p2);
    // }

    // var View = Java.use("android.view.View");
    // var TouchTargetHelper = Java.use("com.facebook.react.uimanager.TouchTargetHelper");
    // var ReactViewGroup = Java.use("com.facebook.react.views.view.ReactViewGroup");
    // var TextView = Java.use("android.widget.TextView");
    // var ImageView = Java.use("android.widget.ImageView");
    // var SafeAreaProvider = Java.use("com.th3rdwave.safeareacontext.SafeAreaProvider");
    // var ReactImageView = Java.use("com.facebook.react.views.image.ReactImageView");
    // var JSBundleLoader = Java.use("com.facebook.react.bridge.JSBundleLoader");
    // var CatalystInstanceImpl = Java.use("com.facebook.react.bridge.CatalystInstanceImpl");
    // console.log('TextView = ', TextView)
    // console.log('CatalystInstanceImpl = ', CatalystInstanceImpl)
    // TextView.setText.implementation = function (value) {
    //     console.log("setText",  value)
    //     showStacks()
    //     this.setText( value);
    // }

    // TextView.setText.overload('java.lang.CharSequence').implementation = function (value) {
    //     console.log("setText",  value)
    //     // showStacks()
    //     this.setText( value);
    // }
    // ReactImageView.setSourceImage.implementation = function (value) {
    //     console.log("setLoadingIndicatorSource",  value)
    //     this.setSourceImage( value);
    // }
    //
    // View.performClick.implementation = function () {
    //     console.log("performClick:" + this.getClass().getName())
    //     this.performClick();
    // }
    //
    // View.setOnClickListener.implementation = function (listener) {
    //     // console.log("setOnClickListener:" + this.getClass().getName())
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    // }
    // View.setOnTouchListener.implementation = function (listener) {
    //     // console.log("setOnClickListener:" + this.getClass().getName())
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    // }
    //
    // ReactViewGroup.dispatchTouchEvent.implementation = function (listener) {
    //     console.log("dispatchTouchEvent:" + this.getClass().getName())
    //     return true;
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    // }
    //
    // ReactViewGroup.setRemoveClippedSubviews.implementation = function (listener) {
    //     console.log("setRemoveClippedSubviews:" + this.getClass().getName())
    //     // return true;
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    // }

    // SafeAreaProvider.maybeUpdateInsets.implementation = function (listener) {
    //     console.log("SafeAreaProvider maybeUpdateInsets:" + this.getClass().getName())
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    // }

    // SafeAreaProvider.dispatchTouchEvent.implementation = function (listener) {
    //     console.log("SafeAreaProvider dispatchTouchEvent:" + this.getClass().getName())
    //     return false;
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    // }
    //
    // TouchTargetHelper.findTouchTargetViewWithPointerEvents.implementation = function (p1,p2,p3) {
    //     // showStacks()
    //     // this.setOnClickListener(listener);
    //     var result = this.findTouchTargetViewWithPointerEvents(p1,p2,p3);
    //     console.log("findTouchTargetViewWithPointerEvents:" + result)
    //
    //     return  result;
    // }


    // CatalystInstanceImpl.jniLoadScriptFromAssets.implementation = function (p1,p2,p3) {
    //     console.log("loadScriptFromAssets",  p1, p2, p3)
    //     // showStacks()
    //     this.jniLoadScriptFromAssets( p1, p2, p3);
    // }

    // JSBundleLoader.createAssetLoader.implementation = function (p1,p2,p3) {
    //     console.log("loadScriptFromAssets",  p1," --  ", p2, " --  ",p3)
    //     // showStacks()
    //     return this.createAssetLoader( p1, p2, p3);
    // }


    // var UnityPlayer = Java.use("com.unity3d.player.UnityPlayer");
    // Activity.finish.overload().implementation = function () {
    //     showStacks();
    //     // this.finish();
    // }


    // var SharedPreferences$Editor = Java.use("android.content.SharedPreferences$Editor");
    // console.log('SharedPreferences$Editor = ',SharedPreferences$Editor)
    // SharedPreferences$Editor.putString.implementation = function (key, value) {
    //     console.log("putString", key, value)
    //     this.putString(key, value);
    // }
    // SharedPreferences$Editor.putStringSet.implementation = function (key, value) {
    //     console.log("putStringSet", key, value)
    //     this.putStringSet(key, value);
    // }
    // SharedPreferences$Editor.putInt.implementation = function (key, value) {
    //     console.log("putInt", key, value)
    //     this.putInt(key, value);
    // }
    // SharedPreferences$Editor.putLong.implementation = function (key, value) {
    //     console.log("putLong", key, value)
    //     this.putLong(key, value);
    // }
    // SharedPreferences$Editor.putFloat.implementation = function (key, value) {
    //     console.log("putFloat", key, value)
    //     this.putFloat(key, value);
    // }
    // SharedPreferences$Editor.putBoolean.implementation = function (key, value) {
    //     console.log("putBoolean", key, value)
    //     this.putBoolean(key, value);
    // }

    // var VipPreference = Java.use("com.catfish.newvip.preference.VipPreference");
    // VipPreference.getVipMember.implementation = function () {
    //     showStacks()
    //     // return this.run();
    //     console.log(this.getVipMember())
    //     // this.isActiveKeyAvailable(true)
    //     return this.getVipMember()
    // }
    // var SayHiWithSnsPermissionUI$14 = Java.use("com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI$14");
    // SayHiWithSnsPermissionUI$14.onClick.implementation = function () {
    //     // showStacks()
    //     // return this.run();
    //     console.log()
    //     // this.isActiveKeyAvailable(true)
    //
    // }


    // var NaNoUnityContext = Java.use("com.hugenstar.nanobox.NaNoUnityContext");
    // NaNoUnityContext.login.implementation = function () {
    //     showStacks()
    //     // return this.run();
    //      this.login()
    //     // this.isActiveKeyAvailable(arg)
    // }
    // NaNoUnityContext.sendCallback.implementation = function (arg, arg2) {
    //     showStacks()
    //     console.log(arg)
    //     console.log(arg2)
    //      this.sendCallback(arg, arg2)
    //     // this.isActiveKeyAvailable(arg)
    // }


    // var WebView = Java.classFactory.use("android.webkit.WebView");
    // WebView.loadUrl.overload('java.lang.String').implementation = function (arg) {
    //     showStacks()
    //     // return this.run();
    //     console.log(arg)
    // }
    // WebView.loadUrl.overload('java.lang.String', 'java.util.Map').implementation = function (arg) {
    //     showStacks()
    //     console.log(arg)
    //     // return this.run();
    // }
    // var ej_a = Java.classFactory.use("com.mod.plugin.iiii.ej$a");
    // ej_a.sendEmptyMessage.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var tg = Java.classFactory.use("com.mod.plugin.iiii.tg");
    // tg.show.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var ej_a = Java.classFactory.use("com.mod.plugin.iiii.ej$a");
    // ej_a.handleMessage.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var jg = Java.classFactory.use("com.mod.plugin.iiii.jg");
    // jg.run.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var SFclass = Java.use("com.file.SFclass");
    // SFclass.init.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var delaytoload = Java.use("com.example.testida.delaytoload");
    // delaytoload.startup.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var cf = Java.classFactory.use("o0o00.Oo00o.O0o0.ff");
    //
    // cf.show.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var b = Java.classFactory.use("com.newzhizhuang.v4_minify.b.b");
    //
    // b.run.implementation = function () {
    //     showStacks()
    //     // return this.run();
    // }
    // var aaa="android.content.pm.Signature";
    // var Base64str="android.util.Base64";
    // var Signature = Java.use(aaa);
    // var Base64 = Java.use(Base64str);
    // Signature.toByteArray.implementation = function (){
    //     console.log("Signature")
    //     var result = this.toByteArray()
    //
    //     var base64 = Base64.encodeToString(result, 2)
    //     console.log('base64='+base64)
    //
    //     return result
    // }

    // var f = Java.use("e.i.i.a.u.f");
    // var a = Java.use("e.i.i.a.u.f$a");
    // a.j.implementation = function (p1, p2, p3, p4, p5) {
    //     console.log("a.j", p1, p2, p3, p4, p5.size())
    //     return this.j(p1, p2, p3, p4, p5);
    // }
    // f.$init.overload('boolean', 'java.lang.String', 'int', 'java.util.List', 'kotlin.jvm.internal.DefaultConstructorMarker').implementation = function (p1, p2, p3, p4, p5) {
    //     console.log('$init', p1, p2, p3, p4, p5)
    //     this.$init(p1, p2, p3, p4, p5)
    // }


    // var Context = Java.use("android.content.Context");
    // Context.getPackageName.implementation = function (){
    //     console.log("getPackageName")
    //     return this.getPackageName();
    // }
    // var MainActivity = Java.use("jp.danball.powdergameviewer.MainActivity");
    // MainActivity.scheme_getUrl.implementation = function (){
    //     console.log("scheme_getUrl")
    //     return this.scheme_getUrl();
    // }
    //
    // MainActivity.scheme_setUrl.implementation = function (intent){
    //     console.log("scheme_setUrl")
    //      this.scheme_setUrl(intent);
    //     showStacks()
    //     var scheme_url = intent.getData();
    //     console.log("scheme_url=",scheme_url.toString())
    // }
    // MainActivity.pgsys_download.implementation = function (){
    //     console.log("pgsys_download")
    //      this.pgsys_download();
    //     showStacks()
    //     // var scheme_url = intent.getData();
    //     // console.log("scheme_url=",scheme_url)
    // }

    // var TextView = Java.use("android.widget.TextView");
    // TextView.setText.overload('java.lang.CharSequence').implementation = function (arg){
    //     // console.log("setText:"+arg)
    //   // showStacks();
    //     return this.setText(arg);
    // }
    //
    // var WebView = Java.use("android.webkit.WebView");
    // WebView.loadUrl.overload('java.lang.String').implementation = function (arg){
    //     console.log("loadUrl:"+arg)
    //   // showStacks();
    //     return this.loadUrl(arg);
    // }

    // TextView.setText.overload('java.lang.CharSequence').implementation = function (arg){
    //     console.log("setText")
    //     return this.setText(arg);
    // }

    // var AppStartSignBean = Java.use('io.xmbz.virtualapp.bean.AppStartSignBean');
    //   AppStartSignBean.getIsAuth.implementation = function (){
    //     showStacks()
    //       return 1;
    // }


    // var b = Java.use('com.xmbz.base.okhttp.b');


    // var ServiceImpl = Java.use('com.xmbz.up7723.sdk.verify.utils.ServiceImpl');
    // ServiceImpl.$init.implementation = function (p1, p2, p3, p4) {
    //     console.log("ServiceImpl $init");
    //
    // }
    // var FakeActivity = Java.use('com.bz.simplesdks.FakeActivity');
    // FakeActivity.getSdkInfoList.implementation = function (p1, p2, p3, p4) {
    //     console.log("ServiceImpl $init");
    //     return this.getSdkInfoList();
    // }
    // ServiceImpl.getModel.implementation = function (p1, p2, p3, p4) {
    //     console.log("ServiceImpl getModel");
    //     return "";
    //
    // }
    // var o8 = Java.use('verifysdk.o8');
    // o8.a.implementation = function (p1, p2) {
    //     console.log("verifysdk $init", p1, p2);
    // }

    // var Request = Java.use('okhttp3.Request');
    // Request.$init.implementation = function (p1, p2, p3, p4) {
    //     console.log("ServiceImpl $init");
    // }
    //
    // Request.url.implementation = function (p1, p2, p3, p4) {
    //     console.log("url $init");
    // }

    // var b$c = Java.use('com.zhy.http.okhttp.b$c');
    // b$c.run.implementation = function (){
    //     showStacks()
    // }

    // var c = Java.use('com.xmbz.base.okhttp.c');

    // c.c.implementation = function (inputParamMap, headers) {
    //     // console.log('c.c,',inputParamMap, headers)
    //     var result = this.c(inputParamMap, headers);
    //     if (result.containsKey("sign")){
    //         console.log('c.c,',result.get("sign"))
    //         // result.replace("sign", "55182505e95dc0346d8049c2ce595a69")
    //     }
    //     console.log('c.c,',result.toString())
    //     return result;
    // }


    // b.a.implementation = function (json, keys) {
    //     console.log('b.a,',json, keys)
    //     var result = this.a(json, keys);
    //     console.log('b.a,',result)
    //     return result;
    // }

    // var d = Java.use('io.xmbz.virtualapp.http.d');

    //  d.l.implementation = function () {
    //      console.log('d.l')
    //      return true;
    //  }
    // d.o.implementation = function (type, code,msg) {
    //      console.log('d.o ',msg)
    //      return this.o(type, code, msg);
    //  }
    // d.f.implementation = function (response,id) {
    //      console.log('d.f ',response)
    //     var string = response.body().string();
    //       console.log('d.f ',string)
    //      return this.f(response, id);
    //  }
    //
    // d.k.implementation = function (encryptedStr,key, iv) {
    //      console.log('d.k ',encryptedStr, key, iv)
    //     var result = this.k(encryptedStr, key, iv);
    //       console.log('d.k ',result)
    //      return result;
    //  }


    // var c4 = Java.use('pro.rimnpgj.rhqjtk.sptvv.c4');
    // c4.j5.implementation = function () {
    //     console.log('j5')
    //     return true;
    // }

    // var EmulatorActivity = Java.use('com.zhangyangjing.starfish.ui.EmulatorActivity');
    // EmulatorActivity.onCreate.implementation = function (arg) {
    //     console.log('EmulatorActivity onCreate')
    //
    //     this.onCreate(arg);
    //
    //     var placeholder = this.getIntent().getStringExtra("placeholder");
    //     console.log("placeholder=" + placeholder)
    //
    //     var game_path = this.getIntent().getStringExtra("game_path");
    //     console.log("game_path=" + game_path)
    //
    //     var game_emulator = this.getIntent().getStringExtra("game_emulator");
    //     console.log("game_emulator=" + game_emulator)
    //
    //     var account_type = this.getIntent().getStringExtra("account_type");
    //     console.log("account_type=" + account_type)
    //
    //     var game_id = this.getIntent().getIntExtra("game_id", -1);
    //     console.log("game_id=" + game_id)
    //
    // }

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

})
;