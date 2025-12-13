import { useMutation } from '@tanstack/react-query'
import type { GitHubRepo } from '@/types'

export function useGithubRepo() {
  return useMutation({
    mutationFn: async (url: string) => {
      const res = await fetch('/api/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Failed to fetch repository' }))
        throw new Error(error.error || 'Failed to fetch repository')
      }

      return res.json() as Promise<GitHubRepo>
    }
  })
}
