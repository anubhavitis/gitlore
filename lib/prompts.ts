import fs from 'fs'
import path from 'path'

export function loadPrompt(name: string, vars?: Record<string, any>): string {
  const filePath = path.join(process.cwd(), 'prompts', `${name}.md`)
  let prompt = fs.readFileSync(filePath, 'utf-8')

  if (vars) {
    Object.entries(vars).forEach(([key, value]) => {
      const replacement = typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
      prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), replacement)
    })
  }

  return prompt
}
