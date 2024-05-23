# バルダーズ・ゲート3 対訳表
英語の情報をググったり読んだりするためのやつ。

## データベース生成メモ
[z Baldur's Gate 3 - Page 277 - FearLess Cheat Engine](https://fearlessrevolution.com/viewtopic.php?p=311868#p311868)

1. [BG3-Modders-Multitool](https://github.com/ShinyHobo/BG3-Modders-Multitool)のConfigurationからbg3.exeの場所を設定する
2. Utilities => Game File Operations => Unpack Game FilesからEnglish.pak, Gustav.pak, Japanese.pak, Shared.pak, Patch*_Hotfix*.pakを展開する
3. Utilities => Game File Operations => Decompress UnpackedData Filesする
4. `patch bg3data_1.2.py patch/bg3data_1.2.py.patch &&  patch bg3data_config.json patch/bg3data_config.json.patch && patch bg3data_lib.py patch/bg3data_lib.py.patch && patch requirements.txt patch/requirements.txt.patch`
5. `python -m pip install -r requirements.txt`
6. `python bg3data_1.2.py`
