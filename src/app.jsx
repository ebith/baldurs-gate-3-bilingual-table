import { Grid, html } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'
import { useEffect, useRef } from 'preact/hooks'
// eslint-disable-next-line no-unused-vars
import { Footer } from './footer'
import data from './table.json'

export function App() {
  return (
    <div className="container mx-auto">
      <Table />
      <Footer />
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function Table() {
  const wrapperRef = useRef(null)

  const grid = new Grid({
    columns: [
      {
        name: 'en',
        formatter: (cell) => {
          return html(
            `<a href="https://bg3.wiki/w/index.php?go=Go&search=${cell}" class="text-orange-600 hover:underline">${cell}</a`,
          )
        },
      },
      'ja',
    ],
    pagination: true,
    search: true,
    data,
  })

  useEffect(() => {
    grid.render(wrapperRef.current)
  })

  return <div ref={wrapperRef} />
}
