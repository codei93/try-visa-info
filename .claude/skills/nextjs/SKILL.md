### Create a Server Component page that fetches data and renders a Client Component (TypeScript)

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx

Create app/page.tsx as a Server Component. Import the Client Component and fetch data directly in the Server Component using the new data fetching APIs, then forward the fetched data as props to the Client Component.

```tsx
// Import your Client Component
import HomePage from './home-page'

async function getPosts() {
  const res = await fetch('https://...')
  const posts = await res.json()
  return posts
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  return <HomePage recentPosts={recentPosts} />
}
```

--------------------------------

### S > Server Component

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/04-glossary.mdx

The default component type in the App Router. Server Components render on the server, can fetch data directly, and don't add to the client JavaScript bundle. They cannot use state or browser APIs. Learn more in [Server and Client Components](/docs/app/getting-started/server-and-client-components).

--------------------------------

### Fetch data with cache: 'no-store' in App Router page

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx

Colocate data fetching inside a Server Component using fetch with cache: 'no-store' to never cache the response, similar to getServerSideProps.

```tsx
// `app` directory

// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()

  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

```jsx
// `app` directory

// This function can be named anything
async function getProjects() {
  const res = await fetch(`https://...`, { cache: 'no-store' })
  const projects = await res.json()

  return projects
}

export default async function Dashboard() {
  const projects = await getProjects()

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}</li>
      ))}
    </ul>
  )
}
```

--------------------------------

### Migrating > App Router Migration > Step 6: Migrating Data Fetching Methods > Server-side Rendering (`getServerSideProps`)

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx

In the App Router, we can colocate our data fetching inside our React components using [Server Components](/docs/app/getting-started/server-and-client-components). This allows us to send less JavaScript to the client, while maintaining the rendered HTML from the server.

By setting the `cache` option to `no-store`, we can indicate that the fetched data should [never be cached](/docs/app/getting-started/fetching-data). This is similar to `getServerSideProps` in the `pages` directory.

--------------------------------

### Access request cookies and headers in app directory with next/headers (TypeScript)

Source: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/migrating/app-router-migration.mdx

In the app directory, use the read-only headers and cookies functions from next/headers inside Server Components or data fetching functions. These are based on the Web Headers and Cookies APIs.

```tsx
// `app` directory
import { cookies, headers } from 'next/headers'

async function getData() {
  const authHeader = (await headers()).get('authorization')

  return '...'
}

export default async function Page() {
  // You can use `cookies` or `headers` inside Server Components
  // directly or in your data fetching function
  const theme = (await cookies()).get('theme')
  const data = await getData()
  return '...'
}
```
