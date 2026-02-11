interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const getPages = (current: number, total: number) => {
    const delta = 1
    const range: (number | '...')[] = []

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i)
        }
    }

    const pages: (number | '...')[] = []
    let last: number | undefined

    for (const page of range) {
        if (last && (page as number) - last > 1) {
            pages.push('...')
        }
        pages.push(page)
        last = page as number
    }

    return pages
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3  px-2 py-1">
            {/* Context */}
            <p className="text-sm text-gray-500">
                Page <span className="font-medium text-gray-900">{currentPage}</span> of{' '}
                <span className="font-medium text-gray-900">{totalPages}</span>
            </p>

            {/* Controls */}
            <nav
                className="flex items-center gap-1 rounded-lg border bg-white p-1 shadow-sm"
                aria-label="Pagination"
            >
                {/* Prev */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1
            rounded-md px-3 py-1.5 text-sm text-gray-600
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    ← <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Pages */}
                {getPages(currentPage, totalPages).map((page, i) =>
                    page === '...' ? (
                        <span
                            key={`dots-${i}`}
                            className="px-2 text-gray-400 text-sm"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            aria-current={page === currentPage ? 'page' : undefined}
                            className={`rounded-md px-3 py-1.5 text-sm transition
                ${page === currentPage
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1
            rounded-md px-3 py-1.5 text-sm text-gray-600
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <span className="hidden sm:inline">Next</span> →
                </button>
            </nav>
        </div>
    )
}
