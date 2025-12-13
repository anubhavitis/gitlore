import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { loadPrompt } from '@/lib/prompts'
import type { GitHubRepo } from '@/types'

export async function POST(req: Request) {
  try {
    const { repoData }: { repoData: GitHubRepo } = await req.json()

    const systemPrompt = loadPrompt('system')
    const storyPrompt = loadPrompt('story-narrator', {
      repoName: repoData.fullName,
      description: repoData.description,
      createdAt: repoData.createdAt,
      stars: repoData.stars,
      language: repoData.language,
      contributors: repoData.contributors.map(c => `[${c.login}](https://github.com/${c.login}) (${c.contributions} contributions)`).join(', '),
      commits: repoData.commits.slice(0, 10).map(c => `${c.date}: ${c.message} by ${c.author}`).join('\n')
    })

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      prompt: storyPrompt,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Story generation error:', error)
    return new Response('Failed to generate story', { status: 500 })
  }
}
