# My Commerce

E-commerce application developed as a technical challenge using Next.js App Router, TypeScript, Material UI, and TanStack Query.

## Live Demo

The site is available at:
https://my-commerce-five-mu.vercel.app/products/page/1

Obs: Por algum motivo externo, a api `fakestore` está bloqueando (403) chamadas do server da vercel para a obtenção dos dados pra popular as páginas SSG e SSR. Por isso a página está sendo retornada sem os dados dos produtos serializados. Nesse caso os dados estão sendo obtidos no client-side. Para validar a geração das páginas estáticas SSG e também as dinâmicas SSR, recomendo fazer um build e rodar o projeto localmente.

## Project Goal

The project implements a product catalog with:

- paginated product listing;
- product detail page;
- data fetching with React Query;
- hybrid rendering strategy (SSG/ISR for listing and SSR for detail pages);
- architecture based on Repository Pattern and SOLID principles.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Material UI (MUI)
- TanStack Query v5 (React Query)
- Axios
- Jest + Testing Library

## Technical Structure (Summary)

- src/app: routes and rendering (layout, listing, and detail)
- src/domain/products: domain layer (hooks, models, repository, and product components)
- src/core: shared components, HTTP client, theme, and providers

Applied patterns:

- Repository Pattern to decouple API consumption;
- hooks to centralize data logic (useProducts and useProduct);
- presentational components;
- internal import alias @/\*.

## Running the Project

Install dependencies:

```bash
yarn
```

Start development mode:

```bash
yarn dev
```

Build and run in production mode:

```bash
yarn build
yarn start
```

## Running Tests

Run all tests:

```bash
yarn test
```

Run in watch mode:

```bash
yarn test:watch
```

Run with coverage:

```bash
yarn test:coverage
```

Run a specific test file:

```bash
yarn test __tests__/hooks/use-product-hook.test.ts --no-coverage
```

## Quality and Tooling

- ESLint for linting and code quality;
- test setup with next/jest;
- jsdom test environment;
- @testing-library/jest-dom for DOM matchers.
