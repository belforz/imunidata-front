type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface Route {
  id: string
  method: HttpMethod
  path: string
  label: string
  description: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const METHOD_STYLES: Record<HttpMethod, {
  badge: string
  bg: string
  border: string
  text: string
}> = {
  GET:    { badge: 'bg-green-700',   bg: 'bg-green-50',   border: 'border-green-300',  text: 'text-green-800'  },
  POST:   { badge: 'bg-blue-800',    bg: 'bg-blue-50',    border: 'border-blue-300',   text: 'text-blue-800'   },
  PUT:    { badge: 'bg-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-300',  text: 'text-amber-800'  },
  DELETE: { badge: 'bg-red-600',     bg: 'bg-red-50',     border: 'border-red-300',    text: 'text-red-800'    },
  PATCH:  { badge: 'bg-purple-700',  bg: 'bg-purple-50',  border: 'border-purple-300', text: 'text-purple-800' },
}

export function routers(routes: Route[]) {
  return (
    <div className="space-y-4">
      {routes.map(route => {
        const styles = METHOD_STYLES[route.method]
        return (
          <div key={route.id} className={`p-4 rounded-lg border ${styles.border} ${styles.bg}`}>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${styles.badge} ${styles.text}`}>
                {route.method}
              </span>
              <h3 className={`text-lg font-medium ${styles.text}`}>
                {route.path}
              </h3>
            </div>
            <p className={`mt-2 text-sm ${styles.text}`}>
              {route.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}