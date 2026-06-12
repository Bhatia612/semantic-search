# Semantic Search Engine

Hey! This is one of my portfolio projects. It's a search engine that understands the **meaning** of your search, not just the exact words.

So if you upload a document about cars and search for "vehicles that drive without a human", it will still find the right section even if those exact words aren't in the document. Pretty cool right?

## What I built

A full-stack app where you can:
- Upload documents (PDF, Word, text files)
- Search through them using natural language
- Get results ranked by how relevant they are

## How it actually works

I learned a lot building this. Here's the flow:

```
1. You upload a file
2. The backend extracts the text
3. The text gets split into chunks (500 words each with some overlap)
4. Each chunk gets converted into a list of numbers (called an embedding) by OpenAI
5. Those numbers get stored in a Postgres database using an extension called pgvector
6. When you search, your query gets converted into numbers the same way
7. The database finds chunks whose numbers are closest to your query's numbers
8. Those results come back ranked by similarity
```

The key insight I learned: similar meanings produce similar numbers. So "car" and "vehicle" end up close together in this number space, which is why the search works without exact keyword matches.

## Tech I used

**Backend**
- Node.js + Express (REST API)
- OpenAI API (for converting text to embeddings)
- PostgreSQL + pgvector (storing and searching vectors)
- Neon (free hosted Postgres)
- multer (handling file uploads)

**Frontend**
- React + Vite
- SCSS
- Axios
- Feature-based folder structure (learned this is how real teams organize code)

## Folder structure

I organized the frontend by feature, not by file type. So instead of having all components in one folder, each feature has its own folder with its own components, hooks, and styles.

```
semantic-search/
├── backend/
│   └── src/
│       ├── config/        # database connection
│       ├── controllers/   # handle incoming requests
│       ├── middlewares/   # file upload, error handling
│       ├── models/        # database queries
│       ├── parsers/       # extract text from different file types
│       ├── chunker/       # split text into chunks
│       ├── embedder/      # call OpenAI to get embeddings
│       └── pipeline/      # ties everything together
└── frontend/
    └── src/
        └── features/
            ├── search/    # search bar and results
            ├── upload/    # file upload
            └── shared/    # navbar, global styles
```

## How to run it locally

### What you need
- Node.js 18+
- A free Neon account — https://neon.tech
- An OpenAI API key — https://platform.openai.com

### Database setup

Create a project on Neon, open the SQL editor and run this:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  embedding VECTOR(1536),
  source VARCHAR(255),
  type VARCHAR(50),
  chunk_index INTEGER,
  word_count INTEGER,
  char_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON documents
USING hnsw (embedding vector_cosine_ops);
```

### Install and run

```bash
# clone the repo
git clone https://github.com/Bhatia612/semantic-search.git
cd semantic-search

# setup backend
cd backend
npm install
cp .env.example .env
# open .env and fill in your values

# setup frontend
cd ../frontend
npm install
```

```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```

Then open http://localhost:5173

### Environment variables

Create a `backend/.env` file (use `.env.example` as a reference):

```
PORT=3001
DATABASE_URL=your_neon_connection_string
OPENAI_API_KEY=your_openai_api_key
```

## Things I learned building this

- How embeddings work and why the same model must be used for both documents and queries
- What a vector database is and how cosine similarity search works
- How to build a RAG (Retrieval Augmented Generation) pipeline
- Feature-based React architecture
- How to handle file uploads in Express with multer
- Why connection pooling matters in Postgres
- How to use pgvector's HNSW index for fast similarity search

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/ingest | Upload and ingest a document |
| GET | /api/search?query=your+query | Search ingested documents |
| GET | /health | Check if server is running |

## What I would add next

- User authentication so each user has their own documents
- Delete documents from the database
- Support for more file types
- Better UI with a loading skeleton
- Deploy to production