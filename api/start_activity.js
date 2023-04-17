    var Context = Java.use("android.content.Context");
    Context.startActivity.overload('android.content.Intent').implementation = function (arg1) {
        console.log("---------------------------")
        this.startActivity(arg1);
        console.log("---------------------------")
        showStacks()
    }
    Context.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1,arg2) {
        console.log("---------------------------")
        this.startActivity(arg1,arg2);
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
    Activity.startActivity.overload('android.content.Intent', 'android.os.Bundle').implementation = function (arg1,arg2) {
        console.log("---------------------------")
        this.startActivity(arg1,arg2);
        console.log("---------------------------")
        showStacks()
    }