
game_list = []

with open("352.txt", "r+", encoding="utf-8") as file2:
    for line2 in file2.readlines():
        game_list.append("\"{}".format(line2.replace("\n", "\"")))
    file2.close()

print(len(game_list))
# print(game_list)

line_index = 0
times = 0
find_times = 0
new_lines = []

is_find = False

find_list = []

with open("GamePkg.java", "r+", encoding="utf-8") as file:
    for line in file.readlines():
        line_index += 1
        for game in game_list:
            if game in line:
                # print(line)
                line = line.replace("\";", ".unmanager.352\";")
                times += 1
                if game in find_list:
                    find_times += 1
                    # print(line_index, line)
                find_list.append(game)
        new_lines.append(line)
    file.close()

with open("GamePkg2.java", "w+", encoding="utf-8") as file3:
    for line in new_lines:
        file3.write(line)
    file3.close()

print('times=', times)
print('find_times=', find_times)
print('replace game num=', times - find_times)
