export interface GitHubRepo {
  name: string
  fullName: string
  description: string
  stars: number
  language: string
  contributors: Contributor[]
  commits: Commit[]
  createdAt: string
}

export interface Contributor {
  login: string
  contributions: number
  avatar: string
}

export interface Commit {
  sha: string
  message: string
  author: string
  date: string
}
