# Clicktrace
 
**Clicktrace follows one click from your front end, through your back end, to your database and queues. Then it tells you what went wrong, what could be better, and how to fix it.**
 
> Status: in progress
 
## What it is
 
Clicktrace is a developer tool. You click a button in your web app, and Clicktrace shows everything that click caused, from the browser to the database, with the time of each step. Then it checks the click and gives you findings: problems, improvements and errors.
 
## Why it exists
 
- **Some bugs show no error.** An order is created twice, the same query runs 20 times, a background job never starts. The app looks fine, so nobody looks.
- **The evidence is in different places.** The browser shows the request. The SQL queries, the queue jobs and their timings are somewhere else. Linking them to one click is slow manual work.
- **Finding a problem is only half the job.** Clicktrace also explains why it matters, measured from the real click, and how to fix it.
## What it shows
 
- The request sent by the front end, with its status and timing
- Every SQL query that request ran, with its timing
- Every Redis job it queued, and when the worker started it
- Errors, from the browser console to back end exceptions, attached to the click that caused them
## What it finds
 
- **Problems with no error:** a double submit (the same request sent twice), a duplicate insert, N+1 queries (the same query runs once per row instead of once in total), a lost job (queued but never started), a write inside a GET.
- **Improvements:** the app works, but could be better. Add an index, add a cache, load in one query, move slow work to a background job, add pagination. These are suggestions, sorted below problems.
- **Errors:** console errors, failed requests and back end exceptions.
Every finding is a card with four parts: what was found, why it matters (measured from the real click, never guessed), how to fix it, and where in the code.
 
## How it finds them
 
1. **Rules.** Small checks, each one written and explained by me.
2. **Normal behavior.** Clicktrace remembers what is normal for each action (for example, "Save: about 200 ms, 3 queries") and flags a click far from normal, even when no rule covers it. It uses medians and thresholds, not machine learning.
3. **An AI agent.** Any AI agent can read the recorded click through an MCP server (a standard way for agents to read a tool's data) and look for problems no rule covers. Each suspicion must point to evidence in the recording.
## How the fix reaches you
 
- A **Copy report** button copies a clean report for any AI agent: the click, the request, the SQL, the job, the file and the finding.
- Or the agent asks Clicktrace directly through the MCP server.
## Safety and data
 
- Clicktrace is built for local development, not for production.
- It runs on your machine and stores recordings in a local SQLite file.
- Nothing is sent to an AI unless you click Copy report or ask your own agent to read a recording.
- Clicktrace never edits your code.
## How it works
 
1. **Front end:** a Chrome extension gives each click a unique trace ID (a label attached to one click) and sends it with every request, in the standard `traceparent` header.
2. **Back end:** FastAPI keeps the ID for the whole request, so every function can read it.
3. **Database:** each SQL query is recorded with the ID and its time.
4. **Queue:** the ID travels inside each Redis message, so the worker's steps link back to the click.
5. **Collector:** a Java Spring Boot service joins all events by ID into one timeline and runs the rules on it.
6. **Panel:** a Chrome DevTools tab shows the click and its findings.
## Built with
 
- **Chrome extension and DevTools panel:** TypeScript, React
- **Back end hooks:** Python, FastAPI, SQLAlchemy, Redis Streams
- **Collector and rule engine:** Java 21, Spring Boot, Spring Data JPA, SQLite
- **AI agent link:** MCP server
- **Tests:** pytest, JUnit, Mockito
- **Delivery:** Docker, GitHub Actions
## Build log
 
[Concepts](docs/concepts): one short note per concept. Each note explains how it works, then the decision I made and what went wrong along the way.
 
