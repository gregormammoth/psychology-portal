interface TopPage {
  pageUrl: string
  pageTitle: string
  views: number
}

interface TopPagesTableProps {
  data: TopPage[]
  loading?: boolean
}

export default function TopPagesTable({ data, loading = false }: TopPagesTableProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
      <div className="flow-root">
        <ul className="-my-2 divide-y divide-gray-200">
          {data.map((page, index) => (
            <li key={page.pageUrl} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600 text-sm font-medium">
                    {index + 1}
                  </span>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900">{page.pageTitle}</p>
                  <p className="text-sm text-gray-500">{page.pageUrl}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {page.views} views
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 