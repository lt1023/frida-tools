import frida, sys

#adb shell /data/local/tmp/fs64
# frida_server_15.1.17_arm64 -l 0.0.0.0:15122
# adb forward tcp:27042 tcp:27042

host = '127.0.0.1:1234'

package_name = "com.cookapps.taileddemonslayer"

'''
hook内部类方法/匿名类方法
	// hook内部类方法
		var innercls = Java.use("cn.gemini.k.fridatest.FridaHook1$inner_class");
		innercls.inner_class_func.implementation = function(arg1){
			console.log("inner_class_func arg1:",arg1);
			return this.inner_class_func(arg1);
		}
		// hook匿名类方法
		var innercls = Java.use("cn.gemini.k.fridatest.FridaHook1$1"); // 匿名类的类名一般使用反编译软件获取
		innercls.output.implementation = function(){
			console.log("output 匿名类方法调用");
			return this.output();
		}


枚举所有类与类的所有方法
       console.log("Frida Test Hook6");
		// 枚举所有类
		console.log("枚举所有类");
		Java.enumerateLoadedClasses({
			onMatch: function(name){
				console.log(name);
				// 这里可以添加过滤逻辑用来过滤我们关注的类
				//if(name.indexOf("cn.gemini.k.fridatest") != -1){
				//	console.log(name);
				//}
			},
			onComplete: function(){

			}
		});

		// 打印类中的所有方法
		console.log("打印类中的所有方法");
		var clszz = Java.use("cn.gemini.k.fridatest.FridaHook1");
		var methods = clszz.class.getDeclaredMethods(); // 获取类中的所有方法可使用反射获得
		console.log(methods);


hook类中所有成员方法
console.log("Frida Test Hook7");
		var clszz = Java.use("cn.gemini.k.fridatest.FridaHook1");
		// 先枚举类的所有方法
		var methods = clszz.class.getDeclaredMethods();
		for(var i = 0; i < methods.length; i++){
			var methodName = methods[i].getName();	// 获取到每个方法的名字
			console.log(methodName);
			console.log(clszz[methodName].overloads.length);
			// 重载方法的处理
			for(var j = 0; j < clszz[methodName].overloads.length; j++){
				clszz[methodName].overloads[j].implementation = function(){
					for(var k = 0;k < arguments.length; k++){
						console.log(this + " arg"+ k + ":" + arguments[k]);
					}
					return this[methodName].apply(this, arguments);
				}
			}
		}


实例化类对象/修改类字段
		console.log("Frida Test Hook8");
		var clazz = Java.use("cn.gemini.k.fridatest.FridaHook1");
		// 修改类中的静态字段
		console.log("修改前静态字段的值:" + clazz.password.value);
		clazz.password.value = "9"; // 静态字段的修改
		console.log("修改后静态字段的值:" + clazz.password.value);

		// 实例化类对象
		var newcls = clazz.$new();  // 通过$new方法对类进行实例化
		console.log("实例化一个类对象"+newcls)
		console.log("修改前的字段值: abc=="+newcls._abc.value+" cde=="+newcls.cde.value);

		// 修改类中的非静态字段
		Java.choose("cn.gemini.k.fridatest.FridaHook1",{
			onMatch: function(obj){
				obj.cde.value = 100;    // 非静态字段修改方式
				obj._abc.value = 200;   // 非静态字段修改:这里需要注意因为类中存在一个同名的方法,所以访问该字段时需要加个下划线"_"
				console.log("修改后的字段值: abc=="+obj._abc.value+" cde=="+obj.cde.value);
			},
			onComplete: function(){
			}
		});


frida方法主动调用
		console.log("Frida Test Hook9");
		// 主动调用类静态方法
		var clszz = Java.use("cn.gemini.k.fridatest.FridaHook1");
		clszz.func3_verify_static(">>>pwd<<<");

		// 主动调用类成员方法
		// 第一种方式：创建一个新对象完成主动调用
		var obj = clszz.$new();
		var ret = obj.func2_add_overload(11,22);
		console.log("返回值: " + ret);

		// 第二种方式：搜索内存中已有对象完成主动调用
		Java.choose("cn.gemini.k.fridatest.FridaHook1",{
			onMatch: function(instance){
                console.log("found instance :"+ instance);
                console.log("返回值: "+ instance.func2_add_overload(33,44));
			},
			onComplete: function(){
                console.log("Search Completed!");
			}
		})

		// 主动调用so的native方法
		var str_name_so = "libnative-lib.so";    //要hook的so名
		var str_name_func = "JNI_Frida_Test";    //要hook的方法名
		// 获取方法地址
		var addr_func = Module.findExportByName(str_name_so , str_name_func);
		console.log("func addr is ---" + addr_func);
		//定义NativeFunction 等下要调用
		var func_JNI_Frida_Test = new NativeFunction(addr_func,"void",[]);
		func_JNI_Frida_Test();

'''
jscode = """
Java.perform(function(){
    //hook 单个函数
    var UnityPlayerActivity = Java.use('com.inlinehook.demo.MainActivity')
    UnityPlayerActivity.showText.implementation = function(){
        console.log('onCreate')
        send('aaaa')
    }
    
    //hook 重载函数
    UnityPlayerActivity.showText.overload('java.lang.String').implementation = function(){
        console.log('onCreate')
        send('aaaa')
    }
    
    //hook 构造函数
    UnityPlayerActivity.$init.implementation = function(){
        console.log('onCreate')
        send('aaaa')
    }
    
    //new 对象   Object.$new();
    
    //hook内部类方法/匿名类方法
    
    
});
"""


def message(msg, data):
    if msg['type'] == 'send':
        print('[*]  {0}'.format(msg['payload']))
    else:
        print(msg)


# print(frida.get_local_device())
# print(frida.get_usb_device())
# print(frida.get_remote_device())

# manager = frida.get_device_manager()
# device = manager.add_remote_device(host)
# print(device)
device = frida.get_remote_device()
# processs = device.enumerate_processes()
# print(processs)
front_app = device.get_frontmost_application()
print(front_app)

process = device.attach(front_app.pid)
script = process.create_script(jscode)
script.on('message', message)
script.load()
sys.stdin.read()
