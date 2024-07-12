function hook_func_from_exports() {
    var add_c_addr = Module.findExportByName("libil2cpp.so", "il2cpp_string_new");
    console.log("il2cpp_string_new is :", add_c_addr);
}