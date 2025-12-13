'use client'

import { useState } from 'react'
import { useCompletion } from 'ai/react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [repoData, setRepoData] = useState<any>(null)

  const { completion, complete, isLoading: isGenerating } = useCompletion({
    api: '/api/generate-story',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Fetch GitHub data
      const res = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!res.ok) {
        throw new Error('Failed to fetch repository')
      }

      const data = await res.json()
      setRepoData(data)
      setLoading(false)

      // Generate story
      await complete('', {
        body: { repoData: data }
      })
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {!repoData && !loading && !isGenerating && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-5xl font-bold mb-4">Gitory</h1>
            <p className="text-gray-600 mb-8">Transform GitHub repos into stories</p>

            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter GitHub repository URL..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading || isGenerating}
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Fetching repository data...</p>
            </div>
          </div>
        )}

        {repoData && (isGenerating || completion) && (
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-3xl font-bold">{repoData.fullName}</h2>
                <p className="text-gray-600">{repoData.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-500">
                  <span>⭐ {repoData.stars}</span>
                  <span>👥 {repoData.contributors.length} contributors</span>
                  <span>{repoData.language}</span>
                </div>
              </div>

              {isGenerating && !completion && (
                <div className="flex items-center gap-2">
                  <div className="animate-pulse">Generating story...</div>
                </div>
              )}

              {completion && (
                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" />
                      )
                    }}
                  >
                    {completion}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Contributors Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-8 bg-white border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-4">Characters</h3>
                <div className="space-y-3">
                  {repoData.contributors.map((contributor: any) => (
                    <a
                      key={contributor.login}
                      href={`https://github.com/${contributor.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition"
                    >
                      <img
                        src={contributor.avatar}
                        alt={contributor.login}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{contributor.login}</div>
                        <div className="text-xs text-gray-500">{contributor.contributions} commits</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
