function initSharedPreferencesEditor() {
    var Editor = Java.use("android.content.SharedPreferences$Editor");
    Editor.putBoolean.implementation = function (key, value) {
        console.log("putBoolean:key=" + key + "->value=" + value);
        showStacks();
        return this.putBoolean(key, value);
    }
    Editor.putFloat.implementation = function (key, value) {
        console.log("putFloat:key=" + key + "->value=" + value);
        showStacks();
        return this.putFloat(key, value);
    }
    Editor.putLong.implementation = function (key, value) {
        console.log("putLong:key=" + key + "->value=" + value);
        showStacks();
        return this.putLong(key, value);
    }
    Editor.putInt.implementation = function (key, value) {
        console.log("putInt:key=" + key + "->value=" + value);
        showStacks();
        return this.putInt(key, value);
    }
    Editor.putStringSet.implementation = function (key, value) {
        console.log("putStringSet:key=" + key + "->value=" + value);
        showStacks();
        return this.putStringSet(key, value);
    }
    Editor.putString.implementation = function (key, value) {
        console.log("putString:key=" + key + "->value=" + value);
        putString();
        return this.putStringSet(key, value);
    }
}
