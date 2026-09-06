# Genggi

Genggi is a nostalgic social network for custom profiles, friends, messages, communities, bulletin posts, and guestbook-style testimonials.

## Features

- Create an account with email/password or Google sign-in.
- Build a custom profile with layouts, profile details, photos, friends, and testimonials.
- Share bulletin posts with public, friends-only, or private visibility.
- Send messages, use chatboxes, join groups, and receive notifications.
- Search members and report bugs from inside the app.

## Tech Stack

- Next.js 16 App Router and React 19
- TypeScript
- MongoDB for application data
- Firebase Authentication for Google sign-in
- Cloudflare R2 for image storage
- Resend for verification and password-reset email
- Tailwind CSS 4
- Vitest and Testing Library

## Requirements

- Node.js 20.9 or newer
- npm
- A MongoDB database
- Firebase project credentials if Google sign-in is enabled
- Cloudflare R2 credentials for image uploads
- Resend credentials for account emails

## Getting Started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Create `.env.local` in the project root. Configure the variables below.

    ```dotenv
    MONGODB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/
    MONGODB_DB=genggeng
    AUTH_SECRET=replace-with-a-long-random-secret

    NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id

    R2_BUCKET=your-r2-bucket
    R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
    R2_ACCESS_KEY_ID=your-r2-access-key-id
    R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
    R2_PUBLIC_URL=https://cdn.example.com

    RESEND_API_KEY=your-resend-api-key
    RESEND_FROM=Genggi <noreply@example.com>
    ```

    `MONGODB_DB` defaults to `genggeng`. `RESEND_FROM` defaults to Resend's shared testing sender. In production, `AUTH_SECRET` is required. The Firebase variables are exposed to the browser by design; keep MongoDB, R2, Resend, and auth-secret values private.

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open [http://localhost:3000](http://localhost:3000).

To use Google sign-in locally, enable Google as a Firebase Authentication provider and add your local and deployed domains to Firebase's authorized domains. To send email from a custom address, verify the domain in Resend and set `RESEND_FROM`.

## Available Scripts

| Command         | Purpose                                    |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Start the local development server         |
| `npm run lint`  | Run ESLint                                 |
| `npm test`      | Run the Vitest test suite once             |
| `npm run build` | Create a production build                  |
| `npm start`     | Start the production server after building |

## Project Layout

- `app/` contains routes, server actions, API routes, and UI components.
- `lib/` contains authentication, database access, storage, email, queries, and shared domain logic.
- `public/` contains static assets and the service worker.
- `*.test.ts` and `*.test.tsx` files contain unit and component tests.

## Production Deployment

Build the application with `npm run build`, then run it with `npm start`. Provide the same environment variables in the hosting provider's server and build environments. Configure the production hostname in Firebase, ensure the R2 public URL is reachable, and use a verified Resend sender domain.

Do not commit `.env.local` or any credentials. Environment files are ignored by Git.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow, testing expectations, and pull request guidelines.
