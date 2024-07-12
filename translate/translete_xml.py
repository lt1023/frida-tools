# encoding: utf-8
import json
from xml.etree import ElementTree as ET
from xml.etree.ElementTree import SubElement

# from translate import Translator
from googletrans import Translator
from googletrans.constants import DEFAULT_USER_AGENT

# 以下是将简单句子从英语翻译中文
# translator = Translator(to_lang="chinese")
# translator = Translator(from_lang="english", to_lang="chinese")
translator = Translator(service_urls=['translate.google.com'], user_agent=DEFAULT_USER_AGENT)

# ori_file_name = './translations_english-3991068f08308ba48aa865f1603a6f67-1.json'
# ori_file_name = './translations_english-3991068f08308ba48aa865f1603a6f67-1.txt'
# ori_file_name = './translations_korean-f672064339eed014683c3f1686345d10-1.json'
# ori_file_name = './translations_korean-f672064339eed014683c3f1686345d10-1.txt'
# ori_file_name = './jp.json'
# out_file_name = "out.json"
ori_file_name = './Help.xml'
out_file_name = "out.xml"


# with open(ori_file_name, 'r', encoding='utf8') as f:
#     file = open(out_file_name, "w", encoding='utf8')
#     file.write(f.read())
#     file.close()
#     f.close()


# locaData = None


def replace_translate(ori_text, dest_text):
    with open(out_file_name, 'r+', encoding='utf8') as fo:
        print('ori_text=', ori_text, ' dest_text=', dest_text)
        fo_datas = fo.read()
        index = fo_datas.rfind(ori_text)
        print(index)
        print(fo_datas[index])
        fo_datas_out = fo_datas[:index] + str.replace(fo_datas[index:], ori_text, dest_text)
        fo.seek(0)
        fo.write(fo_datas_out)
        fo.close()


'''
with open(ori_file_name, 'r', encoding='utf8') as f:
    data_ori = json.load(f)
    # print(type(data_ori))
    locaData = data_ori['items']  # ['locaData']
    # data = json.loads(m_Script)
    # locaData = data['locaData']
    # locaData_len = len(locaData)
    # print(locaData_len)
    print(locaData)
    for ori_text in locaData:
        localizedText = ori_text['value']
        # print(ori_text)
        print(localizedText)
        # translation = translator.translate(localizedText)
        try:
            translation = translator.translate(localizedText, dest='zh-cn').text
            print(translation)
            ori_text['value'] = translation
        except:
            pass

        # replace_translate(ori_text, translation)
        # break
    # print(locaData)
    with open(out_file_name, 'w', encoding='utf8') as out_f:
        json.dump(data_ori, out_f, ensure_ascii=False)
        out_f.close()
    f.close()
'''


def start_translate_xml():
    tree = ET.parse(ori_file_name)
    root = tree.getroot()
    key = 'Topic'
    # package = root.attrib[key]
    keys = root.findall(key)
    for key in keys:
        title = key.attrib['Title']
        if title:
            try:
                translation = translator.translate(title, dest='zh-cn').text
                key.attrib['Title'] = translation
                text = key.text
                if text:
                    translation_text = translator.translate(text, dest='zh-cn').text
                    key.text = translation_text
            except:
                pass
            print(key.attrib['Title'], ' = ', key.text)
    tree.write(out_file_name, 'UTF-8')


start_translate_xml()

# translation = translator.translate("Good night!")
# print(translation)

# 在任何两种语言之间，中文翻译成英文
# translator = Translator(from_lang="chinese", to_lang="english")
# translation = translator.translate("我想你")
# print(translation)
