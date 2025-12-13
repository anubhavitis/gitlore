# GitLore - Git Story Narrator

Transform GitHub repositories into engaging narratives.

## Setup

1. Create `.env.local` with your API keys:
```
OPENAI_API_KEY=your_openai_key
GITHUB_TOKEN=your_github_token
```

2. Run the development server:
```bash
bun dev
```

3. Open http://localhost:3000 and paste a GitHub URL

## Features

- Fetches GitHub repo data (commits, contributors)
- Streams AI-generated story with feature-driven structure
- Clean, minimal UI with wavy background
- Separate search and story pages
