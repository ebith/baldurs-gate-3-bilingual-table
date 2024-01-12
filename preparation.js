import Database from 'better-sqlite3'
import fs from 'node:fs/promises'

const list = new Map()

const db_go = new Database('bg3data-gameobjects.sqlite3', { readonly: true, fileMustExist: true })
for (const row of db_go
  .prepare('SELECT DisplayNameEnglish, DisplayNameJapanese FROM GameObjects WHERE DisplayNameJapanese IS NOT NULL')
  .iterate()) {
  list.set(row.DisplayNameEnglish, [row.DisplayNameEnglish, row.DisplayNameJapanese])
}
db_go.close()

const db_raw = new Database('bg3data-raw.sqlite3', { readonly: true, fileMustExist: true })
const tables = ['Armors', 'Interrupts', 'Objects', 'Passives', 'Spells', 'Statuses', 'Tags', 'Weapons']
for (const table of tables) {
  for (const row of db_raw
    .prepare('SELECT DisplayNameEnglish, DisplayNameJapanese FROM ' + table + ' WHERE DisplayNameJapanese IS NOT NULL')
    .iterate()) {
    list.set(row.DisplayNameEnglish, [row.DisplayNameEnglish, row.DisplayNameJapanese])
  }
}
db_raw.close()

const db_loca = new Database('bg3data-localization.sqlite3', { readonly: true, fileMustExist: true })
for (const row of db_loca
  .prepare(
    'SELECT ContentEnglish, ContentJapanese FROM Localization WHERE ContentJapanese IS NOT NULL AND Rootfile LIKE ? OR Rootfile LIKE ?',
  )
  .iterate('%_Subregions.lsf.lsx', 'Waypointshrines%')) {
  list.set(row.ContentEnglish, [row.ContentEnglish, row.ContentJapanese])
}
db_loca.close()

const db_journal = new Database('bg3data-journal.sqlite3', { readonly: true, fileMustExist: true })
for (const row of db_journal
  .prepare('SELECT QuestTitleEnglish, QuestTitleJapanese FROM Journal WHERE QuestTitleJapanese IS NOT NULL')
  .iterate()) {
  list.set(row.QuestTitleEnglish, [row.QuestTitleEnglish, row.QuestTitleJapanese])
}
db_journal.close()

const db_feats = new Database('bg3data-feats.sqlite3', { readonly: true, fileMustExist: true })
for (const row of db_feats
  .prepare('SELECT DisplayNameEnglish, DisplayNameJapanese FROM Feats WHERE DisplayNameJapanese IS NOT NULL')
  .iterate()) {
  list.set(row.DisplayNameEnglish, [row.DisplayNameEnglish, row.DisplayNameJapanese])
}
db_feats.close()

const tests = [
  'Reithwin Town',
  'Decrepit Village',
  'Emerald Grove',
  'Ravaged Beach',
  'The Amulet of Lost Voices',
  'Thermoarcanic Gloves',
  'Boots of Uninhibited Kushigo',
  'Barbarian',
  'Paladin',
  'Acid Splash',
  'Animal Friendship',
  'Aid',
  'Animate Dead',
  'Banishment',
  'Arcane Gate',
  'Mage Slayer',
  'Polearm Master',
  'Ability Improvement',
  'Ritual Caster',
  'A is for Azuth, and other Gods VI',
  "Scratch's Ball",
  'Gheris Hhune',
  'Entharl Danthelon',
  'Gerringothe Thorm',
  'Adamantine Backlash',
  'Cleansing Touch',
  'Grasp of the Forest',
  'Mental Interference',
  "Shapeshifter's Boon",
  'Weakened Constitution',
  'Avenge the Hag Survivors',
  'Destroy the Ancient Tome',
  'Feed the Mind Flayer',
  'Resolve the Abduction',
  "The Hellion's Heart",
]

for (const test of tests) {
  if (!list.has(test)) {
    console.log(`${test}: not found`)
  }
}

await fs.writeFile('./src/table.json', JSON.stringify([...list.values()]))
