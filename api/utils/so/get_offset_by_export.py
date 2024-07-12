import ctypes
from ctypes import CDLL


def load_so(path):
    return CDLL(path)


# lib = load_so('./libil2cpp.so')
# function_name = 'il2cpp_string_new' # 替换为目标函数的名称
# func_ptr = getattr(lib, function_name).value
# print("Function address:", hex(int(func_ptr)))


import ctypes

# 定义函数指针类型
# class Symbol(ctypes.Structure):
#     _fields_ = [("name", ctypes.c_char * 257), ("value", ctypes.POINTER(None))]
#
#
# # 加载.so文件
# lib = ctypes.CDLL("./libil2cpp.so")
#
# # 调用dladdr()函数获取符号表地址
# symbols = (Symbol * 10)()  # 创建足够大小的结构体数组
# num_symbols = lib._ZTINSt8ios_baseE + 1  # 这里假设需要获取std::ios_base的符号表
# result = lib.dladdr((ctypes.c_void_p).from_address(id(lib)), symbols[0].name, num_symbols)
# if result == -1:
#     print("无法获取符号表信息！")
# else:
#     for i in range(num_symbols):
#         symbol = symbols[i]
#         name = symbol.name[:-1].decode('utf-8')  # 去除字符串尾部的空字节
#         value = int(hex(int(symbol.value))) if symbol.value else None
#         print(f"名称: {name}, 值: {value}")

