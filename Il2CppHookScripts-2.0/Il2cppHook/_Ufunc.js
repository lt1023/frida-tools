(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./list"), require("./text");

},{"./list":2,"./text":3}],2:[function(require,module,exports){
"use strict";

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../utils/common");

var t = t => ((t = (0, e.PTR2NativePtr)(t)).isNull(), "");

},{"../utils/common":184}],4:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, l) {
  var a, n = arguments.length, i = n < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, s) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, s, l); else for (var r = e.length - 1; r >= 0; r--) (a = e[r]) && (i = (n < 3 ? a(i) : n > 3 ? a(t, s, i) : a(t, s)) || i);
  return n > 3 && i && Object.defineProperty(t, s, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.find_method = exports.HookerBase = void 0;

const t = require("decorator-cache-getter"), s = require("../bridge/fix/il2cppM"), l = require("../utils/alloc"), a = require("./enum"), n = require("../utils/formart");

class i {
  constructor() {}
  static get _list_assemblies() {
    return Il2Cpp.Domain.assemblies;
  }
  static get _list_assemblies_names() {
    return i._list_assemblies.map((e => e.name));
  }
  static get _list_images() {
    return i._list_assemblies.map((e => e.image));
  }
  static get _list_images_pointers() {
    return i._list_images.map((e => e.handle));
  }
  static get _list_images_names() {
    return i._list_assemblies.map((e => e.image.name.split(".dll")[0]));
  }
  static getMapImagesCacheMap=new Map;
  static getMapImages() {
    return 0 != i.getMapImagesCacheMap.size || i._list_images_names.forEach(((e, t) => i.getMapImagesCacheMap.set(e, i._list_images_pointers[t]))), 
    i.getMapImagesCacheMap;
  }
  static get _list_classes() {
    return Il2Cpp.Domain.assemblies.map((e => e.image)).flatMap((e => e.classes));
  }
  static showImages(e = "", t = !0) {
    n.formartClass.printTitile("List Images { assembly -> image -> classCount -> imageName }"), 
    i._list_images.filter((t => "" == e || -1 != t.name.indexOf(e))).sort(((e, s) => t ? e.name.toLowerCase().charAt(0) > s.name.toLowerCase().charAt(0) ? 1 : -1 : 0)).forEach((e => {
      LOGD(`[*] ${e.assembly.handle} -> ${e.handle}\t${e.classCount}\t${e.assembly.name}`);
    })), "" == e && (LOGO(getLine(28)), LOGE(`  List ${i._list_images.length} Images`)), 
    LOGO(getLine(85));
  }
  static showClasses(e, t = "", s = "") {
    let l = new Il2Cpp.Image(ptr(1));
    try {
      if ("string" == typeof e) l = e.startsWith("0x") ? new Il2Cpp.Image(ptr(e.trim())) : Il2Cpp.Domain.assembly(e).image; else {
        if ("number" != typeof e) throw null == arguments[0] ? new Error("imageOrName can not be null") : new Error("imageOrName must be string or number");
        l = new Il2Cpp.Image(ptr(e));
      }
      if (l.handle.equals(1)) throw new Error("image handle can not be null");
    } catch (e) {
      throw LOGE(e), new Error("Il2Cpp.Image can not be found");
    }
    let i = new Map, r = 0, o = 0;
    for (let e = 0; e < l.classes.length; e++) {
      let t = "[*] " + l.classes[e].namespace;
      null == i.get(t) && i.set(t, new Array), i.get(t)?.push(l.classes[e]);
    }
    LOG(`\n Current -> ${l.name} @ ${l.handle}\n`, a.LogColor.C104);
    let c = n.formartClass.printTitileA("List Classes { namespace {classPtr->filedsCount->methodsCount->enumClass->className} }", a.LogColor.C90);
    for (let e of i.keys()) {
      let l = e;
      if (null != l) {
        let e = i.get(l);
        if (-1 == l.toLowerCase().indexOf(t.toLowerCase())) continue;
        ++r, LOGD(`\n${l}`), e?.forEach((e => {
          -1 != e.name.toLowerCase().indexOf(s.toLowerCase()) && (++o, LOGD(`\t[-] ${e.handle} (F:${e.fields.length}/M:${e.methods.length}/E:${Number(e.isEnum)})\t${e.name}`));
        }));
      }
    }
    LOGO("\n" + getLine(28)), "" == t && "" == s ? LOGE(`List ${l.classCount} Classes | Group by ${r} NameSpaces`) : LOGE(`ALl ${l.classCount} Classes | List ${o} Classes | Group by ${r} NameSpaces`), 
    LOGO(getLine(c));
  }
  static checkType(e) {
    let t;
    if (e instanceof NativePointer) t = new Il2Cpp.Class(e); else if ("string" == typeof e) t = new Il2Cpp.Class(findClass(e)); else {
      if ("number" != typeof e) throw "mPtr must be string or number or NativePointer";
      t = new Il2Cpp.Class(ptr(e));
    }
    if (t.handle.equals(ptr(0))) throw "klass handle can not be null";
    return t;
  }
  static showMethods(e, t = !1) {
    let l = i.inputCheck(e);
    if (0 != l.methods.length) if (newLine(), n.formartClass.printTitile(`Found ${l.methods.length} Methods ${l.isEnum ? "(enum) " : ""} in class: ${l.name} @ ${l.handle}`), 
    t) {
      let e = 0;
      l.methods.forEach((t => {
        LOGD(`\n[*] ${t.handle} ---\x3e ${t.virtualAddress} ---\x3e ${t.relativeVirtualAddress}`);
        let l = `\t${(0, s.getMethodDesFromMethodInfo)(t)}`;
        LOGD(l), e = Math.max(e, l.length);
        let a = -1;
        t.parameters.map((e => `\t\t---\x3e args[${++a}]\t${e.type.handle}  <-  ${e.type.name}`)).forEach(LOGZ), 
        LOGZ(`\t\t---\x3e retval\t${t.returnType.class.handle}  <-  ${t.returnType.class.name}`);
      })), newLine(), LOGO(getLine(e));
    } else l.methods.forEach((e => {
      LOGD(`[*] ${e.handle} ---\x3e ${e.virtualAddress} ---\x3e ${e.relativeVirtualAddress}\t|  ${(0, 
      s.getMethodDesFromMethodInfo)(e)}`);
    })), newLine();
  }
  static showFields(e) {
    let t = i.inputCheck(e);
    if (0 == t.fields.length) return LOGZ(`\n${t.toString()}`), void LOGE(`\n[!] ${t.assemblyName}.${t.namespace}.${t.name} @ ${t.handle} has no fields\n`);
    n.formartClass.printTitile(`Found ${t.fields.length} Fields ${t.isEnum ? "(enum) " : ""}in class: ${t.name} (${t.handle})`), 
    t.fields.forEach((e => {
      LOGD(`[*] ${e.handle} ${e.type.name} ${e.toString()} [type:${e.type.class.handle}]`);
    })), LOGO("");
  }
  static inputCheck(e) {
    let t;
    if (e instanceof NativePointer) t = i.checkType(e); else if ("string" == typeof e) t = i.checkType(e.trim()); else {
      if ("number" != typeof e) throw "mPtr must be string('0x...') or NativePointer";
      if (String(e).length > 18 && "arm64" == Process.arch) throw "please use '0x...' instead of number";
      t = i.checkType(ptr(e));
    }
    return t;
  }
  static map_cache_class=new Map;
  static findClass(e, t = [ "Assembly-CSharp", "MaxSdk.Scripts", "mscorlib" ], s = !0) {
    if (null == e) throw "Search name can not be null or undefined";
    if ("string" != typeof e) throw "findClass need a string value";
    if (s) {
      let t = i.map_cache_class.get(e);
      if (null != t) return t.handle;
    }
    let l = Il2Cpp.Domain.assemblies;
    for (let e = 0; e < l.length; e++) if (t.includes(l[e].name)) {
      let t = a(l[e].image.classes);
      if (null != t) return t.handle;
    }
    for (let e = 0; e < l.length; e++) if (!t.includes(l[e].name)) {
      let t = a(l[e].image.classes);
      if (null != t) return t.handle;
    }
    function a(t) {
      for (let s = 0; s < t.length; s++) if (t[s].name == e) return i.map_cache_class.set(e, t[s]), 
      t[s];
    }
    return ptr(0);
  }
  static findMethodNew(e, t, s, l = -1, a = [], n = !0) {
    let r;
    if (null != arguments[3] && "number" == typeof arguments[3]) try {
      r = Il2Cpp.Domain.assembly(e).image.class(t).method(s, l), 0 != a.length && (r = r?.overload(...a));
    } catch {
      throw new Error(`findMethod failed: Not Found ${s}(argCount:${l}) in ${t}`);
    } else if (null != arguments[1]) r = new Il2Cpp.Class(findClass(arguments[1])).method(arguments[0], arguments[2]); else if (null != arguments[0] && null == arguments[1]) for (let e = 0; e < i._list_classes.length; e++) for (let t = 0; t < i._list_classes[e].methods.length; t++) if (i._list_classes[e].methods[t] == arguments[0]) {
      r = i._list_classes[e].methods[t];
      break;
    }
    if (null == r) throw new Error("Method not found");
    if (!n) return r;
    showMethodInfo(r.handle);
  }
  static findMethodsyncCacheMap=new Map;
  static findMethodSync(e, t, n, r = -1, o = !0, c = !0) {
    if (null == e || null == t || null == n) return ptr(0);
    const p = Il2Cpp.module.base;
    let m = e + "." + t + "." + n + "." + r;
    if (o) {
      let e = i.findMethodsyncCacheMap.get(m);
      if (null != e) return e;
    }
    let d = Il2Cpp.Domain.assembly(e).image.handle, h = Il2Cpp.Api._classFromName(d, (0, 
    l.allocCStr)(e), (0, l.allocCStr)(t));
    if (h.isNull()) for (let e = 0; e < Il2Cpp.Api._imageGetClassCount(d); e++) {
      let s = new Il2Cpp.Class(Il2Cpp.Api._imageGetClass(d, e));
      if (s.name == t) {
        h = s.handle;
        break;
      }
    }
    if (h.isNull()) return ptr(0);
    let u = Il2Cpp.Api._classGetMethodFromName(h, (0, l.allocCStr)(n), r);
    if (u.isNull()) return ptr(0);
    if (null != arguments[5] && 2 != arguments[5]) return u;
    if (null != arguments[5] && 2 == arguments[5]) return u.readPointer().sub(p);
    if (i.findMethodsyncCacheMap.set(m, u.readPointer()), o) return o ? u.readPointer() : u.readPointer().sub(p);
    let f = new Il2Cpp.Method(u), g = f.parameterCount, C = new Array, _ = new Array;
    for (let e = 0; e < g; e++) {
      let t = f.parameters[e], s = t.type.class.handle, l = t.type.class.name;
      C.push(l + " " + t.name), _.push(l + " " + s);
    }
    let L = (0, s.getMethodModifier)(u) + f.returnType.name + " " + f.name + " (" + C + ")\t";
    LOGO(getLine(85)), LOG(e + "." + t + "\t" + L, a.LogColor.RED), LOGO(getLine(30));
    LOG("Il2CppImage\t----\x3e\t" + d), LOG("Il2CppClass\t----\x3e\t" + h), LOG("MethodInfo\t----\x3e\t" + u), 
    LOGD("methodPointer\t----\x3e\t" + u.readPointer() + "\t===>\t" + u.readPointer().sub(p)), 
    LOGO(getLine(85));
  }
  static listFieldsFromCls(e, t) {
    if (null == e || null == e) return;
    "number" == typeof e && (e = ptr(e)), "number" == typeof t && (t = ptr(t));
    let s = new Il2Cpp.Class(e), n = s.fields.length;
    if (n <= 0) return;
    let i = s.isEnum;
    null == arguments[2] && LOGH("\nFound " + n + " Fields" + (i ? "(enum)" : "") + " in class: " + s.name + " (" + e + ")");
    let o = alloc(), c = null, p = 0, m = new Array, d = 0;
    for (;(c = Il2Cpp.Api._classGetFields(e, o)) && !c.isNull(); ) {
      let s = c.readPointer().readCString(), l = c.add(p_size).readPointer(), a = "0x" + c.add(3 * p_size).readInt().toString(16), n = Il2Cpp.Api._classFromType(l), r = new Il2Cpp.Class(n).name, o = h(l);
      o = o.substring(0, o.length - 1);
      let u = a + "\t" + o + "\t" + r + "\t" + n + "\t" + s + "\t" + (i && String(n) == String(e) ? d++ + "\t" : " ");
      if ("1" == arguments[2] && s == arguments[3]) return ptr(a);
      if ("2" == arguments[2] && s == arguments[3]) {
        return [ s, a, n, r, t.isNull() ? ptr(0) : t.add(ptr(a)), t.isNull() ? ptr(0) : t.add(ptr(a)).readPointer() ];
      }
      m.push(u), p = u.length < p ? p : u.length;
    }
    if (null != arguments[2]) return ptr(0);
    function h(e) {
      let t = e.add(p_size).readPointer(), s = "";
      switch (Number(t) & a.FieldAccess.FIELD_ATTRIBUTE_FIELD_ACCESS_MASK) {
       case a.FieldAccess.FIELD_ATTRIBUTE_PRIVATE:
        s += "private ";
        break;

       case a.FieldAccess.FIELD_ATTRIBUTE_PUBLIC:
        s += "public ";
        break;

       case a.FieldAccess.FIELD_ATTRIBUTE_FAMILY:
        s += "protected ";
        break;

       case a.FieldAccess.FIELD_ATTRIBUTE_ASSEMBLY:
       case a.FieldAccess.FIELD_ATTRIBUTE_FAM_AND_ASSEM:
        s += "internal ";
        break;

       case a.FieldAccess.FIELD_ATTRIBUTE_FAM_OR_ASSEM:
        s += "protected internal ";
      }
      return Number(t) & a.FieldAccess.FIELD_ATTRIBUTE_LITERAL ? s += "const " : (Number(t) & a.FieldAccess.FIELD_ATTRIBUTE_STATIC && (s += "static "), 
      Number(t) & a.FieldAccess.FIELD_ATTRIBUTE_INIT_ONLY && (s += "readonly ")), s;
    }
    LOGO("\n" + getLine(p + 5)), m.sort(((e, t) => parseInt(e.split("\t")[0]) - parseInt(t.split("\t")[0]))).forEach(((e, s) => {
      let n = e.split("\t"), i = n[2], o = String("[" + s + "]"), c = 3 == o.length ? " " : "", p = 1 == String(n[5]).length ? String(n[5] + " ") : String(n[5]);
      if (LOG(o + c + " " + n[0] + " " + n[1] + " " + n[2] + "(" + n[3] + ") " + p + " " + n[4], a.LogColor.C36), 
      "number" == typeof t && (t = ptr(t)), null != t && -1 == e.indexOf("static")) {
        let e = t.add(n[0]).readPointer(), s = r(i, e, n[3]);
        if ("Boolean" == i) {
          String(e).substr(0, 2), String(e).substr(String(e).length - 2, String(e).length).replace("x", "0"), 
          getLine(("arm" == Process.arch ? 10 : 14) - 2 - 2, ".");
        }
        LOG("\t" + s + "\n", a.LogColor.C90);
      } else if (-1 != e.indexOf("static")) {
        let e = Il2Cpp.Api._classGetFieldFromName(ptr(n[3]), (0, l.allocCStr)(n[4]));
        if (!e.isNull()) {
          let t = alloc();
          Il2Cpp.Api._fieldGetStaticValue(e, t);
          let s = t.readPointer();
          LOG("\t" + t + " ---\x3e " + s + " ---\x3e " + r(i, s, n[3]), a.LogColor.C90);
        }
        LOG("\n");
      }
    })), LOGO(getLine(p + 5));
  }
}

function r(...e) {}

e([ t.cache ], i, "_list_assemblies", null), e([ t.cache ], i, "_list_assemblies_names", null), 
e([ t.cache ], i, "_list_images", null), e([ t.cache ], i, "_list_images_pointers", null), 
e([ t.cache ], i, "_list_images_names", null), e([ t.cache ], i, "_list_classes", null), 
exports.HookerBase = i;

const o = i.findMethodSync;

exports.find_method = o, Reflect.set(globalThis, "Hooker", i), globalThis.i = i.showImages, 
globalThis.c = i.showClasses, globalThis.m = i.showMethods, globalThis.f = i.showFields, 
globalThis.F = i.listFieldsFromCls, globalThis.fc = i.findClass, globalThis.findClass = i.findClass, 
globalThis.findMethod = i.findMethodNew, globalThis.find_method = i.findMethodSync, 
globalThis.af = e => B(findClass(e)), globalThis.aui = () => B("AUI"), Il2Cpp.perform((() => globalThis.soAddr = Il2Cpp.module.base));

},{"../bridge/fix/il2cppM":18,"../utils/alloc":180,"../utils/formart":186,"./enum":6,"decorator-cache-getter":193}],5:[function(require,module,exports){
"use strict";

var e = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Breaker = void 0;

const t = require("../bridge/fix/il2cppM"), a = require("fastest-levenshtein"), r = require("../utils/formart"), s = require("./base"), i = e(require("./valueResolve"));

var l = [ "Assembly-CSharp", "MaxSdk.Scripts", "Game", "Zenject", "UniRx", "Purchasing.Common", "UnityEngine.Purchasing" ];

class n {
  static maxCallTimes=10;
  static detachTimes=500;
  static map_attachedMethodInfos=new Map;
  static map_methodInfo_callTimes=new Map;
  static array_methodInfo_detached=new Array;
  static array_attach_failed=new Array;
  static array_methodValue_cache=new Array;
  static addBreakPoint(e = "CommonClass") {
    if (e instanceof NativePointer) t(e); else if ("number" == typeof e) {
      if ("arm64" == Process.arch) throw new Error("Use '0x..' instead of number");
      t(ptr(e));
    } else if ("string" == typeof e) {
      if ("arm64" == Process.arch && e.trim().startsWith("0x")) return t(ptr(e));
      if ("CommonClass" == e || "JNI" == e || "Soon" == e) return function(e) {
        if ("CommonClass" == e) s.HookerBase._list_images.forEach((e => {
          l.includes(e.assembly.name) && (r.formartClass.printTitile("Found : ImageName: " + e.name + " at " + e.handle), 
          t(e.handle));
        })); else if ("JNI" == e) {
          let e = Il2Cpp.Domain.assembly("UnityEngine.AndroidJNIModule").image.class("UnityEngine.AndroidJNI");
          if (e.isNull()) throw new Error("can't find class UnityEngine.AndroidJNI");
          r.formartClass.printTitile("Found : ClassName: " + e.name + " at " + e.handle), 
          t(e.handle);
        } else t(Il2Cpp.Domain.assembly("Assembly-CSharp").image.handle), setTimeout((() => h("Update")), 3e3);
      }(e);
      if (s.HookerBase._list_images_names.toString().includes(e)) s.HookerBase._list_images.forEach((a => {
        a.name.includes(e) && (r.formartClass.printTitile("Found : ImageName: " + e + " at " + a.handle), 
        t(a.handle));
      })); else {
        let i = findClass(e);
        if (i.isNull()) {
          let t = (0, a.closest)(e, s.HookerBase._list_images_names);
          LOGE(`You mean this ? ${t} @ ${Il2Cpp.Domain.assemblies.filter((e => e.name.includes))[0].handle}`);
        } else r.formartClass.printTitile("Found : ClassName: " + e + " at " + i), t(i);
      }
    }
    function t(e) {
      let t = n.map_attachedMethodInfos.size;
      if (e.isNull()) throw new Error("can't attach nullptr");
      if (s.HookerBase._list_images_pointers.map((e => Number(e))).includes(Number(e))) {
        let t = e;
        new Il2Cpp.Image(t).classes.flatMap((e => e.methods)).forEach(n.attachMethod);
      } else {
        let t = e;
        new Il2Cpp.Class(t).methods.forEach(n.attachMethod);
      }
      LOGO(`${getLine(40, "-")}\n Attached ${n.map_attachedMethodInfos.size - t} methods / All ${n.map_attachedMethodInfos.size} methods\n${getLine(85, "-")}`);
    }
  }
  static attachMethod(e) {
    !function(e, a = "all") {
      if ("all" == a) (0, t.getMethodModifier)(e).includes("abstract") || e.virtualAddress.isNull() || n.attachMethodInfo(e); else {
        if (!(0, t.getMethodModifier)(e).includes(a)) return;
        e.virtualAddress.isNull() || n.attachMethodInfo(e);
      }
    }(e);
  }
  static callTimesInline=0;
  static attachMethodInfo(e, a = !1) {
    if (e.virtualAddress.isNull()) LOGE((0, t.methodToString)(e)); else if (!n.map_attachedMethodInfos.has(e)) try {
      let s = Interceptor.attach(e.virtualAddress, {
        onEnter: function(s) {
          if (n.needShowLOG(e, "onEnter")) {
            if (!a) {
              let t = `[${++n.callTimesInline}|${(new Date).toLocaleTimeString().split(" ")[0]}]`;
              return this.passValue = new i.default(t, e).setArgs(s), LOGD(this.passValue.toString());
            }
            {
              let a = [];
              if (e.isStatic) for (let t = 0; t < e.parameterCount; ++t) {
                let l = `  arg${t}  | `, n = `${r.formartClass.alignStr(`${e.parameters[t - 1].name}`, 10)}\t---\x3e\t\t${r.formartClass.getPtrFormart(s[t])}\t\t`, o = `${e.parameters[t].type.name} (${e.parameters[t].type.class.handle})\t `, h = `${i.default.fakeValue(s[t], e.parameters[t].type, e)}`;
                a[a.length] = `${l}${n}${o}${h}`;
              } else {
                a[0] = `  inst\t| \t\t\t\t${s[0]}\t\t[ ${i.default.fakeValue(s[0], new Il2Cpp.Type(ptr(1)), e)} ] ( ${e.class.handle} )`;
                for (let t = 1; t < e.parameterCount + 1; ++t) {
                  let l = `  arg${t}  | `, n = `${r.formartClass.alignStr(`${e.parameters[t - 1].name}`, 10)}\t---\x3e\t\t${r.formartClass.getPtrFormart(s[t])}\t\t`, o = `${e.parameters[t - 1].type.name} (${e.parameters[t - 1].type.class.handle})`, h = `\t ${i.default.fakeValue(s[t], e.parameters[t - 1].type, e)}`;
                  a[a.length] = `${l}${n}${o}${h}`;
                }
              }
              this.content = a;
              let l = `${`${e.class.namespace}.${e.class.name}`} | ${(0, t.methodToString)(e, !0)}\t [${e.handle} -> ${e.virtualAddress} -> ${e.relativeVirtualAddress}] | ${(new Date).toLocaleTimeString().split(" ")[0]}`;
              this.disp_title = l;
            }
          }
        },
        onLeave: function(t) {
          if (!n.needShowLOG(e, "onLeave")) return;
          if (a || null == this.passValue || n.array_methodValue_cache.push(this.passValue.setRetval(t)), 
          null == this.content || null == this.disp_title) return;
          let s = `\t\t\t\t${r.formartClass.getPtrFormart(t)}\t\t`, l = `${e.returnType.name} (${e.returnType.class.handle})\t `, o = `${new i.default("", e).setRetval(t).resolve(-1)}`;
          this.content[this.content.length] = `  ret\t| ${s}${l}${o}`;
          let h = Math.max(...this.content.map((e => e.length)), this.disp_title.length) + 6;
          LOGO(`\n${getLine(h)}`), LOGD(this.disp_title), LOGO(getLine(this.disp_title.length / 3)), 
          this.content.forEach(LOGD), LOGO(getLine(h));
        }
      });
      LOGD((0, t.methodToString)(e)), n.map_attachedMethodInfos.set(e, s);
    } catch {
      !function(e) {
        if (LOGE((0, t.methodToString)(e)), "arm" == Process.arch) {
          let t = e.virtualAddress.readPointer();
          null != t && t.equals(3778019102) && a(t);
        } else if ("arm64" == Process.arch) {
          let t = e.virtualAddress.readPointer();
          null != t && t.equals(3221446614) && a(t);
        } else n.array_attach_failed.push(e), printCtx(e.relativeVirtualAddress, 1, 1, LogColor.WHITE, 1);
        function a(t, a = "\tMethod null implementation or attach by other intercepter") {
          LOGE(`\t${e.virtualAddress} -> ${t} -> ${t.toMatchPattern()} `), LOGE(a);
        }
      }(e);
    }
  }
  static needShowLOG=(e, t = "onEnter") => {
    if (e instanceof Il2Cpp.Method) {
      n.map_methodInfo_callTimes.has(e) || n.map_methodInfo_callTimes.set(e, 0);
      let a = n.map_methodInfo_callTimes.get(e);
      return null == a && (a = 0), a >= n.detachTimes && (n.map_attachedMethodInfos.get(e).detach(), 
      n.array_methodInfo_detached.push(e)), "onEnter" === t && n.map_methodInfo_callTimes.set(e, a + 1), 
      a < n.maxCallTimes;
    }
    throw new Error("method must be Il2Cpp.Method");
  };
  static breakWithArgs=(e, t = 4) => {
    e = checkPointer(e), Interceptor.attach(e, {
      onEnter(a) {
        LOGO("\n" + getLine(65)), LOGH("Called from " + e + " ---\x3e " + e.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context)) + "\n");
        let r = String(a[0]);
        for (let e = 1; e < t; ++e) r += "\t" + a[e];
        LOGD(r);
      },
      onLeave(e) {
        LOGD("End Function return ---\x3e " + e);
      }
    });
  };
  static breakWithStack=e => {
    e = checkPointer(e), Interceptor.attach(e, {
      onEnter(t) {
        LOGO("\n" + getLine(65)), LOGH("Called from " + e + " ---\x3e " + e.sub(soAddr) + "\t|  LR : " + checkCtx(getPlatformCtx(this.context)) + "\n"), 
        PrintStackTraceN(this.context), LOGO("\n" + getLine(65));
      }
    });
  };
  static breakInline=(e, t) => {
    e = checkPointer(e), Interceptor.attach(e, {
      onEnter(a) {
        LOGO("\n" + getLine(65)), LOGH("Called from " + e + " ---\x3e " + e.sub(soAddr) + "\n"), 
        LOGD(JSON.stringify(this.context)), null != t && t(this);
      }
    });
  };
  static clearBreak=() => {
    d(), n.map_attachedMethodInfos.clear(), n.map_methodInfo_callTimes.clear(), n.array_methodInfo_detached = [];
  };
  static clearBreakAll=() => {
    n.clearBreak(), n.array_methodValue_cache = [], n.array_attach_failed = [];
  };
  static printDesertedMethods=(e = "") => {
    if (0 == n.map_methodInfo_callTimes.size) return;
    let t = `${getLine(20)} detached methods ${getLine(20)}`, a = 0;
    LOG(`${t}`, LogColor.C92), n.map_methodInfo_callTimes.forEach(((t, r) => {
      if (t >= n.maxCallTimes && ("" == e || -1 != r.name.indexOf(e))) {
        let e = methodToArray(r), t = this.map_methodInfo_callTimes.get(r);
        ++a, LOGD(`[*] ${e[0]} ---\x3e ${e[1]} ${e[2]}\t\t${t}\t${e[3]}`);
      }
    })), LOG(`${getLine(20)}`, LogColor.C92), LOGD(` ${n.map_attachedMethodInfos.size} attached / ${n.array_methodInfo_detached.length} detached / ${a} hidden`), 
    LOG(getLine(t.length), LogColor.C92);
  };
  static printHistoryLog=(e = "", t = 50, a = !1, r = !0) => {
    r && D(), "number" == typeof e && (t = e, e = "");
    let s = n.array_methodValue_cache.map((e => e.toString())).filter((t => t.includes(e))).slice(0, t);
    a && s.reverse(), s.forEach(LOGD);
  };
  static printHistoryNum=(e = 0, t = 100, a = !1) => {
    a && D(), n.array_methodValue_cache.slice(e, t).forEach(LOGD);
  };
}

exports.Breaker = n, globalThis.getPlatform = () => "linux" == Process.platform && 4 == Process.pageSize ? "arm" : "arm64", 
globalThis.getPlatformCtx = e => (getPlatform(), e), globalThis.maxCallTimes = n.maxCallTimes, 
globalThis.D = n.clearBreak, globalThis.DD = n.clearBreakAll, globalThis.B = n.addBreakPoint, 
globalThis.h = n.printHistoryLog, globalThis.hn = n.printHistoryNum, globalThis.breakWithArgs = n.breakWithArgs, 
globalThis.breakWithStack = n.breakWithStack, globalThis.breakInline = n.breakInline, 
globalThis.b = e => {
  if ("number" == typeof e) if ("arm" == Process.arch) e = ptr(e); else {
    if ("arm64" == Process.arch) throw new Error("Not support parameter typed number at arm64");
    e = ptr(e);
  } else if ("string" == typeof e) {
    if (!(e = e.trim()).startsWith("0x")) throw new Error("Only support String format (like '0x...')");
    e = ptr(e);
  }
  try {
    if (new Il2Cpp.Method(e).name, e instanceof Il2Cpp.Method) return n.attachMethodInfo(e, !0);
    n.attachMethodInfo(new Il2Cpp.Method(e), !0);
  } catch (t) {
    n.breakWithArgs(e);
  }
}, globalThis.printDesertedMethods = n.printDesertedMethods, globalThis.BF = e => {
  "string" == typeof e && (DD(), s.HookerBase._list_images.forEach((t => {
    l.includes(t.assembly.name) && t.classes.flatMap((e => e.methods)).forEach((t => {
      -1 != t.name.indexOf(e) && n.attachMethodInfo(t, !1);
    }));
  })));
};

},{"../bridge/fix/il2cppM":18,"../utils/formart":186,"./base":4,"./valueResolve":11,"fastest-levenshtein":194}],6:[function(require,module,exports){
"use strict";

var _, T, e, E, t, A, a, I, p;

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ADS_TYPE = exports.LogColor = exports.FieldAccess = exports.il2cppTabledefs = exports.ArrKAY = exports.MapKAY = exports.GKEY = exports.EpFunc = exports.TYPE_STR = void 0, 
function(_) {
  _[_.U_STR = 0] = "U_STR", _[_.C_STR = 1] = "C_STR";
}(_ = exports.TYPE_STR || (exports.TYPE_STR = {})), function(_) {
  _[_.il2cpp_get_corlib = 0] = "il2cpp_get_corlib", _[_.il2cpp_domain_get = 1] = "il2cpp_domain_get", 
  _[_.il2cpp_domain_get_assemblies = 2] = "il2cpp_domain_get_assemblies", _[_.il2cpp_assembly_get_image = 3] = "il2cpp_assembly_get_image", 
  _[_.il2cpp_image_get_class_count = 4] = "il2cpp_image_get_class_count", _[_.il2cpp_image_get_class = 5] = "il2cpp_image_get_class", 
  _[_.il2cpp_class_get_methods = 6] = "il2cpp_class_get_methods", _[_.il2cpp_class_from_type = 7] = "il2cpp_class_from_type", 
  _[_.il2cpp_class_get_type = 8] = "il2cpp_class_get_type", _[_.il2cpp_class_from_system_type = 9] = "il2cpp_class_from_system_type", 
  _[_.il2cpp_class_from_name = 10] = "il2cpp_class_from_name", _[_.il2cpp_class_get_method_from_name = 11] = "il2cpp_class_get_method_from_name", 
  _[_.il2cpp_string_new = 12] = "il2cpp_string_new", _[_.il2cpp_type_get_name = 13] = "il2cpp_type_get_name", 
  _[_.il2cpp_type_get_class_or_element_class = 14] = "il2cpp_type_get_class_or_element_class", 
  _[_.il2cpp_class_get_field_from_name = 15] = "il2cpp_class_get_field_from_name", 
  _[_.il2cpp_class_num_fields = 16] = "il2cpp_class_num_fields", _[_.il2cpp_class_get_fields = 17] = "il2cpp_class_get_fields", 
  _[_.il2cpp_field_static_get_value = 18] = "il2cpp_field_static_get_value", _[_.il2cpp_field_static_set_value = 19] = "il2cpp_field_static_set_value", 
  _[_.getName = 20] = "getName", _[_.getLayer = 21] = "getLayer", _[_.getTransform = 22] = "getTransform", 
  _[_.getParent = 23] = "getParent", _[_.getChildCount = 24] = "getChildCount", _[_.getChild = 25] = "getChild", 
  _[_.get_pointerEnter = 26] = "get_pointerEnter", _[_.pthread_create = 27] = "pthread_create", 
  _[_.getpid = 28] = "getpid", _[_.gettid = 29] = "gettid", _[_.sleep = 30] = "sleep", 
  _[_.DecodeJObject = 31] = "DecodeJObject", _[_.GetDescriptor = 32] = "GetDescriptor", 
  _[_.ArtCurrent = 33] = "ArtCurrent", _[_.newThreadCallBack = 34] = "newThreadCallBack";
}(T = exports.EpFunc || (exports.EpFunc = {})), function(_) {
  _[_.soName = 0] = "soName", _[_.soAddr = 1] = "soAddr", _[_.p_size = 2] = "p_size", 
  _[_.lastTime = 3] = "lastTime", _[_.LogFlag = 4] = "LogFlag", _[_.count_method_times = 5] = "count_method_times", 
  _[_.maxCallTime = 6] = "maxCallTime", _[_.LshowLOG = 7] = "LshowLOG", _[_.newThreadDelay = 8] = "newThreadDelay", 
  _[_.frida_env = 9] = "frida_env";
}(e = exports.GKEY || (exports.GKEY = {})), function(_) {
  _[_.map_attach_listener = 0] = "map_attach_listener", _[_.map_find_class_cache = 1] = "map_find_class_cache", 
  _[_.map_find_method_cache = 2] = "map_find_method_cache", _[_.outFilterMap = 3] = "outFilterMap", 
  _[_.CommonCache = 4] = "CommonCache";
}(E = exports.MapKAY || (exports.MapKAY = {})), function(_) {
  _[_.arr_img_addr = 0] = "arr_img_addr", _[_.arr_img_names = 1] = "arr_img_names", 
  _[_.findClassCache = 2] = "findClassCache", _[_.arr_nop_addr = 3] = "arr_nop_addr", 
  _[_.arr_runtimeType = 4] = "arr_runtimeType", _[_.findMethodArray = 5] = "findMethodArray", 
  _[_.t_arrayAddr = 6] = "t_arrayAddr", _[_.filterClass = 7] = "filterClass", _[_.arrMethodInfo = 8] = "arrMethodInfo", 
  _[_.arrayAddr = 9] = "arrayAddr", _[_.arrayName = 10] = "arrayName";
}(t = exports.ArrKAY || (exports.ArrKAY = {})), function(_) {
  _[_.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK = 7] = "METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK", 
  _[_.METHOD_ATTRIBUTE_COMPILER_CONTROLLED = 0] = "METHOD_ATTRIBUTE_COMPILER_CONTROLLED", 
  _[_.METHOD_ATTRIBUTE_PRIVATE = 1] = "METHOD_ATTRIBUTE_PRIVATE", _[_.METHOD_ATTRIBUTE_FAM_AND_ASSEM = 2] = "METHOD_ATTRIBUTE_FAM_AND_ASSEM", 
  _[_.METHOD_ATTRIBUTE_ASSEM = 3] = "METHOD_ATTRIBUTE_ASSEM", _[_.METHOD_ATTRIBUTE_FAMILY = 4] = "METHOD_ATTRIBUTE_FAMILY", 
  _[_.METHOD_ATTRIBUTE_FAM_OR_ASSEM = 5] = "METHOD_ATTRIBUTE_FAM_OR_ASSEM", _[_.METHOD_ATTRIBUTE_PUBLIC = 6] = "METHOD_ATTRIBUTE_PUBLIC", 
  _[_.METHOD_ATTRIBUTE_STATIC = 16] = "METHOD_ATTRIBUTE_STATIC", _[_.METHOD_ATTRIBUTE_FINAL = 32] = "METHOD_ATTRIBUTE_FINAL", 
  _[_.METHOD_ATTRIBUTE_VIRTUAL = 64] = "METHOD_ATTRIBUTE_VIRTUAL", _[_.METHOD_ATTRIBUTE_ABSTRACT = 1024] = "METHOD_ATTRIBUTE_ABSTRACT", 
  _[_.METHOD_ATTRIBUTE_PINVOKE_IMPL = 8192] = "METHOD_ATTRIBUTE_PINVOKE_IMPL", _[_.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK = 256] = "METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK", 
  _[_.METHOD_ATTRIBUTE_REUSE_SLOT = 0] = "METHOD_ATTRIBUTE_REUSE_SLOT", _[_.METHOD_ATTRIBUTE_NEW_SLOT = 256] = "METHOD_ATTRIBUTE_NEW_SLOT";
}(A = exports.il2cppTabledefs || (exports.il2cppTabledefs = {})), function(_) {
  _[_.FIELD_ATTRIBUTE_FIELD_ACCESS_MASK = 7] = "FIELD_ATTRIBUTE_FIELD_ACCESS_MASK", 
  _[_.FIELD_ATTRIBUTE_COMPILER_CONTROLLED = 0] = "FIELD_ATTRIBUTE_COMPILER_CONTROLLED", 
  _[_.FIELD_ATTRIBUTE_PRIVATE = 1] = "FIELD_ATTRIBUTE_PRIVATE", _[_.FIELD_ATTRIBUTE_FAM_AND_ASSEM = 2] = "FIELD_ATTRIBUTE_FAM_AND_ASSEM", 
  _[_.FIELD_ATTRIBUTE_ASSEMBLY = 3] = "FIELD_ATTRIBUTE_ASSEMBLY", _[_.FIELD_ATTRIBUTE_FAMILY = 4] = "FIELD_ATTRIBUTE_FAMILY", 
  _[_.FIELD_ATTRIBUTE_FAM_OR_ASSEM = 5] = "FIELD_ATTRIBUTE_FAM_OR_ASSEM", _[_.FIELD_ATTRIBUTE_PUBLIC = 6] = "FIELD_ATTRIBUTE_PUBLIC", 
  _[_.FIELD_ATTRIBUTE_STATIC = 16] = "FIELD_ATTRIBUTE_STATIC", _[_.FIELD_ATTRIBUTE_INIT_ONLY = 32] = "FIELD_ATTRIBUTE_INIT_ONLY", 
  _[_.FIELD_ATTRIBUTE_LITERAL = 64] = "FIELD_ATTRIBUTE_LITERAL", _[_.FIELD_ATTRIBUTE_NOT_SERIALIZED = 128] = "FIELD_ATTRIBUTE_NOT_SERIALIZED", 
  _[_.FIELD_ATTRIBUTE_SPECIAL_NAME = 512] = "FIELD_ATTRIBUTE_SPECIAL_NAME", _[_.FIELD_ATTRIBUTE_PINVOKE_IMPL = 8192] = "FIELD_ATTRIBUTE_PINVOKE_IMPL", 
  _[_.FIELD_ATTRIBUTE_RESERVED_MASK = 38144] = "FIELD_ATTRIBUTE_RESERVED_MASK", _[_.FIELD_ATTRIBUTE_RT_SPECIAL_NAME = 1024] = "FIELD_ATTRIBUTE_RT_SPECIAL_NAME", 
  _[_.FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL = 4096] = "FIELD_ATTRIBUTE_HAS_FIELD_MARSHAL", 
  _[_.FIELD_ATTRIBUTE_HAS_DEFAULT = 32768] = "FIELD_ATTRIBUTE_HAS_DEFAULT", _[_.FIELD_ATTRIBUTE_HAS_FIELD_RVA = 256] = "FIELD_ATTRIBUTE_HAS_FIELD_RVA";
}(a = exports.FieldAccess || (exports.FieldAccess = {})), function(_) {
  _[_.WHITE = 0] = "WHITE", _[_.RED = 1] = "RED", _[_.YELLOW = 3] = "YELLOW", _[_.C31 = 31] = "C31", 
  _[_.C32 = 32] = "C32", _[_.C33 = 33] = "C33", _[_.C34 = 34] = "C34", _[_.C35 = 35] = "C35", 
  _[_.C36 = 36] = "C36", _[_.C41 = 41] = "C41", _[_.C42 = 42] = "C42", _[_.C43 = 43] = "C43", 
  _[_.C44 = 44] = "C44", _[_.C45 = 45] = "C45", _[_.C46 = 46] = "C46", _[_.C90 = 90] = "C90", 
  _[_.C91 = 91] = "C91", _[_.C92 = 92] = "C92", _[_.C93 = 93] = "C93", _[_.C94 = 94] = "C94", 
  _[_.C95 = 95] = "C95", _[_.C96 = 96] = "C96", _[_.C97 = 97] = "C97", _[_.C100 = 100] = "C100", 
  _[_.C101 = 101] = "C101", _[_.C102 = 102] = "C102", _[_.C103 = 103] = "C103", _[_.C104 = 104] = "C104", 
  _[_.C105 = 105] = "C105", _[_.C106 = 106] = "C106", _[_.C107 = 107] = "C107";
}(I = exports.LogColor || (exports.LogColor = {})), function(_) {
  _[_.IronSource = 0] = "IronSource", _[_.MaxSdkCallbacks = 1] = "MaxSdkCallbacks", 
  _[_.MoPubManager = 2] = "MoPubManager", _[_.TTPluginsGameObject = 3] = "TTPluginsGameObject";
}(p = exports.ADS_TYPE || (exports.ADS_TYPE = {})), NativePointer.prototype.callFunction = function(..._) {
  return ptr(1);
}, Object.defineProperty(NativePointer.prototype, "callFunction", {
  value: function(..._) {
    return ptr(2);
  }
});

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../utils/formart");

let t, r;

function s(e, t = !1) {
  1 == t ? LOGD(`\n[${++r}]\t${e.name}`) : LOGD(`\n[*]\t${e.name}`);
  let s = o(e.path), n = 0 == s ? "" : `| FILE: ${ptr(s)} ( ${s} B )`, a = Math.round(e.size / 1024 / 1024 * 100) / 100;
  LOGZ(`\t${e.base} - ${e.base.add(e.size)}  | MEM: ${ptr(e.size)} ( ${e.size} B = ${e.size / 1024} KB ≈ ${a} MB ) ${n}`), 
  LOGZ(`\t${e.path}\n`);
}

globalThis.protect = (e, t = 4096, r = "rwx") => {
  e = checkPointer(e).shr(12).shl(12), Memory.protect(e, t, r);
}, globalThis.watch = (e, t = 16) => {
  class r {
    operation;
    from;
    address;
    rangeIndex;
    pageIndex;
    pagesCompleted;
    pagesTotal;
    mdFrom;
    mdAddress;
    constructor(e) {
      this.operation = e.operation, this.from = e.from, this.address = e.address, this.rangeIndex = e.rangeIndex, 
      this.pageIndex = e.pageIndex, this.pagesCompleted = e.pagesCompleted, this.pagesTotal = e.pagesTotal, 
      this.mdAddress = Process.findModuleByAddress(this.address), this.mdFrom = Process.findModuleByAddress(this.from);
    }
    tostring() {
      return `\noperation:\t\t${this.operation}\nfrom:\t\t\t${this.from} { ${this.from.sub(this.mdFrom.base)} @ ${this.mdFrom.name} }\naddress:\t\t${this.address} { ${this.address.sub(this.mdAddress.base)} @ ${this.mdAddress.name} }\nrangeIndex:\t\t${this.rangeIndex}\npageIndex:\t\t${this.pageIndex}\npagesCompleted:\t\t${this.pagesCompleted}\npagesTotal:\t\t${this.pagesTotal}`;
    }
  }
  MemoryAccessMonitor.enable(new class {
    base;
    size;
    constructor(e, t) {
      this.base = checkPointer(e), this.size = t;
    }
  }(e, t), {
    onAccess: e => LOGD(new r(e).tostring())
  });
}, globalThis.watchDisabled = () => MemoryAccessMonitor.disable(), globalThis.sqliteTest = () => {
  var e, t, r, s;
  for (e = SqliteDatabase.open("/path/to/people.db").prepare("SELECT name, bio FROM people WHERE age = ?"), 
  console.log("People whose age is 42:"), e.bindInteger(1, 42); null !== (t = e.step()); ) r = t[0], 
  s = t[1], console.log("Name:", r), console.log("Bio:", s);
  e.reset();
}, globalThis.patchTest = (e, t = 1) => {
  Memory.patchCode(checkPointer(e), Process.pageSize * t, (e => {
    LOGD(e);
    let t = new ArmWriter(e);
    t.putLabel("start"), t.putNop(), t.putCallAddressWithArguments(Module.findExportByName("libil2cpp.so", "il2cpp_string_new"), [ "r10", 16 ]), 
    LOGD(t.base + " " + t.pc + " " + t.offset + " " + t.code), t.putBlxReg("lr"), t.putBCondLabel("eq", "start"), 
    t.flush();
  }));
}, globalThis.findInMemory = (e, t = !1) => {
  switch (e) {
   case "Dex1":
    n("54 61 70 20 54 6F 20 53 74 61 72 74", ((e, t, r) => {
      LOG('Found "DEX ' + e + " Address: " + t.toString() + "\n", LogColor.C36);
    }));
    break;

   case "Dex":
    n("64 65 78 0a 30 33 35 00", ((e, t, r) => {
      LOG('Found "DEX"' + e + " Address: " + t.toString() + "\n", LogColor.C36);
    }));
    break;

   case "PNG":
    Process.enumerateRanges("r--").forEach((e => {
      new Promise((t => {
        Memory.scan(e.base, e.size, "89 50 4E 47 0D 0A 1A 0A", {
          onMatch: function(e) {
            t(e);
          },
          onComplete: function() {}
        });
      })).then((t => {
        new Promise((t => {
          Memory.scan(e.base, e.size, "00 00 00 00 49 45 4E 44 AE 42 60 82", {
            onMatch: function(e) {
              return t(e), "stop";
            },
            onComplete: function() {}
          });
        })).then((e => [ t, e ])).then((e => {
          let t = e, r = t[1].sub(t[0]);
          e[3] = r, LOG("\n" + getLine(60) + "\n[*] Found PNG From " + e[0] + " To " + e[1] + "  size : " + r + "(" + r.toInt32() + ")", LogColor.C36);
          let s = o(t[0].add(4 * p_size).readPointer()).toInt32(), n = o(t[0].add(5 * p_size).readPointer()).toInt32(), a = t[0].add(6 * p_size).readU8(), l = t[0].add(6 * p_size + 1).readU8(), i = o(t[0].add(7 * p_size + 1).readPointer());
          return LOG("\t (" + s + " X " + n + ") \t" + a + " " + l + "\t" + i, LogColor.C36), 
          t;
        })).then((e => {
          let t = e, r = t[3].add(12).toInt32();
          if (r <= 0) return;
          Memory.protect(t[0], 65535, "rwx");
          let s = "/data/data/" + a() + "/" + e[0] + "_" + e[1] + ".png", o = new File(s, "wb"), n = e[0].readByteArray(r);
          0 != r && null != n && o.write(n), o.flush(), o.close(), LOGD("\tSave to\t\t===>\t" + s);
        })).catch((e => {
          LOGE(e);
        }));
      }));
    }));
    break;

   case "global-metadata.dat":
    n("AF 1B B1 FA 18", ((e, t, r) => {
      LOGE("\n" + getLine(80)), LOGD('Found "global-metadata.dat"' + e + " Address: " + t.toString() + "\n"), 
      seeHexA(t, 64, !0, LogColor.C33);
      let s = parseInt(t.toString(), 16) + 264, o = ptr(s).readInt(), n = parseInt(t.toString(), 16) + 268, l = o + ptr(n).readInt();
      if (LOGD("\nFile size\t===>\t" + l + "B (" + (l / 1024 / 1024).toFixed(2) + "MB)"), 
      l > 2097152) {
        let e = "/data/data/" + a() + "/global-metadata.dat", r = new File(e, "wb"), s = t.readByteArray(l);
        0 != l && null != s && r.write(s), r.flush(), r.close(), LOGD("Save to\t\t===>\t" + e);
      }
      LOGD(getLine(80));
    }));
    break;

   default:
    var r = Process.findModuleByName("libil2cpp.so");
    if (null == r) {
      LOGE("NOT FOUND Module : libil2cpp.so");
      break;
    }
    if (LOGW(JSON.stringify(m) + "\n"), t) {
      var s = Memory.scanSync(r.base, r.size, e);
      LOGD("onMatch result = \n" + JSON.stringify(s));
    } else Memory.scan(r.base, r.size, e, {
      onMatch: function(e, t) {
        return LOGD("[*] Found at " + e + " with size " + t), "stop";
      },
      onComplete: function() {
        LOGE("onComplete");
      }
    });
  }
  function o(e) {
    var t = "", r = String(e).split("0x")[1];
    for (let e = r.length - 1; e >= 0; e--) t += r.charAt(e);
    return ptr("0x" + t);
  }
  function n(e, t) {
    LOG("Start Find Pattern '" + e + "'\nWatting ......", LogColor.C96), Process.enumerateRanges("r--").forEach((r => {
      Memory.scan(r.base, r.size, e, {
        onMatch: function(r, s) {
          t(e, r, s);
        },
        onComplete: function() {}
      });
    }));
  }
  function a() {
    let e = "";
    return Java.perform((() => e = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext().getPackageName())), 
    e;
  }
}, globalThis.fridaInfo = () => {
  LOGD(`\n${getLine(40)}`), LOGD(`[*] Runtime : ${Script.runtime}`), LOGD(`[*] ThreadId : ${Process.getCurrentThreadId()}`), 
  LOGD(`[*] Process.id : ${Process.id}`), LOGD(`[*] Process.arch : ${Process.arch}`), 
  LOGD(`[*] Process.platform : ${Process.platform}`), LOGD(`[*] Process.pointerSize : ${Process.pointerSize}`), 
  LOGD(`[*] Process.pageSize : ${Process.pageSize}`), LOGD(`[*] Process.codeSigningPolicy : ${Process.codeSigningPolicy}`), 
  LOGD(`[*] Process.isDebuggerAttached : ${Process.isDebuggerAttached()}`), LOGD(`${getLine(40)}\n`);
}, globalThis.listThreads = (r = 20) => {
  t = 0;
  let s = Process.getCurrentThreadId();
  Process.enumerateThreads().sort(((e, t) => t.id - e.id)).slice(0, r).forEach((r => {
    let o = `${e.formartClass.alignStr(`[${++t}]`, 6)} ${r.id} ${r.state}`, n = r.context;
    s == r.id ? LOGE(o) : LOGD(o), LOGZ(`\tPC : ${n.pc}  ${checkCtx(n, "PC")}`), LOGZ(`\tLR : ${getPlatformCtx(n).lr}  ${checkCtx(n, "LR")}`);
  }));
}, globalThis.listModules = (e = "") => {
  r = 0, Process.enumerateModules().forEach((t => {
    t.name.includes(e) && s(t, !0);
  }));
}, globalThis.listModule = (t, r = 5) => {
  let o = Process.getModuleByName(t);
  if (null == o) return void LOGE("NOT FOUND Module : " + t);
  if (s(o, !1), "linker" == t) return;
  let n = o.enumerateRanges("");
  n.length > 0 && (LOGO(`\t[-] enumerateRanges ( ${n.length} )`), n.sort(((e, t) => e.base.compare(t.base))).forEach((t => {
    LOGZ(`\t\t${t.protection}\t${t.base} - ${t.base.add(t.size)} | ${e.formartClass.alignStr(String(ptr(t.size)), p_size + 4)} <- ${t.size}`);
  })), LOG(""));
  let a = o.enumerateImports();
  if (a.length > 0) {
    LOGO(`\t[-] enumerateImports ( ${a.length} )`);
    let t = [];
    a.sort(((e, t) => e.name.length - t.name.length)).slice(0, r).forEach((r => {
      let s = e.formartClass.alignStr(String(r.address), 2 * Process.pointerSize), o = "\t<---\t";
      try {
        let s = Process.findModuleByAddress(r.address), n = ` @ ${s.base}`;
        "function" != r.type && "variable" != r.type || (o += `${s.name} ${t.includes(s.name) ? e.formartClass.centerStr("...", n.length) : n}`), 
        t.push(s.name);
      } catch {
        o = "";
      }
      LOGZ(`\t\t${r.type}   ${s}  ${r.name} ${o}`);
    })), a.length > r && LOGZ("\t\t......\n");
  }
  let l = o.enumerateExports();
  l.length > 0 && (LOGO(`\t[-] enumerateExports ( ${l.length} )`), l.sort(((e, t) => e.name.length - t.name.length)).slice(0, r).forEach((t => {
    let r = e.formartClass.alignStr(String(t.address), 2 * Process.pointerSize);
    LOGZ(`\t\t${t.type}   ${r}  ${t.name}`);
  })), l.length > r && LOGZ("\t\t......\n"));
  let i = o.enumerateSymbols();
  i.length > 0 && (LOGO(`\t[-] enumerateSymbols ( ${i.length} )`), i.slice(0, r).forEach((e => {
    LOGZ(`\t\t${e.isGlobal}  ${e.type}  ${e.name}  ${e.address}`);
  })), i.length > r && LOGZ("\t\t......\n"));
}, globalThis.findExport = (e, t, r) => {
  if (null == r && (r = function(e) {
    try {
      let t = Process.findModuleByAddress(e.address);
      if (null == t) {
        let r = Process.findModuleByName("linker");
        r.enumerateExports().forEach((s => {
          s.address.equals(e.address) && s.name == e.name && (t = r);
        }));
      }
      let r = Process.findRangeByAddress(e.address);
      LOGD(`\n[*] ${e.type} -> address: ${e.address} ( ${e.address.sub(t.base)} ) | name: ${e.name}`), 
      LOGZ(`\t[-] base: ${t.base} | size: 0x${t.size.toString(16).padEnd(2 * p_size, " ")} <- module:  ${t.name}`), 
      LOGZ(`\t[-] base: ${r.base} | size: 0x${r.size.toString(16).padEnd(2 * p_size, " ")} <- range:   ${r.protection}`);
    } catch (t) {
      null == Process.findModuleByAddress(e.address) && LOGE("Module not found"), null == Process.findRangeByAddress(e.address) && LOGE("Range not found"), 
      LOGD(JSON.stringify(e));
    }
  }), null == t) Process.enumerateModules().forEach((t => {
    t.enumerateExports().forEach((t => {
      -1 != t.name.indexOf(e) && r(t);
    }));
  })); else {
    let s = Process.findModuleByName(t);
    if (null == s) throw new Error("NOT FOUND Module : " + t);
    s.enumerateExports().forEach((t => {
      -1 != t.name.indexOf(e) && r(t);
    }));
  }
  newLine();
}, globalThis.findImport = (e = "libc.so", t = "") => {
  let r = Process.findModuleByName(e);
  null != r ? (r.enumerateImports().forEach((e => {
    if (!e.name.includes(t)) return;
    let r = null == e || null == e.address ? "" : ` ( ${e.address.sub(Process.findModuleByAddress(e.address).base)} )`;
    LOGD(`\n[*] ${e.type} -> address: ${e.address}${r}  | name: ${e.name}`);
    let s = Process.findModuleByName(e.module)?.base;
    LOGZ(`\t${null == e.module ? "" : e.module + " ( " + s + " ) "} \t ${null == e.slot ? "" : e.slot}`);
  })), LOG("")) : LOGE("NOT FOUND Module : " + e);
};

const o = e => {
  let t = callFunctionWithOutError(Module.findExportByName("libc.so", "fopen"), allocCStr(e), allocCStr("rwx"));
  if (t.isNull()) return 0;
  callFunctionWithOutError(Module.findExportByName("libc.so", "fseek"), t, 0, 2);
  let r = callFunctionRI(Module.findExportByName("libc.so", "ftell"), t);
  return callFunctionWithOutError(Module.findExportByName("libc.so", "fclose"), t), 
  r;
};

globalThis.StalkerTraceEvent = (t, r) => {
  let s = t;
  if (null == (t = checkPointer(t)) || t.isNull()) return;
  const o = Process.findModuleByAddress(t);
  if (null != o) {
    if (null != r && r.length > 0) for (let e = 0; e < r.length; e++) r[e] = checkPointer(r[e]);
    A(t, ((t, r, s) => {
      var o;
      LOG(""), s.set("len", e.formartClass.printTitileA(`Enter ---\x3e arg0:${t[0]}  arg1:${t[1]}  arg2:${t[2]}  arg3:${t[3]} | ${Process.getCurrentThreadId()}`, LogColor.YELLOW)), 
      o = Process.getCurrentThreadId(), Stalker.follow(o, {
        events: {
          call: !0,
          ret: !1,
          exec: !1,
          block: !1,
          compile: !1
        },
        onReceive: function(e) {
          Stalker.parse(e, {
            annotate: !0,
            stringify: !1
          }).forEach((e => {
            let t = Process.findModuleByAddress(e[1]), r = Process.findModuleByAddress(e[2]);
            LOGD(`${e[0]} Times:${e[3]} ${e[1]}@${t?.name} ${e[2]}@${r?.name} `);
          }));
        }
      });
    }), ((e, t, r) => {
      LOGW(`${getLine(20)}\n Exit ---\x3e ret : ${e}\n${getLine(r.get("len"))}`), Process.getCurrentThreadId(), 
      Stalker.unfollow(), Stalker.garbageCollect();
    })), LOGD(`Stalker Attached : ${t} ( ${ptr(s)} ) from ${o.name} | ${Process.getCurrentThreadId()}`);
  } else LOGE(`Module not found { from ${t}}`);
}, globalThis.StalkerTracePath = (t, r) => {
  let s = t;
  if (null == (t = checkPointer(t)) || t.isNull()) return;
  const o = Process.findModuleByAddress(t);
  if (null != o) {
    if (null != r && r.length > 0) for (let e = 0; e < r.length; e++) r[e] = checkPointer(r[e]);
    A(t, ((t, s, n) => {
      LOG(""), n.set("len", e.formartClass.printTitileA(`Enter ---\x3e arg0:${t[0]}  arg1:${t[1]}  arg2:${t[2]}  arg3:${t[3]} | ${Process.getCurrentThreadId()}`, LogColor.YELLOW)), 
      function(e) {
        let t = new ModuleMap((e => !!e.base.equals(o.base) || (Stalker.exclude(e), !1)));
        Stalker.follow(e, {
          transform: e => {
            let s = e.next(), n = t.has(s.address), a = ptr(s.address);
            null != r ? a > r[0] && r[1] > a && LOGD(`[*] ${s.address} ( ${a.sub(o.base)} ) ---\x3e ${s.mnemonic} ${s.opStr}`) : n && LOGD(`[*] ${s.address} ( ${a.sub(o.base)} ) ---\x3e ${s.mnemonic} ${s.opStr}`);
            do {
              e.keep();
            } while (null !== e.next());
          }
        });
      }(Process.getCurrentThreadId());
    }), ((e, t, r) => {
      LOGW(`${getLine(20)}\n Exit ---\x3e ret : ${e}\n${getLine(r.get("len"))}`), Process.getCurrentThreadId(), 
      Stalker.unfollow(), Stalker.garbageCollect(), LOGE("Stalker Exit : " + Process.getCurrentThreadId());
    })), LOGD(`Stalker Attached : ${t} ( ${ptr(s)} ) from ${o.name} | ${Process.getCurrentThreadId()}`);
  } else LOGE(`Module not found { from ${t}}`);
}, globalThis.cmdouleTest = () => {
  var e = new CModule('#include <stdio.h>void functionFromCModule(){   printf("Print from CModule\n");}');
  console.log(JSON.stringify(e));
  var t = e.functionFromCModule;
  new NativeFunction(t, "void", [])();
};

},{"../utils/formart":186}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NOP_MAP = exports.NOP_ARRAY = exports.SET_ARRAY = exports.GET_ARRAY = exports.GET_MAP_VALUE = exports.SET_MAP_VALUE = exports.SET_MAP = exports.GET_MAP = exports.SET_G = exports.GET_GT = exports.GET_G = exports.GET_F = exports.SET_F_A = exports.SET_F = exports.SET_A = exports.GET_A = exports.newThreadCallBack = exports.p_size = exports.soName = void 0, 
exports.soName = "libil2cpp.so", exports.p_size = Process.pointerSize;

let e = () => {};

exports.newThreadCallBack = e;

let t = new Map;

const o = e => t.get(e);

exports.GET_A = o;

const r = (e, o) => t.set(e, o);

exports.SET_A = r;

let s = new Map;

function p(e, t) {
  s.set(e, t), (0, exports.SET_A)(e, t);
}

function _(e, t) {
  s.set(e, t), (0, exports.SET_A)(e, t);
}

function n(e) {
  return s.get(e);
}

exports.SET_F = p, exports.SET_F_A = _, exports.GET_F = n;

let x = new Map;

const T = e => x.get(e);

function A(e) {
  let t = x.get(e);
  return null == t && (t = 0), x.get(e);
}

function E(e, t) {
  return x.set(e, t);
}

function i(e) {
  if (x.get(e)) return x.get(e);
  {
    let t = new Map;
    return l(e, t), t;
  }
}

function l(e, t) {
  x.set(e, t);
}

function u(e, t, o) {
  l(e, i(e).set(t, o));
}

function c(e, t) {
  return i(e).get(t);
}

function G(e) {
  if (x.get(e)) return x.get(e);
  {
    let t = new Array;
    return P(e, t), t;
  }
}

function P(e, t) {
  x.set(e, t);
}

function S(e) {
  x.delete(e);
}

function a(e) {
  x.delete(e);
}

exports.GET_G = T, exports.GET_GT = A, exports.SET_G = E, exports.GET_MAP = i, exports.SET_MAP = l, 
exports.SET_MAP_VALUE = u, exports.GET_MAP_VALUE = c, exports.GET_ARRAY = G, exports.SET_ARRAY = P, 
exports.NOP_ARRAY = S, exports.NOP_MAP = a, globalThis.MAP_EXPORT_FUNCTIONS = s.forEach(((e, t) => {
  LOGD(`${t} => ${e}`);
})), globalThis.MAP_EXPORT_ADDRESS = t, globalThis.MAP_GLOABE_OBJ = x, globalThis.p_size = exports.p_size;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./base"), require("./breaker"), require("./enum"), require("./extends"), 
require("./globle"), require("./info"), require("./valueResolve");

},{"./base":4,"./breaker":5,"./enum":6,"./extends":7,"./globle":8,"./info":10,"./valueResolve":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.showMethodInfo = void 0;

const e = e => {
  "number" == typeof e && (e = ptr(e));
  let a = new Il2Cpp.Method(e), s = a.class.handle, t = a.class.image.handle, n = a.class.image.assembly.handle;
  LOGH("\nFunction: " + a.name + "\t" + a.parameterCount + "\t0x" + Number(e).toString(16) + " ---\x3e " + a.virtualAddress + " ---\x3e " + a.relativeVirtualAddress + "\n"), 
  LOGH(a.name + " ---\x3e " + a.class.name + "(" + s + ") ---\x3e " + (0 == a.class.namespace.length ? " - " : a.class.namespace) + " ---\x3e " + a.class.image.name + "(" + t + ") ---\x3e Il2CppAssembly(" + n + ")\n"), 
  0 != a.parameterCount && LOGH("ARGS: " + a.parameters.map((e => e.type.name + "(" + e.type.handle + ") " + e.name)).join(", ") + "\n");
};

exports.showMethodInfo = e, globalThis.showMethodInfo = e;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../bridge/fix/il2cppM"), t = require("../expand/TypeExtends/mscorlibObj/Object/class"), r = require("../expand/TypeExtends/mscorlibObj/ValueType/Color/class"), s = require("../utils/formart"), a = require("../utils/reader");

class n {
  cacheId="";
  method;
  args;
  retval=ptr(0);
  constructor(e, t) {
    this.cacheId = e, this.method = t, this.args = new Array(t.genericParameterCount);
  }
  getCacheId() {
    return this.cacheId;
  }
  setCacheId(e) {
    return this.cacheId = e, this;
  }
  getMethod() {
    return this.method;
  }
  setMethod(e) {
    return this.method = e, this.args = new Array(e.genericParameterCount), this;
  }
  setArg(e, t) {
    return this.args[e] = t, this;
  }
  setRetval(e) {
    return this.retval = e, this;
  }
  getArg(e) {
    return this.args[e];
  }
  getRetval() {
    return this.retval;
  }
  getArgs() {
    return this.args;
  }
  getArgsCount() {
    return this.method.parameterCount;
  }
  setArgs(e) {
    return null == e || 0 === e.length || e.length < this.method.parameterCount || (this.args = e), 
    this;
  }
  static MapCacheStringWithOutValue=new Map;
  toString() {
    let t = n.MapCacheStringWithOutValue.get(this.cacheId);
    if (t) return t;
    let r = ` ${this.method.handle} -> ${this.method.relativeVirtualAddress} `, a = "", i = String(this.method.class.handle).length + 1;
    try {
      a += ",", a += s.formartClass.alignStr(String(this.args[0]), i, " ");
    } catch {
      a += "  ", a += s.formartClass.getLine(i, " ");
    }
    let l = `${s.formartClass.alignStr(this.method.class.name, 18)}(${this.method.class.handle}${a.trim()})`, h = `===>  ${(0, 
    e.methodToString)(this.method, !0)}\t `, o = `${this.cacheId}\t${r}\t|  ${l}  ${h}`;
    return n.MapCacheStringWithOutValue.set(this.cacheId, o), o;
  }
  resolve(e) {
    if (e > this.method.parameterCount) throw new Error("index out of parameterCount range");
    let t = -1 == e ? this.retval : this.args[e], r = -1 == e ? this.method.returnType : this.method.parameters[e].type;
    return n.fakeValue(t, r, this.method);
  }
  static fakeValue=(e, s, n) => ("number" == typeof e && (e = ptr(e)), "number" == typeof n && (n = new Il2Cpp.Method(ptr(n))), 
  s.handle.equals(1) ? new Il2Cpp.Object(e).toString() : s.isNull() || n.isNull() ? "" : !e.isNull() || "System.Boolean" == s.name || n.class.isEnum || s.name.includes("Void") ? !n.class.isNull() && s.name.endsWith("[]") || !n.class.isNull() && s.name.includes("Dictionary") || !n.class.isNull() && n.class.isEnum ? "" : function(s) {
    switch (s.name) {
     case "System.Void":
      return "";

     case "System.Boolean":
      return e.isNull() ? "False" : "True";

     case "System.Int32":
      return (0, a.readInt)(e).toString();

     case "System.UInt32":
      return (0, a.readUInt)(e).toString();

     case "System.Int64":
      return (0, a.readInt64)(e).toString();

     case "System.Single":
      return (0, a.readSingle)(e).toString();

     case "System.String":
      return (0, a.readU16)(e);

     case "System.Object":
      return getObjName(e);

     case "System.UnityEngine":
      return new t.ObjectIl2cpp_impl(e).get_name();

     case "UnityEngine.Color":
      return new r.ColorImpl(e).toString();

     case "Vector2":
      return `${e.readFloat()} ${e.add(4).readFloat()}`;

     case "System.Action":
     case "System.Action`1":
     case "System.Action`2":
      return e.add(4 === Process.pageSize ? 20 : 16).readPointer().readPointer().sub(soAddr).toString();

     default:
      try {
        return new Il2Cpp.Object(e).toString();
      } catch (e) {
        return "";
      }
    }
  }(s) : "NULL");
}

exports.default = n;

},{"../bridge/fix/il2cppM":18,"../expand/TypeExtends/mscorlibObj/Object/class":105,"../expand/TypeExtends/mscorlibObj/ValueType/Color/class":144,"../utils/formart":186,"../utils/reader":190}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./packer");

},{"./packer":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class e extends Il2Cpp.Object {
  methods=[];
  fields=[];
  invoke(...e) {}
}

class s extends Il2Cpp.Object {
  methods=this.class.methods;
  fields=this.class.fields;
  pack() {
    return new Proxy(this.class, {
      get: (e, s) => (Reflect.set(e, "methods", this.methods), Reflect.set(e, "fields", this.fields), 
      Reflect.get(e, s))
    });
  }
}

function t(e) {
  return "number" == typeof e && (e = ptr(e)), new s(e).fields[12].value;
}

Reflect.set(globalThis, "pack", t);

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), Reflect.defineProperty(Il2Cpp.Class, "prettyString", {
  value: function() {
    var e = Il2Cpp.Class.prototype;
    return "" + (e.isEnum ? "enum" : e.isValueType ? "struct" : e.isInterface ? "interface" : "class");
  }
});

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.parseList = void 0;

const t = require("../../utils/formart");

class e extends mscorlib.Object {
  _defaultCapacity=lfv(this.handle, "_defaultCapacity").toInt32();
  _emptyArray=lfv(this.handle, "_emptyArray");
  _items=lfv(this.handle, "_items");
  _size=lfv(this.handle, "_size").toInt32();
  _version=lfv(this.handle, "_version").toInt32();
  _syncRoot=new mscorlib.Object(lfv(this.handle, "_syncRoot"));
  constructor(t) {
    super(t);
  }
  toShow() {
    newLine(), t.formartClass.printTitileA(`${new mscorlib.Object(this.handle).toString()} @ ${this.handle}`), 
    LOGJSON(this);
  }
  toString() {
    return JSON.stringify(this);
  }
  getItem(t = 0) {
    if ("arm" != Process.arch) return ptr(0);
    if (t + 1 > this._size) throw new Error(`Out of list range: this list maxLen = ${this._size}, input index = ${t + 1}`);
    return this._items.add(p_size * (4 + t)).readPointer();
  }
  foreach(t) {
    for (let e = 0; e < this._size; e++) t(this.getItem(e));
  }
  toArray() {
    const t = [];
    return this.foreach((e => t.push(e))), t;
  }
  toSimpleString() {
    return this.toArray().map((t => {
      let e = t.add(2 * p_size).readPointer(), r = new mscorlib.Delegate(e).method;
      return LOGE(`\t${r.readPointer().readPointer().sub(soAddr)}`), `${getLine(4, " ")}${t} ("${new Il2Cpp.Object(t).toString()}")`;
    })).join(getLine(4, " "));
  }
}

exports.parseList = e, globalThis.parseList = t => new e(checkCmdInput(t));

},{"../../utils/formart":186}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.setFunctionBool = exports.setFunctionValue = void 0;

let t = (t, e = ptr(0)) => {
  let o = t;
  t = checkCmdInput(t), e = checkCmdInput(e), t = checkPointer(t), Interceptor.attach(t, {
    onLeave: t => {
      LOGW(`setFunctionValue | ${ptr(o)} | ret => { ${t} -> ${e} } `), t.replace(e);
    }
  });
};

exports.setFunctionValue = t;

const e = (t, e = !1) => (0, exports.setFunctionValue)(t, ptr(e ? 1 : 0));

exports.setFunctionBool = e, globalThis.setFunctionBool = exports.setFunctionBool, 
globalThis.setFunctionValue = exports.setFunctionValue;

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.methodToString = exports.methodToArray = exports.getMethodDesFromMethodInfo = exports.getModifier = exports.getMethodModifier = void 0;

const e = require("../../base/enum"), t = e => {
  let t;
  "number" == typeof e && (e = ptr(e)), t = e instanceof Il2Cpp.Method ? e : "number" == typeof e ? new Il2Cpp.Method(ptr(e)) : new Il2Cpp.Method(e);
  let r = t.flags;
  return (0, exports.getModifier)(r);
};

exports.getMethodModifier = t;

const r = t => {
  let r = "";
  switch (t & e.il2cppTabledefs.METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK) {
   case e.il2cppTabledefs.METHOD_ATTRIBUTE_PRIVATE:
    r += "private ";
    break;

   case e.il2cppTabledefs.METHOD_ATTRIBUTE_PUBLIC:
    r += "public ";
    break;

   case e.il2cppTabledefs.METHOD_ATTRIBUTE_FAMILY:
    r += "protected ";
    break;

   case e.il2cppTabledefs.METHOD_ATTRIBUTE_ASSEM:
   case e.il2cppTabledefs.METHOD_ATTRIBUTE_FAM_AND_ASSEM:
    r += "internal ";
    break;

   case e.il2cppTabledefs.METHOD_ATTRIBUTE_FAM_OR_ASSEM:
    r += "protected internal ";
  }
  return t & e.il2cppTabledefs.METHOD_ATTRIBUTE_STATIC && (r += "static "), t & e.il2cppTabledefs.METHOD_ATTRIBUTE_ABSTRACT ? (r += "abstract ", 
  (t & e.il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == e.il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT && (r += "override ")) : t & e.il2cppTabledefs.METHOD_ATTRIBUTE_FINAL ? (t & e.il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == e.il2cppTabledefs.METHOD_ATTRIBUTE_REUSE_SLOT && (r += "sealed override ") : t & e.il2cppTabledefs.METHOD_ATTRIBUTE_VIRTUAL && ((t & e.il2cppTabledefs.METHOD_ATTRIBUTE_VTABLE_LAYOUT_MASK) == e.il2cppTabledefs.METHOD_ATTRIBUTE_NEW_SLOT ? r += "virtual " : r += "override "), 
  t & e.il2cppTabledefs.METHOD_ATTRIBUTE_PINVOKE_IMPL && (r += "extern "), r;
};

exports.getModifier = r;

const T = (e, t = !0) => {
  if ("number" == typeof e && (e = ptr(e)), null == e || e.isNull()) throw new Error("getMethodDesFromMethodPtr: methodPtr can't be null");
  let r = e instanceof Il2Cpp.Method ? e : new Il2Cpp.Method(e), T = r.returnType.name.split("."), o = "";
  return o += (0, exports.getMethodModifier)(r), o += `${T[T.length - 1]} `, o += r.name, 
  o += "(" + r.parameters.map((e => `${t ? function(e) {
    let t = e.split(".");
    return t[t.length - 1];
  }(e.type.name) : e.type.name} ${e.name}`)).join(",") + ")", o;
};

exports.getMethodDesFromMethodInfo = T;

const o = new Map, p = e => {
  if (e instanceof NativePointer) return t(new Il2Cpp.Method(e));
  if ("number" == typeof e) return t(new Il2Cpp.Method(ptr(e)));
  if (e instanceof Il2Cpp.Method) return t(e);
  throw new Error("methodToArray: method unknown type");
  function t(e) {
    let t = o.get(e);
    if (null != t) return t;
    let r = [];
    return r.push(e.handle), r.push(e.virtualAddress), r.push(e.virtualAddress.isNull() ? ptr(0) : e.relativeVirtualAddress), 
    r.push((0, exports.getMethodDesFromMethodInfo)(e)), r.push(e.class.handle), r.push(e.class.name), 
    o.set(e, r), r;
  }
};

exports.methodToArray = p;

const l = (e, t = !1) => {
  let r = (0, exports.methodToArray)(e);
  if (null == r) throw new Error("methodToString: methodToArray return undefined");
  if (t) return `${r[3]} ${e.name.includes("ctor") ? `   { class => ${r[5]}( ${r[4]} ) }` : ""}`;
  let T = "[*] ";
  return T += `${r[0]} ---\x3e `, T += `${r[1]} (${r[2]})`, T += (r[1].isNull() ? "\t\t\t" : "\t") + "|  ", 
  T += `${r[3]}`, e.name.includes(".ctor") && (T += `   { class => ${r[5]}( ${r[4]} ) } `), 
  T;
};

exports.methodToString = l, globalThis.methodToArray = exports.methodToArray;

},{"../../base/enum":6}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./apiFix"), require("./il2cppM"), require("./Il2cppC"), require("./parseFields"), 
require("./fakeList"), require("./functions");

},{"./Il2cppC":14,"./apiFix":15,"./fakeList":16,"./functions":17,"./il2cppM":18,"./parseFields":20}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FieldsParser = void 0;

const t = require("../../utils/formart"), e = require("./il2cppM");

class s {
  mPtr;
  mClass;
  constructor(t, e = 0) {
    if ("number" == typeof t) this.mPtr = ptr(t); else if ("string" == typeof t) {
      if (0 == t.indexOf("0x") ? this.mPtr = ptr(t) : this.mPtr = findClass(t), this.mPtr.isNull()) throw new Error("FieldsParser : Class not found");
    } else {
      if (!(t instanceof NativePointer)) throw new Error("Input type is not support");
      this.mPtr = t;
    }
    try {
      this.mClass = new Il2Cpp.Object(this.mPtr).class, this.mClass.name;
    } catch (t) {
      this.mClass = new Il2Cpp.Class(this.mPtr), this.mPtr = ptr(0);
    }
    if (0 != e) {
      let t;
      if ("number" == typeof e) t = ptr(e); else {
        if ("string" == typeof e) throw 0 == e.indexOf("0x") && (t = ptr(e)), new Error("Input string like '0x...' ");
        if ("object" != typeof e) throw new Error("Input type is not support");
        t = ptr(String(e));
      }
      this.mClass = new Il2Cpp.Class(t);
    }
  }
  fieldInstance(t) {
    if (this.mPtr.isNull()) throw new Error("fieldInstance : Instance is null");
    return this.mClass.field(t);
  }
  fieldValue(t) {
    let e = this.fieldInstance(t);
    return e.isStatic ? this.fakeStaticField(e).readPointer() : this.mPtr.add(this.fieldOffset(t)).readPointer();
  }
  fieldOffset(t) {
    return this.fieldInstance(t).offset;
  }
  toShow(s = !1) {
    newLine();
    let l = `Found ${this.mClass.fields.length} fields in class: ${this.mClass.name} (${this.mClass.handle})`;
    if (0 == this.mClass.fields.length ? LOGE(l) : LOGO(l), 0 == this.mClass.fields.length) return newLine();
    LOGO(getLine(50));
    let r = -1;
    this.mClass.fields.sort(((t, e) => t.offset - e.offset)).forEach((l => {
      let n = t.formartClass.alignStr(`[${++r}]`, 5), a = ptr(l.offset), f = (0, e.getModifier)(l.flags).trim(), o = `${l.type.class.name} (${l.type.class.handle})`, h = l.name;
      if (LOGD(`${n}  ${a} ${f} ${o}\t${h}`), l.isStatic) {
        let t = this.fakeStaticField(l), e = t.readPointer();
        LOGZ(`\t${t}  ---\x3e  ${e}  ---\x3e ${l.value}`);
      } else if (!this.mPtr.isNull()) {
        let e = this.mPtr.add(l.offset), s = e.readPointer(), r = "---\x3e  ";
        try {
          let t = i(l, s);
          r += "" === t ? new Il2Cpp.Object(s).toString() : t;
        } catch {
          try {
            r += l.value.toString();
          } catch {
            r = "";
          }
        }
        LOGZ(`\t${e}  ---\x3e  ${t.formartClass.alignStr(s)}  ${r}`);
      }
      s || newLine();
    })), LOGO(getLine(50));
  }
  fakeStaticField(t) {
    let e = alloc();
    return Il2Cpp.Api._fieldGetStaticValue(t.handle, e), e;
  }
}

exports.FieldsParser = s;

const i = (t, e) => {
  switch (t.type.class.name) {
   case "Boolean":
    return e.isNull() ? "FALSE" : "TRUE";

   case "Int32":
    return e.toInt32();

   default:
    return "";
  }
};

globalThis.lfs = (t, e = 0) => new s(t, e).toShow(), globalThis.lfp = t => {
  getTypeParent(t).reverse().forEach((e => new s(t, e.class).toShow(!0))), showTypeParent(t);
}, globalThis.lft = (t, e, i) => new s(t, i).fieldInstance(e), globalThis.lfv = (t, e, i) => new s(t, i).fieldValue(e), 
globalThis.lfo = (t, e, i) => new s(t, i).fieldOffset(e), globalThis.lfvt = (t, e, i) => {
  try {
    return new s(t, i).fieldValue(e);
  } catch {
    return new NativePointer(0);
  }
};

},{"../../utils/formart":186,"./il2cppM":18}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./expand/include"), require("./fix/include");

},{"./expand/include":12,"./fix/include":19}],22:[function(require,module,exports){
"use strict";

function t(t, n, o, r = -1, i, u) {
  return e(t, n, o, r, [], i, u);
}

function e(t, e, n, o = -1, r, i, u) {
  let l = findMethod(t, e, n, o, r, !1);
  if (null == l) throw new Error(`method ${n} not found`);
  let d = l.virtualAddress;
  if (null == d) throw new Error("Could not find method");
  return new NativeFunction(d, i, u);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), Il2Cpp.Api.t = t, Il2Cpp.Api.o = e;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./apiExtends/apiExtends"), require("./mscorlibObj/include"), require("./thread/include");

},{"./apiExtends/apiExtends":22,"./mscorlibObj/include":160,"./thread/include":162}],24:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, n, i) {
  var r, s = arguments.length, o = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, n, o) : r(e, n)) || o);
  return s > 3 && o && Object.defineProperty(e, n, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PointerEventDataAPI = void 0;

const e = require("decorator-cache-getter");

class n {
  static get _ctor_1() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", ".ctor", 1, "void", [ "pointer" ]);
  }
  static get _IsPointerMoving() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "IsPointerMoving", 0, "bool", [ "pointer" ]);
  }
  static get _IsScrolling() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "IsScrolling", 0, "bool", [ "pointer" ]);
  }
  static get _ToString() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "ToString", 0, "pointer", [ "pointer" ]);
  }
  static get _set_button() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_button", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_button() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_button", 0, "pointer", [ "pointer" ]);
  }
  static get _set_clickCount() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_clickCount", 1, "void", [ "pointer", "int" ]);
  }
  static get _get_clickCount() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_clickCount", 0, "int", [ "pointer" ]);
  }
  static get _set_clickTime() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_clickTime", 1, "void", [ "pointer", "int" ]);
  }
  static get _get_clickTime() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_clickTime", 0, "int", [ "pointer" ]);
  }
  static get _set_delta() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_delta", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_delta() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_delta", 0, "pointer", [ "pointer" ]);
  }
  static get _set_dragging() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_dragging", 1, "void", [ "pointer", "bool" ]);
  }
  static get _get_dragging() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_dragging", 0, "bool", [ "pointer" ]);
  }
  static get _set_eligibleForClick() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_eligibleForClick", 1, "void", [ "pointer", "bool" ]);
  }
  static get _get_eligibleForClick() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_eligibleForClick", 0, "bool", [ "pointer" ]);
  }
  static get _set_pointerId() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerId", 1, "void", [ "pointer", "int" ]);
  }
  static get _get_pointerId() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerId", 0, "int", [ "pointer" ]);
  }
  static get _set_pointerPress() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerPress", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_pointerPress() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerPress", 0, "pointer", [ "pointer" ]);
  }
  static get _set_pointerPressRaycast() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerPressRaycast", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_pointerPressRaycast() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerPressRaycast", 0, "pointer", [ "pointer" ]);
  }
  static get _set_position() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_position", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_position() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_position", 0, "pointer", [ "pointer" ]);
  }
  static get _get_pressEventCamera() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pressEventCamera", 0, "pointer", [ "pointer" ]);
  }
  static get _set_pressPosition() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pressPosition", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_pressPosition() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pressPosition", 0, "pointer", [ "pointer" ]);
  }
  static get _set_rawPointerPress() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_rawPointerPress", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_rawPointerPress() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_rawPointerPress", 0, "pointer", [ "pointer" ]);
  }
  static get _set_scrollDelta() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_scrollDelta", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_scrollDelta() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_scrollDelta", 0, "pointer", [ "pointer" ]);
  }
  static get _set_useDragThreshold() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_useDragThreshold", 1, "void", [ "pointer", "bool" ]);
  }
  static get _get_useDragThreshold() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_useDragThreshold", 0, "bool", [ "pointer" ]);
  }
  static get _set_worldNormal() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_worldNormal", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_worldNormal() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_worldNormal", 0, "pointer", [ "pointer" ]);
  }
  static get _set_worldPosition() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_worldPosition", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_worldPosition() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_worldPosition", 0, "pointer", [ "pointer" ]);
  }
  static get _get_enterEventCamera() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_enterEventCamera", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_pointerCurrentRaycast() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerCurrentRaycast", 0, "pointer", [ "pointer" ]);
  }
  static get _set_pointerCurrentRaycast() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerCurrentRaycast", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_pointerEnter() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerEnter", 0, "pointer", [ "pointer" ]);
  }
  static get _set_pointerEnter() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_pointerEnter", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_pointerDrag() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_pointerDrag", 0, "pointer", [ "pointer" ]);
  }
  static get _set_lastPress() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "set_lastPress", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_lastPress() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.PointerEventData", "get_lastPress", 0, "pointer", [ "pointer" ]);
  }
}

t([ e.cache ], n, "_ctor_1", null), t([ e.cache ], n, "_IsPointerMoving", null), 
t([ e.cache ], n, "_IsScrolling", null), t([ e.cache ], n, "_ToString", null), t([ e.cache ], n, "_set_button", null), 
t([ e.cache ], n, "_get_button", null), t([ e.cache ], n, "_set_clickCount", null), 
t([ e.cache ], n, "_get_clickCount", null), t([ e.cache ], n, "_set_clickTime", null), 
t([ e.cache ], n, "_get_clickTime", null), t([ e.cache ], n, "_set_delta", null), 
t([ e.cache ], n, "_get_delta", null), t([ e.cache ], n, "_set_dragging", null), 
t([ e.cache ], n, "_get_dragging", null), t([ e.cache ], n, "_set_eligibleForClick", null), 
t([ e.cache ], n, "_get_eligibleForClick", null), t([ e.cache ], n, "_set_pointerId", null), 
t([ e.cache ], n, "_get_pointerId", null), t([ e.cache ], n, "_set_pointerPress", null), 
t([ e.cache ], n, "_get_pointerPress", null), t([ e.cache ], n, "_set_pointerPressRaycast", null), 
t([ e.cache ], n, "_get_pointerPressRaycast", null), t([ e.cache ], n, "_set_position", null), 
t([ e.cache ], n, "_get_position", null), t([ e.cache ], n, "_get_pressEventCamera", null), 
t([ e.cache ], n, "_set_pressPosition", null), t([ e.cache ], n, "_get_pressPosition", null), 
t([ e.cache ], n, "_set_rawPointerPress", null), t([ e.cache ], n, "_get_rawPointerPress", null), 
t([ e.cache ], n, "_set_scrollDelta", null), t([ e.cache ], n, "_get_scrollDelta", null), 
t([ e.cache ], n, "_set_useDragThreshold", null), t([ e.cache ], n, "_get_useDragThreshold", null), 
t([ e.cache ], n, "_set_worldNormal", null), t([ e.cache ], n, "_get_worldNormal", null), 
t([ e.cache ], n, "_set_worldPosition", null), t([ e.cache ], n, "_get_worldPosition", null), 
t([ e.cache ], n, "_get_enterEventCamera", null), t([ e.cache ], n, "_get_pointerCurrentRaycast", null), 
t([ e.cache ], n, "_set_pointerCurrentRaycast", null), t([ e.cache ], n, "_get_pointerEnter", null), 
t([ e.cache ], n, "_set_pointerEnter", null), t([ e.cache ], n, "_get_pointerDrag", null), 
t([ e.cache ], n, "_set_lastPress", null), t([ e.cache ], n, "_get_lastPress", null), 
exports.PointerEventDataAPI = n, Il2Cpp.Api.PointerEventData = n;

},{"decorator-cache-getter":193}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PointerEventImpl = void 0;

const t = require("../../../Object/GameObject/class"), e = require("../class");

class n extends e.BaseEventDataImpl {
  hovered=lfv(this.handle, "hovered");
  m_PointerPress=new t.GameObjectImpl(lfv(this.handle, "m_PointerPress"));
  ctor_11(t) {
    return new n(Il2Cpp.Api.PointerEventData._ctor_1(alloc(), t));
  }
  IsPointerMoving() {
    return Il2Cpp.Api.PointerEventData._IsPointerMoving(this.handle);
  }
  IsScrolling() {
    return Il2Cpp.Api.PointerEventData._IsScrolling(this.handle);
  }
  toString() {
    return Il2Cpp.Api.PointerEventData._ToString(this.handle);
  }
  set_button(t) {
    return Il2Cpp.Api.PointerEventData._set_button(this.handle, t);
  }
  get_button() {
    return Il2Cpp.Api.PointerEventData._get_button(this.handle);
  }
  set_clickCount(t) {
    return Il2Cpp.Api.PointerEventData._set_clickCount(this.handle, t);
  }
  get_clickCount() {
    return Il2Cpp.Api.PointerEventData._get_clickCount(this.handle);
  }
  set_clickTime(t) {
    return Il2Cpp.Api.PointerEventData._set_clickTime(this.handle, t);
  }
  get_clickTime() {
    return Il2Cpp.Api.PointerEventData._get_clickTime(this.handle);
  }
  set_delta(t) {
    return Il2Cpp.Api.PointerEventData._set_delta(this.handle, t);
  }
  get_delta() {
    return Il2Cpp.Api.PointerEventData._get_delta(this.handle);
  }
  set_dragging(t) {
    return Il2Cpp.Api.PointerEventData._set_dragging(this.handle, t);
  }
  get_dragging() {
    return Il2Cpp.Api.PointerEventData._get_dragging(this.handle);
  }
  set_eligibleForClick(t) {
    return Il2Cpp.Api.PointerEventData._set_eligibleForClick(this.handle, t);
  }
  get_eligibleForClick() {
    return Il2Cpp.Api.PointerEventData._get_eligibleForClick(this.handle);
  }
  get_enterEventCamera() {
    return Il2Cpp.Api.PointerEventData._get_enterEventCamera(this.handle);
  }
  set_pointerCurrentRaycast(t) {
    return Il2Cpp.Api.PointerEventData._set_pointerCurrentRaycast(this.handle, t);
  }
  get_pointerCurrentRaycast() {
    return Il2Cpp.Api.PointerEventData._get_pointerCurrentRaycast(this.handle);
  }
  set_lastPress(t) {
    return Il2Cpp.Api.PointerEventData._set_lastPress(this.handle, t);
  }
  get_lastPress() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_lastPress(this.handle));
  }
  set_pointerDrag(t) {
    return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, t);
  }
  get_pointerDrag() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerDrag(this.handle));
  }
  set_pointerEnter(t) {
    return Il2Cpp.Api.PointerEventData._set_pointerEnter(this.handle, t);
  }
  get_pointerEnter() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerEnter(this.handle));
  }
  set_pointerId(t) {
    return Il2Cpp.Api.PointerEventData._set_pointerId(this.handle, t);
  }
  get_pointerId() {
    return Il2Cpp.Api.PointerEventData._get_pointerId(this.handle);
  }
  set_pointerPress(t) {
    return Il2Cpp.Api.PointerEventData._set_pointerPress(this.handle, t);
  }
  get_pointerPress() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_pointerPress(this.handle));
  }
  set_pointerPressRaycast(t) {
    return Il2Cpp.Api.PointerEventData._set_pointerPressRaycast(this.handle, t);
  }
  get_pointerPressRaycast() {
    return Il2Cpp.Api.PointerEventData._get_pointerPressRaycast(this.handle);
  }
  set_position(t) {
    return Il2Cpp.Api.PointerEventData._set_position(this.handle, t);
  }
  get_position() {
    return Il2Cpp.Api.PointerEventData._get_position(this.handle);
  }
  get_pressEventCamera() {
    return Il2Cpp.Api.PointerEventData._get_pressEventCamera(this.handle);
  }
  set_pressPosition(t) {
    return Il2Cpp.Api.PointerEventData._set_pressPosition(this.handle, t);
  }
  get_pressPosition() {
    return Il2Cpp.Api.PointerEventData._get_pressPosition(this.handle);
  }
  set_rawPointerPress(t) {
    return Il2Cpp.Api.PointerEventData._set_rawPointerPress(this.handle, t);
  }
  get_rawPointerPress() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.PointerEventData._get_rawPointerPress(this.handle));
  }
  set_scrollDelta(t) {
    return Il2Cpp.Api.PointerEventData._set_scrollDelta(this.handle, t);
  }
  get_scrollDelta() {
    return Il2Cpp.Api.PointerEventData._get_scrollDelta(this.handle);
  }
  set_useDragThreshold(t) {
    return Il2Cpp.Api.PointerEventData._set_useDragThreshold(this.handle, t);
  }
  get_useDragThreshold() {
    return Il2Cpp.Api.PointerEventData._get_useDragThreshold(this.handle);
  }
  set_worldNormal(t) {
    return Il2Cpp.Api.PointerEventData._set_worldNormal(this.handle, t);
  }
  get_worldNormal() {
    return Il2Cpp.Api.PointerEventData._get_worldNormal(this.handle);
  }
  set_worldPosition(t) {
    return Il2Cpp.Api.PointerEventData._set_worldPosition(this.handle, t);
  }
  get_worldPosition() {
    return Il2Cpp.Api.PointerEventData._get_worldPosition(this.handle);
  }
}

exports.PointerEventImpl = n;

},{"../../../Object/GameObject/class":95,"../class":30}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.showEventData = void 0;

const t = require("./class"), e = e => {
  LOGO(`${getLine(15)} EventData ${getLine(15)}`);
  let o = new t.PointerEventImpl(e), a = allocVector();
  callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_position", 0), a, e), 
  LOGD("ClickPositon\t---\x3e\t" + a.readFloat() + "\t" + a.add(p_size).readFloat()), 
  LOGD("clickTime\t---\x3e\t" + o.get_clickTime()), LOGD("clickCount\t---\x3e\t" + o.get_clickCount());
  let n = allocVector();
  callFunction(find_method("UnityEngine.UI", "PointerEventData", "get_delta", 0), allocVector(), e), 
  LOGD("delta\t\t---\x3e\t" + n.readFloat() + "\t" + n.add(p_size).readFloat());
};

exports.showEventData = e, globalThis.showEventData = e;

},{"./class":25}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface"), require("./export");

},{"./api":24,"./class":25,"./export":26,"./interface":28}],28:[function(require,module,exports){
"use strict";

},{}],29:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, r) {
  var c, i = arguments.length, s = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r); else for (var a = e.length - 1; a >= 0; a--) (c = e[a]) && (s = (i < 3 ? c(s) : i > 3 ? c(t, n, s) : c(t, n)) || s);
  return i > 3 && s && Object.defineProperty(t, n, s), s;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseEventDataAPI = void 0;

const t = require("decorator-cache-getter");

class n {
  static get _ctor_1() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", ".ctor", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_currentInputModule() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_currentInputModule", 0, "pointer", [ "pointer" ]);
  }
  static get _set_selectedObject() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "set_selectedObject", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_selectedObject() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.BaseEventData", "get_selectedObject", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_ctor_1", null), e([ t.cache ], n, "_get_currentInputModule", null), 
e([ t.cache ], n, "_set_selectedObject", null), e([ t.cache ], n, "_get_selectedObject", null), 
exports.BaseEventDataAPI = n, Il2Cpp.Api.BaseEventData = n;

},{"decorator-cache-getter":193}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BaseEventDataImpl = void 0;

const e = require("../../class"), t = require("../../Object/GameObject/class");

class s extends e.mscorlib_System_Object_impl {
  m_EventSystem=lfv(this.handle, "m_EventSystem");
  ctor_1() {
    return new s(Il2Cpp.Api.BaseEventData._ctor_1(alloc()));
  }
  get_currentInputModule() {
    return Il2Cpp.Api.BaseEventData._get_currentInputModule(this.handle);
  }
  set_selectedObject(e) {
    return Il2Cpp.Api.BaseEventData._set_selectedObject(this.handle, e.handle);
  }
  get_selectedObject() {
    return new t.GameObjectImpl(Il2Cpp.Api.BaseEventData._get_selectedObject(this.handle));
  }
}

exports.BaseEventDataImpl = s;

},{"../../Object/GameObject/class":95,"../../class":159}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./PointerEventData/include"), require("./api"), require("./class"), 
require("./interface");

},{"./PointerEventData/include":27,"./api":29,"./class":30,"./interface":32}],32:[function(require,module,exports){
"use strict";

},{}],33:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, n, r) {
  var i, c = arguments.length, s = c < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (s = (c < 3 ? i(s) : c > 3 ? i(e, n, s) : i(e, n)) || s);
  return c > 3 && s && Object.defineProperty(e, n, s), s;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbstractEventDataAPI = void 0;

const e = require("decorator-cache-getter");

class n {
  static get _ctor_0() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", ".ctor", 0, "void", [ "pointer" ]);
  }
  static get _Reset() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Reset", 0, "void", [ "pointer" ]);
  }
  static get _Use() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "Use", 0, "void", [ "pointer" ]);
  }
  static get _get_used() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.EventSystems.AbstractEventData", "get_used", 0, "bool", [ "pointer" ]);
  }
}

t([ e.cache ], n, "_ctor_0", null), t([ e.cache ], n, "_Reset", null), t([ e.cache ], n, "_Use", null), 
t([ e.cache ], n, "_get_used", null), exports.AbstractEventDataAPI = n, Il2Cpp.Api.AbstractEventData = n;

},{"decorator-cache-getter":193}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbstractEventDataImpl = void 0;

const t = require("../class");

class e extends t.mscorlib_System_Object_impl {
  m_Used=lfv(this.handle, "m_Used");
  ctor_0() {
    return new e(Il2Cpp.Api.AbstractEventData._ctor_0(alloc()));
  }
  Reset() {
    return Il2Cpp.Api.AbstractEventData._Reset(this.handle);
  }
  Use() {
    return Il2Cpp.Api.AbstractEventData._Use(this.handle);
  }
  get_used() {
    return Il2Cpp.Api.AbstractEventData._get_used(this.handle);
  }
}

exports.AbstractEventDataImpl = e;

},{"../class":159}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./BaseEventData/include"), require("./api"), require("./class"), require("./interface");

},{"./BaseEventData/include":31,"./api":33,"./class":34,"./interface":36}],36:[function(require,module,exports){
"use strict";

},{}],37:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var o, l = arguments.length, a = l < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, i); else for (var p = e.length - 1; p >= 0; p--) (o = e[p]) && (a = (l < 3 ? o(a) : l > 3 ? o(t, n, a) : o(t, n)) || a);
  return l > 3 && a && Object.defineProperty(t, n, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _CallLogCallback() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "CallLogCallback", 4, "void", [ "pointer", "pointer", "pointer", "bool" ]);
  }
  static get _CallLowMemory() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "CallLowMemory", 0, "void", []);
  }
  static get _GetStackTraceLogType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "GetStackTraceLogType", 0, "pointer", []);
  }
  static get _LoadLevel() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "LoadLevel", 1, "void", [ "pointer" ]);
  }
  static get _OpenURL() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "OpenURL", 1, "void", [ "pointer" ]);
  }
  static get _Quit() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Quit", 0, "void", []);
  }
  static get _Quit_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Quit", 1, "void", [ "int32" ]);
  }
  static get _RegisterLogCallback() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "RegisterLogCallback", 1, "void", [ "pointer" ]);
  }
  static get _get_cloudProjectId() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_cloudProjectId", 0, "pointer", []);
  }
  static get _get_dataPath() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_dataPath", 0, "pointer", []);
  }
  static get _get_identifier() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_identifier", 0, "pointer", []);
  }
  static get _get_internetReachability() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_internetReachability", 0, "pointer", []);
  }
  static get _get_isEditor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isEditor", 0, "bool", []);
  }
  static get _get_isMobilePlatform() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isMobilePlatform", 0, "bool", []);
  }
  static get _get_isPlaying() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_isPlaying", 0, "bool", []);
  }
  static get _get_persistentDataPath() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_persistentDataPath", 0, "pointer", []);
  }
  static get _get_temporaryCachePath() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_temporaryCachePath", 0, "pointer", []);
  }
  static get _get_version() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_version", 0, "pointer", []);
  }
  static get _get_productName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_productName", 0, "pointer", []);
  }
  static get _get_platform() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_platform", 0, "pointer", []);
  }
  static get _set_runInBackground() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "set_runInBackground", 1, "void", [ "bool" ]);
  }
  static get _get_streamingAssetsPath() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_streamingAssetsPath", 0, "pointer", []);
  }
  static get _set_targetFrameRate() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "set_targetFrameRate", 1, "void", [ "int32" ]);
  }
  static get _get_unityVersion() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_unityVersion", 0, "pointer", []);
  }
  static get _add_logMessageReceived() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "add_logMessageReceived", 1, "void", [ "pointer" ]);
  }
  static get _SetLogCallbackDefined() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "SetLogCallbackDefined", 1, "void", [ "bool" ]);
  }
  static get _get_systemLanguage() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_systemLanguage", 0, "pointer", []);
  }
  static get _Internal_ApplicationWantsToQuit() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Internal_ApplicationWantsToQuit", 0, "bool", []);
  }
  static get _Internal_ApplicationQuit() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Internal_ApplicationQuit", 0, "void", []);
  }
  static get _Internal_ApplicationUnload() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "Internal_ApplicationUnload", 0, "void", []);
  }
  static get _InvokeOnBeforeRender() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "InvokeOnBeforeRender", 0, "void", []);
  }
  static get _InvokeFocusChanged() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "InvokeFocusChanged", 0, "void", [ "bool" ]);
  }
  static get _InvokeDeepLinkActivated() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "InvokeDeepLinkActivated", 1, "void", [ "pointer" ]);
  }
  static get _get_companyName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "get_companyName", 0, "pointer", []);
  }
  static get _remove_logMessageReceived() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "remove_logMessageReceived", 1, "void", [ "pointer" ]);
  }
  static get _add_logMessageReceivedThreaded() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "add_logMessageReceivedThreaded", 1, "void", [ "pointer" ]);
  }
  static get _remove_logMessageReceivedThreaded() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Application", "remove_logMessageReceivedThreaded", 1, "void", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_CallLogCallback", null), e([ t.cache ], n, "_CallLowMemory", null), 
e([ t.cache ], n, "_GetStackTraceLogType", null), e([ t.cache ], n, "_LoadLevel", null), 
e([ t.cache ], n, "_OpenURL", null), e([ t.cache ], n, "_Quit", null), e([ t.cache ], n, "_Quit_1", null), 
e([ t.cache ], n, "_RegisterLogCallback", null), e([ t.cache ], n, "_get_cloudProjectId", null), 
e([ t.cache ], n, "_get_dataPath", null), e([ t.cache ], n, "_get_identifier", null), 
e([ t.cache ], n, "_get_internetReachability", null), e([ t.cache ], n, "_get_isEditor", null), 
e([ t.cache ], n, "_get_isMobilePlatform", null), e([ t.cache ], n, "_get_isPlaying", null), 
e([ t.cache ], n, "_get_persistentDataPath", null), e([ t.cache ], n, "_get_temporaryCachePath", null), 
e([ t.cache ], n, "_get_version", null), e([ t.cache ], n, "_get_productName", null), 
e([ t.cache ], n, "_get_platform", null), e([ t.cache ], n, "_set_runInBackground", null), 
e([ t.cache ], n, "_get_streamingAssetsPath", null), e([ t.cache ], n, "_set_targetFrameRate", null), 
e([ t.cache ], n, "_get_unityVersion", null), e([ t.cache ], n, "_add_logMessageReceived", null), 
e([ t.cache ], n, "_SetLogCallbackDefined", null), e([ t.cache ], n, "_get_systemLanguage", null), 
e([ t.cache ], n, "_Internal_ApplicationWantsToQuit", null), e([ t.cache ], n, "_Internal_ApplicationQuit", null), 
e([ t.cache ], n, "_Internal_ApplicationUnload", null), e([ t.cache ], n, "_InvokeOnBeforeRender", null), 
e([ t.cache ], n, "_InvokeFocusChanged", null), e([ t.cache ], n, "_InvokeDeepLinkActivated", null), 
e([ t.cache ], n, "_get_companyName", null), e([ t.cache ], n, "_remove_logMessageReceived", null), 
e([ t.cache ], n, "_add_logMessageReceivedThreaded", null), e([ t.cache ], n, "_remove_logMessageReceivedThreaded", null), 
Il2Cpp.Api.Application = n;

},{"decorator-cache-getter":193}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.UnityEngine_Application_impl = exports.SystemLanguage = exports.RuntimePlatform = exports.LogType = exports.StackTraceLogType = exports.NetworkReachability = void 0;

const e = require("../Type/class");

var a, t, i, r, n;

!function(e) {
  e[e.NotReachable = 0] = "NotReachable", e[e.ReachableViaCarrierDataNetwork = 1] = "ReachableViaCarrierDataNetwork", 
  e[e.ReachableViaLocalAreaNetwork = 2] = "ReachableViaLocalAreaNetwork";
}(a = exports.NetworkReachability || (exports.NetworkReachability = {})), function(e) {
  e[e.None = 0] = "None", e[e.ScriptOnly = 1] = "ScriptOnly", e[e.Full = 2] = "Full";
}(t = exports.StackTraceLogType || (exports.StackTraceLogType = {})), function(e) {
  e[e.Error = 0] = "Error", e[e.Assert = 1] = "Assert", e[e.Warning = 2] = "Warning", 
  e[e.Log = 3] = "Log", e[e.Exception = 4] = "Exception";
}(i = exports.LogType || (exports.LogType = {})), function(e) {
  e[e.Android = 11] = "Android", e[e.BlackBerryPlayer = 22] = "BlackBerryPlayer", 
  e[e.CloudRendering = 35] = "CloudRendering", e[e.FlashPlayer = 15] = "FlashPlayer", 
  e[e.GameCoreScarlett = 36] = "GameCoreScarlett", e[e.GameCoreXboxOne = 37] = "GameCoreXboxOne", 
  e[e.GameCoreXboxSeries = 36] = "GameCoreXboxSeries", e[e.IPhonePlayer = 8] = "IPhonePlayer", 
  e[e.LinuxEditor = 16] = "LinuxEditor", e[e.LinuxPlayer = 13] = "LinuxPlayer", e[e.Lumin = 33] = "Lumin", 
  e[e.MetroPlayerARM = 20] = "MetroPlayerARM", e[e.MetroPlayerX64 = 19] = "MetroPlayerX64", 
  e[e.MetroPlayerX86 = 18] = "MetroPlayerX86", e[e.NaCl = 12] = "NaCl", e[e.OSXDashboardPlayer = 4] = "OSXDashboardPlayer", 
  e[e.OSXEditor = 0] = "OSXEditor", e[e.OSXPlayer = 1] = "OSXPlayer", e[e.OSXWebPlayer = 3] = "OSXWebPlayer", 
  e[e.PS3 = 9] = "PS3", e[e.PS4 = 25] = "PS4", e[e.PS5 = 38] = "PS5", e[e.PSM = 26] = "PSM", 
  e[e.PSP2 = 24] = "PSP2", e[e.SamsungTVPlayer = 28] = "SamsungTVPlayer", e[e.Stadia = 34] = "Stadia", 
  e[e.Switch = 32] = "Switch", e[e.TizenPlayer = 23] = "TizenPlayer", e[e.tvOS = 31] = "tvOS", 
  e[e.WebGLPlayer = 17] = "WebGLPlayer", e[e.WiiU = 30] = "WiiU", e[e.WindowsEditor = 7] = "WindowsEditor", 
  e[e.WindowsPlayer = 2] = "WindowsPlayer", e[e.WindowsWebPlayer = 5] = "WindowsWebPlayer", 
  e[e.WP8Player = 21] = "WP8Player", e[e.WSAPlayerARM = 20] = "WSAPlayerARM", e[e.WSAPlayerX64 = 19] = "WSAPlayerX64", 
  e[e.WSAPlayerX86 = 18] = "WSAPlayerX86", e[e.XBOX360 = 10] = "XBOX360", e[e.XboxOne = 27] = "XboxOne";
}(r = exports.RuntimePlatform || (exports.RuntimePlatform = {})), function(e) {
  e[e.Afrikaans = 0] = "Afrikaans", e[e.Arabic = 1] = "Arabic", e[e.Basque = 2] = "Basque", 
  e[e.Belarusian = 3] = "Belarusian", e[e.Bulgarian = 4] = "Bulgarian", e[e.Catalan = 5] = "Catalan", 
  e[e.Chinese = 6] = "Chinese", e[e.ChineseSimplified = 40] = "ChineseSimplified", 
  e[e.ChineseTraditional = 41] = "ChineseTraditional", e[e.Czech = 7] = "Czech", e[e.Danish = 8] = "Danish", 
  e[e.Dutch = 9] = "Dutch", e[e.English = 10] = "English", e[e.Estonian = 11] = "Estonian", 
  e[e.Faroese = 12] = "Faroese", e[e.Finnish = 13] = "Finnish", e[e.French = 14] = "French", 
  e[e.German = 15] = "German", e[e.Greek = 16] = "Greek", e[e.Hebrew = 17] = "Hebrew", 
  e[e.Hungarian = 18] = "Hungarian", e[e.Icelandic = 19] = "Icelandic", e[e.Indonesian = 20] = "Indonesian", 
  e[e.Italian = 21] = "Italian", e[e.Japanese = 22] = "Japanese", e[e.Korean = 23] = "Korean", 
  e[e.Latvian = 24] = "Latvian", e[e.Lithuanian = 25] = "Lithuanian", e[e.Norwegian = 26] = "Norwegian", 
  e[e.Polish = 27] = "Polish", e[e.Portuguese = 28] = "Portuguese", e[e.Romanian = 29] = "Romanian", 
  e[e.Russian = 30] = "Russian", e[e.SerboCroatian = 31] = "SerboCroatian", e[e.Slovak = 32] = "Slovak", 
  e[e.Slovenian = 33] = "Slovenian", e[e.Spanish = 34] = "Spanish", e[e.Swedish = 35] = "Swedish", 
  e[e.Thai = 36] = "Thai", e[e.Turkish = 37] = "Turkish", e[e.Ukrainian = 38] = "Ukrainian", 
  e[e.Unknown = 42] = "Unknown", e[e.Vietnamese = 39] = "Vietnamese";
}(n = exports.SystemLanguage || (exports.SystemLanguage = {}));

class l extends e.mscorlib_System_Type_impl {
  deepLinkActivated=lfv(this.handle, "deepLinkActivated");
  focusChanged=lfv(this.handle, "focusChanged");
  LowMemoryCallback=lfv(this.handle, "LowMemoryCallback");
  quitting=lfv(this.handle, "quitting");
  s_LogCallbackHandler=lfv(this.handle, "s_LogCallbackHandler");
  s_LogCallbackHandlerThreaded=lfv(this.handle, "s_LogCallbackHandlerThreaded");
  s_RegisterLogCallbackDeprecated=lfv(this.handle, "s_RegisterLogCallbackDeprecated");
  wantsToQuit=lfv(this.handle, "wantsToQuit");
  static get Quit_1() {
    return Il2Cpp.Api.Application._Quit_1();
  }
  static get Quit() {
    return Il2Cpp.Api.Application._Quit();
  }
  static get isPlaying() {
    return Il2Cpp.Api.Application._get_isPlaying();
  }
  static get dataPath() {
    return readU16(Il2Cpp.Api.Application._get_dataPath());
  }
  static get streamingAssetsPath() {
    return readU16(Il2Cpp.Api.Application._get_streamingAssetsPath());
  }
  static get persistentDataPath() {
    return readU16(Il2Cpp.Api.Application._get_persistentDataPath());
  }
  static get temporaryCachePath() {
    return readU16(Il2Cpp.Api.Application._get_temporaryCachePath());
  }
  static get unityVersion() {
    return readU16(Il2Cpp.Api.Application._get_unityVersion());
  }
  static get version() {
    return readU16(Il2Cpp.Api.Application._get_version());
  }
  static get identifier() {
    return readU16(Il2Cpp.Api.Application._get_identifier());
  }
  static get productName() {
    return readU16(Il2Cpp.Api.Application._get_productName());
  }
  static get companyName() {
    return readU16(Il2Cpp.Api.Application._get_companyName());
  }
  static get cloudProjectId() {
    return readU16(Il2Cpp.Api.Application._get_cloudProjectId());
  }
  static get_internetReachability() {
    return Il2Cpp.Api.Application._get_internetReachability();
  }
  static OpenURL(e) {
    return Il2Cpp.Api.Application._OpenURL(allocUStr(e));
  }
  static targetFrameRate(e) {
    return Il2Cpp.Api.Application._set_targetFrameRate(e);
  }
  static SetLogCallbackDefined(e) {
    return Il2Cpp.Api.Application._SetLogCallbackDefined(e);
  }
  static GetStackTraceLogType(e) {
    return Il2Cpp.Api.Application._GetStackTraceLogType(e);
  }
  static get platform() {
    return Il2Cpp.Api.Application._get_platform();
  }
  static get systemLanguage() {
    return Il2Cpp.Api.Application._get_platform();
  }
  static get internetReachability() {
    return Il2Cpp.Api.Application._get_internetReachability();
  }
  static CallLowMemory() {
    return Il2Cpp.Api.Application._CallLowMemory();
  }
  static add_logMessageReceived(e) {
    return Il2Cpp.Api.Application._add_logMessageReceived(e);
  }
  static remove_logMessageReceived(e) {
    return Il2Cpp.Api.Application._remove_logMessageReceived(e);
  }
  static add_logMessageReceivedThreaded(e) {
    return Il2Cpp.Api.Application._add_logMessageReceivedThreaded(e);
  }
  static remove_logMessageReceivedThreaded(e) {
    return Il2Cpp.Api.Application._remove_logMessageReceivedThreaded(e);
  }
  static CallLogCallback(e, a, t, i) {
    return Il2Cpp.Api.Application._CallLogCallback(allocUStr(e), allocUStr(a), t, i);
  }
  static Internal_ApplicationWantsToQuit() {
    return Il2Cpp.Api.Application._Internal_ApplicationWantsToQuit();
  }
  static Internal_ApplicationQuit() {
    return Il2Cpp.Api.Application._Internal_ApplicationQuit();
  }
  static Internal_ApplicationUnload() {
    return Il2Cpp.Api.Application._Internal_ApplicationUnload();
  }
  static InvokeOnBeforeRender() {
    return Il2Cpp.Api.Application._InvokeOnBeforeRender();
  }
  static InvokeFocusChanged(e) {
    return Il2Cpp.Api.Application._InvokeFocusChanged(e);
  }
  static InvokeDeepLinkActivated(e) {
    return Il2Cpp.Api.Application._InvokeDeepLinkActivated(allocUStr(e));
  }
  static RegisterLogCallback_1(e) {
    return Il2Cpp.Api.Application._RegisterLogCallback(e);
  }
  static RegisterLogCallback_2(e, a) {
    return Il2Cpp.Api.Application._RegisterLogCallback(e, a);
  }
  static get isEditor() {
    return Il2Cpp.Api.Application._get_isEditor();
  }
  static GetStackTraceLogType_1(e) {
    return Il2Cpp.Api.Application._GetStackTraceLogType(e);
  }
}

exports.UnityEngine_Application_impl = l, Il2Cpp.Application = l;

},{"../Type/class":137}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":37,"./class":38}],40:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, n, t, i) {
  var o, r = arguments.length, g = r < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, t) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) g = Reflect.decorate(e, n, t, i); else for (var p = e.length - 1; p >= 0; p--) (o = e[p]) && (g = (r < 3 ? o(g) : r > 3 ? o(n, t, g) : o(n, t)) || g);
  return r > 3 && g && Object.defineProperty(n, t, g), g;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const n = require("decorator-cache-getter");

class t {
  static get _cctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", ".cctor", 0, "pointer", [ "pointer" ]);
  }
  static get Break() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Break", 0, "void", [ "void" ]);
  }
  static get DrawLine_3() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 3, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get DrawLine_4() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 4, "void", [ "pointer", "pointer", "pointer", "float" ]);
  }
  static get DrawLine_5() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawLine", 5, "void", [ "pointer", "pointer", "pointer", "float", "bool" ]);
  }
  static get DrawRay_3() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 3, "void", [ "pointer", "pointer", "float" ]);
  }
  static get DrawRay_4() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "DrawRay", 4, "void", [ "pointer", "pointer", "float", "bool" ]);
  }
  static get Log_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 1, "void", [ "pointer" ]);
  }
  static get Log_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "Log", 2, "void", [ "pointer", "pointer" ]);
  }
  static get LogAssertion_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogAssertion", 1, "void", [ "pointer" ]);
  }
  static get LogError_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 1, "void", [ "pointer" ]);
  }
  static get LogError_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogError", 2, "void", [ "pointer", "pointer" ]);
  }
  static get LogErrorFormat_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogErrorFormat", 2, "void", [ "pointer", "pointer" ]);
  }
  static get LogException_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 1, "void", [ "pointer" ]);
  }
  static get LogException_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogException", 2, "void", [ "pointer", "pointer" ]);
  }
  static get LogFormat_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogFormat", 2, "void", [ "pointer", "pointer" ]);
  }
  static get LogWarning_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 1, "void", [ "pointer" ]);
  }
  static get LogWarning_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarning", 2, "void", [ "pointer", "pointer" ]);
  }
  static get LogWarningFormat_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "LogWarningFormat", 2, "void", [ "pointer", "pointer" ]);
  }
  static get get_isDebugBuild() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_isDebugBuild", 0, "bool", [ "void" ]);
  }
  static get get_unityLogger() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Debug", "get_unityLogger", 0, "pointer", [ "void" ]);
  }
}

e([ n.cache ], t, "_cctor", null), e([ n.cache ], t, "Break", null), e([ n.cache ], t, "DrawLine_3", null), 
e([ n.cache ], t, "DrawLine_4", null), e([ n.cache ], t, "DrawLine_5", null), e([ n.cache ], t, "DrawRay_3", null), 
e([ n.cache ], t, "DrawRay_4", null), e([ n.cache ], t, "Log_1", null), e([ n.cache ], t, "Log_2", null), 
e([ n.cache ], t, "LogAssertion_1", null), e([ n.cache ], t, "LogError_1", null), 
e([ n.cache ], t, "LogError_2", null), e([ n.cache ], t, "LogErrorFormat_2", null), 
e([ n.cache ], t, "LogException_1", null), e([ n.cache ], t, "LogException_2", null), 
e([ n.cache ], t, "LogFormat_2", null), e([ n.cache ], t, "LogWarning_1", null), 
e([ n.cache ], t, "LogWarning_2", null), e([ n.cache ], t, "LogWarningFormat_2", null), 
e([ n.cache ], t, "get_isDebugBuild", null), e([ n.cache ], t, "get_unityLogger", null), 
Il2Cpp.Api.Debug = t;

},{"decorator-cache-getter":193}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.HookDebugLog = void 0;

const o = () => {
  let o = find_method("UnityEngine.CoreModule", "Logger", "Log", 2, !0);
  LOGD("[*] Hook : UnityEngine.CoreModule.Logger.Log : " + o), A(o, ((o, e) => {
    LOGG(`\n[*] Logger.LOG('${o[1]}' , '${readU16(o[2])}')  <---  LR : ${checkCtx(e, "LR")}`);
  }));
  let e = Il2Cpp.Api.Debug.LogException_2;
  LOGD("[*] Hook : UnityEngine.CoreModule.Debug.LogException : " + e), A(e, ((o, e) => {
    let g = callFunction(find_method("mscorlib", "Exception", "ToString", 0, !0), o[0]);
    LOGG(`\n[*] Logger.LOG('${readU16(g)}')  <---  LR : ${checkCtx(e, "LR")}`);
  }));
};

exports.HookDebugLog = o, globalThis.HookDebugLog = o;

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./export");

},{"./api":40,"./export":41}],43:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var o, r = arguments.length, p = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, n, i); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (p = (r < 3 ? o(p) : r > 3 ? o(t, n, p) : o(t, n)) || p);
  return r > 3 && p && Object.defineProperty(t, n, p), p;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _Clone_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "Clone", 0, "pointer", [ "pointer" ]);
  }
  static get _Combine_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Combine", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Combine_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Combine", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _CombineImpl_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CombineImpl", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _CreateDelegate_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CreateDelegate", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _CreateDelegate_3() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "CreateDelegate", 3, "pointer", [ "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _DynamicInvoke() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DynamicInvoke", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _DynamicInvokeImpl() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DynamicInvokeImpl", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Equals() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Equals", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _GetHashCode() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetHashCode", 0, "int", [ "pointer" ]);
  }
  static get _GetInvocationList() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetInvocationList", 0, "pointer", [ "pointer" ]);
  }
  static get _GetMethodImpl() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetMethodImpl", 0, "pointer", [ "pointer" ]);
  }
  static get _GetObjectData() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetObjectData", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get _GetVirtualMethod_internal() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetVirtualMethod_internal", 0, "pointer", [ "pointer" ]);
  }
  static get _op_Equality() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "op_Equality", 2, "bool", [ "pointer", "pointer" ]);
  }
  static get _op_Inequality() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "op_Inequality", 2, "bool", [ "pointer", "pointer" ]);
  }
  static get _Remove() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "Remove", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _RemoveImpl() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RemoveImpl", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _return_type_match() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "return_type_match", 2, "bool", [ "pointer", "pointer" ]);
  }
  static get _get_Method() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "get_Method", 0, "pointer", [ "pointer" ]);
  }
  static get _get_Target() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "get_Target", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_Clone_0", null), e([ t.cache ], n, "_Combine_1", null), e([ t.cache ], n, "_Combine_2", null), 
e([ t.cache ], n, "_CombineImpl_1", null), e([ t.cache ], n, "_CreateDelegate_2", null), 
e([ t.cache ], n, "_CreateDelegate_3", null), e([ t.cache ], n, "_DynamicInvoke", null), 
e([ t.cache ], n, "_DynamicInvokeImpl", null), e([ t.cache ], n, "_Equals", null), 
e([ t.cache ], n, "_GetHashCode", null), e([ t.cache ], n, "_GetInvocationList", null), 
e([ t.cache ], n, "_GetMethodImpl", null), e([ t.cache ], n, "_GetObjectData", null), 
e([ t.cache ], n, "_GetVirtualMethod_internal", null), e([ t.cache ], n, "_op_Equality", null), 
e([ t.cache ], n, "_op_Inequality", null), e([ t.cache ], n, "_Remove", null), e([ t.cache ], n, "_RemoveImpl", null), 
e([ t.cache ], n, "_return_type_match", null), e([ t.cache ], n, "_get_Method", null), 
e([ t.cache ], n, "_get_Target", null), mscorlib.Api.Delegate = n;

},{"decorator-cache-getter":193}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_Object_impl = exports.mscorlib_System_Delegate_impl = void 0;

const e = require("../class");

Object.defineProperty(exports, "mscorlib_System_Object_impl", {
  enumerable: !0,
  get: function() {
    return e.mscorlib_System_Object_impl;
  }
});

class t extends e.mscorlib_System_Object_impl {
  data=lfv(this.handle, "data", findClass("Delegate"));
  delegate_trampoline=lfv(this.handle, "delegate_trampoline", findClass("Delegate"));
  extra_arg=lfv(this.handle, "extra_arg", findClass("Delegate"));
  invoke_impl=lfv(this.handle, "invoke_impl", findClass("Delegate"));
  m_target=lfv(this.handle, "m_target", findClass("Delegate"));
  method=lfv(this.handle, "method", findClass("Delegate"));
  method_code=lfv(this.handle, "method_code", findClass("Delegate"));
  method_info=lfv(this.handle, "method_info", findClass("Delegate"));
  method_is_virtual=lfv(this.handle, "method_is_virtual", findClass("Delegate"));
  method_ptr=lfv(this.handle, "method_ptr", findClass("Delegate"));
  original_method_info=lfv(this.handle, "original_method_info", findClass("Delegate"));
  constructor(e) {
    super(e);
  }
  Clone_0() {
    return new mscorlib.Api.Delegate._Clone_0(this.handle);
  }
  Combine_1(e) {
    return new mscorlib.Api.Delegate._Combine_1(this.handle, e.handle);
  }
  Combine_2(e, t) {
    return new mscorlib.Api.Delegate._Combine_2(this.handle, e.handle, t.handle);
  }
  CreateDelegate_3(e, t) {
    return new mscorlib.Api.Delegate._CreateDelegate_3(this.handle, e, t);
  }
  DynamicInvoke(e) {
    return new mscorlib.Api.Delegate._DynamicInvoke(this.handle, e);
  }
  DynamicInvokeImpl(e) {
    return new mscorlib.Api.Delegate._DynamicInvokeImpl(this.handle, e);
  }
  Equals(e) {
    return new mscorlib.Api.Delegate._Equals(this.handle, e.handle);
  }
  GetHashCode() {
    return new mscorlib.Api.Delegate._GetHashCode(this.handle);
  }
  GetInvocationList() {
    return new mscorlib.Api.Delegate._GetInvocationList(this.handle);
  }
  GetMethodImpl() {
    return new mscorlib.Api.Delegate._GetMethodImpl(this.handle);
  }
  GetObjectData(e, t) {
    return new mscorlib.Api.Delegate._GetObjectData(this.handle, e, t);
  }
  GetVirtualMethod_internal() {
    return new mscorlib.Api.Delegate._GetVirtualMethod_internal(this.handle);
  }
  op_Equality(e, t) {
    return new mscorlib.Api.Delegate._op_Equality(this.handle, e.handle, t.handle);
  }
  op_Inequality(e, t) {
    return new mscorlib.Api.Delegate._op_Inequality(this.handle, e.handle, t.handle);
  }
  Remove(e, t) {
    return new mscorlib.Api.Delegate._Remove(this.handle, e.handle, t.handle);
  }
  RemoveImpl(e) {
    return new mscorlib.Api.Delegate._RemoveImpl(this.handle, e.handle);
  }
  return_type_match(e, t) {
    return new mscorlib.Api.Delegate._return_type_match(this.handle, e.handle, t.handle);
  }
  get_Method() {
    return new mscorlib.Api.Delegate._get_Method(this.handle);
  }
  get_Target() {
    return new mscorlib.Api.Delegate._get_Target(this.handle);
  }
}

exports.mscorlib_System_Delegate_impl = t, mscorlib.Delegate = t;

},{"../class":159}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":43,"./class":44}],46:[function(require,module,exports){
"use strict";

},{}],47:[function(require,module,exports){
"use strict";

},{}],48:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, l = arguments.length, o = l < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, i); else for (var s = e.length - 1; s >= 0; s--) (r = e[s]) && (o = (l < 3 ? r(o) : l > 3 ? r(t, n, o) : r(t, n)) || o);
  return l > 3 && o && Object.defineProperty(t, n, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _ctor_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _AddListener() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "AddListener", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _AddPersistentInvokableCall() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "AddPersistentInvokableCall", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _ClearPersistent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "ClearPersistent", 0, "void", []);
  }
  static get _PrepareInvoke() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "PrepareInvoke", 0, "pointer", []);
  }
  static get _RemoveListener() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.InvokableCallList", "RemoveListener", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
}

e([ t.cache ], n, "_ctor_0", null), e([ t.cache ], n, "_AddListener", null), e([ t.cache ], n, "_AddPersistentInvokableCall", null), 
e([ t.cache ], n, "_ClearPersistent", null), e([ t.cache ], n, "_PrepareInvoke", null), 
e([ t.cache ], n, "_RemoveListener", null), mscorlib.Api.InvokableCallList = n;

},{"decorator-cache-getter":193}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_Object_impl = exports.InvokableCallList_impl = void 0;

const e = require("../class");

Object.defineProperty(exports, "mscorlib_System_Object_impl", {
  enumerable: !0,
  get: function() {
    return e.mscorlib_System_Object_impl;
  }
});

class l extends e.mscorlib_System_Object_impl {
  m_ExecutingCalls=lfv(this.handle, "m_ExecutingCalls", findClass("InvokableCallList"));
  m_NeedsUpdate=lfv(this.handle, "m_NeedsUpdate", findClass("InvokableCallList"));
  m_PersistentCalls=lfv(this.handle, "m_PersistentCalls", findClass("InvokableCallList"));
  m_RuntimeCalls=lfv(this.handle, "m_RuntimeCalls", findClass("InvokableCallList"));
  constructor(e) {
    super(e);
  }
  static get ctor_0() {
    return new l(mscorlib.Api.InvokableCallList._ctor_0(alloc()));
  }
  AddListener(e) {
    return new mscorlib.Api.InvokableCallList._AddListener(this.handle, e);
  }
  ClearPersistent() {
    return new mscorlib.Api.InvokableCallList._ClearPersistent(this.handle);
  }
  PrepareInvoke() {
    return new mscorlib.Api.InvokableCallList._PrepareInvoke(this.handle);
  }
  RemoveListener_2(e, l) {
    return new mscorlib.Api.InvokableCallList._RemoveListener(this.handle, e, l);
  }
}

exports.InvokableCallList_impl = l, mscorlib.InvokableCallList = l;

},{"../class":159}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":48,"./class":49}],51:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, o) {
  var i, r = arguments.length, g = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) g = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (i = e[l]) && (g = (r < 3 ? i(g) : r > 3 ? i(t, n, g) : i(t, n)) || g);
  return r > 3 && g && Object.defineProperty(t, n, g), g;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _cctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", ".cctor", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get IsLogTypeAllowed() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "IsLogTypeAllowed", 1, "bool", [ "pointer", "int" ]);
  }
  static get Log_string_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get Log_logType_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 2, "void", [ "pointer", "int", "pointer" ]);
  }
  static get Log_logType_object_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "Log", 3, "void", [ "pointer", "int", "pointer", "pointer" ]);
  }
  static get LogError_string_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogError", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get LogException_exception() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 1, "void", [ "pointer", "pointer" ]);
  }
  static get LogException_exception_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogException", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get LogFormat_logType_string_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 3, "void", [ "pointer", "int", "pointer", "pointer" ]);
  }
  static get LogFormat_logType_object_string_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogFormat", 4, "void", [ "pointer", "int", "pointer", "pointer", "pointer" ]);
  }
  static get LogWarning_string_object() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "LogWarning", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get set_filterLogType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_filterLogType", 1, "void", [ "pointer", "int" ]);
  }
  static get get_filterLogType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_filterLogType", 0, "int", [ "pointer" ]);
  }
  static get set_logEnabled() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logEnabled", 1, "void", [ "pointer", "bool" ]);
  }
  static get get_logEnabled() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logEnabled", 0, "bool", [ "pointer" ]);
  }
  static get set_logHandler() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "set_logHandler", 1, "void", [ "pointer", "pointer" ]);
  }
  static get get_logHandler() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Logger", "get_logHandler", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_cctor", null), e([ t.cache ], n, "IsLogTypeAllowed", null), 
e([ t.cache ], n, "Log_string_object", null), e([ t.cache ], n, "Log_logType_object", null), 
e([ t.cache ], n, "Log_logType_object_object", null), e([ t.cache ], n, "LogError_string_object", null), 
e([ t.cache ], n, "LogException_exception", null), e([ t.cache ], n, "LogException_exception_object", null), 
e([ t.cache ], n, "LogFormat_logType_string_object", null), e([ t.cache ], n, "LogFormat_logType_object_string_object", null), 
e([ t.cache ], n, "LogWarning_string_object", null), e([ t.cache ], n, "set_filterLogType", null), 
e([ t.cache ], n, "get_filterLogType", null), e([ t.cache ], n, "set_logEnabled", null), 
e([ t.cache ], n, "get_logEnabled", null), e([ t.cache ], n, "set_logHandler", null), 
e([ t.cache ], n, "get_logHandler", null), Il2Cpp.Api.Logger = n;

},{"decorator-cache-getter":193}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api");

},{"./api":51}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class t {
  static get _cctor() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "cctor", 0, "void", []);
  }
  static get _ctor() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", ".ctor", 0, "void", [ "pointer" ]);
  }
  static get _CreateNIE() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "CreateNIE", 0, "pointer", [ "pointer" ]);
  }
  static get _Equals() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "Equals", 0, "bool", [ "pointer", "pointer" ]);
  }
  static get _filter_by_type_name() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "filter_by_type_name", 2, "bool", [ "pointer", "pointer", "pointer" ]);
  }
  static get _filter_by_type_name_ignore_case() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "filter_by_type_name_ignore_case", 2, "bool", [ "pointer", "pointer", "pointer" ]);
  }
  static get _GetCustomAttributes() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetCustomAttributes", 1, "pointer", [ "pointer", "bool" ]);
  }
  static get _GetCustomAttributes_1() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetCustomAttributes", 2, "pointer", [ "pointer", "pointer", "bool" ]);
  }
  static get _GetGuidInternal() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetGuidInternal", 0, "pointer", [ "pointer" ]);
  }
  static get _GetHashCode() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetHashCode", 0, "int32", [ "pointer" ]);
  }
  static get _GetModuleVersionId() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetModuleVersionId", 0, "pointer", [ "pointer" ]);
  }
  static get _GetObjectData() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "GetObjectData", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get _IsDefined() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "IsDefined", 2, "bool", [ "pointer", "pointer", "bool" ]);
  }
  static get _IsResource() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "IsResource", 0, "bool", [ "pointer" ]);
  }
  static get _op_Equality() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "op_Equality", 2, "bool", [ "pointer", "pointer" ]);
  }
  static get _ToString() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "ToString", 0, "pointer", [ "pointer" ]);
  }
  static get _get_Assembly() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Assembly", 0, "pointer", [ "pointer" ]);
  }
  static get _get_ModuleVersionId() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_ModuleVersionId", 0, "pointer", [ "pointer" ]);
  }
  static get _get_ScopeName() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_ScopeName", 0, "pointer", [ "pointer" ]);
  }
}

mscorlib.Api.Module = t;

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_Reflection_Module_impl = void 0;

const e = require("../Type/class");

class t extends e.mscorlib_System_Type_impl {
  inter=lfv(this.handle, "_impl");
  assembly=lfv(this.handle, "assembly", findClass("Module", [ "mscorlib" ]));
  defaultBindingFlags=lfv(this.handle, "defaultBindingFlags");
  FilterTypeName=lfv(this.handle, "FilterTypeName");
  FilterTypeNameIgnoreCase=lfv(this.handle, "FilterTypeNameIgnoreCase");
  fqname=readU16(lfv(this.handle, "fqname"));
  is_resource=lfv(this.handle, "is_resource");
  _name=readU16(lfv(this.handle, "name"));
  scopename=readU16(lfv(this.handle, "scopename"));
  token=lfv(this.handle, "token");
  static get ctor() {
    return new t(mscorlib.Api.Module._ctor(alloc()));
  }
  static get _cctor() {
    return new t(mscorlib.Api.Module._cctor(alloc()));
  }
  CreateNIE() {
    return mscorlib.Api.Module._CreateNIE(this.handle);
  }
  Equals(e) {
    return mscorlib.Api.Module._Equals(this.handle, e);
  }
  filter_by_type_name(e, t) {
    return mscorlib.Api.Module._filter_by_type_name(this.handle, e.handle, t);
  }
  filter_by_type_name_ignore_case(e, t) {
    return mscorlib.Api.Module._filter_by_type_name_ignore_case(this.handle, e.handle, t);
  }
  GetCustomAttributes_1(e) {
    return mscorlib.Api.Module._GetCustomAttributes(this.handle, e);
  }
  GetCustomAttributes_2(e, t) {
    return mscorlib.Api.Module._GetCustomAttributes_1(this.handle, e.handle, t);
  }
  GetGuidInternal() {
    return readU16(mscorlib.Api.Module._GetGuidInternal(this.handle));
  }
  GetHashCode() {
    return mscorlib.Api.Module._GetHashCode(this.handle);
  }
  GetModuleVersionId() {
    return mscorlib.Api.Module._GetModuleVersionId(this.handle);
  }
  GetObjectData(e, t) {
    return mscorlib.Api.Module._GetObjectData(this.handle, e, t);
  }
  IsDefined(e, t) {
    return mscorlib.Api.Module._IsDefined(this.handle, e.handle, t);
  }
  IsResource() {
    return mscorlib.Api.Module._IsResource(this.handle);
  }
  op_Equality(e) {
    return mscorlib.Api.Module._op_Equality(this.handle, e.handle);
  }
  ToString() {
    return readU16(mscorlib.Api.Module._ToString(this.handle));
  }
  get_Assembly() {
    return mscorlib.Api.Module._get_Assembly(this.handle);
  }
  get_ModuleVersionId() {
    return mscorlib.Api.Module._get_ModuleVersionId(this.handle);
  }
  get_ScopeName() {
    return readU16(mscorlib.Api.Module._get_ScopeName(this.handle));
  }
}

exports.mscorlib_System_Reflection_Module_impl = t, mscorlib.Module = t;

},{"../Type/class":137}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":53,"./class":54}],56:[function(require,module,exports){
"use strict";

},{}],57:[function(require,module,exports){
"use strict";

},{}],58:[function(require,module,exports){
"use strict";

},{}],59:[function(require,module,exports){
"use strict";

},{}],60:[function(require,module,exports){
"use strict";

},{}],61:[function(require,module,exports){
"use strict";

},{}],62:[function(require,module,exports){
"use strict";

},{}],63:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, n, e, i) {
  var r, o = arguments.length, c = o < 3 ? n : null === i ? i = Object.getOwnPropertyDescriptor(n, e) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, n, e, i); else for (var p = t.length - 1; p >= 0; p--) (r = t[p]) && (c = (o < 3 ? r(c) : o > 3 ? r(n, e, c) : r(n, e)) || c);
  return o > 3 && c && Object.defineProperty(n, e, c), c;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const n = require("decorator-cache-getter");

require("./interface");

class e {
  static get _ctor() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _OnFinishSubmit() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnFinishSubmit", 0, "pointer", [ "pointer" ]);
  }
  static get _OnPointerClick() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnPointerClick", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _OnSubmit() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "OnSubmit", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Press() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "Press", 0, "pointer", [ "pointer" ]);
  }
  static get _set_onClick() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "set_onClick", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_onClick() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Button", "get_onClick", 0, "pointer", [ "pointer" ]);
  }
}

t([ n.cache ], e, "_ctor", null), t([ n.cache ], e, "_OnFinishSubmit", null), t([ n.cache ], e, "_OnPointerClick", null), 
t([ n.cache ], e, "_OnSubmit", null), t([ n.cache ], e, "_Press", null), t([ n.cache ], e, "_set_onClick", null), 
t([ n.cache ], e, "_get_onClick", null), Il2Cpp.Api.Button = e;

},{"./interface":67,"decorator-cache-getter":193}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ButtonClickedEvent = exports.ButtonImpl = void 0;

const t = require("../../../../../../UnityEventBase/class"), e = require("../class");

class n extends t.UnityEventBase_impl {}

exports.ButtonClickedEvent = n;

class i extends e.SelectableImpl {
  m_OnClick=new n(lfv(this.handle, "m_OnClick"));
  ctor_0() {
    return new Il2Cpp.Button(Il2Cpp.Api.Button._ctor(alloc()));
  }
  OnFinishSubmit() {
    return Il2Cpp.Api.Button._OnFinishSubmit(this.handle);
  }
  OnPointerClick(t) {
    return Il2Cpp.Api.Button._OnPointerClick(this.handle, t);
  }
  OnSubmit(t) {
    return Il2Cpp.Api.Button._OnSubmit(this.handle, t);
  }
  Press() {
    return Il2Cpp.Api.Button._Press(this.handle);
  }
  get_onClick() {
    return Il2Cpp.Api.Button._get_onClick(this.handle);
  }
  set_onClick(t) {
    return Il2Cpp.Api.Button._set_onClick(this.handle, t);
  }
}

exports.ButtonImpl = i, Il2Cpp.Button = i;

},{"../../../../../../UnityEventBase/class":141,"../class":69}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.HideClickedObj = exports.OnButtonClick = exports.OnPointerClick = void 0;

const e = require("../../../../../../AbstractEventData/BaseEventData/PointerEventData/class");

function t() {
  let t;
  switch (arguments[0]) {
   default:
    if (t = Il2Cpp.Api.Button._OnPointerClick, null == t || t.isNull()) break;
    LOGE("\nEnable Hook OnPointerClick at " + t + "(" + t.sub(soAddr) + ")\n"), A(Il2Cpp.Api.Button._OnPointerClick, (e => {
      LOGW("\n" + getLine(38)), LOGD("public void OnPointerClick( " + e[0] + " , " + e[1] + " );"), 
      n(e[1]);
    }));
    break;

   case 0:
    if (t = find_method("UnityEngine.UI", "PointerInputModule", "DeselectIfSelectionChanged", 2), 
    t.isNull()) break;
    LOGE("\nEnable Hook DeselectIfSelectionChanged at " + t + "(" + t.sub(soAddr) + ")\n"), 
    A(t, (e => {
      LOGW("\n" + getLine(38)), LOGD("protected void DeselectIfSelectionChanged(Ins = " + e[0] + " , GameObject = " + e[1] + " , BaseEventData(" + findClass("BaseEventData") + ") = " + e[2] + " );"), 
      e[1].isNull() || showGameObject(e[1]);
    }));
    break;

   case 1:
    if (t = find_method("UnityEngine.UI", "ScrollRect", "OnInitializePotentialDrag", 1), 
    t.isNull()) break;
    LOGE("\nEnable Hook OnInitializePotentialDrag at " + t + "(" + t.sub(soAddr) + ")\n"), 
    A(t, (e => {
      LOGW("\n" + getLine(38)), LOGD("public void OnInitializePotentialDrag( " + e[0] + " , " + e[1] + " );"), 
      n(e[1]);
    }));
    break;

   case 2:
    A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessMove", 1), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void ProcessMove( " + e[1] + " );"), 
      n(e[1]);
    }));
    break;

   case 3:
    A(find_method("UnityEngine.UI", "PointerInputModule", "ProcessDrag", 1), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void ProcessDrag( " + e[1] + " );"), 
      n(e[1]);
    }));
    break;

   case 4:
    A(find_method("UnityEngine.UI", "BaseInputModule", "HandlePointerExitAndEnter", 2), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void HandlePointerExitAndEnter( " + e[1] + " , " + e[2] + ")"), 
      n(e[1]);
    }));
    break;

   case 5:
    A(find_method("UnityEngine.UI", "PointerEventData", "set_pointerPress", 1), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void set_pointerPress( " + e[1] + " );"), 
      showGameObject(e[1]);
    }));
    break;

   case 6:
    A(find_method("UnityEngine.UI", "PointerInputModule", "GetPointerData", 3), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void GetPointerData( " + e[2] + " );"), 
      showGameObject(e[1]), showEventData(e[2]);
    }));
    break;

   case 7:
    A(find_method("UnityEngine.UI", "EventSystem", "RaycastAll", 2), (e => {
      LOGW("\n" + getLine(38)), LOGD(`protected virtual Void RaycastAll( ${e[0]} , ${e[1]} , ${e[2]} );`), 
      n(e[1]);
    }));
    break;

   case 8:
    A(find_method("UnityEngine.UI", "PointerInputModule", "GetTouchPointerEventData", 3), (e => {}), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void GetTouchPointerEventData "), 
      n(e);
    }));

   case 9:
    A(find_method("UnityEngine.UI", "Selectable", "OnPointerExit", 1), (e => {
      LOGW("\n" + getLine(38)), LOGD("protected virtual Void OnPointerExit( " + e[1] + " );"), 
      n(e[1]);
    }));
  }
  function n(t) {
    if (t.isNull()) return;
    let n = new e.PointerEventImpl(t).get_pointerEnter();
    n.handle.isNull() || showGameObject(n.handle);
  }
}

exports.OnPointerClick = t;

const n = () => {
  A(Il2Cpp.Api.Button._OnPointerClick, (e => {
    let t, n = e[0], i = new Il2Cpp.Button(n).m_OnClick, o = getGameObject(n);
    if (null == o) throw new Error("Il2Cpp.GameObject is null");
    t = new Il2Cpp.GameObject(o), LOGH("\n[*] " + n + " ---\x3e " + t.get_name() + " { G:" + o + " | T:" + t.get_transform().handle + " }"), 
    LOGO("    [-] InvokableCallList(" + findClass("InvokableCallList") + ") m_Calls " + i.m_Calls.handle), 
    setTimeout((() => function(e) {
      if ("arm" != Process.arch) return;
      let t = e.m_Calls.m_PersistentCalls, n = e.m_Calls.m_ExecutingCalls, i = e.m_Calls.m_RuntimeCalls;
      LOGD(`\t${parseList(t).toSimpleString()}`), LOGD(`\t${parseList(n).toSimpleString()}`), 
      LOGD(`\t${parseList(i).toSimpleString()}`);
    }(i)), 10);
  }));
};

exports.OnButtonClick = n;

const i = (t, n) => {
  let i = find_method("UnityEngine.UI", "Button", "OnPointerClick", 1), o = new NativeFunction(i, "void", [ "pointer", "pointer", "pointer", "pointer" ]);
  Interceptor.revert(i), Interceptor.replace(i, new NativeCallback((function(t, n, i, l) {
    if (o(t, n, i, l), n.isNull()) return;
    new e.PointerEventImpl(n).get_pointerEnter().get_name();
  }), "void", [ "pointer", "pointer", "pointer", "pointer" ])), setClick(t, n);
};

exports.HideClickedObj = i, globalThis.HookOnPointerClick = t, globalThis.B_Button = n, 
globalThis.HideClickedObj = i;

},{"../../../../../../AbstractEventData/BaseEventData/PointerEventData/class":25}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./export"), require("./class"), require("./interface");

},{"./api":63,"./class":64,"./export":65,"./interface":67}],67:[function(require,module,exports){
"use strict";

},{}],68:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, c) {
  var n, i = arguments.length, o = i < 3 ? t : null === c ? c = Object.getOwnPropertyDescriptor(t, r) : c;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, c); else for (var l = e.length - 1; l >= 0; l--) (n = e[l]) && (o = (i < 3 ? n(o) : i > 3 ? n(t, r, o) : n(t, r)) || o);
  return i > 3 && o && Object.defineProperty(t, r, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

require("./interface");

class r {
  static get _Awake() {
    return Il2Cpp.Api.t("UnityEngine.UI", "UnityEngine.UI.Selectable", "Awake", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], r, "_Awake", null), Il2Cpp.Api.Selectable = r;

},{"./interface":71,"decorator-cache-getter":193}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SelectableImpl = void 0;

const e = require("../class");

class l extends e.MonoBehaviourImpl {
  Awake() {
    return Il2Cpp.Api.Selectable._Awake(this.handle);
  }
}

exports.SelectableImpl = l, Il2Cpp.Selectable = l;

},{"../class":73}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./Button/include"), require("./class"), require("./interface"), require("./api");

},{"./Button/include":66,"./api":68,"./class":69,"./interface":71}],71:[function(require,module,exports){
"use strict";

},{}],72:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, n, o) {
  var i, r = arguments.length, u = r < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, n) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, e, n, o); else for (var p = t.length - 1; p >= 0; p--) (i = t[p]) && (u = (r < 3 ? i(u) : r > 3 ? i(e, n, u) : i(e, n)) || u);
  return r > 3 && u && Object.defineProperty(e, n, u), u;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter");

require("./interface");

class n {
  static get _ctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _CancelInvoke() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 0, "void", [ "pointer" ]);
  }
  static get _CancelInvoke_String() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "CancelInvoke", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _InvokeRepeating() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "InvokeRepeating", 3, "void", [ "pointer", "float", "float", "float" ]);
  }
  static get _Invoke() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "Invoke", 2, "void", [ "pointer", "float", "float" ]);
  }
  static get _IsInvoking_String() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "IsInvoking", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _IsInvoking_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "IsInvoking", 0, "bool", [ "pointer" ]);
  }
  static get _print() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "print", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _StartCoroutine_IEnumerator() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, [ "System.Collections.IEnumerator" ], "pointer", [ "pointer", "pointer" ]);
  }
  static get _StartCoroutine_String() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 1, [ "System.String" ], "pointer", [ "pointer", "pointer" ]);
  }
  static get _StartCoroutine_String_Object() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine", 2, [ "System.String", "System.Object" ], "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _StartCoroutine_Auto() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StartCoroutine_Auto", 1, [ "System.Collections.IEnumerator" ], "pointer", [ "pointer", "pointer" ]);
  }
  static get _StopAllCoroutines() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopAllCoroutines", 0, "void", [ "pointer" ]);
  }
  static get _StopCoroutine_Coroutine() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, [ "System.Collections.IEnumerator" ], "void", [ "pointer", "pointer" ]);
  }
  static get _StopCoroutine_String() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, [ "System.String" ], "void", [ "pointer", "pointer" ]);
  }
  static get _StopCoroutine_IEnumerator() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "StopCoroutine", 1, [ "System.Collections.IEnumerator" ], "void", [ "pointer", "pointer" ]);
  }
  static get _set_useGUILayout() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "set_useGUILayout", 1, "void", [ "pointer", "bool" ]);
  }
  static get _get_useGUILayout() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.MonoBehaviour", "get_useGUILayout", 0, "bool", [ "pointer" ]);
  }
}

t([ e.cache ], n, "_ctor", null), t([ e.cache ], n, "_CancelInvoke", null), t([ e.cache ], n, "_CancelInvoke_String", null), 
t([ e.cache ], n, "_InvokeRepeating", null), t([ e.cache ], n, "_Invoke", null), 
t([ e.cache ], n, "_IsInvoking_String", null), t([ e.cache ], n, "_IsInvoking_0", null), 
t([ e.cache ], n, "_print", null), t([ e.cache ], n, "_StartCoroutine_IEnumerator", null), 
t([ e.cache ], n, "_StartCoroutine_String", null), t([ e.cache ], n, "_StartCoroutine_String_Object", null), 
t([ e.cache ], n, "_StartCoroutine_Auto", null), t([ e.cache ], n, "_StopAllCoroutines", null), 
t([ e.cache ], n, "_StopCoroutine_Coroutine", null), t([ e.cache ], n, "_StopCoroutine_String", null), 
t([ e.cache ], n, "_StopCoroutine_IEnumerator", null), t([ e.cache ], n, "_set_useGUILayout", null), 
t([ e.cache ], n, "_get_useGUILayout", null), Il2Cpp.Api.MonoBehaviour = n;

},{"./interface":76,"decorator-cache-getter":193}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MonoBehaviourImpl = void 0;

const e = require("../../class");

class o extends e.ComponentImpl {
  m_Transition=lfv(this.handle, "m_Transition");
  s_SelectableCount=lfv(this.handle, "s_SelectableCount");
  s_Selectables=lfv(this.handle, "s_Selectables");
  m_TargetGraphic=lfv(this.handle, "m_TargetGraphic");
  m_SpriteState=lfv(this.handle, "m_SpriteState");
  m_Navigation=lfv(this.handle, "m_Navigation");
  m_Interactable=lfv(this.handle, "m_Interactable");
  m_GroupsAllowInteraction=lfv(this.handle, "m_GroupsAllowInteraction");
  m_EnableCalled=lfv(this.handle, "m_EnableCalled");
  m_CurrentIndex=lfv(this.handle, "m_CurrentIndex");
  m_Colors=lfv(this.handle, "m_Colors");
  m_CanvasGroupCache=lfv(this.handle, "m_CanvasGroupCache");
  ctor_0() {
    return new o(Il2Cpp.Api.MonoBehaviour._ctor(alloc()));
  }
  CancelInvoke_0() {
    return Il2Cpp.Api.MonoBehaviour._CancelInvoke(this.handle);
  }
  CancelInvoke_methodName(e) {
    return Il2Cpp.Api.MonoBehaviour._CancelInvoke_String(this.handle, allocCStr(e));
  }
  InvokeRepeating(e, o, t) {
    return Il2Cpp.Api.MonoBehaviour._InvokeRepeating(this.handle, allocCStr(e), o, t);
  }
  Invoke(e, o) {
    return Il2Cpp.Api.MonoBehaviour._Invoke(this.handle, allocCStr(e), o);
  }
  IsInvoking_methodName(e) {
    return Il2Cpp.Api.MonoBehaviour._IsInvoking_String(this.handle, allocCStr(e));
  }
  IsInvoking_0() {
    return Il2Cpp.Api.MonoBehaviour._IsInvoking_0(this.handle);
  }
  print(e) {
    return Il2Cpp.Api.MonoBehaviour._print(this.handle, e);
  }
  StartCoroutine_enumerator(e) {
    return Il2Cpp.Api.MonoBehaviour._StartCoroutine_IEnumerator(this.handle, e);
  }
  StartCoroutine_methodName(e) {
    return Il2Cpp.Api.MonoBehaviour._StartCoroutine_String(this.handle, allocCStr(e));
  }
  StartCoroutine_methodName_obj(e, o) {
    return Il2Cpp.Api.MonoBehaviour._StartCoroutine_String_Object(this.handle, allocCStr(e), o);
  }
  StartCoroutine_Auto(e) {
    return Il2Cpp.Api.MonoBehaviour._StartCoroutine_Auto(this.handle, e);
  }
  StopAllCoroutines() {
    return Il2Cpp.Api.MonoBehaviour._StopAllCoroutines(this.handle);
  }
  StopCoroutine_coroutine(e) {
    return Il2Cpp.Api.MonoBehaviour._StopCoroutine_Coroutine(this.handle, e);
  }
  StopCoroutine_methodName(e) {
    return Il2Cpp.Api.MonoBehaviour._StopCoroutine_String(this.handle, allocCStr(e));
  }
  StopCoroutine_enumerator(e) {
    return Il2Cpp.Api.MonoBehaviour._StopCoroutine_IEnumerator(this.handle, e);
  }
  set_useGUILayout(e) {
    return Il2Cpp.Api.MonoBehaviour._set_useGUILayout(this.handle, e);
  }
  get_useGUILayout() {
    return Il2Cpp.Api.MonoBehaviour._get_useGUILayout(this.handle);
  }
}

exports.MonoBehaviourImpl = o, Il2Cpp.MonoBehaviour = o;

},{"../../class":90}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

},{}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./Selectable/include"), require("./api"), require("./class"), require("./export"), 
require("./interface");

},{"./Selectable/include":70,"./api":72,"./class":73,"./export":74,"./interface":76}],76:[function(require,module,exports){
"use strict";

},{}],77:[function(require,module,exports){
"use strict";

},{}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./Animation/include"), require("./Animator/include"), require("./AudioSourse/include"), 
require("./Camera/include"), require("./Light/include"), require("./MonoBehaviour/include"), 
require("./NetworkView/include");

},{"./Animation/include":58,"./Animator/include":59,"./AudioSourse/include":60,"./Camera/include":61,"./Light/include":62,"./MonoBehaviour/include":75,"./NetworkView/include":77}],79:[function(require,module,exports){
"use strict";

},{}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./CharacterController/include");

},{"./CharacterController/include":79}],81:[function(require,module,exports){
"use strict";

},{}],82:[function(require,module,exports){
"use strict";

},{}],83:[function(require,module,exports){
"use strict";

},{}],84:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, n, i) {
  var r, o = arguments.length, l = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(t, e, n, i); else for (var p = t.length - 1; p >= 0; p--) (r = t[p]) && (l = (o < 3 ? r(l) : o > 3 ? r(e, n, l) : r(e, n)) || l);
  return o > 3 && l && Object.defineProperty(e, n, l), l;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter");

require("./interface");

class n {
  static get _ctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", ".ctor", 1, "pointer", [ "pointer" ]);
  }
  static get _GetChild() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "GetChild", 1, "pointer", [ "pointer", "int" ]);
  }
  static get _IsChildOf() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "IsChildOf", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _LookAt() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "LookAt", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Rotate_eulers() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Rotate_eulers_relativeTo() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Rotate_xAngle_yAngle_zAngle() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "Rotate", 3, "pointer", [ "pointer", "float", "float", "float" ]);
  }
  static get _SetAsFirstSibling() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetAsFirstSibling", 0, "pointer", [ "pointer" ]);
  }
  static get _SetParent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetParent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _SetParent_parent_worldPositionStays() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "SetParent", 2, "pointer", [ "pointer", "pointer", "bool" ]);
  }
  static get _TransformDirection() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "TransformDirection", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _TransformPoint() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "TransformPoint", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_childCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_childCount", 0, "int", [ "pointer" ]);
  }
  static get _get_eulerAngles() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_eulerAngles", 0, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_forward() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_forward", 0, "pointer", [ "pointer" ]);
  }
  static get _set_localEulerAngles() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localEulerAngles", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_localEulerAngles() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localEulerAngles", 0, "pointer", [ "pointer" ]);
  }
  static get _set_localPosition() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localPosition", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_localPosition() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localPosition", 0, "pointer", [ "pointer" ]);
  }
  static get _set_localRotation() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localRotation", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_localRotation() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localRotation", 0, "pointer", [ "pointer" ]);
  }
  static get _set_localScale() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_localScale", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_localScale() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localScale", 0, "pointer", [ "pointer" ]);
  }
  static get _get_localToWorldMatrix() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_localToWorldMatrix", 0, "pointer", [ "pointer" ]);
  }
  static get _set_parent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_parent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_parent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_parent", 0, "pointer", [ "pointer" ]);
  }
  static get _set_position() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_position", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_position() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_position", 0, "pointer", [ "pointer", "pointer" ]);
  }
  static get _set_rotation() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "set_rotation", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_rotation() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_rotation", 0, "pointer", [ "pointer" ]);
  }
  static get _get_up() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_up", 0, "pointer", [ "pointer" ]);
  }
  static get _get_worldToLocalMatrix() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Transform", "get_worldToLocalMatrix", 0, "pointer", [ "pointer" ]);
  }
}

t([ e.cache ], n, "_ctor", null), t([ e.cache ], n, "_GetChild", null), t([ e.cache ], n, "_IsChildOf", null), 
t([ e.cache ], n, "_LookAt", null), t([ e.cache ], n, "_Rotate_eulers", null), t([ e.cache ], n, "_Rotate_eulers_relativeTo", null), 
t([ e.cache ], n, "_Rotate_xAngle_yAngle_zAngle", null), t([ e.cache ], n, "_SetAsFirstSibling", null), 
t([ e.cache ], n, "_SetParent", null), t([ e.cache ], n, "_SetParent_parent_worldPositionStays", null), 
t([ e.cache ], n, "_TransformDirection", null), t([ e.cache ], n, "_TransformPoint", null), 
t([ e.cache ], n, "_get_childCount", null), t([ e.cache ], n, "_get_eulerAngles", null), 
t([ e.cache ], n, "_get_forward", null), t([ e.cache ], n, "_set_localEulerAngles", null), 
t([ e.cache ], n, "_get_localEulerAngles", null), t([ e.cache ], n, "_set_localPosition", null), 
t([ e.cache ], n, "_get_localPosition", null), t([ e.cache ], n, "_set_localRotation", null), 
t([ e.cache ], n, "_get_localRotation", null), t([ e.cache ], n, "_set_localScale", null), 
t([ e.cache ], n, "_get_localScale", null), t([ e.cache ], n, "_get_localToWorldMatrix", null), 
t([ e.cache ], n, "_set_parent", null), t([ e.cache ], n, "_get_parent", null), 
t([ e.cache ], n, "_set_position", null), t([ e.cache ], n, "_get_position", null), 
t([ e.cache ], n, "_set_rotation", null), t([ e.cache ], n, "_get_rotation", null), 
t([ e.cache ], n, "_get_up", null), t([ e.cache ], n, "_get_worldToLocalMatrix", null), 
Il2Cpp.Api.Transform = n;

},{"./interface":88,"decorator-cache-getter":193}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TransformImpl = void 0;

const e = require("../../../ValueType/Vector3/class"), t = require("../class");

class r extends t.ComponentImpl {
  ctor_0() {
    return new r(Il2Cpp.Api.Transform._ctor(alloc()));
  }
  GetChild(e) {
    return new r(Il2Cpp.Api.Transform._GetChild(this.handle, e));
  }
  GetEnumerator() {
    throw new Error("Method not implemented.");
  }
  GetParent() {
    return new r(Il2Cpp.Api.Transform._get_parent(this.handle));
  }
  GetSiblingIndex() {
    throw new Error("Method not implemented.");
  }
  InverseTransformDirection(e) {
    throw new Error("Method not implemented.");
  }
  InverseTransformPoint(e) {
    throw new Error("Method not implemented.");
  }
  InverseTransformVector(e) {
    throw new Error("Method not implemented.");
  }
  IsChildOf(e) {
    return Il2Cpp.Api.Transform._IsChildOf(this.handle, e.handle);
  }
  RotateAround(e, t, r) {
    throw new Error("Method not implemented.");
  }
  SetAsFirstSibling() {
    throw new Error("Method not implemented.");
  }
  SetAsLastSibling() {
    throw new Error("Method not implemented.");
  }
  SetPositionAndRotation(e, t) {
    throw new Error("Method not implemented.");
  }
  SetSiblingIndex(e) {
    throw new Error("Method not implemented.");
  }
  TransformDirection(e, t, r) {
    throw new Error("Method not implemented.");
  }
  TransformPoint(e) {
    throw new Error("Method not implemented.");
  }
  TransformVector(e) {
    throw new Error("Method not implemented.");
  }
  Translate(e, t, r, n) {
    throw new Error("Method not implemented.");
  }
  get_childCount() {
    return Il2Cpp.Api.Transform._get_childCount(this.handle);
  }
  get_eulerAngles() {
    let e = alloc(4);
    return Il2Cpp.Api.Transform._get_eulerAngles(this.handle, e), new Il2Cpp.Vector3(e);
  }
  set_eulerAngles(e) {
    throw new Error("Method not implemented.");
  }
  get_forward() {
    return Il2Cpp.Api.Transform._get_forward(this.handle);
  }
  set_hasChanged(e) {
    throw new Error("Method not implemented.");
  }
  get_hasChanged() {
    throw new Error("Method not implemented.");
  }
  get_localEulerAngles() {
    return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localEulerAngles(this.handle));
  }
  set_localEulerAngles(e) {
    return Il2Cpp.Api.Transform._set_localEulerAngles(this.handle, e);
  }
  get_localPosition() {
    return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localPosition(this.handle));
  }
  set_localPosition(e) {
    return Il2Cpp.Api.Transform._set_localPosition(this.handle, e.handle);
  }
  get_localRotation() {
    return new Il2Cpp.Quaternion(Il2Cpp.Api.Transform._get_localRotation(this.handle));
  }
  set_localRotation(e) {
    return Il2Cpp.Api.Transform._set_localRotation(this.handle, e.handle);
  }
  get_localScale() {
    return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_localScale(this.handle));
  }
  set_localScale(e) {
    return Il2Cpp.Api.Transform._set_localScale(this.handle, e.handle);
  }
  get_lossyScale() {
    throw new Error("Method not implemented.");
  }
  get_parent() {
    return this.handle == ptr(0) ? new Il2Cpp.Transform(ptr(0)) : new Il2Cpp.Transform(Il2Cpp.Api.Transform._get_parent(this.handle));
  }
  set_parent(e) {
    return Il2Cpp.Api.Transform._set_parent(this.handle, e.handle);
  }
  get_position() {
    let t = allocVector(0, 0, 0);
    return Il2Cpp.Api.Transform._get_position(t, this.handle), new e.Vector3Impl(t, 2);
  }
  set_position(e) {
    return Il2Cpp.Api.Transform._set_position(this.handle, e.handle);
  }
  get_right() {
    throw new Error("Method not implemented.");
  }
  get_rotation() {
    return new Il2Cpp.Quaternion(Il2Cpp.Api.Transform._get_rotation(this.handle));
  }
  set_rotation(e) {
    return Il2Cpp.Api.Transform._set_rotation(this.handle, e.handle);
  }
  get_up() {
    return new Il2Cpp.Vector3(Il2Cpp.Api.Transform._get_up(this.handle));
  }
  set_up(e) {
    throw new Error("Method not implemented.");
  }
}

exports.TransformImpl = r, Il2Cpp.Transform = r;

},{"../../../ValueType/Vector3/class":152,"../class":90}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("./class");

globalThis.showTransform = e => {
  "number" == typeof e && (e = ptr(e)), LOGO(`${getLine(15)} Transform ${getLine(15)}`);
  let t = new Il2Cpp.Transform(e);
  LOGD(`childCount\t---\x3e\t${t.get_childCount()}\t(${t.get_name()})`), PrintHierarchy(e, 1, !0), 
  LOGD("get_position\t(" + t.get_position().toString() + ")");
}, globalThis.PrintHierarchy = (e, t = 2, n = !1) => {
  if ("number" == typeof e && (e = ptr(e)), e.isNull()) return;
  let r;
  "GameObject" == getTypeName(e) && (e = new Il2Cpp.GameObject(e).get_transform().handle), 
  r = new Il2Cpp.Transform(e), 10 == t && LOGO(`${getLine(75)}\n`);
  let l = i(r);
  function i(e) {
    for (let t = 0; t < 10; ++t) try {
      if (e.handle.isNull()) return t;
      e = e.get_parent();
    } catch (e) {
      return t;
    }
    return 0;
  }
  !function e(r) {
    for (let o = 0; o < r.get_childCount(); ++o) {
      let a = r.GetChild(o), s = i(a) - l;
      s > 0 && s <= t && LOGD((null != n ? "\t" : "") + getLine(s - 1, "\t") + a.handle + " : " + a.get_name()), 
      e(a);
    }
  }(r), 10 == t && LOGO(`${getLine(75)}\n`);
}, globalThis.getGameObject = (t, n = !1) => {
  if (t = checkCmdInput(t), !n) return new e.TransformImpl(t).get_gameObject().handle;
  showGameObject(t);
};

},{"./class":85}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./export"), require("./class"), require("./interface");

},{"./api":84,"./class":85,"./export":86,"./interface":88}],88:[function(require,module,exports){
"use strict";

},{}],89:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, o) {
  var i, r = arguments.length, p = r < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, n, o); else for (var l = e.length - 1; l >= 0; l--) (i = e[l]) && (p = (r < 3 ? i(p) : r > 3 ? i(t, n, p) : i(t, n)) || p);
  return r > 3 && p && Object.defineProperty(t, n, p), p;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _ctor_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _CompareTag() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "CompareTag", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _GetComponent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetComponentInChildren() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponentInChildren", 2, "pointer", [ "pointer", "pointer", "bool" ]);
  }
  static get _GetComponentInParent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponentInParent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetComponents() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "GetComponents", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get _get_gameObject() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "get_gameObject", 0, "pointer", [ "pointer" ]);
  }
  static get _set_tag() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "set_tag", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_transform() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Component", "get_transform", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_ctor_0", null), e([ t.cache ], n, "_CompareTag", null), e([ t.cache ], n, "_GetComponent", null), 
e([ t.cache ], n, "_GetComponentInChildren", null), e([ t.cache ], n, "_GetComponentInParent", null), 
e([ t.cache ], n, "_GetComponents", null), e([ t.cache ], n, "_get_gameObject", null), 
e([ t.cache ], n, "_set_tag", null), e([ t.cache ], n, "_get_transform", null), 
Il2Cpp.Api.Component = n;

},{"decorator-cache-getter":193}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ComponentImpl = void 0;

const e = require("../class");

class n extends e.ObjectIl2cpp_impl {
  __ctor__() {
    return new Il2Cpp.Component(Il2Cpp.Api.Component._ctor_0(this.handle, allocP(1)));
  }
  CompareTag(e) {
    return Il2Cpp.Api.Component._CompareTag(this.handle, allocUStr(e));
  }
  GetComponent(e) {
    return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponent(this.handle, e));
  }
  GetComponentInChildren(e, n) {
    return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponentInChildren(this.handle, e.handle, n));
  }
  GetComponentInParent(e) {
    return new Il2Cpp.Component(Il2Cpp.Api.Component._GetComponentInParent(this.handle, e.handle));
  }
  GetComponents(e, n) {
    return Il2Cpp.Api.Component._GetComponents(this.handle, e, n);
  }
  get_gameObject() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.Component._get_gameObject(this.handle));
  }
  set_tag(e) {
    return Il2Cpp.Api.Component._set_tag(this.handle, allocUStr(e));
  }
  get_transform() {
    return Il2Cpp.Api.Component._get_transform(this.handle);
  }
}

exports.ComponentImpl = n, Il2Cpp.Component = n;

},{"../class":105}],91:[function(require,module,exports){
"use strict";

},{}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./Behavior/include"), require("./Collider/include"), require("./ParticleSystem/include"), 
require("./Rigidbody/include"), require("./Renderer/include"), require("./Transform/include"), 
require("./api"), require("./class"), require("./export"), require("./interface");

},{"./Behavior/include":78,"./Collider/include":80,"./ParticleSystem/include":81,"./Renderer/include":82,"./Rigidbody/include":83,"./Transform/include":87,"./api":89,"./class":90,"./export":91,"./interface":93}],93:[function(require,module,exports){
"use strict";

},{}],94:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, o = arguments.length, p = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, n, i); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (p = (o < 3 ? r(p) : o > 3 ? r(t, n, p) : r(t, n)) || p);
  return o > 3 && p && Object.defineProperty(t, n, p), p;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _ctor_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _ctor_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", ".ctor", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _ctor_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", ".ctor", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _AddComponent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "AddComponent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetComponent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetComponentInChildren() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponentInChildren", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _GetComponentInParent() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponentInParent", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetComponentsInternal() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "GetComponentsInternal", 6, "pointer", [ "pointer", "pointer", "pointer", "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _SendMessage() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "SendMessage", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _SetActive() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "SetActive", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetComponentFastPath() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "TryGetComponentFastPath", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _CompareTag() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "CompareTag", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_transform() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_transform", 0, "pointer", [ "pointer" ]);
  }
  static get _get_tag() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_tag", 0, "pointer", [ "pointer" ]);
  }
  static get _get_layer() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_layer", 0, "pointer", [ "pointer" ]);
  }
  static get _set_layer() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "set_layer", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _get_gameObject() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_gameObject", 0, "pointer", [ "pointer" ]);
  }
  static get _get_activeSelf() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "get_activeSelf", 0, "bool", [ "pointer" ]);
  }
  static get _Find() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "Find", 1, "pointer", [ "pointer" ]);
  }
  static get _FindGameObjectsWithTag_A() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "FindGameObjectsWithTag", 1, "pointer", [ "pointer" ]);
  }
  static get _FindGameObjectWithTag() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "FindGameObjectWithTag", 1, "pointer", [ "pointer" ]);
  }
  static get _FindWithTag() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.GameObject", "FindWithTag", 1, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_ctor_0", null), e([ t.cache ], n, "_ctor_1", null), e([ t.cache ], n, "_ctor_2", null), 
e([ t.cache ], n, "_AddComponent", null), e([ t.cache ], n, "_GetComponent", null), 
e([ t.cache ], n, "_GetComponentInChildren", null), e([ t.cache ], n, "_GetComponentInParent", null), 
e([ t.cache ], n, "_GetComponentsInternal", null), e([ t.cache ], n, "_SendMessage", null), 
e([ t.cache ], n, "_SetActive", null), e([ t.cache ], n, "_GetComponentFastPath", null), 
e([ t.cache ], n, "_CompareTag", null), e([ t.cache ], n, "_get_transform", null), 
e([ t.cache ], n, "_get_tag", null), e([ t.cache ], n, "_get_layer", null), e([ t.cache ], n, "_set_layer", null), 
e([ t.cache ], n, "_get_gameObject", null), e([ t.cache ], n, "_get_activeSelf", null), 
e([ t.cache ], n, "_Find", null), e([ t.cache ], n, "_FindGameObjectsWithTag_A", null), 
e([ t.cache ], n, "_FindGameObjectWithTag", null), e([ t.cache ], n, "_FindWithTag", null), 
Il2Cpp.Api.GameObject = n;

},{"decorator-cache-getter":193}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GameObjectImpl = void 0;

const e = require("../class");

class t extends e.ObjectIl2cpp_impl {
  constructor(e) {
    super(e);
  }
  ctor_0() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._ctor_0(allocP(1)));
  }
  ctor_1(e) {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._ctor_1(allocP(1), allocUStr(e)));
  }
  ctor_2(e, t) {
    let p = Il2Cpp.Array.from(t[0].class, t.length);
    return Il2Cpp.Api.GameObject._ctor_2(this.handle, allocP(1), allocUStr(e), p);
  }
  AddComponent(e) {
    return Il2Cpp.Api.GameObject._AddComponent(this.handle, e);
  }
  GetComponent(e) {
    return Il2Cpp.Api.GameObject._GetComponent(this.handle, e);
  }
  GetComponentInChildren(e, t) {
    return Il2Cpp.Api.GameObject._GetComponentInChildren(this.handle, e.handle, ptr(t));
  }
  GetComponentInParent(e, t) {
    return Il2Cpp.Api.GameObject._GetComponentInParent(this.handle, e.handle, ptr(t));
  }
  GetComponentsInternal(e, t, p, a, n, r) {
    return Il2Cpp.Api.GameObject._GetComponentsInternal(this.handle, e.handle, ptr(t), ptr(p), ptr(a), ptr(n), ptr(r));
  }
  SendMessage(e, t) {
    return Il2Cpp.Api.GameObject._SendMessage(this.handle, allocUStr(e), t);
  }
  SetActive(e) {
    return Il2Cpp.Api.GameObject._SetActive(this.handle, ptr(e));
  }
  GetComponentFastPath(e, t) {
    return Il2Cpp.Api.GameObject._GetComponentFastPath(this.handle, e, t);
  }
  CompareTag(e) {
    return Il2Cpp.Api.GameObject._CompareTag(this.handle, allocUStr(e));
  }
  get_transform() {
    if (this.handle == ptr(0)) throw new Error("get_transform : GameObject is null");
    return new Il2Cpp.Transform(Il2Cpp.Api.GameObject._get_transform(this.handle));
  }
  get_tag() {
    return Il2Cpp.Api.GameObject._get_tag(this.handle);
  }
  set_layer(e) {
    return Il2Cpp.Api.GameObject._set_layer(this.handle, ptr(e));
  }
  get_layer() {
    return Il2Cpp.Api.GameObject._get_layer(this.handle);
  }
  get_gameObject() {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._get_gameObject(this.handle));
  }
  get_activeSelf() {
    return Il2Cpp.Api.GameObject._get_activeSelf(this.handle);
  }
  get_activeInHierarchy() {
    return Il2Cpp.Api.GameObject._get_activeSelf(this.handle);
  }
  static Find(e) {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._Find(allocUStr(e)));
  }
  static FindGameObjectsWithTag_A(e) {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectsWithTag_A(allocUStr(e)));
  }
  static FindGameObjectWithTag(e) {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindGameObjectWithTag(allocUStr(e)));
  }
  static FindWithTag(e) {
    return new Il2Cpp.GameObject(Il2Cpp.Api.GameObject._FindWithTag(allocUStr(e)));
  }
}

exports.GameObjectImpl = t, Il2Cpp.GameObject = t;

},{"../class":105}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getTransform = exports.HookSetActive = exports.showGameObject = void 0;

const e = require("../../../../../utils/common");

globalThis.HookSetActive = (t = 1) => {
  A(Il2Cpp.Api.GameObject._SetActive, ((r, a, o) => {
    if (r[0].isNull()) return;
    let n = new Il2Cpp.GameObject(r[0]);
    if (-1 != (0, e.filterDuplicateOBJ)(n.toString()) && (2 == t || r[1].toInt32() == t)) {
      let e = "public extern void SetActive( " + (0 == r[1].toInt32() ? "false" : "true") + " );  LR:" + checkCtx(a);
      LOGW("\n" + getLine(e.length)), LOGD(e), LOGO(getLine(e.length / 2)), showGameObject(r[0]);
    }
  }));
}, globalThis.showGameObject = e => {
  let t;
  if ("number" == typeof e && (e = ptr(e)), "GameObject" == getTypeName(e)) t = new Il2Cpp.GameObject(e); else {
    if ("RectTransform" != getTypeName(e)) throw new Error("showGameObject: mPtr is not GameObject or Transform");
    t = new Il2Cpp.Transform(e).get_gameObject();
  }
  LOGO("--------- GameObject ---------"), LOGD("gameObj\t\t---\x3e\t" + t.handle), 
  LOGD("getName\t\t---\x3e\t" + t.get_name()), LOGD("getLayer\t---\x3e\t" + t.get_layer());
  let r = t.get_transform();
  LOGD("getTransform\t---\x3e\t" + r.handle);
  let a = "";
  for (var o = 0; o < 10 && !r.handle.isNull(); o++) {
    a = a + ("" == a ? "" : " <--- ") + r.get_gameObject().get_name() + "(" + r.handle + ")", 
    r = r.get_parent();
  }
  LOGD("hierarchy\t---\x3e\t" + a);
}, globalThis.getTransform = e => {
  let t;
  "number" == typeof e && (e = ptr(e));
  try {
    t = "GameObject" == getTypeName(e) ? new Il2Cpp.GameObject(e) : new Il2Cpp.Component(e).get_gameObject();
  } catch {
    throw new Error("getTransform: mPtr is not GameObject or Transform");
  }
  return t.get_transform().handle;
};

},{"../../../../../utils/common":184}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./export"), require("./interface");

},{"./api":94,"./class":95,"./export":96,"./interface":98}],98:[function(require,module,exports){
"use strict";

},{}],99:[function(require,module,exports){
"use strict";

},{}],100:[function(require,module,exports){
"use strict";

},{}],101:[function(require,module,exports){
"use strict";

},{}],102:[function(require,module,exports){
"use strict";

},{}],103:[function(require,module,exports){
"use strict";

},{}],104:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, o = arguments.length, c = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i); else for (var p = e.length - 1; p >= 0; p--) (r = e[p]) && (c = (o < 3 ? r(c) : o > 3 ? r(t, n, c) : r(t, n)) || c);
  return o > 3 && c && Object.defineProperty(t, n, c), c;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.il2cppObjAPI = void 0;

const t = require("decorator-cache-getter");

class n {
  static get _ctor_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _GetHashCode() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "GetHashCode", 0, "int32", [ "pointer" ]);
  }
  static get _GetInstanceID() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "GetInstanceID", 0, "int32", [ "pointer" ]);
  }
  static get _ToString() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "ToString", 0, "pointer", [ "pointer" ]);
  }
  static get _set_name() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "set_name", 1, "void", [ "pointer", "pointer" ]);
  }
  static get _get_name() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "get_name", 0, "pointer", [ "pointer" ]);
  }
  static get _Equals() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Equals", 1, "bool", [ "pointer" ]);
  }
  static get _Destroy_1() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Destroy", 1, "void", [ "pointer" ]);
  }
  static get _Destroy_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "Destroy", 2, "void", [ "pointer", "float" ]);
  }
  static get _DestroyImmediate() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Object", "DestroyImmediate", 1, "void", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_ctor_0", null), e([ t.cache ], n, "_GetHashCode", null), e([ t.cache ], n, "_GetInstanceID", null), 
e([ t.cache ], n, "_ToString", null), e([ t.cache ], n, "_set_name", null), e([ t.cache ], n, "_get_name", null), 
e([ t.cache ], n, "_Equals", null), e([ t.cache ], n, "_Destroy_1", null), e([ t.cache ], n, "_Destroy_2", null), 
e([ t.cache ], n, "_DestroyImmediate", null), exports.il2cppObjAPI = n, Il2Cpp.Api.il2cppObj = n;

},{"decorator-cache-getter":193}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ObjectIl2cpp_impl = void 0;

class e extends Il2Cpp.Object {
  ctor() {
    return Il2Cpp.Api.il2cppObj._ctor_0(allocP(1));
  }
  Equals(e) {
    return Il2Cpp.Api.il2cppObj._Equals(this.handle, e.handle);
  }
  GetHashCode() {
    return Il2Cpp.Api.il2cppObj._GetHashCode(this.handle);
  }
  GetInstanceID() {
    return Il2Cpp.Api.il2cppObj._GetInstanceID(this.handle);
  }
  ToString() {
    return Il2Cpp.Api.il2cppObj._ToString(this.handle);
  }
  set_name(e) {
    return Il2Cpp.Api.il2cppObj._set_name(this.handle, allocUStr(e));
  }
  get_name() {
    return readU16(Il2Cpp.Api.il2cppObj._get_name(this.handle));
  }
  static Destroy_1(e) {
    return Il2Cpp.Api.il2cppObj._Destroy_1(e);
  }
  static Destroy_2(e, p) {
    return Il2Cpp.Api.il2cppObj._Destroy_2(e, p);
  }
  static DestroyImmediate(e) {
    return Il2Cpp.Api.il2cppObj._DestroyImmediate(e);
  }
}

class p extends e {}

exports.ObjectIl2cpp_impl = p;

},{}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface"), require("./AssetBundle/include"), 
require("./Avatar/include"), require("./Component/include"), require("./GameObject/include"), 
require("./Material/include"), require("./Mesh/include"), require("./Montion/include"), 
require("./Shader/include"), require("./Sprite/include");

},{"./AssetBundle/include":56,"./Avatar/include":57,"./Component/include":92,"./GameObject/include":97,"./Material/include":99,"./Mesh/include":100,"./Montion/include":101,"./Shader/include":102,"./Sprite/include":103,"./api":104,"./class":105,"./interface":107}],107:[function(require,module,exports){
"use strict";

},{}],108:[function(require,module,exports){
"use strict";

},{}],109:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, r) {
  var i, l = arguments.length, o = l < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, r); else for (var p = e.length - 1; p >= 0; p--) (i = e[p]) && (o = (l < 3 ? i(o) : l > 3 ? i(t, n, o) : i(t, n)) || o);
  return l > 3 && o && Object.defineProperty(t, n, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _DeleteAll() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "DeleteAll", 0, "pointer", [ "pointer" ]);
  }
  static get _DeleteKey() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "DeleteKey", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetFloat() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetFloat", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetFloat_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetFloat", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _GetInt() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetInt", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetInt_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetInt", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _GetString() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetString", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetString_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "GetString", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _HasKey() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "HasKey", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Save() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "Save", 0, "pointer", [ "pointer" ]);
  }
  static get _SetFloat() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "SetFloat", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _SetInt() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "SetInt", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _SetString() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.PlayerPrefs", "SetString", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
}

e([ t.cache ], n, "_DeleteAll", null), e([ t.cache ], n, "_DeleteKey", null), e([ t.cache ], n, "_GetFloat", null), 
e([ t.cache ], n, "_GetFloat_2", null), e([ t.cache ], n, "_GetInt", null), e([ t.cache ], n, "_GetInt_2", null), 
e([ t.cache ], n, "_GetString", null), e([ t.cache ], n, "_GetString_2", null), 
e([ t.cache ], n, "_HasKey", null), e([ t.cache ], n, "_Save", null), e([ t.cache ], n, "_SetFloat", null), 
e([ t.cache ], n, "_SetInt", null), e([ t.cache ], n, "_SetString", null), Il2Cpp.Api.PlayerPrefs = n;

},{"decorator-cache-getter":193}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlayerPrefsImpl = void 0;

const e = require("../Object/class");

class l extends e.ObjectIl2cpp_impl {
  DeleteAll() {
    return Il2Cpp.Api.PlayerPrefs._DeleteAll(this.handle);
  }
  DeleteKey(e) {
    return Il2Cpp.Api.PlayerPrefs._DeleteKey(this.handle, allocCStr(e));
  }
  GetFloat(e) {
    return Il2Cpp.Api.PlayerPrefs._GetFloat(this.handle, allocCStr(e));
  }
  GetFloat_2(e, l = 0) {
    return Il2Cpp.Api.PlayerPrefs._GetFloat_2(this.handle, allocCStr(e), l);
  }
  GetInt(e) {
    return Il2Cpp.Api.PlayerPrefs._GetInt(this.handle, allocCStr(e));
  }
  GetInt_2(e, l = 0) {
    return Il2Cpp.Api.PlayerPrefs._GetInt_2(this.handle, allocCStr(e), l);
  }
  GetString(e) {
    return Il2Cpp.Api.PlayerPrefs._GetString(this.handle, allocCStr(e));
  }
  GetString_2(e, l = "") {
    return Il2Cpp.Api.PlayerPrefs._GetString_2(this.handle, allocCStr(e), allocCStr(l));
  }
  HasKey(e) {
    return Il2Cpp.Api.PlayerPrefs._HasKey(this.handle, allocCStr(e));
  }
  Save() {
    return Il2Cpp.Api.PlayerPrefs._Save(this.handle);
  }
  SetFloat(e, l = 0) {
    return Il2Cpp.Api.PlayerPrefs._SetFloat(this.handle, allocCStr(e), l);
  }
  SetInt(e, l = 0) {
    return Il2Cpp.Api.PlayerPrefs._SetInt(this.handle, allocCStr(e), l);
  }
  SetString(e, l = "") {
    return Il2Cpp.Api.PlayerPrefs._SetString(this.handle, allocCStr(e), allocCStr(l));
  }
}

exports.PlayerPrefsImpl = l, Il2Cpp.PlayerPrefs = l;

},{"../Object/class":105}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.HookPlayerPrefs = void 0;

const e = (e = !1, t = !0) => {
  A(Il2Cpp.Api.PlayerPrefs._GetFloat_2, ((e, t, r) => {
    r.set("arg0", readU16(e[0])), r.set("arg1", e[1]);
  }), ((r, a, l) => {
    LOGD("\n[*] '" + r + "' = GetFloat('" + l.get("arg0") + "'," + l.get("arg1") + ")"), 
    t && LOGZ("\t\t { LR:" + checkCtx(a) + " } | { PC:" + checkCtx(a, "PC") + " }"), 
    e && LOGZ(GetStackTraceN(a));
  })), A(Il2Cpp.Api.PlayerPrefs._GetInt_2, ((e, t, r) => {
    r.set("arg0", readU16(e[0])), r.set("arg1", e[1]);
  }), ((r, a, l) => {
    LOGD("\n[*] '" + r.toInt32() + "' = GetInt('" + l.get("arg0") + "'," + l.get("arg1") + ")"), 
    t && LOGZ("\t\t { LR:" + checkCtx(a) + " } | { PC:" + checkCtx(a, "PC") + " }"), 
    e && LOGZ(GetStackTraceN(a)), -1 != l.get("arg0").indexOf("SaleBoughted") && r.replace(ptr(1));
  })), A(Il2Cpp.Api.PlayerPrefs._GetString, ((e, t, r) => {
    r.set("arg0", readU16(e[0]));
  }), ((r, a, l) => {
    LOGD("\n[*] '" + readU16(r) + "' = GetString('" + l.get("arg0") + "')"), t && LOGZ("\t\t { LR:" + checkCtx(a) + " } | { PC:" + checkCtx(a, "PC") + " }"), 
    e && LOGZ(GetStackTraceN(a));
  })), A(Il2Cpp.Api.PlayerPrefs._SetFloat, ((e, t, r) => {
    r.set("arg0", readU16(e[0])), r.set("arg1", e[1].isNull() ? 0 : readSingle(e[1]));
  }), ((r, a, l) => {
    LOGD("\n[*] SetFloat('" + l.get("arg0") + "'," + l.get("arg1") + ")"), t && LOGZ("\t\t { LR:" + checkCtx(a) + " } | { PC:" + checkCtx(a, "PC") + " }"), 
    e && LOGZ(GetStackTraceN(a));
  })), A(Il2Cpp.Api.PlayerPrefs._SetInt, ((e, t, r) => {
    r.set("arg0", readU16(e[0])), r.set("arg1", e[1]);
  }), ((r, a, l) => {
    LOGD("\n[*] SetInt('" + l.get("arg0") + "'," + l.get("arg1") + ")"), t && LOGZ("\t\t { LR:" + checkCtx(a) + " } | { PC:" + checkCtx(a, "PC") + " }"), 
    e && LOGZ(GetStackTraceN(a));
  })), A(Il2Cpp.Api.PlayerPrefs._SetString, ((e, t, r) => {
    r.set("arg0", readU16(e[0])), r.set("arg1", readU16(e[1]));
  }), ((r, a, l) => {
    LOGD("\n[*] SetString('" + l.get("arg0") + "','" + l.get("arg1") + "')"), t && LOGZ("\t\t { LR:" + checkCtx(a) + " } | { PC:" + checkCtx(a, "PC") + " }"), 
    e && LOGZ(GetStackTraceN(a));
  }));
};

exports.HookPlayerPrefs = e, globalThis.SetInt = (e, t) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetInt", 2, !0), allocUStr(e), t), 
globalThis.SetFloat = (e, t) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetFloat", 2, !0), allocUStr(e), t), 
globalThis.SetString = (e, t) => callFunction(find_method("UnityEngine.CoreModule", "PlayerPrefs", "SetString", 2, !0), allocUStr(e), allocUStr(t)), 
globalThis.GetInt = e => {
  let t = callFunctionRI(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetInt", 2, !0), allocUStr(e), 0);
  LOG("\n[*] GetInt('" + e + "')\t---\x3e\t" + t + "\n", LogColor.C95);
}, globalThis.GetFloat = e => {
  let t = callFunctionRF(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetFloat", 2, !0), allocUStr(e), 0);
  LOG("\n[*] GetFloat('" + e + "')\t---\x3e\t" + t + "\n", LogColor.C95);
}, globalThis.GetString = e => {
  let t = callFunctionRUS(find_method("UnityEngine.CoreModule", "PlayerPrefs", "GetString", 1), allocUStr(e));
  LOG("\n[*] GetString('" + e + "')\t---\x3e\t" + t + "\n", LogColor.C95);
}, globalThis.HookPlayerPrefs = e;

},{}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./export"), require("./interface");

},{"./api":109,"./class":110,"./export":111,"./interface":113}],113:[function(require,module,exports){
"use strict";

},{}],114:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, o = arguments.length, c = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i); else for (var l = e.length - 1; l >= 0; l--) (r = e[l]) && (c = (o < 3 ? r(c) : o > 3 ? r(t, n, c) : r(t, n)) || c);
  return o > 3 && c && Object.defineProperty(t, n, c), c;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _get_cctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", ".cctor", 0, "pointer", [ "pointer" ]);
  }
  static get _get_ctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _FindObjectsOfTypeAll() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "FindObjectsOfTypeAll", 1, "pointer", [ "pointer" ]);
  }
  static get _FindShaderByName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "FindShaderByName", 1, "pointer", [ "pointer" ]);
  }
  static get _Load() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "Load", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _LoadAll() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "LoadAll", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _LoadAsync() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "LoadAsync", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _UnloadAsset() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "UnloadAsset", 1, "pointer", [ "pointer" ]);
  }
  static get _get_ActiveAPI() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "get_ActiveAPI", 0, "pointer", [ "pointer" ]);
  }
  static get _get_overrideAPI() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourcesAPI", "get_overrideAPI", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_get_cctor", null), e([ t.cache ], n, "_get_ctor", null), e([ t.cache ], n, "_FindObjectsOfTypeAll", null), 
e([ t.cache ], n, "_FindShaderByName", null), e([ t.cache ], n, "_Load", null), 
e([ t.cache ], n, "_LoadAll", null), e([ t.cache ], n, "_LoadAsync", null), e([ t.cache ], n, "_UnloadAsset", null), 
e([ t.cache ], n, "_get_ActiveAPI", null), e([ t.cache ], n, "_get_overrideAPI", null), 
mscorlib.Api.ResourcesAPI = n;

},{"decorator-cache-getter":193}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ResourcesApi_impl = void 0;

const e = require("../Type/class");

require("./interface");

class s extends e.mscorlib_System_Type_impl {
  s_DefaultAPI=new s(lfv(this.handle, "s_DefaultAPI"));
  FindObjectsOfTypeAll(e) {
    return mscorlib.Api.ResourcesAPI._FindObjectsOfTypeAll(this.handle, e);
  }
  FindShaderByName(e) {
    return mscorlib.Api.ResourcesAPI._FindShaderByName(this.handle, e);
  }
  Load(e, s) {
    return new Il2Cpp.Object(mscorlib.Api.ResourcesAPI._Load(this.handle, e, s));
  }
  LoadAll(e, s) {
    return mscorlib.Api.ResourcesAPI._LoadAll(this.handle, e, s);
  }
  LoadAsync(e, s) {
    return mscorlib.Api.ResourcesAPI._LoadAsync(this.handle, e, s);
  }
  UnloadAsset(e) {
    return mscorlib.Api.ResourcesAPI._UnloadAsset(this.handle, e);
  }
  get ActiveAPI() {
    return mscorlib.Api.ResourcesAPI._get_ActiveAPI();
  }
  get overrideAPI() {
    return mscorlib.Api.ResourcesAPI._get_overrideAPI();
  }
}

exports.ResourcesApi_impl = s, mscorlib.ResourcesAPI = s;

},{"../Type/class":137,"./interface":118}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), globalThis.HookResourceLoad = () => {
  A(mscorlib.Api.ResourcesAPI._Load, (e => {
    LOGD("\n[*] ResourcesAPI.load"), LOGZ(`   | ARG ---\x3e ins:'${e[0]}',name:'${readU16(e[1])}', type:'${e[2]}'`);
  }), (e => {
    LOGZ(`   | RET ---\x3e ${e} --- {${new Il2Cpp.Object(e).toString()}}`);
  }));
};

},{}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface"), require("./export");

},{"./api":114,"./class":115,"./export":116,"./interface":118}],118:[function(require,module,exports){
"use strict";

},{}],119:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, n) {
  var o, c = arguments.length, i = c < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (i = (c < 3 ? o(i) : c > 3 ? o(t, r, i) : o(t, r)) || i);
  return c > 3 && i && Object.defineProperty(t, r, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class r {
  static get _get_ctor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _get_asset() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", "get_asset", 0, "pointer", [ "pointer" ]);
  }
  static get _GetResult() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.ResourceRequest", "GetResult", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], r, "_get_ctor", null), e([ t.cache ], r, "_get_asset", null), e([ t.cache ], r, "_GetResult", null), 
mscorlib.Api.ResourcesRequest = r;

},{"decorator-cache-getter":193}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ResourcesRequest_impl = void 0;

const e = require("../Type/class");

class s extends e.mscorlib_System_Type_impl {}

exports.ResourcesRequest_impl = s, mscorlib.ResourcesRequest = s;

},{"../Type/class":137}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":119,"./class":120}],122:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var o, r = arguments.length, c = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, i); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (c = (r < 3 ? o(c) : r > 3 ? o(t, n, c) : o(t, n)) || c);
  return r > 3 && c && Object.defineProperty(t, n, c), c;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _FindObjectsOfTypeAll() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "FindObjectsOfTypeAll", 1, "pointer", [ "pointer" ]);
  }
  static get _GetBuiltinResource() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "GetBuiltinResource", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Load() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "Load", 1, "pointer", [ "pointer" ]);
  }
  static get _LoadAll() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "LoadAll", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _LoadAsync() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "LoadAsync", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _UnloadAsset() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Resources", "UnloadAsset", 1, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_FindObjectsOfTypeAll", null), e([ t.cache ], n, "_GetBuiltinResource", null), 
e([ t.cache ], n, "_Load", null), e([ t.cache ], n, "_LoadAll", null), e([ t.cache ], n, "_LoadAsync", null), 
e([ t.cache ], n, "_UnloadAsset", null), mscorlib.Api.Resources = n;

},{"decorator-cache-getter":193}],123:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api");

},{"./api":122}],124:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class e {}

mscorlib.Api.RuntimeTypeHandle = e;

},{}],125:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_RuntimeTypeHandle_impl = void 0;

const e = require("../class");

require("./interface");

class s extends e.mscorlib_System_Object_impl {}

exports.mscorlib_System_RuntimeTypeHandle_impl = s, mscorlib.RuntimeTypeHandle = s;

},{"../class":159,"./interface":127}],126:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface");

},{"./api":124,"./class":125,"./interface":127}],127:[function(require,module,exports){
"use strict";

},{}],128:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, i, p) {
  var r, n = arguments.length, l = n < 3 ? t : null === p ? p = Object.getOwnPropertyDescriptor(t, i) : p;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, i, p); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (l = (n < 3 ? r(l) : n > 3 ? r(t, i, l) : r(t, i)) || l);
  return n > 3 && l && Object.defineProperty(t, i, l), l;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class i {
  static get _get_AssemblyQualifiedName() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_AssemblyQualifiedName", 0, "pointer", [ "pointer" ]);
  }
  static get _get_BaseType() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_BaseType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_DeclaringType() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_DeclaringType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_FullName() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_FullName", 0, "pointer", [ "pointer" ]);
  }
  static get _get_IsEnum() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_IsEnum", 0, "bool", [ "pointer" ]);
  }
  static get _get_IsGenericParameter() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_IsGenericParameter", 0, "bool", [ "pointer" ]);
  }
  static get _get_IsGenericType() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_IsGenericType", 0, "bool", [ "pointer" ]);
  }
  static get _get_Name() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Name", 0, "pointer", [ "pointer" ]);
  }
  static get _get_Namespace() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Namespace", 0, "pointer", [ "pointer" ]);
  }
  static get _get_ReflectedType() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_ReflectedType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_TypeHandle() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_TypeHandle", 0, "pointer", [ "pointer" ]);
  }
  static get _get_UnderlyingSystemType() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_UnderlyingSystemType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_Module() {
    return Il2Cpp.Api.t("mscorlib", "System.RuntimeType", "get_Module", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], i, "_get_AssemblyQualifiedName", null), e([ t.cache ], i, "_get_BaseType", null), 
e([ t.cache ], i, "_get_DeclaringType", null), e([ t.cache ], i, "_get_FullName", null), 
e([ t.cache ], i, "_get_IsEnum", null), e([ t.cache ], i, "_get_IsGenericParameter", null), 
e([ t.cache ], i, "_get_IsGenericType", null), e([ t.cache ], i, "_get_Name", null), 
e([ t.cache ], i, "_get_Namespace", null), e([ t.cache ], i, "_get_ReflectedType", null), 
e([ t.cache ], i, "_get_TypeHandle", null), e([ t.cache ], i, "_get_UnderlyingSystemType", null), 
e([ t.cache ], i, "_get_Module", null), mscorlib.Api.RuntimeType = i;

},{"decorator-cache-getter":193}],129:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_RuntimeType_impl = void 0;

const e = require("../Module/class"), i = require("../RuntimeTypeHandle/class"), t = require("../Type/class");

require("./interface");

class l extends t.mscorlib_System_Type_impl {
  _DelegateType=new t.mscorlib_System_Type_impl(lfv(this.handle, "DelegateType"));
  _EnumType=new t.mscorlib_System_Type_impl(lfv(this.handle, "EnumType"));
  GenericCache=lfv(this.handle, "GenericCache");
  m_serializationCtor=lfv(this.handle, "m_serializationCtor");
  _ObjectType=new t.mscorlib_System_Type_impl(lfv(this.handle, "ObjectType"));
  _StringType=new t.mscorlib_System_Type_impl(lfv(this.handle, "StringType"));
  type_info=lfv(this.handle, "type_info");
  _ValueType=new t.mscorlib_System_Type_impl(lfv(this.handle, "ValueType"));
  get_AssemblyQualifiedName() {
    return readU16(mscorlib.Api.RuntimeType._get_AssemblyQualifiedName(this.handle));
  }
  get_BaseType() {
    return new t.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_BaseType(this.handle));
  }
  get_DeclaringType() {
    return new t.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_DeclaringType(this.handle));
  }
  get_FullName() {
    return readU16(mscorlib.Api.RuntimeType._get_FullName(this.handle));
  }
  get_IsEnum() {
    return mscorlib.Api.RuntimeType._get_IsEnum(this.handle);
  }
  get_IsGenericParameter() {
    return mscorlib.Api.RuntimeType._get_IsGenericParameter(this.handle);
  }
  get_IsGenericType() {
    return mscorlib.Api.RuntimeType._get_IsGenericType(this.handle);
  }
  get_Name() {
    return readU16(mscorlib.Api.RuntimeType._get_Name(this.handle));
  }
  get_Namespace() {
    return readU16(mscorlib.Api.RuntimeType._get_Namespace(this.handle));
  }
  get_ReflectedType() {
    return new t.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_ReflectedType(this.handle));
  }
  get_TypeHandle() {
    return new i.mscorlib_System_RuntimeTypeHandle_impl(mscorlib.Api.RuntimeType._get_TypeHandle(this.handle));
  }
  get_UnderlyingSystemType() {
    return new t.mscorlib_System_Type_impl(mscorlib.Api.RuntimeType._get_UnderlyingSystemType(this.handle));
  }
  get_Module() {
    return new e.mscorlib_System_Reflection_Module_impl(mscorlib.Api.RuntimeType._get_Module(this.handle));
  }
}

exports.mscorlib_System_RuntimeType_impl = l, mscorlib.RuntimeType = l;

},{"../Module/class":54,"../RuntimeTypeHandle/class":125,"../Type/class":137,"./interface":131}],130:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface");

},{"./api":128,"./class":129,"./interface":131}],131:[function(require,module,exports){
"use strict";

},{}],132:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, o = arguments.length, p = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, n, i); else for (var c = e.length - 1; c >= 0; c--) (r = e[c]) && (p = (o < 3 ? r(p) : o > 3 ? r(t, n, p) : r(t, n)) || p);
  return o > 3 && p && Object.defineProperty(t, n, p), p;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _GetCompatibleFormat() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetCompatibleFormat", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _GetCopyTextureSupport() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetCopyTextureSupport", 0, "pointer", [ "pointer" ]);
  }
  static get _GetDeviceModel() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceModel", 0, "pointer", [ "pointer" ]);
  }
  static get _GetDeviceName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceName", 0, "pointer", [ "pointer" ]);
  }
  static get _GetDeviceType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceType", 0, "pointer", [ "pointer" ]);
  }
  static get _GetDeviceUniqueIdentifier() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetDeviceUniqueIdentifier", 0, "pointer", [ "pointer" ]);
  }
  static get _GetGraphicsDeviceID() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceID", 0, "int32", [ "pointer" ]);
  }
  static get _GetGraphicsDeviceName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceName", 0, "pointer", [ "pointer" ]);
  }
  static get _GetGraphicsDeviceType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceType", 0, "pointer", [ "pointer" ]);
  }
  static get _GetGraphicsDeviceVendor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVendor", 0, "pointer", [ "pointer" ]);
  }
  static get _GetGraphicsDeviceVendorID() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVendorID", 0, "int32", [ "pointer" ]);
  }
  static get _GetGraphicsDeviceVersion() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsDeviceVersion", 0, "pointer", [ "pointer" ]);
  }
  static get _GetGraphicsFormat() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsFormat", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetGraphicsMemorySize() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsMemorySize", 0, "int32", [ "pointer" ]);
  }
  static get _GetGraphicsShaderLevel() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetGraphicsShaderLevel", 0, "int32", [ "pointer" ]);
  }
  static get _GetMaxTextureSize() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetMaxTextureSize", 0, "int32", [ "pointer" ]);
  }
  static get _GetOperatingSystem() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetOperatingSystem", 0, "pointer", [ "pointer" ]);
  }
  static get _GetOperatingSystemFamily() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetOperatingSystemFamily", 0, "pointer", [ "pointer" ]);
  }
  static get _GetPhysicalMemoryMB() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetPhysicalMemoryMB", 0, "int32", [ "pointer" ]);
  }
  static get _GetProcessorCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorCount", 0, "int32", [ "pointer" ]);
  }
  static get _GetProcessorFrequencyMHz() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorFrequencyMHz", 0, "int32", [ "pointer" ]);
  }
  static get _GetProcessorType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "GetProcessorType", 0, "pointer", [ "pointer" ]);
  }
  static get _HasRenderTextureNative() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "HasRenderTextureNative", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _IsFormatSupported() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "IsFormatSupported", 2, "bool", [ "pointer", "pointer", "pointer" ]);
  }
  static get _IsValidEnumValue() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "IsValidEnumValue", 1, "bool", [ "pointer" ]);
  }
  static get _SupportedRandomWriteTargetCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportedRandomWriteTargetCount", 0, "int32", [ "pointer" ]);
  }
  static get _SupportedRenderTargetCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportedRenderTargetCount", 0, "int32", [ "pointer" ]);
  }
  static get _Supports3DTextures() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "Supports3DTextures", 0, "bool", [ "pointer" ]);
  }
  static get _SupportsComputeShaders() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsComputeShaders", 0, "bool", [ "pointer" ]);
  }
  static get _SupportsRenderTextureFormat() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsRenderTextureFormat", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _SupportsTextureFormat() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsTextureFormat", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _SupportsTextureFormatNative() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "SupportsTextureFormatNative", 1, "bool", [ "pointer", "pointer" ]);
  }
  static get _get_copyTextureSupport() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_copyTextureSupport", 0, "pointer", [ "pointer" ]);
  }
  static get _get_deviceModel() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceModel", 0, "pointer", [ "pointer" ]);
  }
  static get _get_deviceName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceName", 0, "pointer", [ "pointer" ]);
  }
  static get _get_deviceType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_deviceUniqueIdentifier() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_deviceUniqueIdentifier", 0, "pointer", [ "pointer" ]);
  }
  static get _get_graphicsDeviceID() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceID", 0, "int32", [ "pointer" ]);
  }
  static get _get_graphicsDeviceName() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceName", 0, "pointer", [ "pointer" ]);
  }
  static get _get_graphicsDeviceType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_graphicsDeviceVendor() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVendor", 0, "pointer", [ "pointer" ]);
  }
  static get _get_graphicsDeviceVendorID() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVendorID", 0, "int32", [ "pointer" ]);
  }
  static get _get_graphicsDeviceVersion() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsDeviceVersion", 0, "pointer", [ "pointer" ]);
  }
  static get _get_graphicsMemorySize() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsMemorySize", 0, "int32", [ "pointer" ]);
  }
  static get _get_graphicsShaderLevel() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_graphicsShaderLevel", 0, "int32", [ "pointer" ]);
  }
  static get _get_maxTextureSize() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_maxTextureSize", 0, "int32", [ "pointer" ]);
  }
  static get _get_operatingSystem() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_operatingSystem", 0, "pointer", [ "pointer" ]);
  }
  static get _get_operatingSystemFamily() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_operatingSystemFamily", 0, "pointer", [ "pointer" ]);
  }
  static get _get_processorCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorCount", 0, "int32", [ "pointer" ]);
  }
  static get _get_processorFrequency() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorFrequency", 0, "int32", [ "pointer" ]);
  }
  static get _get_processorType() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_processorType", 0, "pointer", [ "pointer" ]);
  }
  static get _get_supportedRandomWriteTargetCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportedRandomWriteTargetCount", 0, "int32", [ "pointer" ]);
  }
  static get _get_supportedRenderTargetCount() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportedRenderTargetCount", 0, "int32", [ "pointer" ]);
  }
  static get _get_supports3DTextures() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supports3DTextures", 0, "int32", [ "pointer" ]);
  }
  static get _get_supportsComputeShaders() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsComputeShaders", 0, "int32", [ "pointer" ]);
  }
  static get _get_supportsImageEffects() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsImageEffects", 0, "int32", [ "pointer" ]);
  }
  static get _get_supportsRenderTextures() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_supportsRenderTextures", 0, "int32", [ "pointer" ]);
  }
  static get _get_systemMemorySize() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.SystemInfo", "get_systemMemorySize", 0, "int32", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_GetCompatibleFormat", null), e([ t.cache ], n, "_GetCopyTextureSupport", null), 
e([ t.cache ], n, "_GetDeviceModel", null), e([ t.cache ], n, "_GetDeviceName", null), 
e([ t.cache ], n, "_GetDeviceType", null), e([ t.cache ], n, "_GetDeviceUniqueIdentifier", null), 
e([ t.cache ], n, "_GetGraphicsDeviceID", null), e([ t.cache ], n, "_GetGraphicsDeviceName", null), 
e([ t.cache ], n, "_GetGraphicsDeviceType", null), e([ t.cache ], n, "_GetGraphicsDeviceVendor", null), 
e([ t.cache ], n, "_GetGraphicsDeviceVendorID", null), e([ t.cache ], n, "_GetGraphicsDeviceVersion", null), 
e([ t.cache ], n, "_GetGraphicsFormat", null), e([ t.cache ], n, "_GetGraphicsMemorySize", null), 
e([ t.cache ], n, "_GetGraphicsShaderLevel", null), e([ t.cache ], n, "_GetMaxTextureSize", null), 
e([ t.cache ], n, "_GetOperatingSystem", null), e([ t.cache ], n, "_GetOperatingSystemFamily", null), 
e([ t.cache ], n, "_GetPhysicalMemoryMB", null), e([ t.cache ], n, "_GetProcessorCount", null), 
e([ t.cache ], n, "_GetProcessorFrequencyMHz", null), e([ t.cache ], n, "_GetProcessorType", null), 
e([ t.cache ], n, "_HasRenderTextureNative", null), e([ t.cache ], n, "_IsFormatSupported", null), 
e([ t.cache ], n, "_IsValidEnumValue", null), e([ t.cache ], n, "_SupportedRandomWriteTargetCount", null), 
e([ t.cache ], n, "_SupportedRenderTargetCount", null), e([ t.cache ], n, "_Supports3DTextures", null), 
e([ t.cache ], n, "_SupportsComputeShaders", null), e([ t.cache ], n, "_SupportsRenderTextureFormat", null), 
e([ t.cache ], n, "_SupportsTextureFormat", null), e([ t.cache ], n, "_SupportsTextureFormatNative", null), 
e([ t.cache ], n, "_get_copyTextureSupport", null), e([ t.cache ], n, "_get_deviceModel", null), 
e([ t.cache ], n, "_get_deviceName", null), e([ t.cache ], n, "_get_deviceType", null), 
e([ t.cache ], n, "_get_deviceUniqueIdentifier", null), e([ t.cache ], n, "_get_graphicsDeviceID", null), 
e([ t.cache ], n, "_get_graphicsDeviceName", null), e([ t.cache ], n, "_get_graphicsDeviceType", null), 
e([ t.cache ], n, "_get_graphicsDeviceVendor", null), e([ t.cache ], n, "_get_graphicsDeviceVendorID", null), 
e([ t.cache ], n, "_get_graphicsDeviceVersion", null), e([ t.cache ], n, "_get_graphicsMemorySize", null), 
e([ t.cache ], n, "_get_graphicsShaderLevel", null), e([ t.cache ], n, "_get_maxTextureSize", null), 
e([ t.cache ], n, "_get_operatingSystem", null), e([ t.cache ], n, "_get_operatingSystemFamily", null), 
e([ t.cache ], n, "_get_processorCount", null), e([ t.cache ], n, "_get_processorFrequency", null), 
e([ t.cache ], n, "_get_processorType", null), e([ t.cache ], n, "_get_supportedRandomWriteTargetCount", null), 
e([ t.cache ], n, "_get_supportedRenderTargetCount", null), e([ t.cache ], n, "_get_supports3DTextures", null), 
e([ t.cache ], n, "_get_supportsComputeShaders", null), e([ t.cache ], n, "_get_supportsImageEffects", null), 
e([ t.cache ], n, "_get_supportsRenderTextures", null), e([ t.cache ], n, "_get_systemMemorySize", null), 
Il2Cpp.Api.SystemInfo = n;

},{"decorator-cache-getter":193}],133:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OperatingSystemFamily = exports.DeviceType = exports.CopyTextureSupport = exports.RenderTextureFormat = exports.UnityEngine_SystemInfo_impl = void 0;

const e = require("../Type/class");

require("./api");

class t extends e.mscorlib_System_Type_impl {
  GetCompatibleFormat(e) {
    return Il2Cpp.Api.SystemInfo._GetCompatibleFormat(this.handle, e);
  }
  GetCopyTextureSupport() {
    return Il2Cpp.Api.SystemInfo._GetCopyTextureSupport(this.handle);
  }
  get deviceModel() {
    return readU16(Il2Cpp.Api.SystemInfo._get_deviceModel(this.handle));
  }
  get deviceName() {
    return readU16(Il2Cpp.Api.SystemInfo._get_deviceName(this.handle));
  }
  get deviceType() {
    return Il2Cpp.Api.SystemInfo._get_deviceType(this.handle);
  }
  get graphicsDeviceName() {
    return readU16(Il2Cpp.Api.SystemInfo._get_graphicsDeviceName(this.handle));
  }
  get graphicsDeviceVendorID() {
    return Il2Cpp.Api.SystemInfo._get_graphicsDeviceVendorID(this.handle);
  }
  get graphicsDeviceVersion() {
    return readU16(Il2Cpp.Api.SystemInfo._get_graphicsDeviceVersion(this.handle));
  }
  get graphicsMemorySize() {
    return Il2Cpp.Api.SystemInfo._get_graphicsMemorySize(this.handle);
  }
  get graphicsShaderLevel() {
    return Il2Cpp.Api.SystemInfo._get_graphicsShaderLevel(this.handle);
  }
  get maxTextureSize() {
    return Il2Cpp.Api.SystemInfo._get_maxTextureSize(this.handle);
  }
  get operatingSystem() {
    return readU16(Il2Cpp.Api.SystemInfo._get_operatingSystem(this.handle));
  }
  get operatingSystemFamily() {
    return Il2Cpp.Api.SystemInfo._get_operatingSystemFamily(this.handle);
  }
  get processorCount() {
    return Il2Cpp.Api.SystemInfo._get_processorCount(this.handle);
  }
  get processorFrequency() {
    return Il2Cpp.Api.SystemInfo._get_processorFrequency(this.handle);
  }
  get processorType() {
    return readU16(Il2Cpp.Api.SystemInfo._get_processorType(this.handle));
  }
  get supportedRandomWriteTargetCount() {
    return Il2Cpp.Api.SystemInfo._get_supportedRandomWriteTargetCount(this.handle);
  }
  get supportedRenderTargetCount() {
    return Il2Cpp.Api.SystemInfo._get_supportedRenderTargetCount(this.handle);
  }
  get supports3DTextures() {
    return Il2Cpp.Api.SystemInfo._get_supports3DTextures(this.handle);
  }
  get supportsComputeShaders() {
    return Il2Cpp.Api.SystemInfo._get_supportsComputeShaders(this.handle);
  }
  get supportsImageEffects() {
    return Il2Cpp.Api.SystemInfo._get_supportsImageEffects(this.handle);
  }
  get supportsRenderTextures() {
    return Il2Cpp.Api.SystemInfo._get_supportsRenderTextures(this.handle);
  }
  get systemMemorySize() {
    return Il2Cpp.Api.SystemInfo._get_systemMemorySize(this.handle);
  }
}

var r, p, s, o;

exports.UnityEngine_SystemInfo_impl = t, Il2Cpp.SystemInfo = t, function(e) {
  e[e.ARGB1555 = 6] = "ARGB1555", e[e.ARGB2101010 = 8] = "ARGB2101010", e[e.ARGB32 = 0] = "ARGB32", 
  e[e.ARGB4444 = 5] = "ARGB4444", e[e.ARGB64 = 10] = "ARGB64", e[e.ARGBFloat = 11] = "ARGBFloat", 
  e[e.ARGBHalf = 2] = "ARGBHalf", e[e.ARGBInt = 17] = "ARGBInt", e[e.BGR101010_XR = 27] = "BGR101010_XR", 
  e[e.BGRA10101010_XR = 26] = "BGRA10101010_XR", e[e.BGRA32 = 20] = "BGRA32", e[e.Default = 7] = "Default", 
  e[e.DefaultHDR = 9] = "DefaultHDR", e[e.Depth = 1] = "Depth", e[e.R16 = 28] = "R16", 
  e[e.R8 = 16] = "R8", e[e.RFloat = 14] = "RFloat", e[e.RG16 = 25] = "RG16", e[e.RG32 = 23] = "RG32", 
  e[e.RGB111110Float = 22] = "RGB111110Float", e[e.RGB565 = 4] = "RGB565", e[e.RGBAUShort = 24] = "RGBAUShort", 
  e[e.RGFloat = 12] = "RGFloat", e[e.RGHalf = 13] = "RGHalf", e[e.RGInt = 18] = "RGInt", 
  e[e.RHalf = 15] = "RHalf", e[e.RInt = 19] = "RInt", e[e.Shadowmap = 3] = "Shadowmap";
}(r = exports.RenderTextureFormat || (exports.RenderTextureFormat = {})), function(e) {
  e[e.Basic = 1] = "Basic", e[e.Copy3D = 2] = "Copy3D", e[e.DifferentTypes = 4] = "DifferentTypes", 
  e[e.None = 0] = "None", e[e.RTToTexture = 16] = "RTToTexture", e[e.TextureToRT = 8] = "TextureToRT";
}(p = exports.CopyTextureSupport || (exports.CopyTextureSupport = {})), function(e) {
  e[e.Console = 2] = "Console", e[e.Desktop = 3] = "Desktop", e[e.Handheld = 1] = "Handheld", 
  e[e.Unknown = 0] = "Unknown";
}(s = exports.DeviceType || (exports.DeviceType = {})), function(e) {
  e[e.Linux = 3] = "Linux", e[e.MacOSX = 1] = "MacOSX", e[e.Other = 0] = "Other", 
  e[e.Windows = 2] = "Windows";
}(o = exports.OperatingSystemFamily || (exports.OperatingSystemFamily = {}));

},{"../Type/class":137,"./api":132}],134:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":132,"./class":133}],135:[function(require,module,exports){
"use strict";

},{}],136:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, p) {
  var n, o = arguments.length, i = o < 3 ? t : null === p ? p = Object.getOwnPropertyDescriptor(t, r) : p;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, p); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (i = (o < 3 ? n(i) : o > 3 ? n(t, r, i) : n(t, r)) || i);
  return o > 3 && i && Object.defineProperty(t, r, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class r {
  static get _Equals_obj() {
    return Il2Cpp.Api.o("mscorlib", "System.Type", "Equals", 1, [ "System.Object" ], "pointer", [ "pointer", "pointer" ]);
  }
  static get _Equals_type() {
    return Il2Cpp.Api.o("mscorlib", "System.Type", "Equals", 1, [ "System.Type" ], "bool", [ "pointer", "pointer" ]);
  }
  static get _GetArrayRank() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "GetArrayRank", 0, "int", [ "pointer" ]);
  }
  static get _GetConstructor() {
    return Il2Cpp.Api.o("mscorlib", "System.Type", "GetConstructor", 1, [ "System.Type[]" ], "pointer", [ "pointer", "pointer" ]);
  }
  static get _GetEnumName() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "GetEnumName", 0, "pointer", [ "pointer" ]);
  }
  static get _GetEnumNames() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "GetEnumNames", 0, "pointer", [ "pointer" ]);
  }
  static get _GetHashCode() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "GetHashCode", 0, "int", [ "pointer" ]);
  }
  static get _GetType_0() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "GetType", 0, "pointer", [ "pointer" ]);
  }
  static get _GetType_1() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "GetType", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _ToString() {
    return Il2Cpp.Api.t("mscorlib", "System.Type", "ToString", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], r, "_Equals_obj", null), e([ t.cache ], r, "_Equals_type", null), 
e([ t.cache ], r, "_GetArrayRank", null), e([ t.cache ], r, "_GetConstructor", null), 
e([ t.cache ], r, "_GetEnumName", null), e([ t.cache ], r, "_GetEnumNames", null), 
e([ t.cache ], r, "_GetHashCode", null), e([ t.cache ], r, "_GetType_0", null), 
e([ t.cache ], r, "_GetType_1", null), e([ t.cache ], r, "_ToString", null), mscorlib.Api.Type = r;

},{"decorator-cache-getter":193}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_Type_impl = void 0;

const e = require("../class");

class t extends e.mscorlib_System_Object_impl {
  Delimiter=lfvt(this.handle, "Delimiter", findClass("Type"));
  EmptyTypes=lfvt(this.handle, "EmptyTypes", findClass("Type"));
  FilterAttribute=lfvt(this.handle, "FilterAttribute", findClass("Type"));
  FilterName=lfvt(this.handle, "FilterName", findClass("Type"));
  FilterNameIgnoreCase=lfvt(this.handle, "FilterNameIgnoreCase", findClass("Type"));
  Missing=new mscorlib.Object(lfvt(this.handle, "Missing", findClass("Type")));
  Equals_obj(e) {
    return mscorlib.Api.Type._Equals_obj(this.handle, e);
  }
  Equals_type(e) {
    return mscorlib.Api.Type._Equals_type(this.handle, e.handle);
  }
  GetArrayRank() {
    return mscorlib.Api.Type._GetArrayRank(this.handle).toInt32();
  }
  GetConstructor(e) {
    return mscorlib.Api.Type._GetConstructor(this.handle, e[0].handle);
  }
  GetEnumName(e) {
    return readU16(mscorlib.Api.Type._GetEnumName(this.handle, e));
  }
  GetEnumNames() {
    return mscorlib.Api.Type._GetEnumNames(this.handle);
  }
  GetHashCode() {
    return mscorlib.Api.Type._GetHashCode(this.handle).toInt32();
  }
  GetType_0() {
    return new t(mscorlib.Api.Type._GetType_0(this.handle));
  }
  GetType_1(e) {
    return new t(mscorlib.Api.Type._GetType_1(this.handle, e));
  }
  toString() {
    return readU16(mscorlib.Api.Type._ToString(this.handle));
  }
  get name() {
    return this.toString().split("Type: ")[1];
  }
  get class() {
    return findClass(this.name);
  }
  get caseToRuntimeType() {
    return new mscorlib.RuntimeType(this.handle);
  }
}

exports.mscorlib_System_Type_impl = t, mscorlib.Type = t;

},{"../class":159}],138:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface");

},{"./api":136,"./class":137,"./interface":139}],139:[function(require,module,exports){
"use strict";

},{}],140:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, o = arguments.length, l = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, n, i); else for (var p = e.length - 1; p >= 0; p--) (r = e[p]) && (l = (o < 3 ? r(l) : o > 3 ? r(t, n, l) : r(t, n)) || l);
  return o > 3 && l && Object.defineProperty(t, n, l), l;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class n {
  static get _ctor_0() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _AddCall() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "AddCall", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _DirtyPersistentCalls() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "DirtyPersistentCalls", 0, "void", [ "pointer" ]);
  }
  static get _FindMethod() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "FindMethod", 1, "pointer", [ "pointer", "pointer" ]);
  }
  static get _FindMethod_2() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "FindMethod", 4, "pointer", [ "pointer", "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _GetValidMethodInfo() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "GetValidMethodInfo", 3, "pointer", [ "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _PrepareInvoke() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "PrepareInvoke", 0, "pointer", [ "pointer" ]);
  }
  static get _RebuildPersistentCallsIfNeeded() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RebuildPersistentCallsIfNeeded", 0, "void", [ "pointer" ]);
  }
  static get _RemoveListener() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "RemoveListener", 2, "void", [ "pointer", "pointer", "pointer" ]);
  }
  static get _ToString() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Events.UnityEventBase", "ToString", 0, "pointer", [ "pointer" ]);
  }
}

e([ t.cache ], n, "_ctor_0", null), e([ t.cache ], n, "_AddCall", null), e([ t.cache ], n, "_DirtyPersistentCalls", null), 
e([ t.cache ], n, "_FindMethod", null), e([ t.cache ], n, "_FindMethod_2", null), 
e([ t.cache ], n, "_GetValidMethodInfo", null), e([ t.cache ], n, "_PrepareInvoke", null), 
e([ t.cache ], n, "_RebuildPersistentCallsIfNeeded", null), e([ t.cache ], n, "_RemoveListener", null), 
e([ t.cache ], n, "_ToString", null), mscorlib.Api.UnityEventBase = n;

},{"decorator-cache-getter":193}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_Object_impl = exports.UnityEventBase_impl = void 0;

const e = require("../class");

Object.defineProperty(exports, "mscorlib_System_Object_impl", {
  enumerable: !0,
  get: function() {
    return e.mscorlib_System_Object_impl;
  }
});

const t = require("../InvokableCallList/class");

class s extends e.mscorlib_System_Object_impl {
  m_Calls=new t.InvokableCallList_impl(lfv(this.handle, "m_Calls", findClass("UnityEventBase", [ "UnityEngine.CoreModule" ])));
  m_CallsDirty=lfv(this.handle, "m_CallsDirty", findClass("UnityEventBase", [ "UnityEngine.CoreModule" ]));
  m_PersistentCalls=lfv(this.handle, "m_PersistentCalls", findClass("UnityEventBase", [ "UnityEngine.CoreModule" ]));
  constructor(e) {
    super(e);
  }
  ctor_0() {
    return new s(mscorlib.Api.UnityEventBase._ctor_0(alloc()));
  }
  AddListener(e) {
    return mscorlib.Api.UnityEventBase._AddCall(this.handle, e);
  }
  DirtyPersistentCalls() {
    return mscorlib.Api.UnityEventBase._DirtyPersistentCalls(this.handle);
  }
  Findmethod(e, t) {
    return mscorlib.Api.UnityEventBase._FindMethod(this.handle, e, t);
  }
  Findmethod_2(e, t) {
    return mscorlib.Api.UnityEventBase._FindMethod_2(this.handle, e, t);
  }
}

exports.UnityEventBase_impl = s, mscorlib.UnityEventBase = s;

},{"../InvokableCallList/class":49,"../class":159}],142:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class");

},{"./api":140,"./class":141}],143:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, o, r) {
  var n, i = arguments.length, l = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, o, r); else for (var p = e.length - 1; p >= 0; p--) (n = e[p]) && (l = (i < 3 ? n(l) : i > 3 ? n(t, o, l) : n(t, o)) || l);
  return i > 3 && l && Object.defineProperty(t, o, l), l;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ColorAPI = void 0;

const t = require("../../class");

require("./export"), require("./class"), require("./interface");

const o = require("decorator-cache-getter");

class r extends t.mscorlib_System_Object_impl {
  static get _ctor_3() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", ".ctor", 3, "pointer", [ "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _ctor_4() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", ".ctor", 4, "pointer", [ "pointer", "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _Equals_obj() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "Equals", 1, [ "System.Object" ], "bool", [ "pointer", "pointer" ]);
  }
  static get _Equals_color() {
    return Il2Cpp.Api.o("UnityEngine.CoreModule", "UnityEngine.Color", "Equals", 1, [ "UnityEngine.Color" ], "bool", [ "pointer", "pointer" ]);
  }
  static get _GetHashCode() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "GetHashCode", 0, "uint32", [ "pointer" ]);
  }
  static get _toString() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "ToString", 0, "pointer", [ "pointer" ]);
  }
  static get _ToString_str_IFormatProvider() {
    return Il2Cpp.Api.t("UnityEngine.CoreModule", "UnityEngine.Color", "ToString", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
}

e([ o.cache ], r, "_ctor_3", null), e([ o.cache ], r, "_ctor_4", null), e([ o.cache ], r, "_Equals_obj", null), 
e([ o.cache ], r, "_Equals_color", null), e([ o.cache ], r, "_GetHashCode", null), 
e([ o.cache ], r, "_toString", null), e([ o.cache ], r, "_ToString_str_IFormatProvider", null), 
exports.ColorAPI = r, Il2Cpp.Api.Color = r;

},{"../../class":159,"./class":144,"./export":145,"./interface":146,"decorator-cache-getter":193}],144:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ColorImpl = void 0;

const r = require("../class"), e = require("./api");

class o extends r.mscorlib_System_ValueType {
  r;
  g;
  b;
  a;
  constructor(r) {
    super(r), this.r = r.readU8(), this.g = r.add(8).readU8(), this.b = r.add(16).readU8(), 
    this.a = r.add(24).readU8();
  }
  ctor_3(r, t, s) {
    return new o(e.ColorAPI._ctor_3(this.handle, r, t, s));
  }
  ctor_4(r, t, s, l) {
    return new o(e.ColorAPI._ctor_4(this.handle, r, t, s, l));
  }
  Equals_obj(r) {
    return e.ColorAPI._Equals_obj(this.handle, r);
  }
  Equals_color(r) {
    return e.ColorAPI._Equals_color(this.handle, r.handle);
  }
  GetHashCode() {
    return e.ColorAPI._GetHashCode(this.handle);
  }
  toString() {
    return readU16(e.ColorAPI._toString(this.handle));
  }
  toString_str_IFormatProvider(r, o) {
    return readU16(e.ColorAPI._ToString_str_IFormatProvider(this.handle, r, o));
  }
}

exports.ColorImpl = o, Il2Cpp.Color = o;

},{"../class":155,"./api":143}],145:[function(require,module,exports){
"use strict";

},{}],146:[function(require,module,exports){
"use strict";

},{}],147:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../../class");

require("./export"), require("./class"), require("./interface");

class r extends e.mscorlib_System_Object_impl {}

Il2Cpp.Api.Quaternion = r;

},{"../../class":159,"./class":148,"./export":149,"./interface":150}],148:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../class");

class t extends e.mscorlib_System_ValueType {
  x;
  y;
  z;
  w;
  constructor(e) {
    super(e), this.x = e.add(0).readFloat(), this.y = e.add(4).readFloat(), this.z = e.add(8).readFloat(), 
    this.w = e.add(12).readFloat();
  }
  _ctor_4(e, t, r, o) {
    throw new Error("Method not implemented.");
  }
  _Angle_2(e, t) {
    throw new Error("Method not implemented.");
  }
  _AngleAxis_2(e, t) {
    throw new Error("Method not implemented.");
  }
  _Dot_2(e, t) {
    throw new Error("Method not implemented.");
  }
  _Euler_1(e) {
    throw new Error("Method not implemented.");
  }
  _Euler_3(e, t, r) {
    throw new Error("Method not implemented.");
  }
  _FromToRotation_2(e, t) {
    throw new Error("Method not implemented.");
  }
  _GetHashCode() {
    throw new Error("Method not implemented.");
  }
  _Inverse_1(e) {
    throw new Error("Method not implemented.");
  }
  _Lerp_3(e, t, r) {
    throw new Error("Method not implemented.");
  }
  _ToString() {
    throw new Error("Method not implemented.");
  }
  _get_eulerAngles() {
    throw new Error("Method not implemented.");
  }
  _get_identity() {
    throw new Error("Method not implemented.");
  }
}

Il2Cpp.Quaternion = t;

},{"../class":155}],149:[function(require,module,exports){
"use strict";

},{}],150:[function(require,module,exports){
"use strict";

},{}],151:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./export"), require("./class"), require("./interface");

class e {}

Il2Cpp.Api.Vector3 = e;

},{"./class":152,"./export":153,"./interface":154}],152:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Vector3Impl = void 0;

const e = require("../class");

class t extends e.mscorlib_System_ValueType {
  x;
  y;
  z;
  toFixedNum=2;
  constructor(e, t = 2) {
    super(e), this.toFixedNum = t, this.x = e.readFloat(), this.y = e.add(Process.pageSize).readFloat(), 
    this.z = e.add(2 * Process.pageSize).readFloat();
  }
  set FixedNum(e) {
    this.toFixedNum = e;
  }
  new(e, s, o) {
    let i = allocVector(0, 0, 0);
    return i.writeFloat(e), i.add(Process.pageSize).writeFloat(s), i.add(2 * Process.pageSize).writeFloat(o), 
    new t(i);
  }
  toString() {
    return `Vector3(${this.handle}) : (${this.x.toFixed(this.toFixedNum)}, ${this.y.toFixed(this.toFixedNum)}, ${this.z.toFixed(this.toFixedNum)})`;
  }
}

exports.Vector3Impl = t, Il2Cpp.Vector3 = t;

},{"../class":155}],153:[function(require,module,exports){
"use strict";

},{}],154:[function(require,module,exports){
"use strict";

},{}],155:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_ValueType = void 0;

const e = require("../class");

class s extends e.mscorlib_System_Object_impl {}

exports.mscorlib_System_ValueType = s;

},{"../class":159}],156:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getTypeName = void 0;

const e = require("../class"), t = t => ("number" == typeof t && (t = ptr(t)), new e.mscorlib_System_Object_impl(t).getType()), l = e => t(e).name;

exports.getTypeName = l;

const n = e => {
  e = checkCmdInput(e);
  const t = getType(e).caseToRuntimeType;
  lfs(t.get_Module().handle, findClass("Module"));
}, o = e => {
  e = checkCmdInput(e);
  const t = new mscorlib.Type(e).caseToRuntimeType;
  LOGJSON(t.get_Module());
}, s = (e, t = !1) => {
  let l = [], n = getType(e).caseToRuntimeType;
  for (let e = 0; e < 20; ++e) {
    let t = o(n, e);
    if (t.handle.isNull()) break;
    l.push(t);
  }
  if (t) return l;
  function o(t, l = 0) {
    if (null == e || null == e) throw new Error("current mPtr can't be null");
    for (let e = 0; e < l; ++e) t = t.caseToRuntimeType.get_BaseType();
    return t;
  }
  newLine(), LOGD(l.map((e => `${e.name}(${e.handle})`)).join(" <--- ")), newLine();
};

globalThis.getType = t, globalThis.getTypeName = l, globalThis.showTypeParent = s, 
globalThis.getTypeParent = e => s(e, !0), globalThis.showTypeModuleByType = o, globalThis.showTypeModuleByIns = n;

},{"../class":159}],157:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./class"), require("./exports"), require("./Color/api"), require("./Quaternion/api"), 
require("./Vector3/api");

},{"./Color/api":143,"./Quaternion/api":147,"./Vector3/api":151,"./class":155,"./exports":156}],158:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, c) {
  var i, l = arguments.length, o = l < 3 ? t : null === c ? c = Object.getOwnPropertyDescriptor(t, r) : c;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, c); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (o = (l < 3 ? i(o) : l > 3 ? i(t, r, o) : i(t, r)) || o);
  return l > 3 && o && Object.defineProperty(t, r, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter");

class r {
  static get _ctor_0() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", ".ctor", 0, "pointer", [ "pointer" ]);
  }
  static get _toString() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", "ToString", 0, "pointer", [ "pointer" ]);
  }
  static get _getType() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", "GetType", 0, "pointer", [ "pointer" ]);
  }
  static get _finalize() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", "finalize", 0, "pointer", [ "pointer" ]);
  }
  static get _getHashCode() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", "getHashCode", 0, "pointer", [ "pointer" ]);
  }
  static get _Equals_1() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", "Equals", 2, "pointer", [ "pointer", "pointer" ]);
  }
  static get _Equals_2() {
    return Il2Cpp.Api.t("mscorlib", "System.Object", "Equals", 2, "pointer", [ "pointer", "pointer", "pointer" ]);
  }
}

e([ t.cache ], r, "_ctor_0", null), e([ t.cache ], r, "_toString", null), e([ t.cache ], r, "_getType", null), 
e([ t.cache ], r, "_finalize", null), e([ t.cache ], r, "_getHashCode", null), e([ t.cache ], r, "_Equals_1", null), 
e([ t.cache ], r, "_Equals_2", null), Reflect.set(globalThis, "mscorlib", class {}), 
Reflect.set(mscorlib, "Api", class {}), mscorlib.Api.mscorlibObj = r;

},{"decorator-cache-getter":193}],159:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.mscorlib_System_Object_impl = void 0, require("./interface");

class e {
  handle;
  constructor(e) {
    this.handle = e;
  }
  ctor() {
    return mscorlib.Api.mscorlibObj._ctor_0(allocP(1));
  }
  toString() {
    return readU16(mscorlib.Api.mscorlibObj._toString(this.handle));
  }
  memberwiseClone() {
    throw new Error("Not implemented");
  }
  getType() {
    return new mscorlib.Type(mscorlib.Api.mscorlibObj._getType(this.handle));
  }
  finalize() {
    return mscorlib.Api.mscorlibObj._finalize(this.handle);
  }
  getHashCode() {
    return mscorlib.Api.mscorlibObj._getHashCode(this.handle);
  }
}

exports.mscorlib_System_Object_impl = e, mscorlib.Object = e;

},{"./interface":161}],160:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./api"), require("./class"), require("./interface"), require("./Application/include"), 
require("./GUI/include"), require("./Object/include"), require("./Input/include"), 
require("./Delegate/include"), require("./Module/include"), require("./Physics/include"), 
require("./SystemInfo/include"), require("./PlayerPrefs/include"), require("./Resources/include"), 
require("./ResourcesAPI/include"), require("./ResourcesRequest/include"), require("./Times/include"), 
require("./Type/include"), require("./RuntimeType/include"), require("./RuntimeTypeHandle/include"), 
require("./AbstractEventData/include"), require("./Debug/include"), require("./Logger/include"), 
require("./ValueType/include"), require("./UnityEventBase/include"), require("./InvokableCallList/include");

},{"./AbstractEventData/include":35,"./Application/include":39,"./Debug/include":42,"./Delegate/include":45,"./GUI/include":46,"./Input/include":47,"./InvokableCallList/include":50,"./Logger/include":52,"./Module/include":55,"./Object/include":106,"./Physics/include":108,"./PlayerPrefs/include":112,"./Resources/include":123,"./ResourcesAPI/include":117,"./ResourcesRequest/include":121,"./RuntimeType/include":130,"./RuntimeTypeHandle/include":126,"./SystemInfo/include":134,"./Times/include":135,"./Type/include":138,"./UnityEventBase/include":142,"./ValueType/include":157,"./api":158,"./class":159,"./interface":161}],161:[function(require,module,exports){
"use strict";

},{}],162:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./thread");

},{"./thread":163}],163:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = () => {
  Il2Cpp.Api._threadCurrent().isNull() && Il2Cpp.Domain.attach();
}, t = () => {
  let e = Il2Cpp.Api._threadCurrent();
  e.isNull() || new Il2Cpp.Thread(e).detach();
};

globalThis.attachCurrentThread = e, globalThis.detachCurrentThread = t;

},{}],164:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./TypeExtends/include");

},{"./TypeExtends/include":23}],165:[function(require,module,exports){
"use strict";

},{}],166:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("frida-il2cpp-bridge"), require("./API/include"), require("./expand/include"), 
require("./base/include"), require("./bridge/include"), require("./java/include"), 
require("./utils/include"), require("./plugin/include"), require("./globel");

},{"./API/include":1,"./base/include":9,"./bridge/include":21,"./expand/include":164,"./globel":165,"./java/include":171,"./plugin/include":175,"./utils/include":187,"frida-il2cpp-bridge":221}],167:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./include"), globalThis.main = () => {};

},{"./include":166}],168:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.iterClassLoader = exports.listClassLoader = void 0;

const s = require("../utils/formart");

class a {
  static iterClassLoader=(s, a = !1) => {
    function e(s, a) {
      Java.classFactory.loader = s, a(s);
    }
    Java.perform((() => {
      Java.enumerateClassLoaders({
        onMatch: function(r) {
          a && LOGD("classLoader" + r.toString()), r.toString().indexOf("dalvik.system.DexClassLoader"), 
          null != s && e(r, s);
        },
        onComplete: function() {}
      });
    }));
  };
  static loaders=new Array;
  static listClassLoader=(e = !0, r = !0) => {
    if (r || 0 !== a.loaders.length) if (e) {
      o(), [ "java.lang.BootClassLoader", "dalvik.system.DexClassLoader", "dalvik.system.PathClassLoader", "dalvik.system.InMemoryDexClassLoader" ].forEach((e => {
        s.formartClass.printTitile(e), this.loaders.forEach((s => {
          s.toString().indexOf(e) > -1 && LOGD("  [" + a.loaders.indexOf(s) + "] " + s.toString());
        }));
      }));
    } else Java.perform((() => a.iterClassLoader((() => {}), !0))); else o();
    function o() {
      0 === a.loaders.length && Java.perform((() => a.iterClassLoader((s => {
        a.loaders.includes(s) || a.loaders.push(s);
      }), !1)));
    }
  };
  static getClassLoaderByDescriptor=s => {
    let e = null;
    return a.loaders.forEach((a => {
      a.toString().indexOf(s) > -1 && (e = a);
    })), e;
  };
  static getClassLoaderByIndex=s => a.loaders[s];
}

const e = a.listClassLoader;

exports.listClassLoader = e;

const r = a.iterClassLoader;

exports.iterClassLoader = r;

const o = a.getClassLoaderByDescriptor, t = a.getClassLoaderByIndex;

globalThis.listClassLoader = e, globalThis.iterClassLoader = r, globalThis.getClassLoaderByDescriptor = o, 
globalThis.getClassLoaderByIndex = t;

},{"../utils/formart":186}],169:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const a = require("./classLoader"), e = (e = "com.unity3d.player.UnityPlayerActivity") => {
  let t = !0;
  Java.perform((() => {
    (0, a.iterClassLoader)((function(a) {
      if (a) try {
        a.loadClass(e) && (t = !1), Java.choose(e, {
          onMatch: function(e) {
            LOGD("[*] onMatch : \n\t" + e.toString() + " at " + a.toString());
          },
          onComplete: function() {}
        });
      } catch {}
    }), !1);
  }));
}, t = () => {
  Java.perform((function() {
    Java.enumerateLoadedClasses({
      onMatch: function(a) {
        LOG("[*] Class Name: " + a);
        var e = Java.use(a).class.getMethods();
        for (var t in e) LOG("\t" + e[t]);
      },
      onComplete: function() {}
    });
  }));
}, o = () => {
  Java.perform((function() {
    Java.enumerateLoadedClasses({
      onMatch: function(a) {
        LOG(a);
      },
      onComplete: function() {}
    });
  }));
}, n = () => {
  Java.perform((function() {
    var a = "android.security.keystore.KeyGenParameterSpec$Builder", e = Java.use(a).class.getMethods();
    for (var t in LOG("[*] Class Name: " + a), LOG("[*] Method Names:"), e) LOG(e[t]);
  }));
};

globalThis.findJavaClass = e;

},{"./classLoader":168}],170:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.setClick = exports.HookMotionEvent = void 0;

const o = () => {
  Java.perform((() => {
    Java.use("android.view.View").onTouchEvent.implementation = function(o) {
      let e = this.onTouchEvent(o);
      return LOG("\n" + getLine(25) + " onTouchEvent " + getLine(25), LogColor.YELLOW), 
      LOG(e + "\t" + o, LogColor.C36), e;
    }, Java.use("android.app.Activity").dispatchTouchEvent.implementation = function(o) {
      let e = this.dispatchTouchEvent(o);
      return LOG("\n" + getLine(25) + " dispatchTouchEvent " + getLine(25), LogColor.YELLOW), 
      LOG(e + "\t" + o, LogColor.C36), e;
    };
  }));
};

exports.HookMotionEvent = o;

const e = (o, e) => {
  null != o && null != e && Java.perform((() => {
    let t = Java.use("android.app.Instrumentation"), n = Java.use("android.os.SystemClock"), i = Java.use("android.view.MotionEvent"), a = t.$new(), s = n.uptimeMillis(), r = i.obtain(s, s, 0, o, e, 0), l = n.uptimeMillis(), u = i.obtain(l, l, 1, o, e, 0);
    a.sendPointerSync(r), a.sendPointerSync(u);
  }));
};

exports.setClick = e, globalThis.HookMotionEvent = o, globalThis.setClick = e;

},{}],171:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./click"), require("./info"), require("./others"), require("./logcat"), 
require("./classUtils"), require("./classLoader");

},{"./classLoader":168,"./classUtils":169,"./click":170,"./info":172,"./logcat":173,"./others":174}],172:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.launchApp = exports.getApkInfo = void 0;

const e = require("fastest-levenshtein"), t = require("../utils/formart");

function a() {
  function e(e, t) {
    const a = [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102 ];
    let n = Java.use("java.security.MessageDigest").getInstance(t);
    n.update(e);
    let o = n.digest(), i = [];
    for (let e = 0, n = 0; ;e++, n++) {
      if (e >= ("MD5" == t ? 16 : "SHA-1" == t ? 20 : 32)) return Java.use("java.lang.String").$new(i);
      let l = o[e];
      i[n] = a[15 & l >>> 4], i[++n] = a[15 & l];
    }
  }
  Java.perform((() => {
    LOGO(getLine(100));
    let t = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), a = t.getPackageManager().getPackageInfo(t.getPackageName(), 0), n = a.applicationInfo.value, o = n.labelRes.value, i = t.getResources().getString(o);
    LOGD("[*]AppName\t\t" + i + " (UID:" + n.uid.value + ")\t ID:0x" + n.labelRes.value.toString(16));
    let l = n.flags.value;
    LOGZ("\t\t\tBackupable -> " + (0 != (32768 & l)) + "\tDebugable -> " + (0 != (2 & l)));
    let s = t.getPackageName();
    LOGD("\n[*]PkgName\t\t" + s);
    let r = a.versionName.value, p = a.versionCode.value, c = a.applicationInfo.value.targetSdkVersion.value;
    LOGD("\n[*]Verison\t\t{ " + r + " / " + p + " }\t(targetSdkVersion:" + c + ")");
    let u = Java.use("java.io.File").$new(n.sourceDir.value).length();
    LOGD("\n[*]AppSize\t\t" + u + "\t(" + (u / 1024 / 1024).toFixed(2) + " MB)"), LOGD("\n[*]Time\t\t\tInstallTime\t" + new Date(a.firstInstallTime.value).toLocaleString()), 
    LOGD("\t\t\tUpdateTime\t" + new Date(a.lastUpdateTime.value).toLocaleString());
    let d = n.sourceDir.value, g = n.dataDir.value;
    LOGD("\n[*]Location\t\t" + d + "\n\t\t\t" + function(e) {
      let t = "";
      return Java.perform((() => {
        let a = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext().getApplicationInfo().nativeLibraryDir.value;
        t = a + "/" + (null == e ? "" : e);
      })), t;
    }() + "\n\t\t\t" + g);
    let C = t.getPackageManager().getPackageInfo(s, 64).signatures.value[0].toByteArray();
    LOGD("\n[*]Signatures\t\tMD5\t " + e(C, "MD5") + "\n\t\t\tSHA-1\t " + e(C, "SHA-1") + "\n\t\t\tSHA-256\t " + e(C, "SHA-256")), 
    LOGD("\n[*]unity.build-id\t" + function(e) {
      let t = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), a = t.getPackageManager().getApplicationInfo(t.getPackageName(), 128).metaData.value;
      if (null != a) return a.getString(e);
      return "...";
    }("unity.build-id")), LOGO(getLine(100));
  }));
}

function n() {
  let e = getLine(20);
  LOGE(`${e} Application ${e}`), LOGD(`Application.dataPath\t\t${Il2Cpp.Application.dataPath}`), 
  LOGD(`Application.persistentDataPath\t${Il2Cpp.Application.persistentDataPath}`), 
  LOGD(`Application.streamingAssetsPath\t${Il2Cpp.Application.streamingAssetsPath}`), 
  LOGD(`Application.temporaryCachePath\t${Il2Cpp.Application.temporaryCachePath}`), 
  LOGD(`Application.unityVersion\t\t${Il2Cpp.Application.unityVersion}`), LOGD(`Application.version\t\t${Il2Cpp.Application.version}`), 
  LOGD(`Application.identifier\t\t${Il2Cpp.Application.identifier}`), LOGD(`Application.companyName\t\t${Il2Cpp.Application.companyName}`), 
  LOGD(`Application.productName\t\t${Il2Cpp.Application.productName}`);
}

exports.getApkInfo = a;

let o = new Array;

const i = (a = "", n = !1, i = -1) => {
  let l = -1, s = [], r = Date.now();
  function p(e) {
    let a = `${t.formartClass.alignStr(`[${++l}]`, 5)} ${e.address}  ---\x3e   ${e.address.sub(soAddr)}\t${e.name}`;
    -1 != i && i > 10 && (a = t.formartClass.alignStr(a, i)), s.push(a);
  }
  function c(e) {
    let a = `${t.formartClass.alignStr(`[${++l}]`, 5)} ${e.handle}  ---\x3e   ${e.relativeVirtualAddress}\t${e.class.name} | ${e}`;
    -1 != i && i > 10 && (a = t.formartClass.alignStr(a, i)), s.push(a);
  }
  findExport("il2cpp_", "libil2cpp.so", (e => {
    "function" == e.type && e.name.toLocaleLowerCase().includes(a.toLowerCase()) && p(e);
  })), findExport("", "libunity.so", (e => {
    "function" == e.type && e.name.toLocaleLowerCase().includes(a.toLowerCase()) && p(e);
  })), n ? 0 == o.length ? Il2Cpp.Domain.assemblies.forEach((e => {
    e.image.classes.forEach((e => {
      e.methods.forEach((e => {
        o.push(e), e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
      }));
    }));
  })) : o.filter((e => e.name.toLocaleLowerCase().includes(a.toLowerCase()))).forEach(c) : (new Il2Cpp.Class(findClass("Text")).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("Transform")).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("GameObject")).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("Application")).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("Input")).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("PlayerPrefs")).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("Object", [ "UnityEngine.CoreModule" ], !1)).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  })), new Il2Cpp.Class(findClass("Object", [ "mscorlib" ], !1)).methods.forEach((e => {
    e.name.toLocaleLowerCase().includes(a.toLowerCase()) && c(e);
  }))), s.sort(e.distance).forEach(LOGD), LOGZ(`\nTake ${Date.now() - r}ms to find ${s.length} ${s.length <= 1 ? "result" : "results"}`), 
  -1 != i && i < 100 && LOGZ(`\n${i} lines of results are shown recommended to be greater than 100`), 
  newLine(1);
}, l = e => Java.perform((() => {
  let t = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext();
  t.startActivity(Java.use("android.content.Intent").$new(t.getPackageManager().getLaunchIntentForPackage(e)));
}));

exports.launchApp = l, Reflect.set(globalThis, "launchApp", l), Reflect.set(globalThis, "getApkInfo", a), 
Reflect.set(globalThis, "printExp", i), Reflect.set(globalThis, "getUnityInfo", n);

},{"../utils/formart":186,"fastest-levenshtein":194}],173:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.HookJavaLog = void 0;

const t = require("../utils/formart"), a = () => {
  Java.perform((() => {
    var a = Java.use("android.util.Log");
    a.isLoggable.overload("java.lang.String", "int").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " isLoggable was called:"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.d.overload("java.lang.String", "java.lang.String").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " DEBUG (d):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.d.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function(a, r, n) {
      return LOGD("[*] " + t.formartClass.getTime() + " DEBUG (d):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), LOGD("\targ3 : " + n.toString()), !0;
    }, a.e.overload("java.lang.String", "java.lang.String").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " ERROR (e):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.e.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function(a, r, n) {
      return LOGD("[*] " + t.formartClass.getTime() + " ERROR (e):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), LOGD("\targ3 : " + n.toString()), !0;
    }, a.i.overload("java.lang.String", "java.lang.String").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " INFO (i):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.i.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function(a, r, n) {
      return LOGD("[*] " + t.formartClass.getTime() + " INFO (i):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), LOGD("\targ3 : " + n.toString()), !0;
    }, a.v.overload("java.lang.String", "java.lang.String").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " VERBOSE (v):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.v.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function(a, r, n) {
      return LOGD("[*] " + t.formartClass.getTime() + " VERBOSE (v):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), LOGD("\targ3 : " + n.toString()), !0;
    }, a.w.overload("java.lang.String", "java.lang.String").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " WARNING (w):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.w.overload("java.lang.String", "java.lang.Throwable").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " WARNING (w):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.w.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function(a, r, n) {
      return LOGD("[*] " + t.formartClass.getTime() + " WARNING (w):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), LOGD("\targ3 : " + n.toString()), !0;
    }, a.wtf.overload("java.lang.String", "java.lang.String").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " WTF (wtf):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.wtf.overload("java.lang.String", "java.lang.Throwable").implementation = function(a, r) {
      return LOGD("[*] " + t.formartClass.getTime() + " WTF (wtf):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), !0;
    }, a.wtf.overload("java.lang.String", "java.lang.String", "java.lang.Throwable").implementation = function(a, r, n) {
      return LOGD("[*] " + t.formartClass.getTime() + " WTF (wtf):"), LOGD("\targ1 : " + a.toString()), 
      LOGD("\targ2 : " + r.toString()), LOGD("\targ3 : " + n.toString()), !0;
    };
  }));
};

exports.HookJavaLog = a, globalThis.HookJavaLog = a;

},{"../utils/formart":186}],174:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Toast = void 0;

var a = a => {
  Java.scheduleOnMainThread((() => {
    let e = Java.use("android.app.ActivityThread").currentApplication().getApplicationContext();
    Java.use("android.widget.Toast").makeText(e, Java.use("java.lang.String").$new(a), 1).show();
  }));
};

exports.Toast = a, globalThis.Toast = a;

},{}],175:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./std/_include");

},{"./std/_include":176}],176:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./std_deque"), require("./std_string"), require("./std_vector");

},{"./std_deque":177,"./std_string":178,"./std_vector":179}],177:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class e {
  constructor(e, t, r) {
    this.addr = e, this.valueSize = t, this.introspectElement = r;
  }
  get DEQUESIZ() {
    return this.valueSize <= 1 ? 16 : this.valueSize <= 2 ? 8 : this.valueSize <= 4 ? 4 : this.valueSize <= 8 ? 2 : 1;
  }
  get containerProxy() {
    return this.addr.readPointer();
  }
  get map() {
    return this.addr.add(Process.pointerSize).readPointer();
  }
  get mapsize() {
    return this.addr.add(2 * Process.pointerSize).readPointer();
  }
  get myoff() {
    return this.addr.add(3 * Process.pointerSize).readPointer();
  }
  get mysize() {
    return this.addr.add(4 * Process.pointerSize).readPointer();
  }
  get contents() {
    const e = [], t = this.DEQUESIZ, r = this.map, i = this.mapsize, s = this.myoff.toInt32(), o = this.mysize.toInt32();
    for (let n = s; n < s + o; n++) {
      const s = n % i, o = Math.floor(s / t), a = s % t, d = r.add(Process.pointerSize * o).readPointer().add(this.valueSize * a);
      let h;
      h = this.introspectElement ? this.introspectElement(d) : d.readByteArray(this.valueSize), 
      e.push(h);
    }
    return e;
  }
  toString() {
    return "deque@" + this.addr + "{ map=" + this.map + ", offset=" + this.myoff + ", size=" + this.mysize + ", contents: " + this.contents + "}";
  }
}

exports.default = e;

},{}],178:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = 16;

class r {
  constructor(e) {
    this.addr = e;
  }
  get bufAddr() {
    return this.reservedSize.compare(16) > 0 ? this.addr.readPointer() : this.addr;
  }
  get size() {
    return this.addr.add(16).readPointer();
  }
  get reservedSize() {
    return this.addr.add(16).add(Process.pointerSize).readPointer();
  }
  toString() {
    const e = this.size;
    return e.isNull() ? "<EMPTY std::string>" : Memory.readCString(this.bufAddr, e.toInt32());
  }
}

exports.default = r;

},{}],179:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class t {
  constructor(t, e) {
    this.addr = t, this.elementSize = e.elementSize ? e.elementSize : Process.pointerSize, 
    this.introspectElement = e.introspectElement;
  }
  get myfirst() {
    return this.addr.readPointer();
  }
  get mylast() {
    return this.addr.add(Process.pointerSize).readPointer();
  }
  get myend() {
    return this.addr.add(2 * Process.pointerSize).readPointer();
  }
  countBetween(t, e) {
    if (t.isNull()) return 0;
    return e.sub(t).toInt32() / this.elementSize;
  }
  get size() {
    return this.countBetween(this.myfirst, this.mylast);
  }
  get capacity() {
    return this.countBetween(this.myfirst, this.myend);
  }
  toString() {
    let t = "std::vector(" + this.myfirst + ", " + this.mylast + ", " + this.myend + ")";
    if (t += "{ size: " + this.size + ", capacity: " + this.capacity, this.introspectElement) {
      t += ", content: [";
      const e = this.myfirst;
      if (!e.isNull()) {
        const i = this.mylast;
        for (let s = e; s.compare(i) < 0; s = s.add(this.elementSize)) s.compare(e) > 0 && (t += ", "), 
        t += this.introspectElement(s);
      }
      t += "]";
    }
    return t += " }", t;
  }
}

exports.default = t;

},{}],180:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.allocVector = exports.allocUStr = exports.allocCStr = exports.alloc = void 0;

const l = require("../base/enum"), o = (o, e = l.TYPE_STR.C_STR) => e == l.TYPE_STR.C_STR ? Memory.allocUtf8String(o) : Il2Cpp.Api._stringNew(Memory.allocUtf8String(o)), e = e => o(e, l.TYPE_STR.C_STR);

exports.allocCStr = e;

const t = e => o(e, l.TYPE_STR.U_STR);

exports.allocUStr = t;

const r = (l = Process.pointerSize) => Memory.alloc(l), s = (l = 1) => r(l * p_size);

function c(l = 0, o = 0, e = 0, t) {
  let r = arguments.length;
  r = 0 == r ? 3 : r;
  let c = s(r + 1);
  for (let l = 0; l < r; ++l) c.add(Process.pointerSize * l).writeFloat(null == arguments[l] ? 0 : arguments[l]);
  return c.add(Process.pointerSize * r).writeInt(0), c;
}

exports.alloc = s, exports.allocVector = c, globalThis.allocCStr = e, globalThis.allocUStr = t, 
globalThis.allocVector = c, globalThis.alloc = s, globalThis.allocP = r;

},{"../base/enum":6}],181:[function(require,module,exports){
"use strict";

function e(e) {
  const t = new Map;
  return new Proxy(e, {
    construct(e, n) {
      const o = n[0].toUInt32();
      return t.has(o) || t.set(o, new e(n[0])), t.get(o);
    }
  });
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.runOnce = exports.cacheInstances = void 0, exports.cacheInstances = e;

const t = new Map;

function n(e) {
  return function(n, o, s) {
    const c = s.value;
    return t.has(c) || "function" == typeof c && (s.value = function(...n) {
      console.log("Logged at:", (new Date).toLocaleString());
      const o = c.apply(this, n);
      return console.log(`Result from ${e}: ${o}`), t.set(c, o), o;
    }), t.get(c);
  };
}

exports.runOnce = n;

},{}],182:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.callFunctionRA = exports.callFunctionRCS = exports.callFunctionRUS = exports.callFunctionRF = exports.callFunctionRS = exports.callFunctionRI = exports.callFunctionRB = exports.callFunction = void 0;

const t = require("./checkP"), n = require("./reader");

function l(n, ...l) {
  try {
    if (null == n) return ptr(0);
    for (let t = 1; t <= (arguments.length < 5 ? 5 : arguments.length) - 1; t++) arguments[t] = null == arguments[t] ? ptr(0) : ptr(String(arguments[t]));
    return new NativeFunction((0, t.checkPointer)(n, !0), "pointer", [ "pointer", "pointer", "pointer", "pointer" ])(arguments[1], arguments[2], arguments[3], arguments[4]);
  } catch (t) {
    return LOG(t, LogColor.C95), ptr(0);
  }
}

function o(n, ...l) {
  try {
    if (null == n) return ptr(0);
    for (let t = 1; t <= (arguments.length < 5 ? 5 : arguments.length) - 1; t++) arguments[t] = null == arguments[t] ? ptr(0) : ptr(String(arguments[t]));
    return new NativeFunction((0, t.checkPointer)(n, !0), "pointer", [ "pointer", "pointer", "pointer", "pointer" ])(arguments[1], arguments[2], arguments[3], arguments[4]);
  } catch (t) {
    return ptr(0);
  }
}

exports.callFunction = l;

const r = (t, ...n) => 1 == c(t, ...n);

exports.callFunctionRB = r;

const c = (t, ...n) => o(t, ...n).toInt32();

exports.callFunctionRI = c;

const e = (t, ...l) => (0, n.readSingle)(o(t, ...l));

exports.callFunctionRS = e;

const i = (t, ...n) => alloc(2 * p_size).writePointer(o(t, ...n)).readFloat();

exports.callFunctionRF = i;

const a = (t, ...o) => (0, n.readU16)(l(t, ...o));

exports.callFunctionRUS = a;

const u = (t, ...n) => {
  let o = l(t, ...n).readCString();
  return null == o ? "" : o;
};

exports.callFunctionRCS = u;

const s = (t, ...l) => (0, n.showArray)(o(t, ...l));

exports.callFunctionRA = s, globalThis.callFunction = l, globalThis.callFunctionRB = r, 
globalThis.callFunctionRI = c, globalThis.callFunctionRS = e, globalThis.callFunctionRF = i, 
globalThis.callFunctionRUS = a, globalThis.callFunctionRCS = u, globalThis.callFunctionRA = s, 
globalThis.callFunctionWithOutError = o;

},{"./checkP":183,"./reader":190}],183:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.checkPointer = void 0;

const r = (r, e = !1, t = !1) => {
  if (Il2Cpp.module.base.isNull()) return ptr(r);
  if ("arm64" == Process.arch && "string" == typeof r && r.trim().startsWith("0x") && (r = Number(r)), 
  "number" == typeof r) return n(ptr(r));
  if ("string" == typeof r) return Module.findExportByName(null, r);
  if ("function" == typeof r) return r;
  if ("object" == typeof r) {
    if (r instanceof NativePointer) return n(r);
    if (!(r instanceof Array)) {
      if (e) throw new Error("checkPointer: Error type");
      return ptr(0);
    }
    if (!function(r) {
      if (3 == r.length) {
        if ("string" != typeof r[0]) return !1;
        if ("string" != typeof r[1]) return !1;
        if ("number" != typeof r[2]) return !1;
      }
      for (let e = 0; e < r.length; e++) if (3 != r.length && "string" != typeof r[e]) return !1;
      return !0;
    }(r)) {
      if (e) throw new Error("checkPointer: checkValue Error");
      return ptr(0);
    }
    switch (r.length) {
     case 1:
      return Module.findExportByName(null, r[0]);

     case 2:
      return Module.findExportByName(r[0], r[1]);

     case 3:
      return find_method(r[0], r[1], r[2], r[3]);

     default:
      if (e) throw new Error("checkPointer:UnKnow value length \nArray<> length must be 1,2,3");
      return ptr(0);
    }
  }
  return ptr(0);
  function n(r) {
    if (r.isNull() || !r.compare(soAddr)) return r;
    try {
      if (null === Process.findModuleByAddress(r)) {
        let t = Il2Cpp.module.base.add(r);
        if (null === Process.findModuleByAddress(t)) {
          if (e) throw new Error("checkPointer: can't find module");
          return ptr(0);
        }
        return t;
      }
      return r;
    } catch (r) {
      if (e) throw r;
      return ptr(0);
    }
  }
};

exports.checkPointer = r, globalThis.checkPointer = exports.checkPointer, globalThis.checkCmdInput = r => {
  if ("number" == typeof r && (r = ptr(r)), "string" == typeof r && (String(r).startsWith("0x") || String(r).startsWith("0X")) && (r = ptr(r)), 
  r.isNull()) throw new Error("mPtr can't be null");
  return r;
};

const e = (r = "libil2cpp.so") => {
  let e = Process.findModuleByName("libil2cpp.so");
  if ("string" == typeof r) try {
    e = Process.findModuleByName(r);
  } catch (r) {
    throw r;
  } else if ("number" == typeof r) try {
    e = Process.getModuleByAddress(r);
  } catch (t) {
    e = Process.findModuleByName(r);
  } else r = ptr(r);
  if (null == e) throw new Error("getSubBasePtr: can't find module");
  return e;
};

globalThis.getSubBasePtr = r => {
  let t = e(r);
  return r.sub(t.base);
}, globalThis.getSubBaseDes = r => {
  let t = e(r);
  return `${r.sub(t.base)} <--- ${r} @ ${t.name} (${t.base})`;
};

},{}],184:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getJclassName = exports.mapValueToArray = exports.PTR2NativePtr = exports.filterDuplicateOBJ = exports.checkCtx = exports.cancelAllNopedFunction = exports.cancelNop = exports.nopFunction = exports.replaceFunction = exports.detachAll = exports.attachNative = exports.SeeTypeToString = exports.getFunctionAddrFromCls = void 0;

const e = require("../base/enum"), n = require("../base/globle");

function t(e) {
  return null == e ? ptr(0) : ("number" == typeof e && (e = ptr(e)), e);
}

var r;

exports.PTR2NativePtr = t, function(e) {
  e.org = "org", e.src = "src", e.enter = "enter", e.leave = "leave", e.time = "time";
}(r || (r = {}));

let a = (0, n.GET_MAP)(e.MapKAY.map_attach_listener);

const d = (e, n, t, d = !0) => {
  if ("number" == typeof e && (e = ptr(e)), e instanceof NativePointer && e.isNull()) return;
  var o = new Map;
  o.set(r.org, e), o.set(r.src, e), o.set(r.enter, n), o.set(r.leave, t), o.set(r.time, new Date), 
  e = checkPointer(e);
  let i = Interceptor.attach(e, {
    onEnter: function(e) {
      null != n && n(e, this.context, o);
    },
    onLeave: function(e) {
      null != t && t(e, this.context, o);
    }
  });
  d && a.set(String(e), i);
};

exports.attachNative = d;

let o = new Array;

var i = e => {
  "number" == typeof e && (e = ptr(e)), null != e && u(e, (() => ptr(0)), !0);
};

exports.nopFunction = i;

var l = e => {
  if ("number" == typeof e && (e = ptr(e)), e != ptr(0)) {
    e = checkPointer(e), Interceptor.revert(e);
    for (let n = 0; n < o.length; n++) String(o[n]) == String(e) && (o = o.splice(o[n], 1));
  }
};

exports.cancelNop = l;

var c = () => o.forEach((e => Interceptor.revert(e)));

exports.cancelAllNopedFunction = c;

const s = t => {
  let r = (0, n.GET_MAP)(e.MapKAY.map_attach_listener);
  if ("number" == typeof t && (t = ptr(t)), null == t) r.clear(), Interceptor.detachAll(); else {
    let e = String(checkPointer(t)), n = r.get(e);
    null != n && (n.detach(), r.delete(e));
  }
};

function u(e, n, t = !0) {
  "number" == typeof e && (e = ptr(e));
  let r = e;
  e = checkPointer(e), -1 == String(o).indexOf(String(e)) ? o.push(String(e)) : Interceptor.revert(e);
  let a = new NativeFunction(e, "pointer", [ "pointer", "pointer", "pointer", "pointer" ]);
  Interceptor.replace(e, new NativeCallback(((d, o, i, l) => {
    LOGW("\nCalled " + (t ? "Replaced" : "Nop") + " function ---\x3e " + e + " (" + r.sub(Il2Cpp.module.base) + ")");
    let c = n(a, d, o, i, l);
    return null == c ? ptr(0) : c;
  }), "pointer", [ "pointer", "pointer", "pointer", "pointer" ]));
}

exports.detachAll = s, exports.replaceFunction = u;

const p = (e, n) => {
  "string" == typeof e && (e = findClass(e)), "number" == typeof e && (e = ptr(e));
  let t = new Il2Cpp.Class(e).methods;
  for (let e = 0; e < t.length; e++) if (-1 != t[e].name.indexOf(n)) return t[e].relativeVirtualAddress;
  return -1;
};

exports.getFunctionAddrFromCls = p;

const m = (e, n) => {
  if ("number" == typeof e && (e = ptr(e)), null == e || e == ptr(0)) return;
  let t = callFunction(find_method("UnityEngine.CoreModule", "Object", "ToString", 0), e);
  if (null != n) return readU16(t);
  LOG(readU16(t));
};

exports.SeeTypeToString = m;

const b = (t, r) => {
  let a = callFunction((0, n.GET_F)(e.EpFunc.DecodeJObject), (0, n.GET_F)(e.EpFunc.ArtCurrent), t), d = callFunction((0, 
  n.GET_F)(e.EpFunc.GetDescriptor), a, alloc());
  if (r) return String(d.readCString());
  LOG("\n" + String(d.readCString()) + "\n", e.LogColor.C36);
};

function v(e, n = "LR") {
  let t = getPlatformCtx(e), r = t.lr, a = t.pc, d = Process.findModuleByAddress(r);
  if ("LR" == n && null != d) return r.sub(d.base) + `|${d.name}`;
  let o = Process.findModuleByAddress(a);
  return "PC" == n && null != o ? a.sub(o.base) + `|${o.name}` : "SP" == n ? String(t.sp).toString() : JSON.stringify(e);
}

exports.getJclassName = b, exports.checkCtx = v;

const w = e => {
  var n = [];
  for (var t in e) n.push([ t, e.get(t) ]);
  return n;
};

exports.mapValueToArray = w;

var g = (e, n) => {
  null != n && ("function" == typeof e && (n = e, e = find_method("UnityEngine.UI", "CanvasUpdateRegistry", "PerformUpdate", 0)), 
  A(e, (() => {
    if (null != n && null != n) {
      try {
        n();
      } catch (e) {
        LOGE(e);
      }
      n = () => {};
    }
  })));
}, R = (e, n, t = "") => {
  Java.perform((() => Java.use("com.unity3d.player.UnityPlayer").UnitySendMessage(e, n, t)));
}, f = e => {
  switch (e) {
   case "IronSource":
    n();
    break;

   case "MaxSdkCallbacks":
    t();
    break;

   case "MoPubManager":
    r();
    break;

   case "TPluginsGameObject":
    a();
    break;

   default:
    n(), t(), r(), a();
  }
  function n() {
    R("IronSourceEvents", "onRewardedVideoAvailabilityChanged", "true"), R("IronSourceEvents", "onRewardedVideoAdShowFailedDemandOnly", "true"), 
    R("IronSourceEvents", "onInterstitialAdReady", ""), R("IronSourceEvents", "onRewardedVideoAdOpened", ""), 
    R("IronSourceEvents", "onRewardedVideoAdStarted", ""), R("IronSourceEvents", "onRewardedVideoAdEnded", ""), 
    R("IronSourceEvents", "onRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}"), 
    R("IronSourceEvents", "onRewardedVideoAdClosed", ""), R("IronSourceRewardedVideoAndroid", "onRewardedVideoAvailabilityChanged", "true"), 
    R("IronSourceRewardedVideoAndroid", "onRewardedVideoAdShowFailedDemandOnly", "true"), 
    R("IronSourceRewardedVideoAndroid", "onInterstitialAdReady", ""), R("IronSourceRewardedVideoAndroid", "onRewardedVideoAdOpened", ""), 
    R("IronSourceRewardedVideoAndroid", "onRewardedVideoAdStarted", ""), R("IronSourceRewardedVideoAndroid", "onRewardedVideoAdEnded", ""), 
    R("IronSourceRewardedVideoAndroid", "OnRewardedVideoAdRewarded", "{'placement_reward_name':'Virtual Item','placement_name':'rewardedVideo','placement_reward_amount':'1','placement_id':'2'}"), 
    R("IronSourceRewardedVideoAndroid", "onRewardedVideoAdClosed", "");
  }
  function t() {
    R("MaxSdkCallbacks", "ForwardEvent", "networkName=AppLovin\nname=OnRewardedAdRevenuePaidEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n"), 
    R("MaxSdkCallbacks", "ForwardEvent", "networkName=AppLovin\nname=OnRewardedAdDisplayedEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n"), 
    R("MaxSdkCallbacks", "ForwardEvent", "revenue=0.014579974174499511\nnetworkName=AppLovin\nname=OnRewardedAdReceivedRewardEvent\nplacement=\nrewardAmount=0\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\nrewardLabel=\n"), 
    R("MaxSdkCallbacks", "ForwardEvent", "networkName=AppLovin\nname=OnRewardedAdHiddenEvent\nrevenue=0.014579974174499511\nplacement=\nadUnitId=e01cb721520cd33c\ncreativeId=11831000\n"), 
    R("MaxSdkCallbacks", "OnRollicAdsRewardedVideoClickedEvent", "name=OnSdkInitializedEvent\nconsentDialogState=2\ncountryCode=SG\n"), 
    R("MaxSdkCallbacks", "OnRollicAdsRewardedVideoClosedEvent", "name=OnRewardedAdDisplayedEvent\nadUnitId=ec1a772e0459f45b"), 
    R("MaxSdkCallbacks", "OnRollicAdsRewardedVideoReceivedRewardEvent", "name=OnRewardedAdReceivedRewardEvent\nrewardAmount=0\nadUnitId=ec1a772e0459f45b\nrewardLabel="), 
    R("MaxSdkCallbacks", "OnRollicAdsRewardedVideoShownEvent", "name=OnRewardedAdHiddenEvent\nadUnitId=ec1a772e0459f45b"), 
    R("MaxSdkCallbacks", "OnRollicAdsRewardedVideoLoadedEvent", "name=OnRewardedAdLoadedEvent\nadUnitId=ec1a772e0459f45b");
  }
  function r() {
    R("UnityFacebookSDKPlugin", "UnityFacebookSDKPlugin", '{"key_hash":"NgS2u0aEWjJAWRbMgtyAolzO6s8=\\n"}'), 
    R("MoPubManager", "EmitSdkInitializedEvent", '["0fe07d2ca88549ff9598aed6c45f0773","70"]'), 
    R("MoPubManager", "EmitInterstitialLoadedEvent", '["a44632b619174dfa98c46420592a3756"]'), 
    R("MoPubManager", "EmitAdLoadedEvent", '["f7a8241fad1041bda59f303eae75be2d","320","50"]'), 
    R("MoPubManager", "EmitRewardedVideoLoadedEvent", '["a44632b619174dfa98c46420592a3756"]'), 
    R("MoPubManager", "EmitRewardedVideoShownEvent", '["a44632b619174dfa98c46420592a3756"]'), 
    R("MoPubManager", "EmitRewardedVideoReceivedRewardEvent", '["a44632b619174dfa98c46420592a3756","","0"]'), 
    R("MoPubManager", "EmitRewardedVideoClosedEvent", '["a44632b619174dfa98c46420592a3756"]');
  }
  function a() {
    R("TTPluginsGameObject", "OnRewardedAdsShown", ""), R("TTPluginsGameObject", "OnRewardedAdsClosed", '{"shouldReward":true,"network":"admob-unityads","revenue":0.00138,"currency":"USD","precision":"ESTIMATED"}'), 
    R("TTPluginsGameObject", "OnRewardedAdsReady", '{"loaded":true}');
  }
  R("GameAnalytics", "OnCommandCenterUpdated", ""), R("GameAnalytics", "OnRemoteConfigsUpdated", ""), 
  R("UnityFacebookSDKPlugin", "OnInitComplete", '{"key_hash":"0eWmEB4CY7TpepNbZdxCOaz2Crs=\n"}');
};

const S = (t, r = 10) => {
  if (!(0, n.GET_MAP)(e.MapKAY.outFilterMap).has(t)) return (0, n.SET_MAP_VALUE)(e.MapKAY.outFilterMap, t, 0), 
  0;
  let a = Number((0, n.GET_MAP_VALUE)(e.MapKAY.outFilterMap, t)) + 1;
  return (0, n.SET_MAP_VALUE)(e.MapKAY.outFilterMap, t, a), a >= r ? -1 : a;
};

exports.filterDuplicateOBJ = S, Number.prototype.add = e => Number(this) + Number(e), 
globalThis.d = s, globalThis.A = d, globalThis.n = i, globalThis.nn = l, globalThis.nnn = c, 
globalThis.R = u, globalThis.getJclassName = b, globalThis.checkCtx = v, globalThis.runOnMain = g, 
globalThis.SendMessage = R, globalThis.SendMessageImpl = f;

},{"../base/enum":6,"../base/globle":8}],185:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.printCtx = void 0;

const e = require("../base/enum");

var t = (t, r = 5, o = 0, l = e.LogColor.WHITE, s = 0) => {
  if ("arm" == Process.arch && !(t = checkPointer(t)).isNull()) if (0 != o) for (let e = 0; e < r; e++) i(t, e); else {
    let e = null == r ? 5 : (r % 2 == 1 ? r + 1 : r) / 2;
    for (let o = null == r ? -4 : e - r; o < e; o++) i(t, o);
  }
  function i(e, t) {
    let r = e.add(p_size * t), i = String(r.readPointer());
    "arm" == Process.arch && 10 != i.length && (i = i.replace("000", "0000"));
    let n = Array.from(i.toUpperCase()), a = 10 == n.length ? i : "";
    1 == o ? a = n[2] + n[3] + " " + n[4] + n[5] + " " + n[6] + n[7] + " " + n[8] + n[9] : 2 == o && (a = n[8] + n[9] + " " + n[6] + n[7] + " " + n[4] + n[5] + " " + n[2] + n[3]);
    try {
      LOG(getLine(s, "\t") + r + "\t" + a + "\t" + Instruction.parse(r), l);
    } catch (e) {}
  }
};

exports.printCtx = t, globalThis.printCtx = t;

},{"../base/enum":6}],186:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.formartClass = void 0;

const t = require("../base/enum");

class e {
  static printTitileA=(r, i = t.LogColor.C33) => e.printTitile(r, i, i, i);
  static printTitile=(e, r = t.LogColor.C33, i = t.LogColor.C33, n = t.LogColor.C33) => {
    let s = e.length + 2;
    return LOG(` ${getLine(s)} `, r), LOG(`| ${e} |`, i), LOG(` ${getLine(s)} `, n), 
    s;
  };
  static linesMap=new Map;
  static getLine=(t, r = "-") => {
    let i = t + "|" + r;
    if (null != e.linesMap.get(i)) return e.linesMap.get(i);
    for (var n = 0, s = ""; n < t; n++) s += r;
    return e.linesMap.set(i, s), s;
  };
  static alignStr(t, e = 2 * p_size + 3, r = ".") {
    let i = (t = String(t)).length;
    if (i >= e) t = t.substring(0, e - 1), t += r; else for (let r = e - i; r > 0; r--) t += " ";
    return t;
  }
  static getTime=() => {
    let t = new Date;
    return t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
  };
  static insertStr(t, e, r) {
    return t.length < e ? t + "" + r : `${t.substring(0, e)}${r}${t.substring(e, t.length)}`;
  }
  static getPtrFormart=(t, e = String(Il2Cpp.module.base).length) => {
    let r = t.toString(16);
    if (r.length > e) return r.substring(0, e - 1) + ".";
    for (let t = e - r.length; t > 0; t--) r += " ";
    return `0x${r}`;
  };
  static centerStr=(t = "...", e = Process.pointerSize + 2) => {
    if (e <= t.length) return t;
    let r = (e - t.length) / 2;
    return `${getLine(r, " ")}${t}${getLine(r, " ")}`;
  };
}

exports.formartClass = e, globalThis.insertStr = e.insertStr;

},{"../base/enum":6}],187:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./alloc"), require("./cache"), require("./caller"), require("./checkP"), 
require("./common"), require("./formart"), require("./logger"), require("./math"), 
require("./reader"), require("./stack"), require("./context"), require("./stdString");

},{"./alloc":180,"./cache":181,"./caller":182,"./checkP":183,"./common":184,"./context":185,"./formart":186,"./logger":188,"./math":189,"./reader":190,"./stack":191,"./stdString":192}],188:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getLine = exports.printLogColors = exports.LOGZ = exports.LOGH = exports.LOGO = exports.LOGD = exports.LOGG = exports.LOGE = exports.LOGW = exports.LOGS = exports.LOGJSON = exports.LOG = void 0;

const o = require("../base/enum"), e = require("../base/globle"), t = require("./formart"), r = t => (0, 
e.SET_G)(o.GKEY.LogFlag, t), s = () => (0, e.GET_GT)(o.GKEY.LogFlag), l = (e, t = o.LogColor.WHITE) => {
  switch (t) {
   case o.LogColor.WHITE:
    console.log(e);
    break;

   case o.LogColor.RED:
    console.error(e);
    break;

   case o.LogColor.YELLOW:
    console.warn(e);
    break;

   default:
    console.log("[" + t + "m" + e + "[0m");
  }
};

exports.LOG = l;

const L = (e, t = o.LogColor.C36, r = 1) => (0, exports.LOG)(JSON.stringify(e, null, r), t);

exports.LOGJSON = L;

const g = "[0m", O = o => `[${o}m`, G = (e, r = [ [ 0, e.length, o.LogColor.RED ] ]) => {
  let s = e;
  for (let o = 0; o < r.length; o++) {
    const [e, l, L] = r[o];
    let g = O(L);
    s = t.formartClass.insertStr(s, e, g), s = t.formartClass.insertStr(s, l + g.length, "[0m");
  }
  console.log(s);
};

exports.LOGS = G;

const n = e => (0, exports.LOG)(e, o.LogColor.YELLOW);

exports.LOGW = n;

const p = e => (0, exports.LOG)(e, o.LogColor.RED);

exports.LOGE = p;

const x = e => (0, exports.LOG)(e, o.LogColor.C32);

exports.LOGG = x;

const i = e => (0, exports.LOG)(e, o.LogColor.C36);

exports.LOGD = i;

const a = e => (0, exports.LOG)(e, o.LogColor.C33);

exports.LOGO = a;

const c = e => (0, exports.LOG)(e, o.LogColor.C96);

exports.LOGH = c;

const C = e => (0, exports.LOG)(e, o.LogColor.C90);

function b() {
  let o = "123456789";
  console.log("----------------  listLogColors  ----------------");
  for (let e = 30; e <= 37; e++) console.log(`\t\t${O(e)} C${e}\t${o} [0m`);
  console.log("----------------------------------------------");
  for (let e = 40; e <= 47; e++) console.log(`\t\t${O(e)} C${e}\t${o} [0m`);
  console.log("----------------------------------------------");
  for (let e = 90; e <= 97; e++) console.log(`\t\t${O(e)} C${e}\t${o} [0m`);
  console.log("----------------------------------------------");
  for (let e = 100; e <= 107; e++) console.log(`\t\t${O(e)} C${e}\t${o} [0m`);
  console.log("----------------------------------------------");
}

exports.LOGZ = C, exports.printLogColors = b;

let T = new Map;

const h = (o, e = "-") => {
  if (0 == o) return "";
  let t = o + "|" + e;
  if (null != T.get(t)) return T.get(t);
  for (var r = 0, s = ""; r < o; r++) s += e;
  return T.set(t, s), s;
};

exports.getLine = h, globalThis.LOG = exports.LOG, globalThis.LOGJSON = exports.LOGJSON, 
globalThis.LOGW = exports.LOGW, globalThis.LOGE = exports.LOGE, globalThis.LOGG = exports.LOGG, 
globalThis.LOGD = exports.LOGD, globalThis.LOGO = exports.LOGO, globalThis.LOGH = exports.LOGH, 
globalThis.LOGZ = exports.LOGZ, globalThis.getLine = exports.getLine, globalThis.printLogColors = b, 
globalThis.LogColor = o.LogColor, globalThis.newLine = (o = 1) => (0, exports.LOG)((0, 
exports.getLine)(o, "\n"));

},{"../base/enum":6,"../base/globle":8,"./formart":186}],189:[function(require,module,exports){
"use strict";

function e() {
  return Math.floor(Math.random() * 2 ** 31);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Random = exports.randomSeed = void 0, exports.randomSeed = e;

class t {
  seed;
  constructor(e) {
    this.seed = e;
  }
  next=() => this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  nextInt=(e, t) => Math.floor(this.next() * (t - e + 1) + e);
}

exports.Random = t;

},{}],190:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getFloat = exports.seeHexA = exports.seeHexR = exports.showArray = exports.readU16 = exports.readInt64 = exports.readUInt64 = exports.readUInt = exports.readInt = exports.readBoolean = exports.readSingle = void 0;

const e = require("../base/enum"), t = require("./common"), r = e => alloc(2).writePointer(e).readFloat();

exports.readSingle = r;

const o = e => 1 == alloc(.25).writePointer(e).readU8();

exports.readBoolean = o;

const n = e => alloc().writePointer(e).readInt();

exports.readInt = n;

const a = e => alloc(1).writePointer(e).readUInt();

exports.readUInt = a;

const l = e => alloc(2).writePointer(e).readS64();

exports.readInt64 = l;

const i = e => alloc(2).writePointer(e).readU64();

exports.readUInt64 = i;

const s = e => {
  if ("number" == typeof e && (e = ptr(e)), null == e || e == ptr(0)) return "";
  try {
    return e.add(2 * p_size + 4).readUtf16String();
  } catch {
    return "";
  }
};

exports.readU16 = s;

const d = (t, r) => {
  if ("number" == typeof t && (t = ptr(t)), null == t || t == ptr(0)) return;
  let o = t, n = o.add(3 * p_size).readUInt();
  if (LOGD(`\n[*] Array length : ${n}  |  RET => ${o}\n`), 0 != n) {
    x(o.add(4 * p_size), (n > 32 ? 32 : n) * p_size, !1, e.LogColor.C33), newLine();
    for (let t = 0; t < n; ++t) {
      let n = ptr(o).add(p_size * (4 + t)), a = n.readPointer(), l = "";
      try {
        l = `${getType(a).toString()} | ${new Il2Cpp.Object(a).toString()}`;
      } catch {
        l = new Il2Cpp.Object(a).toString();
      }
      l.indexOf("String") && (l += `\t|${s(a)}|`), l.indexOf("Text") && (l += `\t${callFunctionRUS([ "UnityEngine.UI", "Text", "get_fontSize", 0 ])} ${a}`), 
      (l.indexOf("TermData") || l.indexOf("LanguageData")) && (l += `\t | ${s(n.readPointer().add(8).readPointer())}| `), 
      LOGD(String("[" + t + "]").padEnd(5, " ") + " " + n + " ---\x3e " + a + "  |  " + l), 
      null != r && "function" == typeof r && LOG("\t" + r(a, l), e.LogColor.C90);
    }
    newLine();
  }
};

exports.showArray = d;

var p = (r, o = 64, n) => {
  r = (0, t.PTR2NativePtr)(r), LOG(hexdump(r.readPointer(), {
    length: o
  }), null == n ? e.LogColor.WHITE : n);
};

exports.seeHexR = p;

var x = (r, o = 64, n = !0, a) => {
  r = (0, t.PTR2NativePtr)(r), LOG(hexdump(r, {
    length: o,
    header: n
  }), null == a ? e.LogColor.WHITE : a);
};

exports.seeHexA = x;

const g = e => alloc(1).writeFloat(e).readPointer();

exports.getFloat = g, globalThis.readSingle = r, globalThis.readBoolean = o, globalThis.readInt = n, 
globalThis.readUInt = a, globalThis.readInt64 = l, globalThis.readUInt64 = i, globalThis.readU16 = s, 
globalThis.showArray = d, globalThis.seeHexR = p, globalThis.seeHexA = x;

},{"../base/enum":6,"./common":184}],191:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GetStackTraceN = exports.GetStackTrace = exports.PrintStackTraceN = exports.PrintStackTrace = void 0;

const a = () => LOG(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new()), LogColor.C36);

exports.PrintStackTrace = a;

const e = (a, e = !1, r = 6, t = !1) => {
  let c = "";
  return c = t ? Thread.backtrace(a, Backtracer.FUZZY).slice(0, r).reverse().map(DebugSymbol.fromAddress).join("\n") : Thread.backtrace(a, Backtracer.FUZZY).slice(0, r).map(DebugSymbol.fromAddress).join("\n"), 
  e ? c : LOGD(c);
};

exports.PrintStackTraceN = e;

var r = () => Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Throwable").$new());

exports.GetStackTrace = r;

var t = (a, e = 6) => Thread.backtrace(a, Backtracer.FUZZY).slice(0, e).map((a => DebugSymbol.fromAddress(a))).join("\n");

exports.GetStackTraceN = t, globalThis.PrintStackTrace = a, globalThis.PrintStackTraceN = e, 
globalThis.GetStackTrace = r, globalThis.GetStackTraceN = t;

},{}],192:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.get_PrettyMethod = exports.readStdString = void 0;

const e = () => {
  let e = Module.findExportByName("libart.so", "_ZN3art9ArtMethod12PrettyMethodEb");
  if (null != e) return LOGD(`PrettyMethod_ptr => ${e}`), new NativeFunction(e, [ "pointer", "pointer", "pointer" ], [ "pointer", "bool" ]);
  LOGD("libart.so PrettyMethod_ptr is null");
};

exports.get_PrettyMethod = e, globalThis.readStdString = e => {
  let t = Memory.alloc(3 * Process.pointerSize);
  return t.writePointer(e[0]), t.add(1 * Process.pointerSize).writePointer(e[1]), 
  t.add(2 * Process.pointerSize).writePointer(e[2]), 0 == (1 & t.readU8()) ? t.add(1).readUtf8String() : t.add(2 * Process.pointerSize).readPointer().readUtf8String();
};

},{}],193:[function(require,module,exports){
"use strict";

function e(e, r, t) {
  var o = t.get;
  if (!o) throw new TypeError("Getter property descriptor expected");
  t.get = function() {
    var e = o.call(this);
    return Object.defineProperty(this, r, {
      configurable: t.configurable,
      enumerable: t.enumerable,
      writable: !1,
      value: e
    }), e;
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cache = e;

},{}],194:[function(require,module,exports){
"use strict";

const t = new Uint32Array(65536), e = (e, o) => {
  const r = e.length, l = o.length, n = 1 << r - 1;
  let c = -1, h = 0, s = r, a = r;
  for (;a--; ) t[e.charCodeAt(a)] |= 1 << a;
  for (a = 0; a < l; a++) {
    let e = t[o.charCodeAt(a)];
    const r = e | h;
    e |= (e & c) + c ^ c, h |= ~(e | c), c &= e, h & n && s++, c & n && s--, h = h << 1 | 1, 
    c = c << 1 | ~(r | h), h &= r;
  }
  for (a = r; a--; ) t[e.charCodeAt(a)] = 0;
  return s;
}, o = (e, o) => {
  const r = e.length, l = o.length, n = [], c = [], h = Math.ceil(r / 32), s = Math.ceil(l / 32);
  let a = l;
  for (let t = 0; t < h; t++) c[t] = -1, n[t] = 0;
  let f = 0;
  for (;f < s - 1; f++) {
    let h = 0, s = -1;
    const d = 32 * f, g = Math.min(32, l) + d;
    for (let e = d; e < g; e++) t[o.charCodeAt(e)] |= 1 << e;
    a = l;
    for (let o = 0; o < r; o++) {
      const r = t[e.charCodeAt(o)], l = c[o / 32 | 0] >>> o & 1, a = n[o / 32 | 0] >>> o & 1, f = r | h, d = ((r | a) & s) + s ^ s | r | a;
      let g = h | ~(d | s), A = s & d;
      g >>> 31 ^ l && (c[o / 32 | 0] ^= 1 << o), A >>> 31 ^ a && (n[o / 32 | 0] ^= 1 << o), 
      g = g << 1 | l, A = A << 1 | a, s = A | ~(f | g), h = g & f;
    }
    for (let e = d; e < g; e++) t[o.charCodeAt(e)] = 0;
  }
  let d = 0, g = -1;
  const A = 32 * f, C = Math.min(32, l - A) + A;
  for (let e = A; e < C; e++) t[o.charCodeAt(e)] |= 1 << e;
  a = l;
  for (let o = 0; o < r; o++) {
    const r = t[e.charCodeAt(o)], h = c[o / 32 | 0] >>> o & 1, s = n[o / 32 | 0] >>> o & 1, f = r | d, A = ((r | s) & g) + g ^ g | r | s;
    let C = d | ~(A | g), i = g & A;
    a += C >>> l - 1 & 1, a -= i >>> l - 1 & 1, C >>> 31 ^ h && (c[o / 32 | 0] ^= 1 << o), 
    i >>> 31 ^ s && (n[o / 32 | 0] ^= 1 << o), C = C << 1 | h, i = i << 1 | s, g = i | ~(f | C), 
    d = C & f;
  }
  for (let e = A; e < C; e++) t[o.charCodeAt(e)] = 0;
  return a;
}, r = (t, r) => {
  if (t.length > r.length) {
    const e = r;
    r = t, t = e;
  }
  return 0 === t.length ? r.length : t.length <= 32 ? e(t, r) : o(t, r);
}, l = (t, e) => {
  let o = 1 / 0, l = 0;
  for (let n = 0; n < e.length; n++) {
    const c = r(t, e[n]);
    c < o && (o = c, l = n);
  }
  return e[l];
};

module.exports = {
  closest: l,
  distance: r
};

},{}],195:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, n, i) {
  var r, _ = arguments.length, s = _ < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, n, i); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (_ < 3 ? r(s) : _ > 3 ? r(e, n, s) : r(e, n)) || s);
  return _ > 3 && s && Object.defineProperty(e, n, s), s;
}, e = this && this.__importDefault || function(t) {
  return t && t.__esModule ? t : {
    default: t
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const n = require("decorator-cache-getter"), i = e(require("versioning")), r = require("../utils/console");

class _ {
  constructor() {}
  static get _alloc() {
    return this.r("il2cpp_alloc", "pointer", [ "size_t" ]);
  }
  static get _arrayGetElements() {
    return this.r("il2cpp_array_get_elements", "pointer", [ "pointer" ]);
  }
  static get _arrayGetLength() {
    return this.r("il2cpp_array_length", "uint32", [ "pointer" ]);
  }
  static get _arrayNew() {
    return this.r("il2cpp_array_new", "pointer", [ "pointer", "uint32" ]);
  }
  static get _assemblyGetImage() {
    return this.r("il2cpp_assembly_get_image", "pointer", [ "pointer" ]);
  }
  static get _classForEach() {
    return this.r("il2cpp_class_for_each", "void", [ "pointer", "pointer" ]);
  }
  static get _classFromName() {
    return this.r("il2cpp_class_from_name", "pointer", [ "pointer", "pointer", "pointer" ]);
  }
  static get _classFromSystemType() {
    return this.r("il2cpp_class_from_system_type", "pointer", [ "pointer" ]);
  }
  static get _classFromType() {
    return this.r("il2cpp_class_from_type", "pointer", [ "pointer" ]);
  }
  static get _classGetActualInstanceSize() {
    return this.r("il2cpp_class_get_actual_instance_size", "int32", [ "pointer" ]);
  }
  static get _classGetArrayClass() {
    return this.r("il2cpp_array_class_get", "pointer", [ "pointer", "uint32" ]);
  }
  static get _classGetArrayElementSize() {
    return this.r("il2cpp_class_array_element_size", "int", [ "pointer" ]);
  }
  static get _classGetAssemblyName() {
    return this.r("il2cpp_class_get_assemblyname", "pointer", [ "pointer" ]);
  }
  static get _classGetBaseType() {
    return this.r("il2cpp_class_enum_basetype", "pointer", [ "pointer" ]);
  }
  static get _classGetDeclaringType() {
    return this.r("il2cpp_class_get_declaring_type", "pointer", [ "pointer" ]);
  }
  static get _classGetElementClass() {
    return this.r("il2cpp_class_get_element_class", "pointer", [ "pointer" ]);
  }
  static get _classGetFieldFromName() {
    return this.r("il2cpp_class_get_field_from_name", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetFields() {
    return this.r("il2cpp_class_get_fields", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetFlags() {
    return this.r("il2cpp_class_get_flags", "int", [ "pointer" ]);
  }
  static get _classGetImage() {
    return this.r("il2cpp_class_get_image", "pointer", [ "pointer" ]);
  }
  static get _classGetInstanceSize() {
    return this.r("il2cpp_class_instance_size", "int32", [ "pointer" ]);
  }
  static get _classGetInterfaces() {
    return this.r("il2cpp_class_get_interfaces", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetMethodFromName() {
    return this.r("il2cpp_class_get_method_from_name", "pointer", [ "pointer", "pointer", "int" ]);
  }
  static get _classGetMethods() {
    return this.r("il2cpp_class_get_methods", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetName() {
    return this.r("il2cpp_class_get_name", "pointer", [ "pointer" ]);
  }
  static get _classGetNamespace() {
    return this.r("il2cpp_class_get_namespace", "pointer", [ "pointer" ]);
  }
  static get _classGetNestedClasses() {
    return this.r("il2cpp_class_get_nested_types", "pointer", [ "pointer", "pointer" ]);
  }
  static get _classGetParent() {
    return this.r("il2cpp_class_get_parent", "pointer", [ "pointer" ]);
  }
  static get _classGetRank() {
    return this.r("il2cpp_class_get_rank", "int", [ "pointer" ]);
  }
  static get _classGetStaticFieldData() {
    return this.r("il2cpp_class_get_static_field_data", "pointer", [ "pointer" ]);
  }
  static get _classGetValueSize() {
    return this.r("il2cpp_class_value_size", "int32", [ "pointer", "pointer" ]);
  }
  static get _classGetType() {
    return this.r("il2cpp_class_get_type", "pointer", [ "pointer" ]);
  }
  static get _classHasReferences() {
    return this.r("il2cpp_class_has_references", "bool", [ "pointer" ]);
  }
  static get _classInit() {
    return this.r("il2cpp_runtime_class_init", "void", [ "pointer" ]);
  }
  static get _classIsAbstract() {
    return this.r("il2cpp_class_is_abstract", "bool", [ "pointer" ]);
  }
  static get _classIsAssignableFrom() {
    return this.r("il2cpp_class_is_assignable_from", "bool", [ "pointer", "pointer" ]);
  }
  static get _classIsBlittable() {
    return this.r("il2cpp_class_is_blittable", "bool", [ "pointer" ]);
  }
  static get _classIsEnum() {
    return this.r("il2cpp_class_is_enum", "bool", [ "pointer" ]);
  }
  static get _classIsGeneric() {
    return this.r("il2cpp_class_is_generic", "bool", [ "pointer" ]);
  }
  static get _classIsInflated() {
    return this.r("il2cpp_class_is_inflated", "bool", [ "pointer" ]);
  }
  static get _classIsInterface() {
    return this.r("il2cpp_class_is_interface", "bool", [ "pointer" ]);
  }
  static get _classIsSubclassOf() {
    return this.r("il2cpp_class_is_subclass_of", "bool", [ "pointer", "pointer", "bool" ]);
  }
  static get _classIsValueType() {
    return this.r("il2cpp_class_is_valuetype", "bool", [ "pointer" ]);
  }
  static get _domainAssemblyOpen() {
    return this.r("il2cpp_domain_assembly_open", "pointer", [ "pointer", "pointer" ]);
  }
  static get _domainGet() {
    return this.r("il2cpp_domain_get", "pointer", []);
  }
  static get _domainGetAssemblies() {
    return this.r("il2cpp_domain_get_assemblies", "pointer", [ "pointer", "pointer" ]);
  }
  static get _fieldGetModifier() {
    return this.r("il2cpp_field_get_modifier", "pointer", [ "pointer" ]);
  }
  static get _fieldGetClass() {
    return this.r("il2cpp_field_get_parent", "pointer", [ "pointer" ]);
  }
  static get _fieldGetFlags() {
    return this.r("il2cpp_field_get_flags", "int", [ "pointer" ]);
  }
  static get _fieldGetName() {
    return this.r("il2cpp_field_get_name", "pointer", [ "pointer" ]);
  }
  static get _fieldGetOffset() {
    return this.r("il2cpp_field_get_offset", "int32", [ "pointer" ]);
  }
  static get _fieldGetStaticValue() {
    return this.r("il2cpp_field_static_get_value", "void", [ "pointer", "pointer" ]);
  }
  static get _fieldGetType() {
    return this.r("il2cpp_field_get_type", "pointer", [ "pointer" ]);
  }
  static get _fieldIsLiteral() {
    return this.r("il2cpp_field_is_literal", "bool", [ "pointer" ]);
  }
  static get _fieldIsStatic() {
    return this.r("il2cpp_field_is_static", "bool", [ "pointer" ]);
  }
  static get _fieldIsThreadStatic() {
    return this.r("il2cpp_field_is_thread_static", "bool", [ "pointer" ]);
  }
  static get _fieldSetStaticValue() {
    return this.r("il2cpp_field_static_set_value", "void", [ "pointer", "pointer" ]);
  }
  static get _free() {
    return this.r("il2cpp_free", "void", [ "pointer" ]);
  }
  static get _gcCollect() {
    return this.r("il2cpp_gc_collect", "void", [ "int" ]);
  }
  static get _gcCollectALittle() {
    return this.r("il2cpp_gc_collect_a_little", "void", []);
  }
  static get _gcDisable() {
    return this.r("il2cpp_gc_disable", "void", []);
  }
  static get _gcEnable() {
    return this.r("il2cpp_gc_enable", "void", []);
  }
  static get _gcGetHeapSize() {
    return this.r("il2cpp_gc_get_heap_size", "int64", []);
  }
  static get _gcGetMaxTimeSlice() {
    return this.r("il2cpp_gc_get_max_time_slice_ns", "int64", []);
  }
  static get _gcGetUsedSize() {
    return this.r("il2cpp_gc_get_used_size", "int64", []);
  }
  static get _gcHandleGetTarget() {
    return this.r("il2cpp_gchandle_get_target", "pointer", [ "uint32" ]);
  }
  static get _gcHandleFree() {
    return this.r("il2cpp_gchandle_free", "void", [ "uint32" ]);
  }
  static get _gcHandleNew() {
    return this.r("il2cpp_gchandle_new", "uint32", [ "pointer", "bool" ]);
  }
  static get _gcHandleNewWeakRef() {
    return this.r("il2cpp_gchandle_new_weakref", "uint32", [ "pointer", "bool" ]);
  }
  static get _gcIsDisabled() {
    return this.r("il2cpp_gc_is_disabled", "bool", []);
  }
  static get _gcIsIncremental() {
    return this.r("il2cpp_gc_is_incremental", "bool", []);
  }
  static get _gcSetMaxTimeSlice() {
    return this.r("il2cpp_gc_set_max_time_slice_ns", "void", [ "int64" ]);
  }
  static get _gcStartIncrementalCollection() {
    return this.r("il2cpp_gc_start_incremental_collection", "void", []);
  }
  static get _gcStartWorld() {
    return this.r("il2cpp_start_gc_world", "void", []);
  }
  static get _gcStopWorld() {
    return this.r("il2cpp_stop_gc_world", "void", []);
  }
  static get _getCorlib() {
    return this.r("il2cpp_get_corlib", "pointer", []);
  }
  static get _imageGetAssembly() {
    return this.r("il2cpp_image_get_assembly", "pointer", [ "pointer" ]);
  }
  static get _imageGetClass() {
    return this.r("il2cpp_image_get_class", "pointer", [ "pointer", "uint" ]);
  }
  static get _imageGetClassCount() {
    return this.r("il2cpp_image_get_class_count", "uint32", [ "pointer" ]);
  }
  static get _imageGetName() {
    return this.r("il2cpp_image_get_name", "pointer", [ "pointer" ]);
  }
  static get _init() {
    return this.r("il2cpp_init", "void", []);
  }
  static get _livenessAllocateStruct() {
    return this.r("il2cpp_unity_liveness_allocate_struct", "pointer", [ "pointer", "int", "pointer", "pointer", "pointer" ]);
  }
  static get _livenessCalculationBegin() {
    return this.r("il2cpp_unity_liveness_calculation_begin", "pointer", [ "pointer", "int", "pointer", "pointer", "pointer", "pointer" ]);
  }
  static get _livenessCalculationEnd() {
    return this.r("il2cpp_unity_liveness_calculation_end", "void", [ "pointer" ]);
  }
  static get _livenessCalculationFromStatics() {
    return this.r("il2cpp_unity_liveness_calculation_from_statics", "void", [ "pointer" ]);
  }
  static get _livenessFinalize() {
    return this.r("il2cpp_unity_liveness_finalize", "void", [ "pointer" ]);
  }
  static get _livenessFreeStruct() {
    return this.r("il2cpp_unity_liveness_free_struct", "void", [ "pointer" ]);
  }
  static get _memorySnapshotCapture() {
    return this.r("il2cpp_capture_memory_snapshot", "pointer", []);
  }
  static get _memorySnapshotFree() {
    return this.r("il2cpp_free_captured_memory_snapshot", "void", [ "pointer" ]);
  }
  static get _memorySnapshotGetClasses() {
    return this.r("il2cpp_memory_snapshot_get_classes", "pointer", [ "pointer", "pointer" ]);
  }
  static get _memorySnapshotGetGCHandles() {
    return this.r("il2cpp_memory_snapshot_get_gc_handles", [ "uint32", "pointer" ], [ "pointer" ]);
  }
  static get _memorySnapshotGetRuntimeInformation() {
    return this.r("il2cpp_memory_snapshot_get_information", [ "uint32", "uint32", "uint32", "uint32", "uint32", "uint32" ], [ "pointer" ]);
  }
  static get _methodGetModifier() {
    return this.r("il2cpp_method_get_modifier", "pointer", [ "pointer" ]);
  }
  static get _methodGetClass() {
    return this.r("il2cpp_method_get_class", "pointer", [ "pointer" ]);
  }
  static get _methodGetFlags() {
    return this.r("il2cpp_method_get_flags", "uint32", [ "pointer", "pointer" ]);
  }
  static get _methodGetFromReflection() {
    return this.r("il2cpp_method_get_from_reflection", "pointer", [ "pointer" ]);
  }
  static get _methodGetName() {
    return this.r("il2cpp_method_get_name", "pointer", [ "pointer" ]);
  }
  static get _methodGetObject() {
    return this.r("il2cpp_method_get_object", "pointer", [ "pointer", "pointer" ]);
  }
  static get _methodGetParameterCount() {
    return this.r("il2cpp_method_get_param_count", "uint8", [ "pointer" ]);
  }
  static get _methodGetParameterName() {
    return this.r("il2cpp_method_get_param_name", "pointer", [ "pointer", "uint32" ]);
  }
  static get _methodGetParameters() {
    return this.r("il2cpp_method_get_parameters", "pointer", [ "pointer", "pointer" ]);
  }
  static get _methodGetParameterType() {
    return this.r("il2cpp_method_get_param", "pointer", [ "pointer", "uint32" ]);
  }
  static get _methodGetPointer() {
    return this.r("il2cpp_method_get_pointer", "pointer", [ "pointer" ]);
  }
  static get _methodGetReturnType() {
    return this.r("il2cpp_method_get_return_type", "pointer", [ "pointer" ]);
  }
  static get _methodIsExternal() {
    return this.r("il2cpp_method_is_external", "bool", [ "pointer" ]);
  }
  static get _methodIsGeneric() {
    return this.r("il2cpp_method_is_generic", "bool", [ "pointer" ]);
  }
  static get _methodIsInflated() {
    return this.r("il2cpp_method_is_inflated", "bool", [ "pointer" ]);
  }
  static get _methodIsInstance() {
    return this.r("il2cpp_method_is_instance", "bool", [ "pointer" ]);
  }
  static get _methodIsSynchronized() {
    return this.r("il2cpp_method_is_synchronized", "bool", [ "pointer" ]);
  }
  static get _monitorEnter() {
    return this.r("il2cpp_monitor_enter", "void", [ "pointer" ]);
  }
  static get _monitorExit() {
    return this.r("il2cpp_monitor_exit", "void", [ "pointer" ]);
  }
  static get _monitorPulse() {
    return this.r("il2cpp_monitor_pulse", "void", [ "pointer" ]);
  }
  static get _monitorPulseAll() {
    return this.r("il2cpp_monitor_pulse_all", "void", [ "pointer" ]);
  }
  static get _monitorTryEnter() {
    return this.r("il2cpp_monitor_try_enter", "bool", [ "pointer", "uint32" ]);
  }
  static get _monitorTryWait() {
    return this.r("il2cpp_monitor_try_wait", "bool", [ "pointer", "uint32" ]);
  }
  static get _monitorWait() {
    return this.r("il2cpp_monitor_wait", "void", [ "pointer" ]);
  }
  static get _objectGetClass() {
    return this.r("il2cpp_object_get_class", "pointer", [ "pointer" ]);
  }
  static get _objectGetVirtualMethod() {
    return this.r("il2cpp_object_get_virtual_method", "pointer", [ "pointer", "pointer" ]);
  }
  static get _objectInit() {
    return this.r("il2cpp_runtime_object_init_exception", "void", [ "pointer", "pointer" ]);
  }
  static get _objectNew() {
    return this.r("il2cpp_object_new", "pointer", [ "pointer" ]);
  }
  static get _objectGetSize() {
    return this.r("il2cpp_object_get_size", "uint32", [ "pointer" ]);
  }
  static get _objectUnbox() {
    return this.r("il2cpp_object_unbox", "pointer", [ "pointer" ]);
  }
  static get _resolveInternalCall() {
    return this.r("il2cpp_resolve_icall", "pointer", [ "pointer" ]);
  }
  static get _stringChars() {
    return this.r("il2cpp_string_chars", "pointer", [ "pointer" ]);
  }
  static get _stringLength() {
    return this.r("il2cpp_string_length", "int32", [ "pointer" ]);
  }
  static get _stringNew() {
    return this.r("il2cpp_string_new", "pointer", [ "pointer" ]);
  }
  static get _stringSetLength() {
    return this.r("il2cpp_string_set_length", "void", [ "pointer", "int32" ]);
  }
  static get _valueBox() {
    return this.r("il2cpp_value_box", "pointer", [ "pointer", "pointer" ]);
  }
  static get _threadAttach() {
    return this.r("il2cpp_thread_attach", "pointer", [ "pointer" ]);
  }
  static get _threadCurrent() {
    return this.r("il2cpp_thread_current", "pointer", []);
  }
  static get _threadGetAllAttachedThreads() {
    return this.r("il2cpp_thread_get_all_attached_threads", "pointer", [ "pointer" ]);
  }
  static get _threadIsVm() {
    return this.r("il2cpp_is_vm_thread", "bool", [ "pointer" ]);
  }
  static get _threadDetach() {
    return this.r("il2cpp_thread_detach", "void", [ "pointer" ]);
  }
  static get _typeGetName() {
    return this.r("il2cpp_type_get_name", "pointer", [ "pointer" ]);
  }
  static get _typeGetObject() {
    return this.r("il2cpp_type_get_object", "pointer", [ "pointer" ]);
  }
  static get _typeGetTypeEnum() {
    return this.r("il2cpp_type_get_type", "int", [ "pointer" ]);
  }
  static get _typeIsByReference() {
    return this.r("il2cpp_type_is_byref", "bool", [ "pointer" ]);
  }
  static get _typeIsPrimitive() {
    return this.r("il2cpp_type_is_primitive", "bool", [ "pointer" ]);
  }
  static get cModule() {
    (i.default.lt(Il2Cpp.unityVersion, "5.3.0") || i.default.gte(Il2Cpp.unityVersion, "2022.2.0")) && (0, 
    r.warn)(`current Unity version ${Il2Cpp.unityVersion} is not supported, expect breakage`);
    const t = new CModule("#include <stdint.h>\n\n#define OFFSET_OF(name, type)     int16_t name (char * p,                  type e)    {        for (int16_t i = 0; i < 512; i++) if (* ((type *) p + i) == e) return i;        return -1;    }\n\nOFFSET_OF (offset_of_int32, int32_t)\nOFFSET_OF (offset_of_pointer, void *)\n            "), e = new NativeFunction(t.offset_of_int32, "int16", [ "pointer", "int32" ]), n = new NativeFunction(t.offset_of_pointer, "int16", [ "pointer", "pointer" ]), _ = Il2Cpp.Image.corlib.class("System.String"), s = Il2Cpp.Image.corlib.class("System.DateTime"), a = Il2Cpp.Image.corlib.class("System.Reflection.Module");
    s.initialize(), a.initialize();
    const l = (s.tryField("daysmonth") ?? s.tryField("DaysToMonth365") ?? s.field("s_daysToMonth365")).value, c = a.field("FilterTypeName").value, p = c.field("method_ptr").value, o = c.field("method").value, u = `#include <stdint.h>\n#include <string.h>\n\n\ntypedef struct _Il2CppObject Il2CppObject;\ntypedef enum _Il2CppTypeEnum Il2CppTypeEnum;\ntypedef struct _Il2CppReflectionMethod Il2CppReflectionMethod;\ntypedef struct _Il2CppManagedMemorySnapshot Il2CppManagedMemorySnapshot;\ntypedef struct _Il2CppMetadataType Il2CppMetadataType;\n\n\nstruct _Il2CppObject\n{\n    void * class;\n    void * monitor;\n};\n\nenum _Il2CppTypeEnum\n{\n    IL2CPP_TYPE_END = 0x00,\n    IL2CPP_TYPE_VOID = 0x01,\n    IL2CPP_TYPE_BOOLEAN = 0x02,\n    IL2CPP_TYPE_CHAR = 0x03,\n    IL2CPP_TYPE_I1 = 0x04,\n    IL2CPP_TYPE_U1 = 0x05,\n    IL2CPP_TYPE_I2 = 0x06,\n    IL2CPP_TYPE_U2 = 0x07,\n    IL2CPP_TYPE_I4 = 0x08,\n    IL2CPP_TYPE_U4 = 0x09,\n    IL2CPP_TYPE_I8 = 0x0a,\n    IL2CPP_TYPE_U8 = 0x0b,\n    IL2CPP_TYPE_R4 = 0x0c,\n    IL2CPP_TYPE_R8 = 0x0d,\n    IL2CPP_TYPE_STRING = 0x0e,\n    IL2CPP_TYPE_PTR = 0x0f,\n    IL2CPP_TYPE_BYREF = 0x10,\n    IL2CPP_TYPE_VALUETYPE = 0x11,\n    IL2CPP_TYPE_CLASS = 0x12,\n    IL2CPP_TYPE_VAR = 0x13,\n    IL2CPP_TYPE_ARRAY = 0x14,\n    IL2CPP_TYPE_GENERICINST = 0x15,\n    IL2CPP_TYPE_TYPEDBYREF = 0x16,\n    IL2CPP_TYPE_I = 0x18,\n    IL2CPP_TYPE_U = 0x19,\n    IL2CPP_TYPE_FNPTR = 0x1b,\n    IL2CPP_TYPE_OBJECT = 0x1c,\n    IL2CPP_TYPE_SZARRAY = 0x1d,\n    IL2CPP_TYPE_MVAR = 0x1e,\n    IL2CPP_TYPE_CMOD_REQD = 0x1f,\n    IL2CPP_TYPE_CMOD_OPT = 0x20,\n    IL2CPP_TYPE_INTERNAL = 0x21,\n    IL2CPP_TYPE_MODIFIER = 0x40,\n    IL2CPP_TYPE_SENTINEL = 0x41,\n    IL2CPP_TYPE_PINNED = 0x45,\n    IL2CPP_TYPE_ENUM = 0x55\n};\n\nstruct _Il2CppReflectionMethod\n{\n    Il2CppObject object;\n    void * method;\n    void * name;\n    void * reftype;\n};\n\nstruct _Il2CppManagedMemorySnapshot\n{\n    struct Il2CppManagedHeap\n    {\n        uint32_t section_count;\n        void * sections;\n    } heap;\n    struct Il2CppStacks\n    {\n        uint32_t stack_count;\n        void * stacks;\n    } stacks;\n    struct Il2CppMetadataSnapshot\n    {\n        uint32_t type_count;\n        Il2CppMetadataType * types;\n    } metadata_snapshot;\n    struct Il2CppGCHandles\n    {\n        uint32_t tracked_object_count;\n        Il2CppObject ** pointers_to_objects;\n    } gc_handles;\n    struct Il2CppRuntimeInformation\n    {\n        uint32_t pointer_size;\n        uint32_t object_header_size;\n        uint32_t array_header_size;\n        uint32_t array_bounds_offset_in_header;\n        uint32_t array_size_offset_in_header;\n        uint32_t allocation_granularity;\n    } runtime_information;\n    void * additional_user_information;\n};\n\nstruct _Il2CppMetadataType\n{\n    uint32_t flags;\n    void * fields;\n    uint32_t field_count;\n    uint32_t statics_size;\n    uint8_t * statics;\n    uint32_t base_or_element_type_index;\n    char * name;\n    const char * assembly_name;\n    uint64_t type_info_address;\n    uint32_t size;\n};\n\n\n#define THREAD_STATIC_FIELD_OFFSET -1;\n\n#define FIELD_ATTRIBUTE_FIELD_ACCESS_MASK 0x0007\n#define FIELD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000\n#define FIELD_ATTRIBUTE_PRIVATE 0x0001\n#define FIELD_ATTRIBUTE_FAM_AND_ASSEM 0x0002\n#define FIELD_ATTRIBUTE_ASSEMBLY 0x0003\n#define FIELD_ATTRIBUTE_FAMILY 0x0004\n#define FIELD_ATTRIBUTE_FAM_OR_ASSEM 0x0005\n#define FIELD_ATTRIBUTE_PUBLIC 0x0006\n\n#define FIELD_ATTRIBUTE_STATIC 0x0010\n#define FIELD_ATTRIBUTE_LITERAL 0x0040\n\n#define METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK 0x0007\n#define METHOD_ATTRIBUTE_COMPILER_CONTROLLED 0x0000\n#define METHOD_ATTRIBUTE_PRIVATE 0x0001\n#define METHOD_ATTRIBUTE_FAM_AND_ASSEM 0x0002\n#define METHOD_ATTRIBUTE_ASSEMBLY 0x0003\n#define METHOD_ATTRIBUTE_FAMILY 0x0004\n#define METHOD_ATTRIBUTE_FAM_OR_ASSEM 0x0005\n#define METHOD_ATTRIBUTE_PUBLIC 0x0006\n\n#define METHOD_ATTRIBUTE_STATIC 0x0010\n#define METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL 0x1000\n#define METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED 0x0020\n\n\nstatic const char * (*il2cpp_class_get_name) (void *) = (void *) ${this._classGetName};\nstatic int (*il2cpp_field_get_flags) (void *) = (void *) ${this._fieldGetFlags};\nstatic size_t (*il2cpp_field_get_offset) (void *) = (void *) ${this._fieldGetOffset};\nstatic uint32_t (*il2cpp_method_get_flags) (void *, uint32_t *) = (void *) ${this._methodGetFlags};\nstatic char * (*il2cpp_type_get_name) (void *) = (void *) ${this._typeGetName};\nstatic Il2CppTypeEnum (*il2cpp_type_get_type_enum) (void *) = (void *) ${this._typeGetTypeEnum};\nstatic void (*il2cpp_free) (void * pointer) = (void *) ${this._free};\n\n\nvoid\nil2cpp_string_set_length (int32_t * string,\n                          int32_t length)\n{\n    *(string + ${e(Il2Cpp.String.from("vfsfitvnm"), 9)}) = length;\n}\n\nvoid *\nil2cpp_array_get_elements (int32_t * array)\n{ \n    return array + ${e(l, 31) - 1};\n}\n\nuint8_t\nil2cpp_type_is_byref (void * type)\n{   \n    char * name;\n    char last_char;\n\n    name = il2cpp_type_get_name (type);\n    last_char = name[strlen (name) - 1];\n\n    il2cpp_free (name);\n    return last_char == '&';\n}\n\nuint8_t\nil2cpp_type_is_primitive (void * type)\n{\n    Il2CppTypeEnum type_enum;\n\n    type_enum = il2cpp_type_get_type_enum (type);\n\n    return ((type_enum >= IL2CPP_TYPE_BOOLEAN && \n        type_enum <= IL2CPP_TYPE_R8) || \n        type_enum == IL2CPP_TYPE_I || \n        type_enum == IL2CPP_TYPE_U\n    );\n}\n\nint32_t\nil2cpp_class_get_actual_instance_size (int32_t * class)\n{\n    return *(class + ${e(_, _.instanceSize - 2)});\n}\n\nuint8_t\nil2cpp_class_get_rank (void * class)\n{\n    uint8_t rank;\n    const char * name;\n    \n    rank = 0;\n    name = il2cpp_class_get_name (class);\n\n    for (uint16_t i = strlen (name) - 1; i > 0; i--)\n    {\n        char c = name[i];\n\n        if (c == ']') rank++;\n        else if (c == '[' || rank == 0) break;\n        else if (c == ',') rank++;\n        else break;\n    }\n\n    return rank;\n}\n\nconst char *\nil2cpp_field_get_modifier (void * field)\n{   \n    int flags;\n\n    flags = il2cpp_field_get_flags (field);\n\n    switch (flags & FIELD_ATTRIBUTE_FIELD_ACCESS_MASK) {\n        case FIELD_ATTRIBUTE_PRIVATE:\n            return "private";\n        case FIELD_ATTRIBUTE_FAM_AND_ASSEM:\n            return "private protected";\n        case FIELD_ATTRIBUTE_ASSEMBLY:\n            return "internal";\n        case FIELD_ATTRIBUTE_FAMILY:\n            return "protected";\n        case FIELD_ATTRIBUTE_FAM_OR_ASSEM:\n            return "protected internal";\n        case FIELD_ATTRIBUTE_PUBLIC:\n            return "public";\n    }\n\n    return "";\n}\n\nuint8_t\nil2cpp_field_is_literal (void * field)\n{\n    return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_LITERAL) != 0;\n}\n\nuint8_t\nil2cpp_field_is_static (void * field)\n{\n    return (il2cpp_field_get_flags (field) & FIELD_ATTRIBUTE_STATIC) != 0;\n}\n\nuint8_t\nil2cpp_field_is_thread_static (void * field)\n{\n    return il2cpp_field_get_offset (field) == THREAD_STATIC_FIELD_OFFSET;\n}\n\nconst char *\nil2cpp_method_get_modifier (void * method)\n{\n    uint32_t flags;\n\n    flags = il2cpp_method_get_flags (method, NULL);\n\n    switch (flags & METHOD_ATTRIBUTE_MEMBER_ACCESS_MASK) {\n        case METHOD_ATTRIBUTE_PRIVATE:\n            return "private";\n        case METHOD_ATTRIBUTE_FAM_AND_ASSEM:\n            return "private protected";\n        case METHOD_ATTRIBUTE_ASSEMBLY:\n            return "internal";\n        case METHOD_ATTRIBUTE_FAMILY:\n            return "protected";\n        case METHOD_ATTRIBUTE_FAM_OR_ASSEM:\n            return "protected internal";\n        case METHOD_ATTRIBUTE_PUBLIC:\n            return "public";\n    }\n\n    return "";\n}\n\nvoid *\nil2cpp_method_get_from_reflection (const Il2CppReflectionMethod * method)\n{\n    return method->method;\n}\n\nvoid *\nil2cpp_method_get_pointer (void ** method)\n{\n    return * (method + ${n(o, p)});\n}\n\nuint8_t\nil2cpp_method_is_external (void * method)\n{\n    uint32_t implementation_flags;\n\n    il2cpp_method_get_flags (method, &implementation_flags);\n\n    return (implementation_flags & METHOD_IMPL_ATTRIBUTE_INTERNAL_CALL) != 0;\n}\n\nuint8_t\nil2cpp_method_is_synchronized (void * method)\n{\n    uint32_t implementation_flags;\n\n    il2cpp_method_get_flags (method, &implementation_flags);\n\n    return (implementation_flags & METHOD_IMPL_ATTRIBUTE_SYNCHRONIZED) != 0;\n}\n\nuintptr_t\nil2cpp_memory_snapshot_get_classes (const Il2CppManagedMemorySnapshot * snapshot,\n                                    Il2CppMetadataType ** iter)\n{\n    const int zero;\n    const void * null;\n\n    if (iter != NULL && snapshot->metadata_snapshot.type_count > zero)\n    {\n        if (*iter == null)\n        {\n            *iter = snapshot->metadata_snapshot.types;\n            return (uintptr_t) (*iter)->type_info_address;\n        }\n        else\n        {\n            Il2CppMetadataType * metadata_type = *iter + 1;\n\n            if (metadata_type < snapshot->metadata_snapshot.types + snapshot->metadata_snapshot.type_count)\n            {\n                *iter = metadata_type;\n                return (uintptr_t) (*iter)->type_info_address;\n            }\n        }\n    }\n    return 0;\n}\n\nstruct Il2CppGCHandles\nil2cpp_memory_snapshot_get_gc_handles (const Il2CppManagedMemorySnapshot * snapshot)\n{\n    return snapshot->gc_handles;\n}\n\nstruct Il2CppRuntimeInformation\nil2cpp_memory_snapshot_get_information (const Il2CppManagedMemorySnapshot * snapshot)\n{\n    return snapshot->runtime_information;\n}\n        `;
    return t.dispose(), new CModule(u);
  }
  static r(t, e, n) {
    const i = Il2Cpp.module.findExportByName(t) ?? this.cModule[t];
    return null == i && (0, r.raise)(`cannot resolve export ${t}`), new NativeFunction(i, e, n);
  }
}

t([ n.cache ], _, "_alloc", null), t([ n.cache ], _, "_arrayGetElements", null), 
t([ n.cache ], _, "_arrayGetLength", null), t([ n.cache ], _, "_arrayNew", null), 
t([ n.cache ], _, "_assemblyGetImage", null), t([ n.cache ], _, "_classForEach", null), 
t([ n.cache ], _, "_classFromName", null), t([ n.cache ], _, "_classFromSystemType", null), 
t([ n.cache ], _, "_classFromType", null), t([ n.cache ], _, "_classGetActualInstanceSize", null), 
t([ n.cache ], _, "_classGetArrayClass", null), t([ n.cache ], _, "_classGetArrayElementSize", null), 
t([ n.cache ], _, "_classGetAssemblyName", null), t([ n.cache ], _, "_classGetBaseType", null), 
t([ n.cache ], _, "_classGetDeclaringType", null), t([ n.cache ], _, "_classGetElementClass", null), 
t([ n.cache ], _, "_classGetFieldFromName", null), t([ n.cache ], _, "_classGetFields", null), 
t([ n.cache ], _, "_classGetFlags", null), t([ n.cache ], _, "_classGetImage", null), 
t([ n.cache ], _, "_classGetInstanceSize", null), t([ n.cache ], _, "_classGetInterfaces", null), 
t([ n.cache ], _, "_classGetMethodFromName", null), t([ n.cache ], _, "_classGetMethods", null), 
t([ n.cache ], _, "_classGetName", null), t([ n.cache ], _, "_classGetNamespace", null), 
t([ n.cache ], _, "_classGetNestedClasses", null), t([ n.cache ], _, "_classGetParent", null), 
t([ n.cache ], _, "_classGetRank", null), t([ n.cache ], _, "_classGetStaticFieldData", null), 
t([ n.cache ], _, "_classGetValueSize", null), t([ n.cache ], _, "_classGetType", null), 
t([ n.cache ], _, "_classHasReferences", null), t([ n.cache ], _, "_classInit", null), 
t([ n.cache ], _, "_classIsAbstract", null), t([ n.cache ], _, "_classIsAssignableFrom", null), 
t([ n.cache ], _, "_classIsBlittable", null), t([ n.cache ], _, "_classIsEnum", null), 
t([ n.cache ], _, "_classIsGeneric", null), t([ n.cache ], _, "_classIsInflated", null), 
t([ n.cache ], _, "_classIsInterface", null), t([ n.cache ], _, "_classIsSubclassOf", null), 
t([ n.cache ], _, "_classIsValueType", null), t([ n.cache ], _, "_domainAssemblyOpen", null), 
t([ n.cache ], _, "_domainGet", null), t([ n.cache ], _, "_domainGetAssemblies", null), 
t([ n.cache ], _, "_fieldGetModifier", null), t([ n.cache ], _, "_fieldGetClass", null), 
t([ n.cache ], _, "_fieldGetFlags", null), t([ n.cache ], _, "_fieldGetName", null), 
t([ n.cache ], _, "_fieldGetOffset", null), t([ n.cache ], _, "_fieldGetStaticValue", null), 
t([ n.cache ], _, "_fieldGetType", null), t([ n.cache ], _, "_fieldIsLiteral", null), 
t([ n.cache ], _, "_fieldIsStatic", null), t([ n.cache ], _, "_fieldIsThreadStatic", null), 
t([ n.cache ], _, "_fieldSetStaticValue", null), t([ n.cache ], _, "_free", null), 
t([ n.cache ], _, "_gcCollect", null), t([ n.cache ], _, "_gcCollectALittle", null), 
t([ n.cache ], _, "_gcDisable", null), t([ n.cache ], _, "_gcEnable", null), t([ n.cache ], _, "_gcGetHeapSize", null), 
t([ n.cache ], _, "_gcGetMaxTimeSlice", null), t([ n.cache ], _, "_gcGetUsedSize", null), 
t([ n.cache ], _, "_gcHandleGetTarget", null), t([ n.cache ], _, "_gcHandleFree", null), 
t([ n.cache ], _, "_gcHandleNew", null), t([ n.cache ], _, "_gcHandleNewWeakRef", null), 
t([ n.cache ], _, "_gcIsDisabled", null), t([ n.cache ], _, "_gcIsIncremental", null), 
t([ n.cache ], _, "_gcSetMaxTimeSlice", null), t([ n.cache ], _, "_gcStartIncrementalCollection", null), 
t([ n.cache ], _, "_gcStartWorld", null), t([ n.cache ], _, "_gcStopWorld", null), 
t([ n.cache ], _, "_getCorlib", null), t([ n.cache ], _, "_imageGetAssembly", null), 
t([ n.cache ], _, "_imageGetClass", null), t([ n.cache ], _, "_imageGetClassCount", null), 
t([ n.cache ], _, "_imageGetName", null), t([ n.cache ], _, "_init", null), t([ n.cache ], _, "_livenessAllocateStruct", null), 
t([ n.cache ], _, "_livenessCalculationBegin", null), t([ n.cache ], _, "_livenessCalculationEnd", null), 
t([ n.cache ], _, "_livenessCalculationFromStatics", null), t([ n.cache ], _, "_livenessFinalize", null), 
t([ n.cache ], _, "_livenessFreeStruct", null), t([ n.cache ], _, "_memorySnapshotCapture", null), 
t([ n.cache ], _, "_memorySnapshotFree", null), t([ n.cache ], _, "_memorySnapshotGetClasses", null), 
t([ n.cache ], _, "_memorySnapshotGetGCHandles", null), t([ n.cache ], _, "_memorySnapshotGetRuntimeInformation", null), 
t([ n.cache ], _, "_methodGetModifier", null), t([ n.cache ], _, "_methodGetClass", null), 
t([ n.cache ], _, "_methodGetFlags", null), t([ n.cache ], _, "_methodGetFromReflection", null), 
t([ n.cache ], _, "_methodGetName", null), t([ n.cache ], _, "_methodGetObject", null), 
t([ n.cache ], _, "_methodGetParameterCount", null), t([ n.cache ], _, "_methodGetParameterName", null), 
t([ n.cache ], _, "_methodGetParameters", null), t([ n.cache ], _, "_methodGetParameterType", null), 
t([ n.cache ], _, "_methodGetPointer", null), t([ n.cache ], _, "_methodGetReturnType", null), 
t([ n.cache ], _, "_methodIsExternal", null), t([ n.cache ], _, "_methodIsGeneric", null), 
t([ n.cache ], _, "_methodIsInflated", null), t([ n.cache ], _, "_methodIsInstance", null), 
t([ n.cache ], _, "_methodIsSynchronized", null), t([ n.cache ], _, "_monitorEnter", null), 
t([ n.cache ], _, "_monitorExit", null), t([ n.cache ], _, "_monitorPulse", null), 
t([ n.cache ], _, "_monitorPulseAll", null), t([ n.cache ], _, "_monitorTryEnter", null), 
t([ n.cache ], _, "_monitorTryWait", null), t([ n.cache ], _, "_monitorWait", null), 
t([ n.cache ], _, "_objectGetClass", null), t([ n.cache ], _, "_objectGetVirtualMethod", null), 
t([ n.cache ], _, "_objectInit", null), t([ n.cache ], _, "_objectNew", null), t([ n.cache ], _, "_objectGetSize", null), 
t([ n.cache ], _, "_objectUnbox", null), t([ n.cache ], _, "_resolveInternalCall", null), 
t([ n.cache ], _, "_stringChars", null), t([ n.cache ], _, "_stringLength", null), 
t([ n.cache ], _, "_stringNew", null), t([ n.cache ], _, "_stringSetLength", null), 
t([ n.cache ], _, "_valueBox", null), t([ n.cache ], _, "_threadAttach", null), 
t([ n.cache ], _, "_threadCurrent", null), t([ n.cache ], _, "_threadGetAllAttachedThreads", null), 
t([ n.cache ], _, "_threadIsVm", null), t([ n.cache ], _, "_threadDetach", null), 
t([ n.cache ], _, "_typeGetName", null), t([ n.cache ], _, "_typeGetObject", null), 
t([ n.cache ], _, "_typeGetTypeEnum", null), t([ n.cache ], _, "_typeIsByReference", null), 
t([ n.cache ], _, "_typeIsPrimitive", null), t([ n.cache ], _, "cModule", null), 
Il2Cpp.Api = _;

},{"../utils/console":222,"decorator-cache-getter":193,"versioning":228}],196:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var e = this && this.__decorate || function(e, t, n, i) {
  var r, a = arguments.length, l = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, n, i); else for (var o = e.length - 1; o >= 0; o--) (r = e[o]) && (l = (a < 3 ? r(l) : a > 3 ? r(t, n, l) : r(t, n)) || l);
  return a > 3 && l && Object.defineProperty(t, n, l), l;
}, t = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const n = require("decorator-cache-getter"), i = t(require("versioning")), r = require("../utils/console"), a = require("../utils/native-wait");

class l {
  constructor() {}
  static get moduleName() {
    switch (Process.platform) {
     case "linux":
      try {
        Java.androidVersion;
        return "libil2cpp.so";
      } catch (e) {
        return "GameAssembly.so";
      }

     case "windows":
      return "GameAssembly.dll";

     case "darwin":
      try {
        return "UnityFramework";
      } catch (e) {
        return "GameAssembly.dylib";
      }
    }
    (0, r.raise)(`${Process.platform} is not supported yet`);
  }
  static get applicationDataPath() {
    const e = this.internalCall("UnityEngine.Application::get_persistentDataPath", "pointer", []);
    return new Il2Cpp.String(e()).content;
  }
  static get applicationIdentifier() {
    const e = this.internalCall("UnityEngine.Application::get_identifier", "pointer", []) ?? this.internalCall("UnityEngine.Application::get_bundleIdentifier", "pointer", []);
    return e ? new Il2Cpp.String(e()).content : null;
  }
  static get applicationVersion() {
    const e = this.internalCall("UnityEngine.Application::get_version", "pointer", []);
    return e ? new Il2Cpp.String(e()).content : null;
  }
  static get attachedThreads() {
    null == Il2Cpp.currentThread && (0, r.raise)("only Il2Cpp threads can invoke Il2Cpp.attachedThreads");
    const e = [], t = Memory.alloc(Process.pointerSize), n = Il2Cpp.Api._threadGetAllAttachedThreads(t), i = t.readInt();
    for (let t = 0; t < i; t++) e.push(new Il2Cpp.Thread(n.add(t * Process.pointerSize).readPointer()));
    return e;
  }
  static get currentThread() {
    const e = Il2Cpp.Api._threadCurrent();
    return e.isNull() ? null : new Il2Cpp.Thread(e);
  }
  static get module() {
    return Process.getModuleByName(this.moduleName);
  }
  static get unityVersion() {
    const e = this.internalCall("UnityEngine.Application::get_unityVersion", "pointer", []);
    return null == e && (0, r.raise)("couldn't determine the Unity version, please specify it manually"), 
    new Il2Cpp.String(e()).content;
  }
  static get unityVersionIsBelow201830() {
    return i.default.lt(this.unityVersion, "2018.3.0");
  }
  static alloc(e = Process.pointerSize) {
    return Il2Cpp.Api._alloc(e);
  }
  static dump(e, t) {
    e = e ?? `${Il2Cpp.applicationIdentifier ?? "unknown"}_${Il2Cpp.applicationVersion ?? "unknown"}.cs`;
    const n = `${t ?? Il2Cpp.applicationDataPath}/${e}`, i = new File(n, "w");
    for (const e of Il2Cpp.Domain.assemblies) {
      (0, r.inform)(`dumping ${e.name}...`);
      for (const t of e.image.classes) i.write(`${t}\n\n`);
    }
    i.flush(), i.close(), (0, r.ok)(`dump saved to ${n}`);
  }
  static free(e) {
    return Il2Cpp.Api._free(e);
  }
  static async initialize() {
    if ("darwin" == Process.platform) {
      let e = Process.findModuleByAddress(Module.findExportByName(null, "il2cpp_init") ?? NULL)?.name;
      null == e && (e = await (0, a.forModule)("UnityFramework", "GameAssembly.dylib")), 
      Reflect.defineProperty(Il2Cpp, "moduleName", {
        value: e
      });
    } else await (0, a.forModule)(this.moduleName);
    Il2Cpp.Api._getCorlib().isNull() && await new Promise((e => {
      const t = Interceptor.attach(Il2Cpp.Api._init, {
        onLeave() {
          t.detach(), setImmediate(e);
        }
      });
    }));
  }
  static installExceptionListener(e = "current") {
    const t = Process.getCurrentThreadId();
    return Interceptor.attach(Il2Cpp.module.getExportByName("__cxa_throw"), (function(n) {
      "current" == e && this.threadId != t || (0, r.inform)(new Il2Cpp.Object(n[0].readPointer()));
    }));
  }
  static internalCall(e, t, n) {
    const i = Il2Cpp.Api._resolveInternalCall(Memory.allocUtf8String(e));
    return i.isNull() ? null : new NativeFunction(i, t, n);
  }
  static scheduleOnInitializerThread(e) {
    return new Promise((t => {
      const n = Interceptor.attach(Il2Cpp.Api._threadCurrent, (() => {
        const i = Il2Cpp.currentThread?.id;
        if (null != i && i == Il2Cpp.attachedThreads[0].id) {
          n.detach();
          const i = e();
          setImmediate((() => t(i)));
        }
      }));
    }));
  }
  static async perform(e) {
    await this.initialize();
    let t = this.currentThread;
    const n = null == t;
    null == t && (t = Il2Cpp.Domain.attach());
    try {
      const i = e();
      return i instanceof Promise ? await i : i;
    } catch (e) {
      throw globalThis.console.log(e), e;
    } finally {
      n && t.detach();
    }
  }
  static trace() {
    return new Il2Cpp.Tracer;
  }
}

e([ n.cache ], l, "applicationDataPath", null), e([ n.cache ], l, "applicationIdentifier", null), 
e([ n.cache ], l, "applicationVersion", null), e([ n.cache ], l, "module", null), 
e([ n.cache ], l, "unityVersion", null), e([ n.cache ], l, "unityVersionIsBelow201830", null), 
Reflect.set(globalThis, "Il2Cpp", l);

}).call(this)}).call(this,require("timers").setImmediate)

},{"../utils/console":222,"../utils/native-wait":224,"decorator-cache-getter":193,"timers":227,"versioning":228}],197:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class s {
  constructor() {}
  static Is(s) {
    return e => e instanceof Il2Cpp.Class ? s.isAssignableFrom(e) : s.isAssignableFrom(e.class);
  }
  static IsExactly(s) {
    return e => e instanceof Il2Cpp.Class ? e.equals(s) : e.class.equals(s);
  }
}

Il2Cpp.Filtering = s;

},{}],198:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./base"), require("./api"), require("./filtering"), require("./runtime"), 
require("./tracer"), require("./structs/array"), require("./structs/assembly"), 
require("./structs/class"), require("./structs/domain"), require("./structs/field"), 
require("./structs/gc"), require("./structs/gc-handle"), require("./structs/image"), 
require("./structs/memory-snapshot"), require("./structs/method"), require("./structs/object"), 
require("./structs/parameter"), require("./structs/pointer"), require("./structs/reference"), 
require("./structs/string"), require("./structs/thread"), require("./structs/type"), 
require("./structs/type-enum"), require("./structs/value-type");

},{"./api":195,"./base":196,"./filtering":197,"./runtime":199,"./structs/array":200,"./structs/assembly":201,"./structs/class":202,"./structs/domain":203,"./structs/field":204,"./structs/gc":206,"./structs/gc-handle":205,"./structs/image":207,"./structs/memory-snapshot":208,"./structs/method":209,"./structs/object":210,"./structs/parameter":211,"./structs/pointer":212,"./structs/reference":213,"./structs/string":214,"./structs/thread":215,"./structs/type":217,"./structs/type-enum":216,"./structs/value-type":218,"./tracer":219}],199:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, r, o) {
  var i, n = arguments.length, a = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, o); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, r, a) : i(e, r)) || a);
  return n > 3 && a && Object.defineProperty(e, r, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter");

class r {
  constructor() {}
  static get allocationGranularity() {
    return this.information[5];
  }
  static get arrayHeaderSize() {
    return this.information[2];
  }
  static get information() {
    const t = Il2Cpp.MemorySnapshot.capture();
    try {
      return Il2Cpp.Api._memorySnapshotGetRuntimeInformation(t);
    } finally {
      Il2Cpp.Api._memorySnapshotFree(t);
    }
  }
  static get pointerSize() {
    return this.information[0];
  }
  static get objectHeaderSize() {
    return this.information[1];
  }
}

t([ e.cache ], r, "information", null), Il2Cpp.Runtime = r;

},{"decorator-cache-getter":193}],200:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, n) {
  var l, s = arguments.length, i = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var a = e.length - 1; a >= 0; a--) (l = e[a]) && (i = (s < 3 ? l(i) : s > 3 ? l(t, r, i) : l(t, r)) || i);
  return s > 3 && i && Object.defineProperty(t, r, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/console"), n = require("../../utils/native-struct");

class l extends n.NativeStruct {
  static from(e, t) {
    const r = "number" == typeof t ? t : t.length, n = new Il2Cpp.Array(Il2Cpp.Api._arrayNew(e, r));
    return Array.isArray(t) && n.elements.write(t), n;
  }
  get elements() {
    return new Il2Cpp.Pointer(Il2Cpp.Api._arrayGetElements(this), this.elementType);
  }
  get elementSize() {
    return this.elementType.class.arrayElementSize;
  }
  get elementType() {
    return this.object.class.type.class.baseType;
  }
  get length() {
    return Il2Cpp.Api._arrayGetLength(this);
  }
  get object() {
    return new Il2Cpp.Object(this);
  }
  get(e) {
    return (e < 0 || e >= this.length) && (0, r.raise)(`cannot get element at index ${e}: array length is ${this.length}`), 
    this.elements.get(e);
  }
  set(e, t) {
    (e < 0 || e >= this.length) && (0, r.raise)(`cannot get element at index ${e}: array length is ${this.length}`), 
    this.elements.set(e, t);
  }
  toString() {
    return this.isNull() ? "null" : `[${this.elements.read(this.length, 0)}]`;
  }
  * [Symbol.iterator]() {
    for (let e = 0; e < this.length; e++) yield this.elements.get(e);
  }
}

e([ t.cache ], l.prototype, "elements", null), e([ t.cache ], l.prototype, "elementSize", null), 
e([ t.cache ], l.prototype, "elementType", null), e([ t.cache ], l.prototype, "length", null), 
e([ t.cache ], l.prototype, "object", null), Il2Cpp.Array = l;

},{"../../utils/console":222,"../../utils/native-struct":223,"decorator-cache-getter":193}],201:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, l) {
  var c, o = arguments.length, a = o < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, r) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, l); else for (var n = e.length - 1; n >= 0; n--) (c = e[n]) && (a = (o < 3 ? c(a) : o > 3 ? c(t, r, a) : c(t, r)) || a);
  return o > 3 && a && Object.defineProperty(t, r, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/native-struct"), l = require("../../utils/utils");

let c = class extends r.NonNullNativeStruct {
  get image() {
    return new Il2Cpp.Image(Il2Cpp.Api._assemblyGetImage(this));
  }
  get name() {
    return this.image.name.replace(".dll", "");
  }
  get object() {
    return Il2Cpp.Image.corlib.class("System.Reflection.Assembly").method("Load").invoke(Il2Cpp.String.from(this.name));
  }
};

e([ t.cache ], c.prototype, "image", null), e([ t.cache ], c.prototype, "name", null), 
e([ t.cache ], c.prototype, "object", null), c = e([ l.cacheInstances ], c), Il2Cpp.Assembly = c;

},{"../../utils/native-struct":223,"../../utils/utils":225,"decorator-cache-getter":193}],202:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, l) {
  var r, a = arguments.length, n = a < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, s) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, s, l); else for (var p = e.length - 1; p >= 0; p--) (r = e[p]) && (n = (a < 3 ? r(n) : a > 3 ? r(t, s, n) : r(t, s)) || n);
  return a > 3 && n && Object.defineProperty(t, s, n), n;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), s = require("../../utils/console"), l = require("../../utils/native-struct"), r = require("../../utils/utils");

let a = class extends l.NonNullNativeStruct {
  get actualInstanceSize() {
    return Il2Cpp.Api._classGetActualInstanceSize(this);
  }
  get arrayClass() {
    return new Il2Cpp.Class(Il2Cpp.Api._classGetArrayClass(this, 1));
  }
  get arrayElementSize() {
    return Il2Cpp.Api._classGetArrayElementSize(this);
  }
  get assemblyName() {
    return Il2Cpp.Api._classGetAssemblyName(this).readUtf8String();
  }
  get declaringClass() {
    const e = Il2Cpp.Api._classGetDeclaringType(this);
    return e.isNull() ? null : new Il2Cpp.Class(e);
  }
  get baseType() {
    const e = Il2Cpp.Api._classGetBaseType(this);
    return e.isNull() ? null : new Il2Cpp.Type(e);
  }
  get elementClass() {
    const e = Il2Cpp.Api._classGetElementClass(this);
    return e.isNull() ? null : new Il2Cpp.Class(e);
  }
  get fields() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetFields, Il2Cpp.Field));
  }
  get flags() {
    return Il2Cpp.Api._classGetFlags(this);
  }
  get genericParameterCount() {
    return this.isGeneric ? this.type.object.method("GetGenericArguments").invoke().length : 0;
  }
  get hasReferences() {
    return !!Il2Cpp.Api._classHasReferences(this);
  }
  get hasStaticConstructor() {
    const e = this.tryMethod(".cctor");
    return null != e && !e.virtualAddress.isNull();
  }
  get image() {
    return new Il2Cpp.Image(Il2Cpp.Api._classGetImage(this));
  }
  get instanceSize() {
    return Il2Cpp.Api._classGetInstanceSize(this);
  }
  get isAbstract() {
    return !!Il2Cpp.Api._classIsAbstract(this);
  }
  get isBlittable() {
    return !!Il2Cpp.Api._classIsBlittable(this);
  }
  get isEnum() {
    return !!Il2Cpp.Api._classIsEnum(this);
  }
  get isGeneric() {
    return !!Il2Cpp.Api._classIsGeneric(this);
  }
  get isInflated() {
    return !!Il2Cpp.Api._classIsInflated(this);
  }
  get isInterface() {
    return !!Il2Cpp.Api._classIsInterface(this);
  }
  get isValueType() {
    return !!Il2Cpp.Api._classIsValueType(this);
  }
  get interfaces() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetInterfaces, Il2Cpp.Class));
  }
  get methods() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetMethods, Il2Cpp.Method));
  }
  get name() {
    return Il2Cpp.Api._classGetName(this).readUtf8String();
  }
  get namespace() {
    return Il2Cpp.Api._classGetNamespace(this).readUtf8String();
  }
  get nestedClasses() {
    return Array.from((0, r.nativeIterator)(this, Il2Cpp.Api._classGetNestedClasses, Il2Cpp.Class));
  }
  get parent() {
    const e = Il2Cpp.Api._classGetParent(this);
    return e.isNull() ? null : new Il2Cpp.Class(e);
  }
  get rank() {
    return Il2Cpp.Api._classGetRank(this);
  }
  get staticFieldsData() {
    return Il2Cpp.Api._classGetStaticFieldData(this);
  }
  get valueSize() {
    return Il2Cpp.Api._classGetValueSize(this, NULL);
  }
  get type() {
    return new Il2Cpp.Type(Il2Cpp.Api._classGetType(this));
  }
  alloc() {
    return new Il2Cpp.Object(Il2Cpp.Api._objectNew(this));
  }
  field(e) {
    return this.tryField(e);
  }
  inflate(...e) {
    this.isGeneric || (0, s.raise)(`cannot inflate class ${this.type.name}: it has no generic parameters`), 
    this.genericParameterCount != e.length && (0, s.raise)(`cannot inflate class ${this.type.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${e.length}`);
    const t = e.map((e => e.type.object)), l = Il2Cpp.Array.from(Il2Cpp.Image.corlib.class("System.Type"), t), r = this.type.object.method("MakeGenericType", 1).invoke(l);
    return new Il2Cpp.Class(Il2Cpp.Api._classFromSystemType(r));
  }
  initialize() {
    Il2Cpp.Api._classInit(this);
  }
  isAssignableFrom(e) {
    return !!Il2Cpp.Api._classIsAssignableFrom(this, e);
  }
  isSubclassOf(e, t) {
    return !!Il2Cpp.Api._classIsSubclassOf(this, e, +t);
  }
  method(e, t = -1) {
    return this.tryMethod(e, t);
  }
  nested(e) {
    return this.tryNested(e);
  }
  new() {
    const e = this.alloc(), t = Memory.alloc(Process.pointerSize);
    Il2Cpp.Api._objectInit(e, t);
    const l = t.readPointer();
    return l.isNull() || (0, s.raise)(new Il2Cpp.Object(l).toString()), e;
  }
  tryField(e) {
    const t = Il2Cpp.Api._classGetFieldFromName(this, Memory.allocUtf8String(e));
    return t.isNull() ? null : new Il2Cpp.Field(t);
  }
  tryMethod(e, t = -1) {
    const s = Il2Cpp.Api._classGetMethodFromName(this, Memory.allocUtf8String(e), t);
    return s.isNull() ? null : new Il2Cpp.Method(s);
  }
  tryNested(e) {
    return this.nestedClasses.find((t => t.name == e));
  }
  toString() {
    const e = [ this.parent ].concat(this.interfaces);
    return `// ${this.assemblyName}\n${this.isEnum ? "enum" : this.isValueType ? "struct" : this.isInterface ? "interface" : "class"} ${this.type.name}${e ? ` : ${e.map((e => e?.type.name)).join(", ")}` : ""}\n{\n    ${this.fields.join("\n    ")}\n    ${this.methods.join("\n    ")}\n}`;
  }
  static enumerate(e) {
    const t = new NativeCallback((function(t, s) {
      e(new Il2Cpp.Class(t));
    }), "void", [ "pointer", "pointer" ]);
    return Il2Cpp.Api._classForEach(t, NULL);
  }
};

e([ t.cache ], a.prototype, "actualInstanceSize", null), e([ t.cache ], a.prototype, "arrayClass", null), 
e([ t.cache ], a.prototype, "arrayElementSize", null), e([ t.cache ], a.prototype, "assemblyName", null), 
e([ t.cache ], a.prototype, "declaringClass", null), e([ t.cache ], a.prototype, "baseType", null), 
e([ t.cache ], a.prototype, "elementClass", null), e([ t.cache ], a.prototype, "fields", null), 
e([ t.cache ], a.prototype, "flags", null), e([ t.cache ], a.prototype, "genericParameterCount", null), 
e([ t.cache ], a.prototype, "hasReferences", null), e([ t.cache ], a.prototype, "hasStaticConstructor", null), 
e([ t.cache ], a.prototype, "image", null), e([ t.cache ], a.prototype, "instanceSize", null), 
e([ t.cache ], a.prototype, "isAbstract", null), e([ t.cache ], a.prototype, "isBlittable", null), 
e([ t.cache ], a.prototype, "isEnum", null), e([ t.cache ], a.prototype, "isGeneric", null), 
e([ t.cache ], a.prototype, "isInflated", null), e([ t.cache ], a.prototype, "isInterface", null), 
e([ t.cache ], a.prototype, "isValueType", null), e([ t.cache ], a.prototype, "interfaces", null), 
e([ t.cache ], a.prototype, "methods", null), e([ t.cache ], a.prototype, "name", null), 
e([ t.cache ], a.prototype, "namespace", null), e([ t.cache ], a.prototype, "nestedClasses", null), 
e([ t.cache ], a.prototype, "parent", null), e([ t.cache ], a.prototype, "rank", null), 
e([ t.cache ], a.prototype, "staticFieldsData", null), e([ t.cache ], a.prototype, "valueSize", null), 
e([ t.cache ], a.prototype, "type", null), e([ (0, r.levenshtein)("fields") ], a.prototype, "field", null), 
e([ (0, r.levenshtein)("methods") ], a.prototype, "method", null), e([ (0, r.levenshtein)("nestedClasses") ], a.prototype, "nested", null), 
a = e([ r.cacheInstances ], a), Il2Cpp.Class = a;

},{"../../utils/console":222,"../../utils/native-struct":223,"../../utils/utils":225,"decorator-cache-getter":193}],203:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, r) {
  var l, n = arguments.length, o = n < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, s) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, s, r); else for (var i = e.length - 1; i >= 0; i--) (l = e[i]) && (o = (n < 3 ? l(o) : n > 3 ? l(t, s, o) : l(t, s)) || o);
  return n > 3 && o && Object.defineProperty(t, s, o), o;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), s = require("../../utils/utils");

class r {
  constructor() {}
  static get assemblies() {
    const e = Memory.alloc(Process.pointerSize), t = Il2Cpp.Api._domainGetAssemblies(this, e), s = e.readInt(), r = new Array(s);
    for (let e = 0; e < s; e++) r[e] = new Il2Cpp.Assembly(t.add(e * Process.pointerSize).readPointer());
    if (0 == s) for (const e of this.object.method("GetAssemblies").overload().invoke()) {
      const t = e.method("GetSimpleName").invoke().content;
      null != t && r.push(this.assembly(t));
    }
    return r;
  }
  static get handle() {
    return Il2Cpp.Api._domainGet();
  }
  static get object() {
    return Il2Cpp.Image.corlib.class("System.AppDomain").method("get_CurrentDomain").invoke();
  }
  static assembly(e) {
    return this.tryAssembly(e);
  }
  static attach() {
    return new Il2Cpp.Thread(Il2Cpp.Api._threadAttach(this));
  }
  static tryAssembly(e) {
    const t = Il2Cpp.Api._domainAssemblyOpen(this, Memory.allocUtf8String(e));
    return t.isNull() ? null : new Il2Cpp.Assembly(t);
  }
}

e([ t.cache ], r, "assemblies", null), e([ t.cache ], r, "handle", null), e([ t.cache ], r, "object", null), 
e([ (0, s.levenshtein)("assemblies") ], r, "assembly", null), Il2Cpp.Domain = r;

},{"../../utils/utils":225,"decorator-cache-getter":193}],204:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, i, r) {
  var l, s = arguments.length, a = s < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, i, r); else for (var p = e.length - 1; p >= 0; p--) (l = e[p]) && (a = (s < 3 ? l(a) : s > 3 ? l(t, i, a) : l(t, i)) || a);
  return s > 3 && a && Object.defineProperty(t, i, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), i = require("../../utils/console"), r = require("../../utils/native-struct"), l = require("../utils");

class s extends r.NonNullNativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._fieldGetClass(this));
  }
  get flags() {
    return Il2Cpp.Api._fieldGetFlags(this);
  }
  get isLiteral() {
    return !!Il2Cpp.Api._fieldIsLiteral(this);
  }
  get isStatic() {
    return !!Il2Cpp.Api._fieldIsStatic(this);
  }
  get isThreadStatic() {
    return !!Il2Cpp.Api._fieldIsThreadStatic(this);
  }
  get modifier() {
    return Il2Cpp.Api._fieldGetModifier(this).readUtf8String();
  }
  get name() {
    return Il2Cpp.Api._fieldGetName(this).readUtf8String();
  }
  get offset() {
    return Il2Cpp.Api._fieldGetOffset(this);
  }
  get type() {
    return new Il2Cpp.Type(Il2Cpp.Api._fieldGetType(this));
  }
  get value() {
    const e = Memory.alloc(Process.pointerSize);
    return Il2Cpp.Api._fieldGetStaticValue(this.handle, e), (0, l.read)(e, this.type);
  }
  set value(e) {
    (this.isThreadStatic || this.isLiteral) && (0, i.raise)(`cannot modify the value of field ${this.name}: is thread static or literal`);
    const t = Memory.alloc(Process.pointerSize);
    (0, l.write)(t, e, this.type), Il2Cpp.Api._fieldSetStaticValue(this.handle, t);
  }
  toString() {
    return `${this.isThreadStatic ? "[ThreadStatic] " : ""}${this.isStatic ? "static " : ""}${this.type.name} ${this.name}${this.isLiteral ? ` = ${this.type.class.isEnum ? (0, 
    l.read)(this.value.handle, this.type.class.baseType) : this.value}` : ""};${this.isThreadStatic || this.isLiteral ? "" : ` // 0x${this.offset.toString(16)}`}`;
  }
  withHolder(e) {
    let t = e.handle.add(this.offset);
    return e instanceof Il2Cpp.ValueType && (t = t.sub(Il2Cpp.Runtime.objectHeaderSize)), 
    new Proxy(this, {
      get: (e, i) => "value" == i ? (0, l.read)(t, e.type) : Reflect.get(e, i),
      set: (e, i, r) => "value" == i ? ((0, l.write)(t, r, e.type), !0) : Reflect.set(e, i, r)
    });
  }
}

e([ t.cache ], s.prototype, "class", null), e([ t.cache ], s.prototype, "flags", null), 
e([ t.cache ], s.prototype, "isLiteral", null), e([ t.cache ], s.prototype, "isStatic", null), 
e([ t.cache ], s.prototype, "isThreadStatic", null), e([ t.cache ], s.prototype, "name", null), 
e([ t.cache ], s.prototype, "offset", null), e([ t.cache ], s.prototype, "type", null), 
Reflect.set(Il2Cpp, "Field", s);

},{"../../utils/console":222,"../../utils/native-struct":223,"../utils":220,"decorator-cache-getter":193}],205:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class e {
  handle;
  constructor(e) {
    this.handle = e;
  }
  get target() {
    const e = Il2Cpp.Api._gcHandleGetTarget(this.handle);
    return e.isNull() ? null : new Il2Cpp.Object(e);
  }
  free() {
    return Il2Cpp.Api._gcHandleFree(this.handle);
  }
}

Il2Cpp.GC.Handle = e;

},{}],206:[function(require,module,exports){
"use strict";

var e = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = e(require("versioning"));

class i {
  constructor() {}
  static get heapSize() {
    return Il2Cpp.Api._gcGetHeapSize();
  }
  static get isEnabled() {
    return !Il2Cpp.Api._gcIsDisabled();
  }
  static get isIncremental() {
    return !!Il2Cpp.Api._gcIsIncremental();
  }
  static get maxTimeSlice() {
    return Il2Cpp.Api._gcGetMaxTimeSlice();
  }
  static get usedHeapSize() {
    return Il2Cpp.Api._gcGetUsedSize();
  }
  static set isEnabled(e) {
    e ? Il2Cpp.Api._gcEnable() : Il2Cpp.Api._gcDisable();
  }
  static set maxTimeSlice(e) {
    Il2Cpp.Api._gcSetMaxTimeSlice(e);
  }
  static choose(e) {
    const i = [], l = new NativeCallback(((e, t, l) => {
      for (let l = 0; l < t; l++) i.push(new Il2Cpp.Object(e.add(l * Process.pointerSize).readPointer()));
    }), "void", [ "pointer", "int", "pointer" ]);
    if (t.default.gte(Il2Cpp.unityVersion, "2021.2.0")) {
      const t = new NativeCallback(((e, t) => e.isNull() || 0 != t.compare(0) ? Il2Cpp.alloc(t) : (Il2Cpp.free(e), 
      NULL)), "pointer", [ "pointer", "size_t", "pointer" ]), i = Il2Cpp.Api._livenessAllocateStruct(e.handle, 0, l, NULL, t);
      Il2Cpp.Api._livenessCalculationFromStatics(i), Il2Cpp.Api._livenessFinalize(i), 
      Il2Cpp.Api._livenessFreeStruct(i);
    } else {
      const t = new NativeCallback((() => {}), "void", []), i = Il2Cpp.Api._livenessCalculationBegin(e.handle, 0, l, NULL, t, t);
      Il2Cpp.Api._livenessCalculationFromStatics(i), Il2Cpp.Api._livenessCalculationEnd(i);
    }
    return i;
  }
  static collect(e) {
    Il2Cpp.Api._gcCollect(e < 0 ? 0 : e > 2 ? 2 : e);
  }
  static collectALittle() {
    Il2Cpp.Api._gcCollectALittle();
  }
  static startWorld() {
    return Il2Cpp.Api._gcStartWorld();
  }
  static startIncrementalCollection() {
    return Il2Cpp.Api._gcStartIncrementalCollection();
  }
  static stopWorld() {
    return Il2Cpp.Api._gcStopWorld();
  }
}

Reflect.set(Il2Cpp, "GC", i);

},{"versioning":228}],207:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, s, l) {
  var r, a = arguments.length, n = a < 3 ? t : null === l ? l = Object.getOwnPropertyDescriptor(t, s) : l;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, s, l); else for (var p = e.length - 1; p >= 0; p--) (r = e[p]) && (n = (a < 3 ? r(n) : a > 3 ? r(t, s, n) : r(t, s)) || n);
  return a > 3 && n && Object.defineProperty(t, s, n), n;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), s = require("../../utils/native-struct"), l = require("../../utils/utils");

let r = class extends s.NonNullNativeStruct {
  static get corlib() {
    return new Il2Cpp.Image(Il2Cpp.Api._getCorlib());
  }
  get assembly() {
    return new Il2Cpp.Assembly(Il2Cpp.Api._imageGetAssembly(this));
  }
  get classCount() {
    return Il2Cpp.Api._imageGetClassCount(this);
  }
  get classes() {
    if (Il2Cpp.unityVersionIsBelow201830) {
      const e = this.assembly.object.method("GetTypes").invoke(!1);
      return Array.from(e).map((e => new Il2Cpp.Class(Il2Cpp.Api._classFromSystemType(e))));
    }
    return Array.from(Array(this.classCount), ((e, t) => new Il2Cpp.Class(Il2Cpp.Api._imageGetClass(this, t))));
  }
  get name() {
    return Il2Cpp.Api._imageGetName(this).readUtf8String();
  }
  class(e) {
    return this.tryClass(e);
  }
  tryClass(e) {
    const t = e.lastIndexOf("."), s = Memory.allocUtf8String(-1 == t ? "" : e.slice(0, t)), l = Memory.allocUtf8String(e.slice(t + 1)), r = Il2Cpp.Api._classFromName(this, s, l);
    return r.isNull() ? null : new Il2Cpp.Class(r);
  }
};

e([ t.cache ], r.prototype, "assembly", null), e([ t.cache ], r.prototype, "classCount", null), 
e([ t.cache ], r.prototype, "classes", null), e([ t.cache ], r.prototype, "name", null), 
e([ (0, l.levenshtein)("classes", (e => e.namespace ? `${e.namespace}.${e.name}` : e.name)) ], r.prototype, "class", null), 
e([ t.cache ], r, "corlib", null), r = e([ l.cacheInstances ], r), Il2Cpp.Image = r;

},{"../../utils/native-struct":223,"../../utils/utils":225,"decorator-cache-getter":193}],208:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, o) {
  var s, p = arguments.length, c = p < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var l = e.length - 1; l >= 0; l--) (s = e[l]) && (c = (p < 3 ? s(c) : p > 3 ? s(t, r, c) : s(t, r)) || c);
  return p > 3 && c && Object.defineProperty(t, r, c), c;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/native-struct"), o = require("../../utils/utils");

class s extends r.NonNullNativeStruct {
  static capture() {
    return new Il2Cpp.MemorySnapshot;
  }
  constructor(e = Il2Cpp.Api._memorySnapshotCapture()) {
    super(e);
  }
  get classes() {
    return Array.from((0, o.nativeIterator)(this, Il2Cpp.Api._memorySnapshotGetClasses, Il2Cpp.Class));
  }
  get objects() {
    const e = [], [t, r] = Il2Cpp.Api._memorySnapshotGetGCHandles(this);
    for (let o = 0; o < t; o++) e.push(new Il2Cpp.Object(r.add(o * Process.pointerSize).readPointer()));
    return e;
  }
  free() {
    Il2Cpp.Api._memorySnapshotFree(this);
  }
}

e([ t.cache ], s.prototype, "classes", null), e([ t.cache ], s.prototype, "objects", null), 
Il2Cpp.MemorySnapshot = s;

},{"../../utils/native-struct":223,"../../utils/utils":225,"decorator-cache-getter":193}],209:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, a) {
  var i, n = arguments.length, s = n < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, r) : a;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, a); else for (var o = e.length - 1; o >= 0; o--) (i = e[o]) && (s = (n < 3 ? i(s) : n > 3 ? i(t, r, s) : i(t, r)) || s);
  return n > 3 && s && Object.defineProperty(t, r, s), s;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/console"), a = require("../../utils/native-struct"), i = require("../../utils/utils"), n = require("../utils");

class s extends a.NonNullNativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._methodGetClass(this));
  }
  get flags() {
    return Il2Cpp.Api._methodGetFlags(this, NULL);
  }
  get implementationFlags() {
    const e = Memory.alloc(Process.pointerSize);
    return Il2Cpp.Api._methodGetFlags(this, e), e.readU32();
  }
  get fridaSignature() {
    const e = [];
    for (const t of this.parameters) e.push(t.type.fridaAlias);
    return this.isStatic && !Il2Cpp.unityVersionIsBelow201830 || e.unshift("pointer"), 
    this.isInflated && e.push("pointer"), e;
  }
  get genericParameterCount() {
    return this.isGeneric ? this.object.method("GetGenericArguments").invoke().length : 0;
  }
  get isExternal() {
    return !!Il2Cpp.Api._methodIsExternal(this);
  }
  get isGeneric() {
    return !!Il2Cpp.Api._methodIsGeneric(this);
  }
  get isInflated() {
    return !!Il2Cpp.Api._methodIsInflated(this);
  }
  get isStatic() {
    return !Il2Cpp.Api._methodIsInstance(this);
  }
  get isSynchronized() {
    return !!Il2Cpp.Api._methodIsSynchronized(this);
  }
  get modifier() {
    return Il2Cpp.Api._methodGetModifier(this).readUtf8String();
  }
  get name() {
    return Il2Cpp.Api._methodGetName(this).readUtf8String();
  }
  get nativeFunction() {
    return new NativeFunction(this.virtualAddress, this.returnType.fridaAlias, this.fridaSignature);
  }
  get object() {
    return new Il2Cpp.Object(Il2Cpp.Api._methodGetObject(this, NULL));
  }
  get parameterCount() {
    return Il2Cpp.Api._methodGetParameterCount(this);
  }
  get parameters() {
    return Array.from(Array(this.parameterCount), ((e, t) => {
      const r = Il2Cpp.Api._methodGetParameterName(this, t).readUtf8String(), a = Il2Cpp.Api._methodGetParameterType(this, t);
      return new Il2Cpp.Parameter(r, t, new Il2Cpp.Type(a));
    }));
  }
  get relativeVirtualAddress() {
    return this.virtualAddress.sub(Il2Cpp.module.base);
  }
  get returnType() {
    return new Il2Cpp.Type(Il2Cpp.Api._methodGetReturnType(this));
  }
  get virtualAddress() {
    return Il2Cpp.Api._methodGetPointer(this);
  }
  set implementation(e) {
    const t = +!this.isStatic | +Il2Cpp.unityVersionIsBelow201830, a = (...r) => {
      const a = this.parameters.map(((e, a) => (0, n.fromFridaValue)(r[a + t], e.type)));
      return (0, n.toFridaValue)(e.call(this.isStatic ? this.class : new Il2Cpp.Object(r[0]), ...a));
    };
    try {
      Interceptor.replace(this.virtualAddress, new NativeCallback(a, this.returnType.fridaAlias, this.fridaSignature));
    } catch (e) {
      switch (e.message) {
       case "access violation accessing 0x0":
        (0, r.raise)(`cannot implement method ${this.name}: it has a NULL virtual address`);

       case `unable to intercept function at ${this.virtualAddress}; please file a bug`:
        (0, r.warn)(`cannot implement method ${this.name}: it may be a thunk`);
        break;

       case "already replaced this function":
        (0, r.warn)(`cannot implement method ${this.name}: already replaced by a thunk`);
        break;

       default:
        throw e;
      }
    }
  }
  inflate(...e) {
    this.isGeneric || (0, r.raise)(`cannot inflate method ${this.name}: it has no generic parameters`), 
    this.genericParameterCount != e.length && (0, r.raise)(`cannot inflate method ${this.name}: it needs ${this.genericParameterCount} generic parameter(s), not ${e.length}`);
    const t = e.map((e => e.type.object)), a = Il2Cpp.Array.from(Il2Cpp.Image.corlib.class("System.Type"), t), i = this.object.method("MakeGenericMethod", 1).invoke(a);
    return new Il2Cpp.Method(Il2Cpp.Api._methodGetFromReflection(i));
  }
  invoke(...e) {
    return this.isStatic || (0, r.raise)(`cannot invoke a non-static method ${this.name}: must be invoked throught a Il2Cpp.Object, not a Il2Cpp.Class`), 
    this.invokeRaw(NULL, ...e);
  }
  invokeRaw(e, ...t) {
    const a = t.map(n.toFridaValue);
    this.isStatic && !Il2Cpp.unityVersionIsBelow201830 || a.unshift(e), this.isInflated && a.push(this.handle);
    try {
      const e = this.nativeFunction(...a);
      return (0, n.fromFridaValue)(e, this.returnType);
    } catch (e) {
      switch (null == e && (0, r.raise)("an unexpected native function exception occurred, this is due to parameter types mismatch"), 
      e.message) {
       case "bad argument count":
        (0, r.raise)(`cannot invoke method ${this.name}: it needs ${this.parameterCount} parameter(s), not ${t.length}`);

       case "expected a pointer":
       case "expected number":
       case "expected array with fields":
        (0, r.raise)(`cannot invoke method ${this.name}: parameter types mismatch`);
      }
      throw e;
    }
  }
  overload(...e) {
    const t = this.tryOverload(...e);
    if (null != t) return t;
    (0, r.raise)(`cannot find overloaded method ${this.name}(${e})`);
  }
  parameter(e) {
    return this.tryParameter(e);
  }
  revert() {
    Interceptor.revert(this.virtualAddress), Interceptor.flush();
  }
  tryOverload(...e) {
    return this.class.methods.find((t => t.name == this.name && t.parameterCount == e.length && t.parameters.every(((t, r) => t.type.name == e[r]))));
  }
  tryParameter(e) {
    return this.parameters.find((t => t.name == e));
  }
  toString() {
    return `${this.isStatic ? "static " : ""}${this.returnType.name} ${this.name}(${this.parameters.join(", ")});${this.virtualAddress.isNull() ? "" : ` // 0x${this.relativeVirtualAddress.toString(16).padStart(8, "0")}`}`;
  }
  withHolder(e) {
    return new Proxy(this, {
      get(t, r) {
        switch (r) {
         case "invoke":
          return t.invokeRaw.bind(t, e.handle);

         case "inflate":
         case "overload":
         case "tryOverload":
          return function(...a) {
            return t[r](...a)?.withHolder(e);
          };
        }
        return Reflect.get(t, r);
      }
    });
  }
}

e([ t.cache ], s.prototype, "class", null), e([ t.cache ], s.prototype, "flags", null), 
e([ t.cache ], s.prototype, "implementationFlags", null), e([ t.cache ], s.prototype, "fridaSignature", null), 
e([ t.cache ], s.prototype, "genericParameterCount", null), e([ t.cache ], s.prototype, "isExternal", null), 
e([ t.cache ], s.prototype, "isGeneric", null), e([ t.cache ], s.prototype, "isInflated", null), 
e([ t.cache ], s.prototype, "isStatic", null), e([ t.cache ], s.prototype, "isSynchronized", null), 
e([ t.cache ], s.prototype, "name", null), e([ t.cache ], s.prototype, "nativeFunction", null), 
e([ t.cache ], s.prototype, "object", null), e([ t.cache ], s.prototype, "parameterCount", null), 
e([ t.cache ], s.prototype, "parameters", null), e([ t.cache ], s.prototype, "relativeVirtualAddress", null), 
e([ t.cache ], s.prototype, "returnType", null), e([ t.cache ], s.prototype, "virtualAddress", null), 
e([ (0, i.levenshtein)("parameters") ], s.prototype, "parameter", null), Reflect.set(Il2Cpp, "Method", s);

},{"../../utils/console":222,"../../utils/native-struct":223,"../../utils/utils":225,"../utils":220,"decorator-cache-getter":193}],210:[function(require,module,exports){
"use strict";

var t = this && this.__decorate || function(t, e, r, i) {
  var l, p = arguments.length, s = p < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (l = t[n]) && (s = (p < 3 ? l(s) : p > 3 ? l(e, r, s) : l(e, r)) || s);
  return p > 3 && s && Object.defineProperty(e, r, s), s;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter"), r = require("../../utils/native-struct");

class i extends r.NativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._objectGetClass(this));
  }
  get size() {
    return Il2Cpp.Api._objectGetSize(this);
  }
  enter() {
    return Il2Cpp.Api._monitorEnter(this);
  }
  exit() {
    return Il2Cpp.Api._monitorExit(this);
  }
  field(t) {
    return this.class.field(t).withHolder(this);
  }
  method(t, e = -1) {
    return this.class.method(t, e).withHolder(this);
  }
  pulse() {
    return Il2Cpp.Api._monitorPulse(this);
  }
  pulseAll() {
    return Il2Cpp.Api._monitorPulseAll(this);
  }
  ref(t) {
    return new Il2Cpp.GC.Handle(Il2Cpp.Api._gcHandleNew(this, +t));
  }
  virtualMethod(t) {
    return new Il2Cpp.Method(Il2Cpp.Api._objectGetVirtualMethod(this, t)).withHolder(this);
  }
  tryEnter(t) {
    return !!Il2Cpp.Api._monitorTryEnter(this, t);
  }
  tryField(t) {
    return this.class.tryField(t)?.withHolder(this);
  }
  tryMethod(t, e = -1) {
    return this.class.tryMethod(t, e)?.withHolder(this);
  }
  tryWait(t) {
    return !!Il2Cpp.Api._monitorTryWait(this, t);
  }
  toString() {
    return this.isNull() ? "null" : this.method("ToString").invoke().content ?? "null";
  }
  unbox() {
    return new Il2Cpp.ValueType(Il2Cpp.Api._objectUnbox(this), this.class.type);
  }
  wait() {
    return Il2Cpp.Api._monitorWait(this);
  }
  weakRef(t) {
    return new Il2Cpp.GC.Handle(Il2Cpp.Api._gcHandleNewWeakRef(this, +t));
  }
}

t([ e.cache ], i.prototype, "class", null), t([ e.cache ], i.prototype, "size", null), 
Il2Cpp.Object = i;

},{"../../utils/native-struct":223,"decorator-cache-getter":193}],211:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

class t {
  name;
  position;
  type;
  constructor(t, e, s) {
    this.name = t, this.position = e, this.type = s;
  }
  toString() {
    return `${this.type.name} ${this.name}`;
  }
}

Il2Cpp.Parameter = t;

},{}],212:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("../utils"), e = require("../../utils/native-struct");

class r extends e.NativeStruct {
  type;
  constructor(t, e) {
    super(t), this.type = e;
  }
  get(e) {
    return (0, t.read)(this.handle.add(e * this.type.class.arrayElementSize), this.type);
  }
  read(t, e = 0) {
    const r = new Array(t);
    for (let s = 0; s < t; s++) r[s] = this.get(s + e);
    return r;
  }
  set(e, r) {
    (0, t.write)(this.handle.add(e * this.type.class.arrayElementSize), r, this.type);
  }
  toString() {
    return this.handle.toString();
  }
  write(t, e = 0) {
    for (let r = 0; r < t.length; r++) this.set(r + e, t[r]);
  }
}

Il2Cpp.Pointer = r;

},{"../../utils/native-struct":223,"../utils":220}],213:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("../utils"), t = require("../../utils/native-struct"), r = require("../../utils/console");

class n extends t.NativeStruct {
  type;
  constructor(e, t) {
    super(e), this.type = t;
  }
  get value() {
    return (0, e.read)(this.handle, this.type);
  }
  set value(t) {
    (0, e.write)(this.handle, t, this.type);
  }
  toString() {
    return this.isNull() ? "null" : `->${this.value}`;
  }
  static to(e, t) {
    const n = Memory.alloc(Process.pointerSize);
    switch (typeof e) {
     case "boolean":
      return new Il2Cpp.Reference(n.writeS8(+e), Il2Cpp.Image.corlib.class("System.Boolean").type);

     case "number":
      switch (t?.typeEnum) {
       case 5:
        return new Il2Cpp.Reference(n.writeU8(e), t);

       case 4:
        return new Il2Cpp.Reference(n.writeS8(e), t);

       case 3:
       case 7:
        return new Il2Cpp.Reference(n.writeU16(e), t);

       case 6:
        return new Il2Cpp.Reference(n.writeS16(e), t);

       case 9:
        return new Il2Cpp.Reference(n.writeU32(e), t);

       case 8:
        return new Il2Cpp.Reference(n.writeS32(e), t);

       case 11:
        return new Il2Cpp.Reference(n.writeU64(e), t);

       case 10:
        return new Il2Cpp.Reference(n.writeS64(e), t);

       case 12:
        return new Il2Cpp.Reference(n.writeFloat(e), t);

       case 13:
        return new Il2Cpp.Reference(n.writeDouble(e), t);
      }

     case "object":
      if (e instanceof Il2Cpp.ValueType || e instanceof Il2Cpp.Pointer) return new Il2Cpp.Reference(n.writePointer(e), e.type);
      if (e instanceof Il2Cpp.Object) return new Il2Cpp.Reference(n.writePointer(e), e.class.type);
      if (e instanceof Il2Cpp.String || e instanceof Il2Cpp.Array) return new Il2Cpp.Reference(n.writePointer(e), e.object.class.type);
      if (e instanceof NativePointer) switch (t?.typeEnum) {
       case 25:
       case 24:
        return new Il2Cpp.Reference(n.writePointer(e), t);
      } else {
        if (e instanceof Int64) return new Il2Cpp.Reference(n.writeS64(e), Il2Cpp.Image.corlib.class("System.Int64").type);
        if (e instanceof UInt64) return new Il2Cpp.Reference(n.writeU64(e), Il2Cpp.Image.corlib.class("System.UInt64").type);
      }

     default:
      (0, r.raise)(`don't know how to create a reference to ${e} using type ${t?.name}`);
    }
  }
}

Il2Cpp.Reference = n;

},{"../../utils/console":222,"../../utils/native-struct":223,"../utils":220}],214:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("../../utils/native-struct");

class e extends t.NativeStruct {
  get content() {
    return Il2Cpp.Api._stringChars(this).readUtf16String(this.length);
  }
  set content(t) {
    Il2Cpp.Api._stringChars(this).writeUtf16String(t ?? ""), Il2Cpp.Api._stringSetLength(this, t?.length ?? 0);
  }
  get length() {
    return Il2Cpp.Api._stringLength(this);
  }
  get object() {
    return new Il2Cpp.Object(this);
  }
  toString() {
    return this.isNull() ? "null" : `"${this.content}"`;
  }
  static from(t) {
    return new Il2Cpp.String(Il2Cpp.Api._stringNew(Memory.allocUtf8String(t || "")));
  }
}

Il2Cpp.String = e;

},{"../../utils/native-struct":223}],215:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var t = this && this.__decorate || function(t, e, r, n) {
  var i, o = arguments.length, a = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, n); else for (var c = t.length - 1; c >= 0; c--) (i = t[c]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, r, a) : i(e, r)) || a);
  return o > 3 && a && Object.defineProperty(e, r, a), a;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = require("decorator-cache-getter"), r = require("../../utils/console"), n = require("../../utils/native-struct");

class i extends n.NativeStruct {
  static get idOffset() {
    const t = ptr(Il2Cpp.currentThread.internal.field("thread_id").value.toString()), e = Process.getCurrentThreadId();
    for (let r = 0; r < 1024; r++) {
      if (t.add(r).readS32() == e) return r;
    }
    (0, r.raise)("couldn't determine the offset for a native thread id value");
  }
  get id() {
    return ptr(this.internal.field("thread_id").value.toString()).add(Il2Cpp.Thread.idOffset).readS32();
  }
  get internal() {
    const t = this.object.tryField("internal_thread")?.value;
    return t || this.object;
  }
  get isFinalizer() {
    return !Il2Cpp.Api._threadIsVm(this);
  }
  get object() {
    return new Il2Cpp.Object(this);
  }
  get staticData() {
    return this.internal.field("static_data").value;
  }
  get synchronizationContext() {
    let t = (this.object.tryMethod("GetMutableExecutionContext") || this.object.method("get_ExecutionContext")).invoke().tryMethod("get_SynchronizationContext")?.invoke();
    if (null == t) {
      const e = Il2Cpp.Image.corlib.class("System.Threading.SynchronizationContext");
      for (let r = 0; r < 16; r++) try {
        const n = new Il2Cpp.Object(this.staticData.add(Process.pointerSize * r).readPointer().readPointer());
        if (n.class.isSubclassOf(e, !1)) {
          t = n;
          break;
        }
      } catch (t) {}
    }
    return null == t && (0, r.raise)("couldn't retrieve the SynchronizationContext for this thread."), 
    t;
  }
  detach() {
    return Il2Cpp.Api._threadDetach(this);
  }
  schedule(t, e = 0) {
    const r = this.id, n = Il2Cpp.Image.corlib.class("Mono.Runtime").method("GetDisplayName"), i = Il2Cpp.Image.corlib.class("System.Threading.SendOrPostCallback").alloc();
    i.method(".ctor").invoke(NULL, n.handle);
    const o = this.synchronizationContext.method("Post");
    return new Promise((a => {
      const c = Interceptor.attach(n.virtualAddress, (function() {
        if (this.threadId == r) {
          c.detach();
          const e = t();
          setImmediate((() => a(e)));
        }
      }));
      setTimeout((() => o.invoke(i, NULL)), e);
    }));
  }
}

t([ e.cache ], i.prototype, "internal", null), t([ e.cache ], i.prototype, "object", null), 
t([ e.cache ], i.prototype, "staticData", null), t([ e.cache ], i.prototype, "synchronizationContext", null), 
t([ e.cache ], i, "idOffset", null), Il2Cpp.Thread = i;

}).call(this)}).call(this,require("timers").setImmediate)

},{"../../utils/console":222,"../../utils/native-struct":223,"decorator-cache-getter":193,"timers":227}],216:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

},{}],217:[function(require,module,exports){
"use strict";

var e = this && this.__decorate || function(e, t, r, c) {
  var n, s = arguments.length, i = s < 3 ? t : null === c ? c = Object.getOwnPropertyDescriptor(t, r) : c;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, c); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (i = (s < 3 ? n(i) : s > 3 ? n(t, r, i) : n(t, r)) || i);
  return s > 3 && i && Object.defineProperty(t, r, i), i;
};

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("decorator-cache-getter"), r = require("../../utils/native-struct");

class c extends r.NonNullNativeStruct {
  get class() {
    return new Il2Cpp.Class(Il2Cpp.Api._classFromType(this));
  }
  get fridaAlias() {
    if (this.isByReference) return "pointer";
    switch (this.typeEnum) {
     case 1:
      return "void";

     case 2:
      return "bool";

     case 3:
      return "uchar";

     case 4:
      return "int8";

     case 5:
      return "uint8";

     case 6:
      return "int16";

     case 7:
      return "uint16";

     case 8:
      return "int32";

     case 9:
      return "uint32";

     case 10:
      return "int64";

     case 11:
      return "uint64";

     case 12:
      return "float";

     case 13:
      return "double";

     case 17:
      return n(this);

     case 24:
     case 25:
     case 15:
     case 14:
     case 29:
     case 20:
     default:
      return "pointer";

     case 18:
     case 28:
     case 21:
      return this.class.isValueType ? n(this) : "pointer";
    }
  }
  get isByReference() {
    return !!Il2Cpp.Api._typeIsByReference(this);
  }
  get isPrimitive() {
    return !!Il2Cpp.Api._typeIsPrimitive(this);
  }
  get name() {
    const e = Il2Cpp.Api._typeGetName(this);
    try {
      return e.readUtf8String();
    } finally {
      Il2Cpp.free(e);
    }
  }
  get object() {
    return new Il2Cpp.Object(Il2Cpp.Api._typeGetObject(this));
  }
  get typeEnum() {
    return Il2Cpp.Api._typeGetTypeEnum(this);
  }
  toString() {
    return this.name;
  }
}

function n(e) {
  const t = e.class.fields.filter((e => !e.isStatic));
  return 0 == t.length ? [ "char" ] : t.map((e => e.type.fridaAlias));
}

e([ t.cache ], c.prototype, "class", null), e([ t.cache ], c.prototype, "fridaAlias", null), 
e([ t.cache ], c.prototype, "isByReference", null), e([ t.cache ], c.prototype, "isPrimitive", null), 
e([ t.cache ], c.prototype, "name", null), e([ t.cache ], c.prototype, "object", null), 
e([ t.cache ], c.prototype, "typeEnum", null), Reflect.set(Il2Cpp, "Type", c);

},{"../../utils/native-struct":223,"decorator-cache-getter":193}],218:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const t = require("../../utils/native-struct");

class e extends t.NativeStruct {
  type;
  constructor(t, e) {
    super(t), this.type = e;
  }
  box() {
    return new Il2Cpp.Object(Il2Cpp.Api._valueBox(this.type.class, this));
  }
  field(t) {
    return this.type.class.field(t).withHolder(this);
  }
  toString() {
    return this.isNull() ? "null" : this.box().toString();
  }
}

Il2Cpp.ValueType = e;

},{"../../utils/native-struct":223}],219:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const s = require("../utils/console"), e = require("./utils");

class t {
  targets=[];
  #s;
  #e;
  #t;
  #i;
  #r;
  #a;
  #l;
  domain() {
    return this;
  }
  assemblies(...s) {
    return this.#s = s, this;
  }
  classes(...s) {
    return this.#e = s, this;
  }
  methods(...s) {
    return this.#t = s, this;
  }
  filterAssemblies(s) {
    return this.#i = s, this;
  }
  filterClasses(s) {
    return this.#r = s, this;
  }
  filterMethods(s) {
    return this.#a = s, this;
  }
  filterParameters(s) {
    return this.#l = s, this;
  }
  and() {
    const s = s => {
      if (null != this.#l) {
        for (const e of s.parameters) if (this.#l(e)) {
          this.targets.push(s);
          break;
        }
      } else this.targets.push(s);
    }, e = e => {
      for (const t of e) s(t);
    }, t = t => {
      if (null != this.#a) for (const e of t.methods) this.#a(e) && s(e); else e(t.methods);
    }, i = s => {
      for (const e of s) t(e);
    }, r = s => {
      if (null != this.#r) for (const e of s.image.classes) this.#r(e) && t(e); else i(s.image.classes);
    }, a = s => {
      for (const e of s) r(e);
    };
    return this.#t ? e(this.#t) : this.#e ? i(this.#e) : this.#s ? a(this.#s) : (s => {
      if (null != this.#i) for (const e of s.assemblies) this.#i(e) && r(e); else a(s.assemblies);
    })(Il2Cpp.Domain), this.#s = void 0, this.#e = void 0, this.#t = void 0, this.#i = void 0, 
    this.#r = void 0, this.#a = void 0, this.#l = void 0, this;
  }
  attach(t = "full") {
    let i = 0;
    for (const r of this.targets) {
      if (r.virtualAddress.isNull()) continue;
      const a = `[2m0x${r.relativeVirtualAddress.toString(16).padStart(8, "0")}[0m`, l = `${r.class.type.name}.[1m${r.name}[0m`;
      if ("detailed" == t) {
        const t = +!r.isStatic | +Il2Cpp.unityVersionIsBelow201830, o = (...o) => {
          const m = r.isStatic ? void 0 : new Il2Cpp.Parameter("this", -1, r.class.type), n = m ? [ m ].concat(r.parameters) : r.parameters;
          (0, s.inform)(`${a} ${"│ ".repeat(i++)}┌─[35m${l}[0m(${n.map((s => `[32m${s.name}[0m = [31m${(0, 
          e.fromFridaValue)(o[s.position + t], s.type)}[0m`)).join(", ")});`);
          const h = r.nativeFunction(...o);
          return (0, s.inform)(`${a} ${"│ ".repeat(--i)}└─[33m${l}[0m${null == h ? "" : ` = [36m${(0, 
          e.fromFridaValue)(h, r.returnType)}`}[0m;`), h;
        };
        try {
          r.revert();
          const s = new NativeCallback(o, r.returnType.fridaAlias, r.fridaSignature);
          Interceptor.replace(r.virtualAddress, s);
        } catch (s) {}
      } else try {
        Interceptor.attach(r.virtualAddress, {
          onEnter: () => (0, s.inform)(`${a} ${"│ ".repeat(i++)}┌─[35m${l}[0m`),
          onLeave: () => (0, s.inform)(`${a} ${"│ ".repeat(--i)}└─[33m${l}[0m${0 == i ? "\n" : ""}`)
        });
      } catch (s) {}
    }
  }
}

Il2Cpp.Tracer = t;

},{"../utils/console":222,"./utils":220}],220:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.toFridaValue = exports.fromFridaValue = exports.write = exports.read = void 0;

const e = require("../utils/console"), r = require("../utils/native-struct");

function a(r, a) {
  switch (a.typeEnum) {
   case 2:
    return !!r.readS8();

   case 4:
    return r.readS8();

   case 5:
    return r.readU8();

   case 6:
    return r.readS16();

   case 7:
   case 3:
    return r.readU16();

   case 8:
    return r.readS32();

   case 9:
    return r.readU32();

   case 10:
    return r.readS64();

   case 11:
    return r.readU64();

   case 12:
    return r.readFloat();

   case 13:
    return r.readDouble();

   case 24:
   case 25:
    return r.readPointer();

   case 15:
    return new Il2Cpp.Pointer(r.readPointer(), a.class.baseType);

   case 17:
    return new Il2Cpp.ValueType(r, a);

   case 28:
   case 18:
    return new Il2Cpp.Object(r.readPointer());

   case 21:
    return a.class.isValueType ? new Il2Cpp.ValueType(r, a) : new Il2Cpp.Object(r.readPointer());

   case 14:
    return new Il2Cpp.String(r.readPointer());

   case 29:
   case 20:
    return new Il2Cpp.Array(r.readPointer());
  }
  (0, e.raise)(`read: "${a.name}" (${a.typeEnum}) has not been handled yet. Please file an issue!`);
}

function t(r, a, t) {
  switch (t.typeEnum) {
   case 2:
    return r.writeS8(+a);

   case 4:
    return r.writeS8(a);

   case 5:
    return r.writeU8(a);

   case 6:
    return r.writeS16(a);

   case 7:
   case 3:
    return r.writeU16(a);

   case 8:
    return r.writeS32(a);

   case 9:
    return r.writeU32(a);

   case 10:
    return r.writeS64(a);

   case 11:
    return r.writeU64(a);

   case 12:
    return r.writeFloat(a);

   case 13:
    return r.writeDouble(a);

   case 24:
   case 25:
   case 15:
   case 17:
   case 14:
   case 28:
   case 18:
   case 29:
   case 20:
   case 21:
    return a instanceof Il2Cpp.ValueType ? (Memory.copy(r, a.handle, t.class.valueSize), 
    r) : r.writePointer(a);
  }
  (0, e.raise)(`write: "${t.name}" (${t.typeEnum}) has not been handled yet. Please file an issue!`);
}

function s(e, r) {
  if (Array.isArray(e)) return i(r, e);
  if (!(e instanceof NativePointer)) return 2 == r.typeEnum ? !!e : e;
  if (r.isByReference) return new Il2Cpp.Reference(e, r);
  switch (r.typeEnum) {
   case 15:
    return new Il2Cpp.Pointer(e, r.class.baseType);

   case 14:
    return new Il2Cpp.String(e);

   case 18:
   case 21:
   case 28:
    return new Il2Cpp.Object(e);

   case 29:
   case 20:
    return new Il2Cpp.Array(e);

   default:
    return e;
  }
}

function n(e) {
  return "boolean" == typeof e ? +e : e instanceof Il2Cpp.ValueType ? c(e) : e;
}

function c(e) {
  const a = e.type.class.fields.filter((e => !e.isStatic));
  return 0 == a.length ? [ e.handle.readU8() ] : a.map((r => r.withHolder(e).value)).map((e => e instanceof Il2Cpp.ValueType ? c(e) : e instanceof r.NativeStruct ? e.handle : "boolean" == typeof e ? +e : e));
}

function i(r, a) {
  const t = Memory.alloc(r.class.valueSize);
  a = a.flat(1 / 0);
  const s = function e(r, a = 0) {
    const t = [];
    for (const s of r.class.fields) if (!s.isStatic) {
      const r = a + s.offset - Il2Cpp.Runtime.objectHeaderSize;
      17 == s.type.typeEnum || 21 == s.type.typeEnum && s.type.class.isValueType ? t.push(...e(s.type, r)) : t.push([ s.type.typeEnum, r ]);
    }
    return 0 == t.length && t.push([ 5, 0 ]), t;
  }(r);
  for (let r = 0; r < a.length; r++) {
    const n = a[r], [c, i] = s[r], u = t.add(i);
    switch (c) {
     case 2:
     case 4:
      u.writeS8(n);
      break;

     case 5:
      u.writeU8(n);
      break;

     case 6:
      u.writeS16(n);
      break;

     case 7:
     case 3:
      u.writeU16(n);
      break;

     case 8:
      u.writeS32(n);
      break;

     case 9:
      u.writeU32(n);
      break;

     case 10:
      u.writeS64(n);
      break;

     case 11:
      u.writeU64(n);
      break;

     case 12:
      u.writeFloat(n);
      break;

     case 13:
      u.writeDouble(n);
      break;

     case 24:
     case 25:
     case 15:
     case 29:
     case 20:
     case 14:
     case 28:
     case 18:
     case 21:
      u.writePointer(n);
      break;

     default:
      (0, e.warn)(`arrayToValueType: defaulting ${c} to pointer`), u.writePointer(n);
    }
  }
  return new Il2Cpp.ValueType(t, r);
}

exports.read = a, exports.write = t, exports.fromFridaValue = s, exports.toFridaValue = n;

},{"../utils/console":222,"../utils/native-struct":223}],221:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), require("./il2cpp");

},{"./il2cpp":198}],222:[function(require,module,exports){
"use strict";

function o(o) {
  throw `[0m[38;5;9mil2cpp[0m: ${o}`;
}

function e(o) {
  globalThis.console.log(`[38;5;11mil2cpp[0m: ${o}`);
}

function s(o) {
  globalThis.console.log(`[38;5;10mil2cpp[0m: ${o}`);
}

function r(o) {
  globalThis.console.log(`[38;5;12mil2cpp[0m: ${o}`);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.inform = exports.ok = exports.warn = exports.raise = void 0, exports.raise = o, 
exports.warn = e, exports.ok = s, exports.inform = r;

},{}],223:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NonNullNativeStruct = exports.NativeStruct = void 0;

class t {
  handle;
  constructor(t) {
    t instanceof NativePointer ? this.handle = t : this.handle = t.handle;
  }
  equals(t) {
    return this.handle.equals(t.handle);
  }
  isNull() {
    return this.handle.isNull();
  }
}

exports.NativeStruct = t;

class e extends t {
  constructor(t) {
    if (super(t), t.isNull()) throw new Error(`Handle for "${this.constructor.name}" cannot be NULL.`);
  }
}

exports.NonNullNativeStruct = e;

},{}],224:[function(require,module,exports){
(function (setImmediate){(function (){
"use strict";

var e = this && this.__decorate || function(e, t, r, n) {
  var o, s = arguments.length, i = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (i = (s < 3 ? o(i) : s > 3 ? o(t, r, i) : o(t, r)) || i);
  return s > 3 && i && Object.defineProperty(t, r, i), i;
}, t = this && this.__importDefault || function(e) {
  return e && e.__esModule ? e : {
    default: e
  };
};

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.forModule = void 0;

const r = require("decorator-cache-getter"), n = t(require("versioning"));

class o {
  stringEncoding;
  address;
  constructor(e, t, r) {
    this.stringEncoding = r, this.address = Module.findExportByName(e, t) ?? NULL;
  }
  static get targets() {
    const [e, ...t] = function() {
      switch (Process.platform) {
       case "linux":
        try {
          return n.default.gte(Java.androidVersion, "12") ? [ null, [ "__loader_dlopen", "utf8" ] ] : [ "libdl.so", [ "dlopen", "utf8" ], [ "android_dlopen_ext", "utf8" ] ];
        } catch (e) {
          return [ null, [ "dlopen", "utf8" ] ];
        }

       case "darwin":
        return [ "libdyld.dylib", [ "dlopen", "utf8" ] ];

       case "windows":
        const e = "LoadLibrary";
        return [ "kernel32.dll", [ `${e}W`, "utf16" ], [ `${e}ExW`, "utf16" ], [ `${e}A`, "ansi" ], [ `${e}ExA`, "ansi" ] ];
      }
    }();
    return t.map((([t, r]) => new o(e, t, r))).filter((e => !e.address.isNull()));
  }
  readString(e) {
    switch (this.stringEncoding) {
     case "utf8":
      return e.readUtf8String();

     case "utf16":
      return e.readUtf16String();

     case "ansi":
      return e.readAnsiString();
    }
  }
}

function s(...e) {
  return new Promise((t => {
    for (const r of e) {
      if (null != Process.findModuleByName(r)) return void t(r);
    }
    const r = o.targets.map((n => Interceptor.attach(n.address, {
      onEnter(e) {
        this.modulePath = n.readString(e[0]) ?? "";
      },
      onLeave(n) {
        if (!n.isNull()) for (const n of e) this.modulePath.endsWith(n) && (setImmediate((() => r.forEach((e => e.detach())))), 
        t(n));
      }
    })));
  }));
}

e([ r.cache ], o, "targets", null), exports.forModule = s;

}).call(this)}).call(this,require("timers").setImmediate)

},{"decorator-cache-getter":193,"timers":227,"versioning":228}],225:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.levenshtein = exports.cacheInstances = exports.nativeIterator = void 0;

const e = require("fastest-levenshtein"), t = require("./console");

function* n(e, t, n) {
  const s = Memory.alloc(Process.pointerSize);
  let o;
  for (;!(o = t(e, s)).isNull(); ) yield new n(o);
}

function s(e) {
  const t = new Map;
  return new Proxy(e, {
    construct(e, n) {
      const s = n[0].toUInt32();
      return t.has(s) || t.set(s, new e(n[0])), t.get(s);
    }
  });
}

function o(n, s = (e => e.name)) {
  return function(o, r, c) {
    const i = c.value;
    c.value = function(o, ...c) {
      const a = i.call(this, o, ...c);
      if (null != a) return a;
      const u = (0, e.closest)(o, this[n].map(s));
      (0, t.raise)(`couldn't find ${r} ${o} in ${this.name}${u ? `, did you mean ${u}?` : ""}`);
    };
  };
}

exports.nativeIterator = n, exports.cacheInstances = s, exports.levenshtein = o;

},{"./console":222,"fastest-levenshtein":194}],226:[function(require,module,exports){
var t, e, n = module.exports = {};

function r() {
  throw new Error("setTimeout has not been defined");
}

function o() {
  throw new Error("clearTimeout has not been defined");
}

function i(e) {
  if (t === setTimeout) return setTimeout(e, 0);
  if ((t === r || !t) && setTimeout) return t = setTimeout, setTimeout(e, 0);
  try {
    return t(e, 0);
  } catch (n) {
    try {
      return t.call(null, e, 0);
    } catch (n) {
      return t.call(this, e, 0);
    }
  }
}

function u(t) {
  if (e === clearTimeout) return clearTimeout(t);
  if ((e === o || !e) && clearTimeout) return e = clearTimeout, clearTimeout(t);
  try {
    return e(t);
  } catch (n) {
    try {
      return e.call(null, t);
    } catch (n) {
      return e.call(this, t);
    }
  }
}

!function() {
  try {
    t = "function" == typeof setTimeout ? setTimeout : r;
  } catch (e) {
    t = r;
  }
  try {
    e = "function" == typeof clearTimeout ? clearTimeout : o;
  } catch (t) {
    e = o;
  }
}();

var c, s = [], l = !1, a = -1;

function f() {
  l && c && (l = !1, c.length ? s = c.concat(s) : a = -1, s.length && h());
}

function h() {
  if (!l) {
    var t = i(f);
    l = !0;
    for (var e = s.length; e; ) {
      for (c = s, s = []; ++a < e; ) c && c[a].run();
      a = -1, e = s.length;
    }
    c = null, l = !1, u(t);
  }
}

function m(t, e) {
  this.fun = t, this.array = e;
}

function p() {}

n.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
  s.push(new m(t, e)), 1 !== s.length || l || i(h);
}, m.prototype.run = function() {
  this.fun.apply(null, this.array);
}, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", 
n.versions = {}, n.on = p, n.addListener = p, n.once = p, n.off = p, n.removeListener = p, 
n.removeAllListeners = p, n.emit = p, n.prependListener = p, n.prependOnceListener = p, 
n.listeners = function(t) {
  return [];
}, n.binding = function(t) {
  throw new Error("process.binding is not supported");
}, n.cwd = function() {
  return "/";
}, n.chdir = function(t) {
  throw new Error("process.chdir is not supported");
}, n.umask = function() {
  return 0;
};

},{}],227:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var e = require("process/browser.js").nextTick, t = Function.prototype.apply, o = Array.prototype.slice, i = {}, n = 0;

function r(e, t) {
  this._id = e, this._clearFn = t;
}

exports.setTimeout = function() {
  return new r(t.call(setTimeout, window, arguments), clearTimeout);
}, exports.setInterval = function() {
  return new r(t.call(setInterval, window, arguments), clearInterval);
}, exports.clearTimeout = exports.clearInterval = function(e) {
  e.close();
}, r.prototype.unref = r.prototype.ref = function() {}, r.prototype.close = function() {
  this._clearFn.call(window, this._id);
}, exports.enroll = function(e, t) {
  clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
}, exports.unenroll = function(e) {
  clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
}, exports._unrefActive = exports.active = function(e) {
  clearTimeout(e._idleTimeoutId);
  var t = e._idleTimeout;
  t >= 0 && (e._idleTimeoutId = setTimeout((function() {
    e._onTimeout && e._onTimeout();
  }), t));
}, exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(t) {
  var r = n++, l = !(arguments.length < 2) && o.call(arguments, 1);
  return i[r] = !0, e((function() {
    i[r] && (l ? t.apply(null, l) : t.call(null), exports.clearImmediate(r));
  })), r;
}, exports.clearImmediate = "function" == typeof clearImmediate ? clearImmediate : function(e) {
  delete i[e];
};

}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":226,"timers":227}],228:[function(require,module,exports){
var t = ".", n = function(t) {
  this._version = String(t);
};

function r(n, r, i) {
  if ((n = String(n)) === (r = String(r))) return 0;
  for (var e = n.split(t), o = r.split(t), u = Math[i ? "max" : "min"](e.length, o.length), s = 0; s < u; s++) {
    if (e[s] = void 0 === e[s] ? 0 : parseInt(e[s], 10), o[s] = void 0 === o[s] ? 0 : parseInt(o[s], 10), 
    e[s] > o[s]) return 1;
    if (e[s] < o[s]) return -1;
  }
  return 0;
}

n.compare = function(t, n) {
  return r(t, n, !0);
}, n.eq = function(t, n, i) {
  return 0 === r(t, n, i);
}, n.gt = function(t, n) {
  return r(t, n, !0) > 0;
}, n.gte = function(t, n) {
  return r(t, n, !0) >= 0;
}, n.lt = function(t, n) {
  return r(t, n, !0) < 0;
}, n.lte = function(t, n) {
  return r(t, n, !0) <= 0;
}, n.prototype = {
  eq: function(t) {
    return n.eq(this._version, t);
  },
  gt: function(t) {
    return n.gt(this._version, t);
  },
  gte: function(t) {
    return n.gte(this._version, t);
  },
  lt: function(t) {
    return n.lt(this._version, t);
  },
  lte: function(t) {
    return n.lte(this._version, t);
  },
  valueOf: function() {
    return parseFloat(this._version.split(t).slice(0, 2).join(t), 10);
  },
  toString: function(n) {
    return void 0 === n ? this._version : this._version.split(t).slice(0, n).join(t);
  }
}, module.exports = n;

},{}]},{},[167])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhZ2VudC9BUEkvaW5jbHVkZS50cyIsImFnZW50L0FQSS9saXN0LnRzIiwiYWdlbnQvQVBJL3RleHQudHMiLCJhZ2VudC9iYXNlL2Jhc2UudHMiLCJhZ2VudC9iYXNlL2JyZWFrZXIudHMiLCJhZ2VudC9iYXNlL2VudW0udHMiLCJhZ2VudC9iYXNlL2V4dGVuZHMudHMiLCJhZ2VudC9iYXNlL2dsb2JsZS50cyIsImFnZW50L2Jhc2UvaW5jbHVkZS50cyIsImFnZW50L2Jhc2UvaW5mby50cyIsImFnZW50L2Jhc2UvdmFsdWVSZXNvbHZlLnRzIiwiYWdlbnQvYnJpZGdlL2V4cGFuZC9pbmNsdWRlLnRzIiwiYWdlbnQvYnJpZGdlL2V4cGFuZC9wYWNrZXIudHMiLCJhZ2VudC9icmlkZ2UvZml4L0lsMmNwcEMudHMiLCJhZ2VudC9icmlkZ2UvZml4L2FwaUZpeC50cyIsImFnZW50L2JyaWRnZS9maXgvZmFrZUxpc3QudHMiLCJhZ2VudC9icmlkZ2UvZml4L2Z1bmN0aW9ucy50cyIsImFnZW50L2JyaWRnZS9maXgvaWwyY3BwTS50cyIsImFnZW50L2JyaWRnZS9maXgvaW5jbHVkZS50cyIsImFnZW50L2JyaWRnZS9maXgvcGFyc2VGaWVsZHMudHMiLCJhZ2VudC9icmlkZ2UvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9hcGlFeHRlbmRzL2FwaUV4dGVuZHMudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL1BvaW50ZXJFdmVudERhdGEvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0Fic3RyYWN0RXZlbnREYXRhL0Jhc2VFdmVudERhdGEvUG9pbnRlckV2ZW50RGF0YS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL1BvaW50ZXJFdmVudERhdGEvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0Fic3RyYWN0RXZlbnREYXRhL0Jhc2VFdmVudERhdGEvUG9pbnRlckV2ZW50RGF0YS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0Fic3RyYWN0RXZlbnREYXRhL0Jhc2VFdmVudERhdGEvUG9pbnRlckV2ZW50RGF0YS9pbnRlcmZhY2UudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvQmFzZUV2ZW50RGF0YS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvQmFzZUV2ZW50RGF0YS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BYnN0cmFjdEV2ZW50RGF0YS9CYXNlRXZlbnREYXRhL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvQmFzZUV2ZW50RGF0YS9pbnRlcmZhY2UudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0Fic3RyYWN0RXZlbnREYXRhL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0Fic3RyYWN0RXZlbnREYXRhL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovQWJzdHJhY3RFdmVudERhdGEvaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0FwcGxpY2F0aW9uL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BcHBsaWNhdGlvbi9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9BcHBsaWNhdGlvbi9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0RlYnVnL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9EZWJ1Zy9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovRGVidWcvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9EZWxlZ2F0ZS9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovRGVsZWdhdGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovRGVsZWdhdGUvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9HVUkvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9JbnB1dC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0ludm9rYWJsZUNhbGxMaXN0L2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9JbnZva2FibGVDYWxsTGlzdC9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9JbnZva2FibGVDYWxsTGlzdC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL0xvZ2dlci9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovTG9nZ2VyL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovTW9kdWxlL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9Nb2R1bGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovTW9kdWxlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0Fzc2V0QnVuZGxlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0F2YXRhci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvQW5pbWF0aW9uL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9BbmltYXRvci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvQXVkaW9Tb3Vyc2UvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL0NhbWVyYS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTGlnaHQvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvU2VsZWN0YWJsZS9CdXR0b24vYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9TZWxlY3RhYmxlL0J1dHRvbi9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL01vbm9CZWhhdmlvdXIvU2VsZWN0YWJsZS9CdXR0b24vZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9TZWxlY3RhYmxlL0J1dHRvbi9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9TZWxlY3RhYmxlL0J1dHRvbi9pbnRlcmZhY2UudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL1NlbGVjdGFibGUvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9TZWxlY3RhYmxlL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9TZWxlY3RhYmxlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL1NlbGVjdGFibGUvaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQmVoYXZpb3IvTW9ub0JlaGF2aW91ci9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9Nb25vQmVoYXZpb3VyL2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L0JlaGF2aW9yL05ldHdvcmtWaWV3L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9CZWhhdmlvci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQ29sbGlkZXIvQ2hhcmFjdGVyQ29udHJvbGxlci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvQ29sbGlkZXIvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1BhcnRpY2xlU3lzdGVtL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9SZW5kZXJlci9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvUmlnaWRib2R5L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0NvbXBvbmVudC9UcmFuc2Zvcm0vYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvVHJhbnNmb3JtL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvVHJhbnNmb3JtL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L1RyYW5zZm9ybS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvVHJhbnNmb3JtL2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9Db21wb25lbnQvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvQ29tcG9uZW50L2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvR2FtZU9iamVjdC9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0dhbWVPYmplY3QvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0dhbWVPYmplY3QvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9HYW1lT2JqZWN0L2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L0dhbWVPYmplY3QvaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9NYXRlcmlhbC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9NZXNoL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L01vbnRpb24vaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9PYmplY3QvU2hhZGVyL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L1Nwcml0ZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovT2JqZWN0L2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL09iamVjdC9pbnRlcmZhY2UudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUGh5c2ljcy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1BsYXllclByZWZzL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9QbGF5ZXJQcmVmcy9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9QbGF5ZXJQcmVmcy9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUGxheWVyUHJlZnMvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9QbGF5ZXJQcmVmcy9pbnRlcmZhY2UudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzQVBJL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SZXNvdXJjZXNBUEkvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzQVBJL2V4cG9ydC50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SZXNvdXJjZXNBUEkvaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SZXNvdXJjZXNBUEkvaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1Jlc291cmNlc1JlcXVlc3QvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1Jlc291cmNlc1JlcXVlc3QvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzUmVxdWVzdC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1Jlc291cmNlcy9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUmVzb3VyY2VzL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUnVudGltZVR5cGVIYW5kbGUvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1J1bnRpbWVUeXBlSGFuZGxlL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1J1bnRpbWVUeXBlSGFuZGxlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovUnVudGltZVR5cGVIYW5kbGUvaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1J1bnRpbWVUeXBlL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9SdW50aW1lVHlwZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1J1bnRpbWVUeXBlL2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9TeXN0ZW1JbmZvL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9TeXN0ZW1JbmZvL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1N5c3RlbUluZm8vaW5jbHVkZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9UaW1lcy9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1R5cGUvYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1R5cGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVHlwZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1R5cGUvaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1VuaXR5RXZlbnRCYXNlL2FwaS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9Vbml0eUV2ZW50QmFzZS9jbGFzcy50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9Vbml0eUV2ZW50QmFzZS9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1ZhbHVlVHlwZS9Db2xvci9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL0NvbG9yL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1ZhbHVlVHlwZS9Db2xvci9leHBvcnQudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL0NvbG9yL2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9WYWx1ZVR5cGUvUXVhdGVybmlvbi9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL1F1YXRlcm5pb24vY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL1F1YXRlcm5pb24vZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1ZhbHVlVHlwZS9RdWF0ZXJuaW9uL2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9WYWx1ZVR5cGUvVmVjdG9yMy9hcGkudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL1ZlY3RvcjMvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL1ZlY3RvcjMvZXhwb3J0LnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL1ZhbHVlVHlwZS9WZWN0b3IzL2ludGVyZmFjZS50cyIsImFnZW50L2V4cGFuZC9UeXBlRXh0ZW5kcy9tc2NvcmxpYk9iai9WYWx1ZVR5cGUvY2xhc3MudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL2V4cG9ydHMudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovVmFsdWVUeXBlL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovYXBpLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL2NsYXNzLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL21zY29ybGliT2JqL2luY2x1ZGUudHMiLCJhZ2VudC9leHBhbmQvVHlwZUV4dGVuZHMvbXNjb3JsaWJPYmovaW50ZXJmYWNlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL3RocmVhZC9pbmNsdWRlLnRzIiwiYWdlbnQvZXhwYW5kL1R5cGVFeHRlbmRzL3RocmVhZC90aHJlYWQudHMiLCJhZ2VudC9leHBhbmQvaW5jbHVkZS50cyIsImFnZW50L2dsb2JlbC50cyIsImFnZW50L2luY2x1ZGUudHMiLCJhZ2VudC9pbmRleC50cyIsImFnZW50L2phdmEvY2xhc3NMb2FkZXIudHMiLCJhZ2VudC9qYXZhL2NsYXNzVXRpbHMudHMiLCJhZ2VudC9qYXZhL2NsaWNrLnRzIiwiYWdlbnQvamF2YS9pbmNsdWRlLnRzIiwiYWdlbnQvamF2YS9pbmZvLnRzIiwiYWdlbnQvamF2YS9sb2djYXQudHMiLCJhZ2VudC9qYXZhL290aGVycy50cyIsImFnZW50L3BsdWdpbi9pbmNsdWRlLnRzIiwiYWdlbnQvcGx1Z2luL3N0ZC9faW5jbHVkZS50cyIsImFnZW50L3BsdWdpbi9zdGQvc3RkX2RlcXVlLmpzIiwiYWdlbnQvcGx1Z2luL3N0ZC9zdGRfc3RyaW5nLmpzIiwiYWdlbnQvcGx1Z2luL3N0ZC9zdGRfdmVjdG9yLmpzIiwiYWdlbnQvdXRpbHMvYWxsb2MudHMiLCJhZ2VudC91dGlscy9jYWNoZS50cyIsImFnZW50L3V0aWxzL2NhbGxlci50cyIsImFnZW50L3V0aWxzL2NoZWNrUC50cyIsImFnZW50L3V0aWxzL2NvbW1vbi50cyIsImFnZW50L3V0aWxzL2NvbnRleHQudHMiLCJhZ2VudC91dGlscy9mb3JtYXJ0LnRzIiwiYWdlbnQvdXRpbHMvaW5jbHVkZS50cyIsImFnZW50L3V0aWxzL2xvZ2dlci50cyIsImFnZW50L3V0aWxzL21hdGgudHMiLCJhZ2VudC91dGlscy9yZWFkZXIudHMiLCJhZ2VudC91dGlscy9zdGFjay50cyIsImFnZW50L3V0aWxzL3N0ZFN0cmluZy50cyIsIm5vZGVfbW9kdWxlcy9kZWNvcmF0b3ItY2FjaGUtZ2V0dGVyL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmFzdGVzdC1sZXZlbnNodGVpbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL2FwaS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL2Jhc2UuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9maWx0ZXJpbmcuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3J1bnRpbWUuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9hc3NlbWJseS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2RvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvZmllbGQuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2djLWhhbmRsZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvZ2MuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL2ltYWdlLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9tZW1vcnktc25hcHNob3QuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL21ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy9wYXJhbWV0ZXIuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3BvaW50ZXIuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3JlZmVyZW5jZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbDJjcHAvc3RydWN0cy90aHJlYWQuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L2lsMmNwcC9zdHJ1Y3RzL3R5cGUtZW51bS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3N0cnVjdHMvdmFsdWUtdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3RyYWNlci5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvaWwyY3BwL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2ZyaWRhLWlsMmNwcC1icmlkZ2UvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvdXRpbHMvY29uc29sZS5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvdXRpbHMvbmF0aXZlLXN0cnVjdC5qcyIsIm5vZGVfbW9kdWxlcy9mcmlkYS1pbDJjcHAtYnJpZGdlL2Rpc3QvdXRpbHMvbmF0aXZlLXdhaXQuanMiLCJub2RlX21vZHVsZXMvZnJpZGEtaWwyY3BwLWJyaWRnZS9kaXN0L3V0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwibm9kZV9tb2R1bGVzL3ZlcnNpb25pbmcvdmVyc2lvbmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ1RBLE1BQUEsSUFBQSxRQUFBLDJCQUNBLElBQUEsUUFBQSwwQkFDQSxJQUFBLFFBQUEsbUJBQ0EsSUFBQSxRQUFBLFdBQ0EsSUFBQSxRQUFBOztBQUVBLE1BQU07RUFDRjtFQUdXO0lBQ1AsT0FBTyxP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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0FBLE1BQU0sVUFBcUIsT0FBTztFQUM5QixRQUFxRDtFQUNyRCxPQUE0QztFQUM1QyxVQUFVOzs7QUFHZCxNQUFNLFVBQWUsT0FBTztFQUN4QixRQUFxRCxLQUFLLE1BQU07RUFDaEUsT0FBNEMsS0FBSyxNQUFNO0VBQ3ZEO0lBQ0ksT0FBTyxJQUFJLE1BQW9CLEtBQUssT0FBTztNQUN2QyxLQUFLLENBQUMsR0FBUSxPQUNWLFFBQVEsSUFBSSxHQUFRLFdBQVcsS0FBSyxVQUNwQyxRQUFRLElBQUksR0FBUSxVQUFVLEtBQUs7TUFDNUIsUUFBUSxJQUFJLEdBQVE7Ozs7O0FBTTNDLFNBQVMsRUFBUztFQUVkLE9BRG1CLG1CQUFSLE1BQWtCLElBQU8sSUFBSSxLQUNqQyxJQUFJLEVBQU8sR0FBTSxPQUFPLElBQU07OztBQUd6QyxRQUFRLElBQUksWUFBWSxRQUFROzs7QUM5QmhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LG1DQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLDRCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLCtCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLHNDQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLDJCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLGdDQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLGtDQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLDhCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLG1DQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLDhCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLGdDQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLG1DQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLHdDQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLCtCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFPRCxFQUFBLEVBREMsRUFBQSxTLDRCQU9ELEVBQUEsRUFEQyxFQUFBLFM7QUFnQkksUUFBQSx5QkFGVCxPQUFPLElBQUksbUJBQW1COzs7QUMxUjlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0FBLE1BQUEsSUFBQSxRQUFBOztBQUVBLE1BQU07RUFHUztJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxzQkFBc0IsNkJBQTZCLEdBQUcsV0FBVyxFQUFDOztFQUkzRjtJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxzQkFBc0IsZ0JBQWdCLEdBQUcsV0FBVyxFQUFDOztFQUk5RTtJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxzQkFBc0IscUJBQXFCLEdBQUcsV0FBVyxFQUFDOztFQUluRjtJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxzQkFBc0IsZ0JBQWdCLEdBQUcsV0FBVyxFQUFDOztFQUk5RTtJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxzQkFBc0IsY0FBYyxHQUFHLFFBQVEsRUFBQzs7RUFJekU7SUFDUCxPQUFPLE9BQU8sSUFBSSxFQUFFLFlBQVksc0JBQXNCLDBCQUEwQixHQUFHLFFBQVEsRUFBQzs7RUFJckY7SUFDUCxPQUFPLE9BQU8sSUFBSSxFQUFFLFlBQVksc0JBQXNCLHFCQUFxQixHQUFHLFFBQVEsRUFBQzs7RUFJaEY7SUFDUCxPQUFPLE9BQU8sSUFBSSxFQUFFLFlBQVksc0JBQXNCLFlBQVksR0FBRyxXQUFXLEVBQUM7O0VBSTFFO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLHNCQUFzQixpQkFBaUIsR0FBRyxXQUFXLEVBQUM7O0VBSS9FO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLHNCQUFzQixxQkFBcUIsR0FBRyxXQUFXLEVBQUM7O0VBSW5GO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLHNCQUFzQixrQkFBa0IsR0FBRyxXQUFXLEVBQUM7O0VBSWhGO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLHNCQUFzQiw0QkFBNEIsR0FBRyxXQUFXLEVBQUM7O0VBSTFGO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLHNCQUFzQixjQUFjLEdBQUcsV0FBVyxFQUFDOzs7O0FBN0R2RixFQUFBLEVBREMsRUFBQSxTLHdDQU1ELEVBQUEsRUFEQyxFQUFBLFM7QUFNRCxFQUFBLEVBREMsRUFBQSxTLGdDQU1ELEVBQUEsRUFEQyxFQUFBLFM7QUFNRCxFQUFBLEVBREMsRUFBQSxTLHlCQU1ELEVBQUEsRUFEQyxFQUFBLFM7QUFNRCxFQUFBLEVBREMsRUFBQSxTLGdDQU1ELEVBQUEsRUFEQyxFQUFBLFM7QUFNRCxFQUFBLEVBREMsRUFBQSxTLDRCQU1ELEVBQUEsRUFEQyxFQUFBLFM7QUFNRCxFQUFBLEVBREMsRUFBQSxTLDZCQU1ELEVBQUEsRUFEQyxFQUFBLFM7QUFNRCxFQUFBLEVBREMsRUFBQSxTLHlCQVlMLFNBQVMsSUFBSSxjQUFjOzs7QUM3RTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlDQSxNQUFBLElBQUEsUUFBQSxhQUNBLElBQUEsUUFBQTs7QUFFQSxNQUFNLFVBQWtCLEVBQUE7RUFDcEI7RUFDQTtFQUNBO0VBQ0E7RUFFQSxZQUFZO0lBQ1IsTUFBTSxJQUNOLEtBQUssSUFBSSxFQUFLLFVBQ2QsS0FBSyxJQUFJLEVBQUssSUFBSSxHQUFHLFVBQ3JCLEtBQUssSUFBSSxFQUFLLElBQUksSUFBSTtJQUN0QixLQUFLLElBQUksRUFBSyxJQUFJLElBQUk7O0VBRzFCLE9BQU8sR0FBVyxHQUFXO0lBQ3pCLE9BQU8sSUFBSSxFQUFVLEVBQUEsU0FBUyxRQUFRLEtBQUssUUFBUSxHQUFHLEdBQUc7O0VBRTdELE9BQU8sR0FBVyxHQUFXLEdBQVc7SUFDcEMsT0FBTyxJQUFJLEVBQVUsRUFBQSxTQUFTLFFBQVEsS0FBSyxRQUFRLEdBQUcsR0FBRyxHQUFHOztFQUVoRSxXQUFXO0lBQ1AsT0FBTyxFQUFBLFNBQVMsWUFBWSxLQUFLLFFBQVE7O0VBRTdDLGFBQWE7SUFDVCxPQUFPLEVBQUEsU0FBUyxjQUFjLEtBQUssUUFBUSxFQUFNOztFQUVyRDtJQUNJLE9BQU8sRUFBQSxTQUFTLGFBQWEsS0FBSzs7RUFFdEM7SUFDSSxPQUFPLFFBQVEsRUFBQSxTQUFTLFVBQVUsS0FBSzs7RUFFM0MsNkJBQTZCLEdBQWdCO0lBQ3pDLE9BQU8sUUFBUSxFQUFBLFNBQVMsOEJBQThCLEtBQUssUUFBUSxHQUFROzs7O0FBWTFFLFFBQUEsZUFGVCxPQUFPLFFBQVE7OztBQzlDZjtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQ0ZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDTEEsTUFBQSxJQUFBLFFBQUE7O0FBRUEsTUFBTTtFQUVTO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLGlCQUFpQixTQUFTLEdBQUcsV0FBVyxFQUFDOztFQUlsRTtJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxpQkFBaUIsWUFBWSxHQUFHLFdBQVcsRUFBQzs7RUFJckU7SUFDUCxPQUFPLE9BQU8sSUFBSSxFQUFFLFlBQVksaUJBQWlCLFdBQVcsR0FBRyxXQUFXLEVBQUM7O0VBSXBFO0lBQ1AsT0FBTyxPQUFPLElBQUksRUFBRSxZQUFZLGlCQUFpQixZQUFZLEdBQUcsV0FBVyxFQUFDOztFQUlyRTtJQUNQLE9BQU8sT0FBTyxJQUFJLEVBQUUsWUFBWSxpQkFBaUIsZUFBZSxHQUFHLFdBQVcsRUFBQzs7RUFLeEU7SUFDUCxPQUFPLE9BQU8sSUFBSSxFQUFFLFlBQVksaUJBQWlCLFVBQVUsR0FBRyxXQUFXLEVBQUMsV0FBVzs7RUFJOUU7SUFDUCxPQUFPLE9BQU8sSUFBSSxFQUFFLFlBQVksaUJBQWlCLFVBQVUsR0FBRyxXQUFXLEVBQUMsV0FBVyxXQUFXOzs7O0FBaENwRyxFQUFBLEVBREMsRUFBQSxTLHFCQU1ELEVBQUEsRUFEQyxFQUFBLFMsdUJBTUQsRUFBQSxFQURDLEVBQUEsUztBQU1ELEVBQUEsRUFEQyxFQUFBLFMsdUJBTUQsRUFBQSxFQURDLEVBQUEsUywwQkFPRCxFQUFBLEVBREMsRUFBQSxTO0FBTUQsRUFBQSxFQURDLEVBQUEsUyx1QkFpQkwsUUFBUSxJQUFJLFlBQVksWUFBWTtBQUNwQyxRQUFRLElBQUksVUFBVSxPQUFPLFdBRTdCLFNBQVMsSUFBSSxjQUFjOzs7QUN2RDNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0lDaENBLFFBQUEsVUFDQSxRQUFBLFlBQ0EsUUFBQSxnQkFFQSxRQUFBO0FBQ0EsUUFBQSxrQkFDQSxRQUFBLHFCQUNBLFFBQUE7QUFDQSxRQUFBLHVCQUNBLFFBQUEscUJBQ0EsUUFBQTtBQUNBLFFBQUEseUJBQ0EsUUFBQSwwQkFDQSxRQUFBO0FBQ0EsUUFBQSwyQkFDQSxRQUFBLCtCQUNBLFFBQUE7QUFDQSxRQUFBLG1CQUNBLFFBQUEsMEJBQ0EsUUFBQTtBQUNBLFFBQUEsZ0NBQ0EsUUFBQSxvQkFDQSxRQUFBO0FBQ0EsUUFBQSx3QkFDQSxRQUFBLDZCQUNBLFFBQUE7OztBQ3pCQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7Ozs7SUNGQSxRQUFBLHdCQUVBLFFBQUEsa0JBQ0EsUUFBQTtBQUNBLFFBQUEsbUJBQ0EsUUFBQSxxQkFDQSxRQUFBO0FBQ0EsUUFBQSxvQkFDQSxRQUFBLHFCQUVBLFFBQUE7Ozs7Ozs7SUNWQSxRQUFBLGNBTUEsV0FBVyxPQUFPOzs7QUNObEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiJ9
