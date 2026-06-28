# Warranty Startups

Full-stack warranty management platform.

## Development Setup

### Prerequisites

- Node.js 20+
- Python 3.11+

### One-time setup

```bash
# 1. Install root dev tooling and client dependencies
npm install
npm run setup

# 2. Create and activate a Python virtual environment for the server
cd server
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate
pip install -r requirements.txt
cd ..

# 3. Configure environment variables
cp client/.env.example client/.env   # then fill in Supabase URL, anon key, etc.
cp server/.env.example server/.env   # then fill in server-side secrets
```

### Running the dev environment

The Flask process is launched via the `python` on your `PATH`, so **activate the server virtualenv in your terminal first** (otherwise `dev:server` won't find Flask):

```bash
# Windows
server\.venv\Scripts\activate
# macOS / Linux
source server/.venv/bin/activate

npm run dev
```

This starts both processes concurrently:

- **Client** (Vite + React) — http://localhost:5173
- **Server** (Flask) — http://localhost:5000

### Individual commands

| Command | Description |
|---|---|
| `npm run dev:client` | Start Vite dev server only |
| `npm run dev:server` | Start Flask dev server only |
| `npm run build` | Production build of the client |
| `npm run typecheck` | TypeScript type-check the client |
| `npm run lint` | Lint the client |
| `npm test` | Placeholder — tests added in later phases |
