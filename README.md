# YAML Config Studio

A full-stack Next.js app for editing a fixed YAML configuration through both a Monaco editor and a structured form. Changes stay in sync and save automatically to a YAML file on disk.

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open http://localhost:3000.

## Runtime Requirements

- Node.js >= 22.0.0

## Assumptions & Trade-offs

- The YAML schema is fixed to the provided structure, so validation rejects unknown shapes.
- YAML formatting is normalized on save to keep the file consistent and predictable.
- The YAML editor allows invalid text temporarily, but it will only update the app state once it parses cleanly.

## What Could Be Improved

- Add schema-driven validation messages per field and inline YAML error markers in Monaco.
- Add tests for the validation and API routes.
- Support multi-user editing with WebSocket-based synchronization and conflict resolution.

## Why Next.js Route Handlers

The project already uses Next.js for the frontend, so Route Handlers provide a minimal, deployable backend without additional infrastructure. This keeps the stack unified (TypeScript end-to-end) while still allowing server-side filesystem access for YAML persistence.
