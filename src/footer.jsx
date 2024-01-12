export function Footer() {
  return (
    <footer className="flex">
      <div className="w-3/5">バージョン: 2023/01/09 Hotfix #16</div>
      <div className="w-2/5 text-right">
        連絡先:{' '}
        <a href="https://github.com/ebith/baldurs-gate-3-bilingual-table" className="text-orange-600 hover:underline">
          GitHub
        </a>
        ,{' '}
        <a href="https://twitter.com/ebith" className="text-orange-600 hover:underline">
          Twitter
        </a>
      </div>
    </footer>
  )
}
