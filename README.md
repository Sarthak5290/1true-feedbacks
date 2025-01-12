This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
1true-feedbacks
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ master
│  ├─ objects
│  │  ├─ 00
│  │  │  └─ 4145cddf3f9db91b57b9cb596683c8eb420862
│  │  ├─ 07
│  │  │  └─ 1d137b149c4f49c1e3f697d5dad98918982029
│  │  ├─ 10
│  │  │  └─ 9807be0f73749162de63805d55dd3b669c248d
│  │  ├─ 1a
│  │  │  └─ 69fd2a450afc3bf47e08b22c149190df0ffdb4
│  │  ├─ 20
│  │  │  └─ c68e66b93dc3efdf8854c8ae0d9af507cf7414
│  │  ├─ 3e
│  │  │  └─ ee0141abe634fab81de261c7133991b5a56a17
│  │  ├─ 42
│  │  │  └─ 973d0ddebf7082bdd9a2e867b68a6630fa6cb3
│  │  ├─ 51
│  │  │  └─ 74b28c565c285e3e312ec5178be64fbeca8398
│  │  ├─ 56
│  │  │  └─ 7f17b0d7c7fb662c16d4357dd74830caf2dccb
│  │  ├─ 5e
│  │  │  └─ f6a520780202a1d6addd833d800ccb1ecac0bb
│  │  ├─ 64
│  │  │  └─ e211ae99e141f7a6ead4206075e76b2288b9e6
│  │  ├─ 6b
│  │  │  └─ 717ad346d3dff8914e9545038c799226d59c89
│  │  ├─ 71
│  │  │  └─ 8d6fea4835ec2d246af9800eddb7ffb276240c
│  │  ├─ 77
│  │  │  └─ 053960334e2e34dc584dea8019925c3b4ccca9
│  │  ├─ 85
│  │  │  └─ b98d723b76e35a5cf682bfd0fb02c997b5c446
│  │  ├─ b2
│  │  │  └─ b2a44f6ebc70c450043c05a002e7a93ba5d651
│  │  ├─ c1
│  │  │  └─ 334095f876a408c10f2357faaced969ec090ab
│  │  ├─ c8
│  │  │  ├─ 5fb67c463f20d1ee449b0ffee725a61dfb9259
│  │  │  └─ 8f389de09f418da376598c42e8788d4fb6d172
│  │  ├─ e2
│  │  │  └─ 15bc4ccf138bbc38ad58ad57e92135484b3c0f
│  │  ├─ e9
│  │  │  └─ ffa3083ad279ecf95fd8eae59cb253e9a539c4
│  │  ├─ f7
│  │  │  └─ fa87eb875260ed98651bc419c8139b5119e554
│  │  ├─ f9
│  │  │  └─ c9026d329863dd78892d28484159d0e0052599
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     └─ tags
├─ .gitignore
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ (app)
│  │  ├─ (auth)
│  │  │  ├─ sign-in
│  │  │  │  └─ page.tsx
│  │  │  ├─ sign-up
│  │  │  │  └─ page.tsx
│  │  │  └─ verify
│  │  │     └─ [username]
│  │  │        └─ page.tsx
│  │  ├─ api
│  │  │  ├─ acceptMessage
│  │  │  │  └─ route.ts
│  │  │  ├─ auth
│  │  │  │  ├─ options.ts
│  │  │  │  └─ [...nextauth]
│  │  │  │     └─ route.ts
│  │  │  ├─ check-username-unique
│  │  │  │  └─ route.ts
│  │  │  ├─ getMessages
│  │  │  │  └─ route.ts
│  │  │  ├─ sendMessage
│  │  │  │  └─ route.ts
│  │  │  ├─ sign-in
│  │  │  │  └─ route.ts
│  │  │  ├─ sign-up
│  │  │  │  └─ route.ts
│  │  │  ├─ suggestMessage
│  │  │  │  └─ route.ts
│  │  │  └─ verifyCode
│  │  │     └─ route.ts
│  │  ├─ context
│  │  │  └─ AuthProvider.tsx
│  │  ├─ dashboard
│  │  │  └─ page.tsx
│  │  ├─ emails
│  │  │  └─ verificationEmail.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ helpers
│  │  │  ├─ jwtHelper.ts
│  │  │  └─ sendVerificationEmail.ts
│  │  ├─ layout.tsx
│  │  ├─ lib
│  │  │  ├─ dbConnect.ts
│  │  │  └─ resend.ts
│  │  ├─ middleware.ts
│  │  ├─ model
│  │  │  └─ User.model.ts
│  │  ├─ page.tsx
│  │  ├─ schemas
│  │  │  ├─ acceptMessageSchema.ts
│  │  │  ├─ messageSchema.ts
│  │  │  ├─ signInSchema.ts
│  │  │  ├─ signUpSchema.ts
│  │  │  └─ verifySchema.ts
│  │  ├─ types
│  │  │  ├─ apiResponse.ts
│  │  │  └─ next-auth.d.ts
│  │  └─ u
│  │     └─ [username]
│  │        └─ page.tsx
│  ├─ components
│  │  ├─ Message.tsx
│  │  ├─ Navbar.tsx
│  │  └─ ui
│  │     ├─ alert-dialog.tsx
│  │     ├─ button.tsx
│  │     ├─ card.tsx
│  │     ├─ form.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ separator.tsx
│  │     ├─ switch.tsx
│  │     ├─ toast.tsx
│  │     └─ toaster.tsx
│  ├─ hooks
│  │  └─ use-toast.ts
│  └─ lib
│     └─ utils.ts
├─ tailwind.config.ts
└─ tsconfig.json

```