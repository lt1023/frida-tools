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
//          frida -U --no-pause -f com.candyrufusgames.survivalcraftchs -l  ./nativeEntryHook.js


// var modulrName = "libCore.so"
// var modulrName = "libmonosgen-2.0.so"
// var modulrName = "libmonodroid.so"
var modulrName = "libil2cpp.so"
//mono_image_open_from_data_with_name	.text	001B2FCC	00000088	00000038	00000008	R	.	.	.	B	.	.
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
    // var addr = module.base.add(0x001B2FCC);
    // var func = new NativePointer(addr.toString());
    // console.log(func.toString());
    // start(func)
    //mono_image_open_from_data_full	.text	001B3058	00000084	00000038	00000004	R	.	.	.	B	.	.
//mono_image_open_from_data	.text	001B30E0	00000084	00000038	00000000	R	.	.	.	B	.	.
    //mono_image_open_from_data_internal	.text	001B23F8	0000058C	00000048	00000010	R	.	.	.	B	.	.
    //mono_image_open	.text	001B3258	00000044	00000018	00000000	R	.	.	.	B	.	.
    //do_mono_image_open	.text	001B3334	00000630	00000050	0000000C	R	.	.	.	B	.	.
    //mono_image_open_raw	.text	001B39D8	0000007C	00000018	00000000	R	.	.	.	B	.	.
    //mono_image_load_file_for_image	001B4DC0
    //mono_image_load_module	001B1D9C
    //mono_image_open_from_data_with_name	001B2FCC
    //mono_assembly_load_full	00163118

    //Java_mono_android_Runtime_initInternal	00008B60
    //xamarin::android::internal::MonodroidRuntime::load_assemblies(_MonoDomain *,xamarin::android::jstring_array_wrapper &)	.text	00008494	000000A4	00000058	FFFFFFE4	R	.	.	.	.	.	.
    //xamarin::android::internal::MonodroidRuntime::load_assemblies(_MonoDomain *,xamarin::android::jstring_array_wrapper &)	.text	00008494	000000A4	00000058	FFFFFFE4	R	.	.	.	.	.	.
    var addr = module.base.add(0x12DF174).add(0);

    //Module.findExportByName(modulrName, "mono_assembly_load_full").add(0)
     Interceptor.attach(addr, {
        onEnter: function (args) {
            var data = args[0];
            var data_len = args[1];
             console.log("*_md5 onEnter", Memory.readCString(args[0]))
             // console.log("*_md5 onEnter", data_len)
             // console.log("*_md5 onEnter", Memory.readCString(args[2]))
             // console.log("*_md5 onEnter", Memory.readCString(args[3]))
             // console.log("*_md5 onEnter", Memory.readCString(args[4]))
             // console.log("*_md5 onEnter", Memory.readCString(args[5]))
             // console.log("*_md5 onEnter", Memory.readCString(args[6]))
             // console.log("*_md5 onEnter", Memory.readCString(args[7]))
            // if(Memory.readCString(args[5]) === 'System.Net.Http.dll'){
            //      console.log("dump_memory")
            //    dump_memory(data,0x35c00 );
            // }
            // if (data_len === 0x35c00) {
            //     console.log("dump_memory")
            //    dump_memory(data, data_len);
            // }
            // console.log("mono_image_open_from_data_with_name_ori() called!", data, data_len);
        },
        onLeave: function (retval) {
        }
    });
}

function dump_memory(base,size) {
    console.log("[dump]:");
    Java.perform(function () {
        var currentApplication = Java.use("android.app.ActivityThread").currentApplication();
        var dir = currentApplication.getApplicationContext().getFilesDir().getPath();
        var file_path = dir + "/dumpmemory.bin";
        var file_handle = new File(file_path, "wb");
        console.log("[dump]:", file_path);
        if (file_handle) {
            Memory.protect(ptr(base),size, 'rwx');
            var libso_buffer = ptr(base).readByteArray(size);
            file_handle.write(libso_buffer);
            file_handle.flush();
            file_handle.close();
            console.log("[dump]:", file_path);
        }
    });
}

function start(pointer) {
    Interceptor.attach(pointer, {
        onEnter: function (args) {
            console.log("*_md5 onEnter")
            // console.log("*_md5 onEnter", args[0])
            // console.log("*_md5 onEnter", args[1])
            // console.log("*_md5 onEnter", args[2])
            // console.log("*_md5 onEnter", args[3])
            // console.log("*_md5 onEnter", args[4])
            // console.log("onEnter", Memory.readCString(args[0]))
            // console.log("*_md5 onEnter", Memory.readCString(args[1]))
            // console.log("*_md5 onEnter", Memory.readCString(args[2]))
            // console.log("*_md5 onEnter", Memory.readCString(args[3]))
            // console.log("*_md5 onEnter", Memory.readCString(args[4]))
            // args[1] = 0X1
            print_c_stack(this.context, '');
            // return 1;
        },
        onLeave: function (retvalue) {
            // console.log("*_md5 onLeave", Memory.readCString(retvalue))
            console.log(" onLeave", retvalue)
            // console.log(" onLeave")
            // retvalue.replace(1)
        }
    })

}

console.log('setTimeout')
setTimeout(function () {
    console.log('hook_native')
    hook_native();
}, 1000)

// id = setInterval(hook_native,1000);

