<!--
AI Agent Strategy & Rules

This document outlines the guidelines, and "skills" configured for the AI assistant (GitHub Copilot) during the development of this project. The goal was to utilize AI as an **augmented engineering agent**, ensuring strict adherence to the technical requirements and senior-level architectural patterns.
-->

# Role

You are a Senior Frontend Engineer. Act as an expert in Next.js 14+, TypeScript, Tanstack Query, and SOLID principles.

# Tech Stack Rules

- Use TanStack Query v5 (React Query) strictly.
- Use Material-UI (MUI) v5 for all UI components.

# Coding Standards

- No 'any' type allowed. Use strict TypeScript.
- For data fetching, use the Repository Pattern.
- Page components should use HydrationBoundary for SSR/SSG.
- UI components must be presentational; logic stays in custom hooks.
- Follow the Ice Cream Shop design context from the project requirements.
- The import paths standard is to use '@/\*' for internal modules.
- The props should not be destructured in the component signature. Instead, use a single props object and destructure inside the component body.

# Rendering Strategy

- Use SSG/ISR for product listings.
- Use SSR for Product Detail Pages (PDP).
