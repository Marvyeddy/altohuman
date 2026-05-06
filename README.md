# Altohuman

Altohuman is a Next.js app for checking AI-generated text and rewriting it into more natural human-sounding copy. It includes a marketing site, authentication, account management, pricing, payments, and a dashboard humanizer tool that talks to a backend API.

## Features

- AI score checking and text humanization from the dashboard
- Streaming humanized text responses
- Word limits and credit display by plan
- Email/password auth with Better Auth
- Google sign-in
- Email verification, password reset, and account deletion emails through Resend
- Pricing flow that initializes payments through the backend API
- Account pages for personal info, security, current plan, and deletion

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- PostgreSQL
- Resend
- Radix UI and local UI components

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
BACKEND_API_URL=
```

`BACKEND_API_URL` is optional for local startup because the app has a fallback URL in `lib/backend-api.ts`, but setting it explicitly is recommended.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start the local Next.js dev server
npm run build    # Build the production app
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Project Structure

```text
app/                    Next.js routes and API route handlers
actions/                Server actions for auth, payments, and humanizer calls
components/custom/      Product screens and dashboard components
components/home/        Marketing page sections
components/ui/          Shared UI primitives
emails/                 HTML email templates
lib/                    Auth, backend API, email, and utility helpers
public/                 Fonts, images, and SVG assets
schema/                 Form validation schemas
better-auth_migrations/ Better Auth database migrations
```

## Main Routes

- `/` - marketing homepage
- `/login` - sign in
- `/register` - create account
- `/forget-password` - request a password reset
- `/reset-password` - set a new password
- `/dashboard` - AI score checker and humanizer
- `/pricing` - paid plan selection
- `/account` - account area

## Backend Integration

The app forwards authenticated requests to a backend API:

- `POST /api/v1/humanize`
- `GET /api/v1/user/me`
- `POST /api/v1/payment/initialize/:plan`

The frontend sends the Better Auth session cookies to the backend so user credits, plan limits, scoring, humanization, and payment initialization can stay tied to the active session.
