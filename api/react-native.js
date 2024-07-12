function hook_dlopen(module_name, fun) {
    var android_dlopen_ext = Module.findExportByName(null, "android_dlopen_ext");
    if (android_dlopen_ext) {
        Interceptor.attach(android_dlopen_ext, {
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr) {
                    this.path = (pathptr).readCString();
                    if (this.path.indexOf(module_name) >= 0) {
                        this.canhook = true;
                        console.log("android_dlopen_ext:", this.path);
                    }
                }
            },
            onLeave: function (retval) {
                if (this.canhook) {
                    fun();
                }
            }
        });
    }
}

function hook_libreactnativejni() {
    let base_libreactnativejni = Module.findBaseAddress("libreactnativejni.so");
    if (base_libreactnativejni == null) {
        return;
    }
    let jniLoadScriptFromAssets = base_libreactnativejni.add(0x0071484);
    let jniLoadScriptFromFile = base_libreactnativejni.add(0x0071484);
    //private native void jniLoadScriptFromAssets(AssetManager assetManager, String assetURL, boolean loadSynchronously);
    Interceptor.attach(jniLoadScriptFromAssets, {
        onEnter(args) {
            console.log("jniLoadScriptFromAssets:", Java.vm.tryGetEnv().getStringUtfChars(args[3]).readCString())
        }
    })
    //private native void jniLoadScriptFromFile(String fileName, String sourceURL, boolean loadSynchronously);
    Interceptor.attach(jniLoadScriptFromFile, {
        onEnter(args) {
            console.log("jniLoadScriptFromFile:", Java.vm.tryGetEnv().getStringUtfChars(args[2]).readCString(), Java.vm.tryGetEnv().getStringUtfChars(args[3]).readCString())
        }
    })
}

setImmediate(() => {
    hook_dlopen("libreactnativejni.so", hook_libreactnativejni)
    hook_libreactnativejni();
})

//libreactnativejni
//[RegisterNatives] java_class: com.facebook.react.bridge.CatalystInstanceImpl name: jniLoadScriptFromAssets sig: (Landroid/content/res/AssetManager;Ljava/lang/String;Z)V fnPtr: 0x71aa5f1484  fnOffset: 0x71aa5f1484 libreactnativejni.so!_ZN8facebook3jni6detail13MethodWrapperIMNS_5react20CatalystInstanceImplEFvNS0_9alias_refIPNS1_8JTypeForINS3_13JAssetManagerENS0_7JObjectEvE11_javaobjectEEERKNSt6__ndk112basic_stringIcNSD_11char_traitsIcEENSD_9allocatorIcEEEEbEXadL_ZNS4_23jniLoadScriptFromAssetsESC_SL_bEES4_vJSC_SL_bEE4callEP7_JNIEnvP8_jobjectSB_P8_jstringh  callee: 0x721f367b10 libart.so!_ZN3art12_GLOBAL__N_18CheckJNI15RegisterNativesEP7_JNIEnvP7_jclassPK15JNINativeMethodi+0x2f4

//[RegisterNatives] java_class: com.facebook.react.bridge.CatalystInstanceImpl name: jniLoadScriptFromFile sig: (Ljava/lang/String;Ljava/lang/String;Z)V fnPtr: 0x71aa5f1490  fnOffset: 0x71aa5f1490 libreactnativejni.so!_ZN8facebook3jni6detail13MethodWrapperIMNS_5react20CatalystInstanceImplEFvRKNSt6__ndk112basic_stringIcNS5_11char_traitsIcEENS5_9allocatorIcEEEESD_bEXadL_ZNS4_21jniLoadScriptFromFileESD_SD_bEES4_vJSD_SD_bEE4callEP7_JNIEnvP8_jobjectP8_jstringSM_h  callee: 0x721f367b10 libart.so!_ZN3art12_GLOBAL__N_18CheckJNI15RegisterNativesEP7_JNIEnvP7_jclassPK15JNINativeMethodi+0x2f4