# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


# -*- coding: utf-8 -*-

import os


# 遍历文件夹删除文件
def traversing_dir(rootDir):
    # 遍历根目录
    for root, dirs, files in os.walk(rootDir):
        for file in files:
            # 文件后缀名
            extFile = os.path.splitext(file)[1]
            if extFile == ".import":
                os.remove(os.path.join(root, file))  # 删除文件
        for dir in dirs:
            # 递归调用自身
            traversing_dir(dir)


if __name__ == '__main__':
    path = "F:\steam\mod3.5\\"
    traversing_dir(path)

def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press Ctrl+F8 to toggle the breakpoint.

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
