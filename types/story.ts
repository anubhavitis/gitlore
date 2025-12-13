export interface ReasoningStep {
  step: string
  content: string
}

export interface StreamChunk {
  type: 'reasoning' | 'story'
  content: string
  step?: string
}
