# CDA

Storytelling about CDA throughout Thai history

## Deployment

We build as a static site

- Staging: https://electinth.github.io/cda/
- Production: Not deployed yet

## Tech stack

- [Svelte](https://svelte.dev) on [Sapper](https://sapper.svelte.dev) with TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [ThreeJS](https://threejs.org)

## Getting started

1. Clone the project
2. [Authenticating to GitHub Packages](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)
3. Install dependency with `npm install`
4. Run development server with `npm run dev`

## Build

Run `export` with config environment

```bash
BASE_PATH=<site_base_path> SITE_URL=<site_absolute_url> GTAG=G-<google_analytics_id> yarn export
```
