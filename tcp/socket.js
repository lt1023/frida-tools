function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

Java.perform(function () {
    var clszz = Java.use("java.net.InetSocketAddress");
    // console.log(clszz.$init.overloads.length);
    for (var j = 0; j < clszz.$init.overloads.length; j++) {
        clszz.$init.overloads[j].implementation = function () {
            console.log('arguments.length = ' + arguments.length)
            for (var k = 0; k < arguments.length; k++) {
                console.log(k + ":" + arguments[k]);
            }
            showStacks();
            switch (arguments.length) {
                case 0:
                    return this.$init();
                case 1:
                    return this.$init(arguments[0]);
                case 2:
                    return this.$init(arguments[0], arguments[1]);
                case 3:
                    return this.$init(arguments[0], arguments[1], arguments[2]);
                case 4:
                    return this.$init(arguments[0], arguments[1], arguments[2], arguments[3]);
                case 5:
                    return this.$init(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
            }
        }
    }
});
// setImmediate(function () {
//     console.log("[*] Starting script to InetSocketAddress");
//
//
// });