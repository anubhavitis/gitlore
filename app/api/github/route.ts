import { NextResponse } from 'next/server'
import { fetchRepoData } from '@/lib/github'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      )
    }

    const repoData = await fetchRepoData(url)
    return NextResponse.json(repoData)
  } catch (error) {
    console.error('GitHub API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repository data' },
      { status: 500 }
    )
  }
}
