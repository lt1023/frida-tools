function initLog() {
    var Log = Java.use("android.util.Log");
    Log.w.overload('java.lang.String', 'java.lang.String').implementation = function (tag, message) {
        console.log("Logw:tag=" + tag + "->meesage=" + message);
        showStacks();
        return this.w(tag, message);
    }
}