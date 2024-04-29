# kinetic-cure

I have too many fitness apps on my phone and can never remember how many reps I've done or which physio exercises I'm supposed to do, I'd also really like to see some progress with my history. I don't have this with my current apps so wanted to create my own for everything in one place. Most of the physio apps require a sign in from a dr or physio

## About the Databse

Kinetic Cure has a postgreSQL database provisioned through Vercel. Here are the initial thoughts on the database schema:

![alt text](DBscreenshot1.png)
![alt text](DBscreenshot2.png)

This is a work in progress and I plan to remove these from the root and generate better documentation about the database schema.

Decided to use API ninjas api and signed up for a free api key, documentation: https://api-ninjas.com/api/exercises

## How to Run

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
