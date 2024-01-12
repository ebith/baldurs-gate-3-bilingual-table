# バルダーズ・ゲート3 対訳表
英語の情報をググったり読んだりするためのやつ。

## データベース生成メモ
[z Baldur's Gate 3 - Page 277 - FearLess Cheat Engine](https://fearlessrevolution.com/viewtopic.php?p=311868#p311868)

1. [BG3-Modders-Multitool](https://github.com/ShinyHobo/BG3-Modders-Multitool)のConfigurationからbg3.exeの場所を設定する
2. Utilities => Game File Operations => Unpack Game FilesからEnglish.pak, Gustav.pak, Japanese.pak, Shared.pak, Patch*_Hotfix*.pakを展開する
3. Utilities => Game File Operations => Decompress UnpackedData Filesする
4. `python -m pip install -r requirements.txt`
5. `python bg3data_1.2.py`

```diff
--- bg3data_1.2.py.orig	2023-12-19 16:06:52.000000000 +0900
+++ bg3data_1.2.py	2024-01-12 22:03:48.878900600 +0900
@@ -30,14 +30,16 @@
 TRANSLATION_LANGUAGES = ["English"]

 LOGGING_LEVEL = logging.INFO  # possible values are: 'DEBUG,INFO,WARNING,ERROR,CRITICAL'
-UNPACKED_DATA_FOLDER = Path('G:/BG3/Tools/bg3-modders-multitool/UnpackedData')
-OUTPUT_FOLDER = Path('G:/Dev/BG3/!Output/bg3data')
+UNPACKED_DATA_FOLDER = Path('D:/downloads/BaldursGate3/bg3-modders-multitool/UnpackedData')
+OUTPUT_FOLDER = Path('D:/downloads/BaldursGate3/!Output')

 # Sorted list of folders to process (the order matters!)
 ROOT_FOLDERS_L1: List[str] = [  # List of first level root folders directory
     "Shared",
     "Gustav",
     "Patch5_Hotfix2",
+    "Patch5_Hotfix4",
+    "Patch5_Hotfix5",
 ]
 ROOT_FOLDERS_L2: List[str] = [  # List of second level root folders directory
     "Public",
@@ -564,6 +566,120 @@
         bg3lib.save_data_dict_to_sqlite(data_dict, output_folder / "SQLite files" / "bg3data-raw.sqlite3", "Flags", columns_order)
     return data_dict

+@Timer(logger=logging.info, initial_text=True)
+def process_localization_folders(output_folder: Path) -> Dict_of_Dict:
+
+    logging.info("LOCALIZATION Folders - Start processing")
+
+    data_dict : Dict_of_Dict = {}
+
+    all_folders = [
+        UNPACKED_DATA_FOLDER / folder_l1 / folder_l2
+        for folder_l1 in ROOT_FOLDERS_L1
+        for folder_l2 in ROOT_FOLDERS_L2
+    ]
+
+    # List to hold all directories ending with 'Tags'
+    tag_folders = [d for folder in all_folders for d in folder.rglob('*/') if d.is_dir() and d.name == "Localization"]
+    for tag_folder in tag_folders:
+        logging.debug(f"LOCALIZATION - Processing '{tag_folder.relative_to(UNPACKED_DATA_FOLDER)}'")
+        bg3lib.process_lsx_files(UNPACKED_DATA_FOLDER, tag_folder, "TranslatedStringKey", "Content", data_dict)
+        #, post_process_tags_and_flags)
+    # --- Moving important columns in front of the records
+    columns_order = ["UUID", "Content"]
+
+    for column in ["Content"]:
+        for language in TRANSLATION_LANGUAGES:
+            columns_order.append(f"{column}{language}")
+
+    data_dict =  bg3lib.sort_data_dict_columns(data_dict, columns_order)
+
+    if Option_save_to_json_dict:
+        bg3lib.save_to_json_dict(data_dict, output_folder / "Json files (dict)" / "Localization_dict.json")
+    if Option_save_to_json_array:
+        bg3lib.save_to_json_array(data_dict, output_folder / "Json files (array)" / "Localization_array.json")
+    if Option_save_to_excel:
+        bg3lib.save_to_excel_with_xlsxwriter_helper(data_dict, output_folder / "Excel Files" / "Localization.xlsx", "Localization", columns_order)
+    if Option_save_to_sqlite:
+        bg3lib.save_data_dict_to_sqlite(data_dict, output_folder / "SQLite files" / "bg3data-localization.sqlite3", "Localization", columns_order)
+    return data_dict
+
+@Timer(logger=logging.info, initial_text=True)
+def process_journal_folders(output_folder: Path) -> Dict_of_Dict:
+
+    logging.info("JOURNAL Folders - Start processing")
+
+    data_dict : Dict_of_Dict = {}
+
+    all_folders = [
+        UNPACKED_DATA_FOLDER / folder_l1 / folder_l2
+        for folder_l1 in ROOT_FOLDERS_L1
+        for folder_l2 in ROOT_FOLDERS_L2
+    ]
+
+    # List to hold all directories ending with 'Tags'
+    tag_folders = [d for folder in all_folders for d in folder.rglob('*/') if d.is_dir() and d.name == "Journal"]
+    for tag_folder in tag_folders:
+        logging.debug(f"JOURNAL - Processing '{tag_folder.relative_to(UNPACKED_DATA_FOLDER)}'")
+        bg3lib.process_lsx_files(UNPACKED_DATA_FOLDER, tag_folder, "Quest", "QuestGuid", data_dict)
+        #, post_process_tags_and_flags)
+    # --- Moving important columns in front of the records
+    columns_order = ["QuestGuid", "QuestTitle"]
+
+    for column in ["QuestTitle"]:
+        for language in TRANSLATION_LANGUAGES:
+            columns_order.append(f"{column}{language}")
+
+    data_dict =  bg3lib.sort_data_dict_columns(data_dict, columns_order)
+
+    if Option_save_to_json_dict:
+        bg3lib.save_to_json_dict(data_dict, output_folder / "Json files (dict)" / "Journal_dict.json")
+    if Option_save_to_json_array:
+        bg3lib.save_to_json_array(data_dict, output_folder / "Json files (array)" / "Journal_array.json")
+    if Option_save_to_excel:
+        bg3lib.save_to_excel_with_xlsxwriter_helper(data_dict, output_folder / "Excel Files" / "Journal.xlsx", "Journal", columns_order)
+    if Option_save_to_sqlite:
+        bg3lib.save_data_dict_to_sqlite(data_dict, output_folder / "SQLite files" / "bg3data-journal.sqlite3", "Journal", columns_order)
+    return data_dict
+
+@Timer(logger=logging.info, initial_text=True)
+def process_feats_folders(output_folder: Path) -> Dict_of_Dict:
+
+    logging.info("FEATS Folders - Start processing")
+
+    data_dict : Dict_of_Dict = {}
+
+    all_folders = [
+        UNPACKED_DATA_FOLDER / folder_l1 / folder_l2
+        for folder_l1 in ROOT_FOLDERS_L1
+        for folder_l2 in ROOT_FOLDERS_L2
+    ]
+
+    # List to hold all directories ending with 'Tags'
+    tag_folders = [d for folder in all_folders for d in folder.rglob('*/') if d.is_dir() and d.name == "Feats"]
+    for tag_folder in tag_folders:
+        logging.debug(f"Feats - Processing '{tag_folder.relative_to(UNPACKED_DATA_FOLDER)}'")
+        bg3lib.process_lsx_files(UNPACKED_DATA_FOLDER, tag_folder, "FeatDescription", "UUID", data_dict)
+        #, post_process_tags_and_flags)
+    # --- Moving important columns in front of the records
+    columns_order = ["UUID", "DisplayName", "Description"]
+
+    for column in ["DisplayName", "Dicription"]:
+        for language in TRANSLATION_LANGUAGES:
+            columns_order.append(f"{column}{language}")
+
+    data_dict =  bg3lib.sort_data_dict_columns(data_dict, columns_order)
+
+    if Option_save_to_json_dict:
+        bg3lib.save_to_json_dict(data_dict, output_folder / "Json files (dict)" / "Feats_dict.json")
+    if Option_save_to_json_array:
+        bg3lib.save_to_json_array(data_dict, output_folder / "Json files (array)" / "Feats_array.json")
+    if Option_save_to_excel:
+        bg3lib.save_to_excel_with_xlsxwriter_helper(data_dict, output_folder / "Excel Files" / "Feats.xlsx", "Feats", columns_order)
+    if Option_save_to_sqlite:
+        bg3lib.save_data_dict_to_sqlite(data_dict, output_folder / "SQLite files" / "bg3data-feats.sqlite3", "Feats", columns_order)
+    return data_dict
+
 def load_config(config_file: Path):
     try:
         # Load the configuration file
@@ -631,6 +747,12 @@
     ## Tags
     process_flags_folders(output_folder_stamped)

+    process_localization_folders(output_folder_stamped)
+
+    process_journal_folders(output_folder_stamped)
+
+    process_feats_folders(output_folder_stamped)
+
     ## ## ## ##
     logging.info("ALL DONE!")
 def profile_main():
```

```diff
--- requirements.txt.orig	2023-12-19 16:06:52.000000000 +0900
+++ requirements.txt	2024-01-07 23:53:14.000000000 +0900
@@ -1,9 +1,9 @@
 lxml
 pandas
 pathlib
-logging
 datetime
 typing
 ujson
 openpyxl
 xlsxwriter
+pyarrow
```
