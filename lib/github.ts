import { Octokit } from '@octokit/rest'
import type { GitHubRepo } from '@/types'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

export async function fetchRepoData(url: string): Promise<GitHubRepo> {
  // Parse GitHub URL
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/)
  if (!match) {
    throw new Error('Invalid GitHub URL')
  }

  const [, owner, repo] = match
  const repoName = repo.replace(/\.git$/, '')

  // Fetch repo data
  const [repoInfo, commits, contributors] = await Promise.all([
    octokit.repos.get({ owner, repo: repoName }),
    octokit.repos.listCommits({ owner, repo: repoName, per_page: 50 }),
    octokit.repos.listContributors({ owner, repo: repoName, per_page: 10 })
  ])

  return {
    name: repoInfo.data.name,
    fullName: repoInfo.data.full_name,
    description: repoInfo.data.description || '',
    stars: repoInfo.data.stargazers_count,
    language: repoInfo.data.language || 'Unknown',
    createdAt: repoInfo.data.created_at,
    contributors: contributors.data.map(c => ({
      login: c.login || '',
      contributions: c.contributions,
      avatar: c.avatar_url || ''
    })),
    commits: commits.data.map(c => ({
      sha: c.sha,
      message: c.commit.message,
      author: c.commit.author?.name || 'Unknown',
      date: c.commit.author?.date || ''
    }))
  }
}
