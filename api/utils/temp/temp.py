new_lines = []
with open("LiberationSans SDF-resources.assets-147902.json", "r+") as file:
    for line in file.readlines():
        print(line)
        new_lines.append(line)
        if '"m_AtlasIndex": 0' in line:
            new_lines.append(",        \"m_ClassDefinitionType\": 0\n")


with open("out2.json", "w+", encoding="utf-8") as file3:
    for line in new_lines:
        file3.write(line)
    file3.close()
