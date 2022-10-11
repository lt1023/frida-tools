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