import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs/promises'

const options = { ignoreDeclaration: true, ignoreAttributes: false }
const jaXml = await fs.readFile('./japanese.xml')
const enXml = await fs.readFile('./english.xml')

console.log(`ETA: ${new Date(Date.now() + 10 * 60 * 1000)}`)

const parser = new XMLParser(options)
const ja = parser.parse(jaXml).contentList.content
const en = parser.parse(enXml).contentList.content

const table = [
  ...new Map(
    ja
      .flatMap((e1) => {
        if (e1['#text'].length > 30 || /(%%% ?Empty|%%% ?Deprecated|。|、|<i>|<b>)/i.test(e1['#text'])) {
          return []
        } else {
          const hit = en.find((e2) => {
            return e1['@_contentuid'] === e2['@_contentuid']
          })
          if (hit) {
            return {
              en: hit['#text'],
              ja: e1['#text'],
            }
          } else {
            return []
          }
        }
      })
      .map((e) => {
        return [e.ja, e]
      }),
  ).values(),
]

await fs.writeFile('./src/table.json', JSON.stringify(table))
