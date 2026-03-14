# QuizHub Backend — Required Files & Architecture

> Complete backend structure for `Node_server/` — every file and folder explained before coding begins.

---

## Folder Structure Overview

```
Node_server/
│
├── server.js                        # Entry point — starts Express + Socket.io
├── package.json                     # Dependencies and scripts
├── .env                             # Environment variables (DB, JWT, PORT)
├── .env.example                     # Template for environment variables
│
├── config/
│   ├── db.js                        # PostgreSQL connection pool (pg)
│   └── env.js                       # Loads & validates env variables
│
├── middleware/
│   ├── auth.js                      # JWT verification middleware
│   ├── adminOnly.js                 # Admin role-check middleware
│   ├── instructorOrAdmin.js         # Instructor/Admin role-check middleware
│   ├── errorHandler.js              # Global error handling middleware
│   └── validate.js                  # Request body validation helper
│
├── routes/
│   ├── authRoutes.js                # POST /login, /register
│   ├── userRoutes.js                # GET/PUT /profile, /dashboard, /stats
│   ├── categoryRoutes.js            # GET /categories, /subjects, /topics
│   ├── questionRoutes.js            # CRUD for questions
│   ├── quizRoutes.js                # Quiz file upload, my-quizzes, explore
│   ├── quizPlayRoutes.js            # Start session, submit answers, results
│   ├── battleRoutes.js              # 1v1 and solo battle sessions
│   ├── tournamentRoutes.js          # List, join, details for tournaments
│   ├── leaderboardRoutes.js         # GET leaderboard data
│   ├── bugReportRoutes.js           # POST bug report, GET reports
│   ├── newsRoutes.js                # GET news/updates
│   ├── adminRoutes.js               # Admin: users, content, tournaments, reports
│   └── uploadRoutes.js              # CSV file upload and processing endpoints
│
├── controllers/
│   ├── authController.js            # Login, register, token refresh logic
│   ├── userController.js            # Profile CRUD, dashboard data, stats
│   ├── categoryController.js        # Category/subject/topic lookups
│   ├── questionController.js        # Question CRUD & bulk CSV import
│   ├── quizController.js            # Quiz file management, my-quizzes
│   ├── quizPlayController.js        # Quiz play session logic
│   ├── battleController.js          # Battle session creation & scoring
│   ├── tournamentController.js      # Tournament listing, joining, results
│   ├── leaderboardController.js     # Leaderboard computation & ranking
│   ├── bugReportController.js       # Bug report submission & management
│   ├── newsController.js            # News CRUD
│   ├── adminController.js           # User management, content moderation
│   └── uploadController.js          # Main controller handling CSV requests/responses
│
├── handlers/
│   └── csvHandler.js                # Coordinates CSV parsing, validation, and DB batch insertion
│
├── services/
│   └── csvParserService.js          # Parses CSV, translates to JSON, validates column constraints
│
├── models/
│   ├── userModel.js                 # DB queries for users table
│   ├── categoryModel.js             # DB queries for categories/subjects/topics
│   ├── questionModel.js             # DB queries for questions table
│   ├── quizModel.js                 # DB queries for question_files table
│   ├── quizSessionModel.js          # DB queries for quiz_sessions & session_questions
│   ├── quizAttemptModel.js          # DB queries for quiz_attempts table
│   ├── tournamentModel.js           # DB queries for tournaments & participants
│   ├── bugReportModel.js            # DB queries for bug_reports table
│   ├── newsModel.js                 # DB queries for news_updates table
│   └── activityModel.js             # DB queries for user_activity table
│
├── utils/
│   ├── hashPassword.js              # bcrypt hash & compare helpers
│   ├── generateToken.js             # JWT sign & verify helpers
│   ├── csvParser.js                 # Parse uploaded CSV into question objects
│   ├── pagination.js                # Reusable pagination helper
│   └── apiResponse.js               # Standardized { success, data, error } format
│
├── sockets/
│   └── battleSocket.js              # Socket.io events for real-time 1v1 battles
│
└── uploads/                         # Uploaded CSV/image files (gitignored)
```

---

## File-by-File Explanation

### Root Files

| File | Purpose |
|---|---|
| **`server.js`** | Application entry point. Initializes Express, applies middleware (CORS, JSON parsing, auth), registers all route files, connects Socket.io for real-time battles, and starts the HTTP server on the configured port. |
| **`package.json`** | Lists all npm dependencies (`express`, `pg`, `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`, `multer`, `csv-parse`, `socket.io`) and scripts (`start`, `dev`). |
| **`.env`** | Stores sensitive configuration: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `PORT`. Not committed to Git. |
| **`.env.example`** | Template version of `.env` with placeholder values — committed to Git for reference. |

---

### `config/`

| File | Purpose |
|---|---|
| **`db.js`** | Creates and exports a `pg.Pool` instance using environment variables. Provides a reusable `query()` function for running parameterized SQL queries. Handles connection errors gracefully. |
| **`env.js`** | Loads `dotenv`, validates that all required env variables exist, and exports them as a config object. Prevents the server from starting with missing configuration. |

---

### `middleware/`

| File | Purpose |
|---|---|
| **`auth.js`** | Extracts and verifies the JWT from the `Authorization: Bearer <token>` header. Attaches the decoded user object (`user_id`, `role`) to `req.user`. Returns 401 if missing/invalid. |
| **`adminOnly.js`** | Checks `req.user.role === 'admin'`. Returns 403 if not. Used on all `/admin/*` routes. |
| **`instructorOrAdmin.js`** | Checks `req.user.role` is either `'instructor'` or `'admin'`. Used on quiz creation and content management routes. |
| **`errorHandler.js`** | Global Express error handler. Catches unhandled errors, logs them, and returns a standardized error JSON response with appropriate HTTP status codes. |
| **`validate.js`** | Lightweight request validation helper. Checks that required body fields exist and returns 400 with descriptive messages if not. |

---

### `routes/`

Each route file defines the URL endpoints and maps them to controller functions.

| File | Endpoints | Auth Required |
|---|---|---|
| **`authRoutes.js`** | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/admin-login` | No |
| **`userRoutes.js`** | `GET /api/users/profile`, `PUT /api/users/profile`, `GET /api/users/dashboard`, `GET /api/users/activity` | Yes |
| **`categoryRoutes.js`** | `GET /api/categories`, `GET /api/categories/:id/subjects`, `GET /api/subjects/:id/topics`, `GET /api/topics/:id/micro-topics` | No |
| **`questionRoutes.js`** | `GET /api/questions`, `GET /api/questions/:id`, `POST /api/questions`, `PUT /api/questions/:id`, `DELETE /api/questions/:id` | Yes (Instructor/Admin) |
| **`quizRoutes.js`** | `POST /api/quizzes/upload` (CSV), `GET /api/quizzes/my`, `GET /api/quizzes/explore`, `GET /api/quizzes/:id` | Yes |
| **`quizPlayRoutes.js`** | `POST /api/play/start`, `POST /api/play/answer`, `POST /api/play/submit`, `GET /api/play/:sessionId` | Yes |
| **`battleRoutes.js`** | `POST /api/battle/start`, `GET /api/battle/:sessionId` | Yes |
| **`tournamentRoutes.js`** | `GET /api/tournaments`, `GET /api/tournaments/:id`, `POST /api/tournaments/:id/join` | Yes (join), No (list) |
| **`leaderboardRoutes.js`** | `GET /api/leaderboard`, `GET /api/leaderboard/weekly` | No |
| **`bugReportRoutes.js`** | `POST /api/bug-reports`, `GET /api/bug-reports/my` | Yes |
| **`newsRoutes.js`** | `GET /api/news` | No |
| **`adminRoutes.js`** | `GET/PUT/DELETE /api/admin/users`, `GET/PUT/DELETE /api/admin/content`, `POST/PUT/DELETE /api/admin/tournaments`, `GET/PUT /api/admin/reports`, `POST /api/admin/news` | Yes (Admin) |
| **`uploadRoutes.js`** | `POST /api/upload/csv` | Yes (Instructor/Admin) |

---

### `controllers/`

Each controller contains the business logic for its domain. Controllers receive the Express `req`/`res`, call model functions, and return JSON responses.

| File | Key Functions |
|---|---|
| **`authController.js`** | `register()` — validates input, hashes password, inserts user, returns JWT. `login()` — finds user by email, compares password, returns JWT. `adminLogin()` — same with admin role check. |
| **`userController.js`** | `getProfile()` — returns user data + stats. `updateProfile()` — updates name, picture, country. `getDashboard()` — returns quiz activity by subject, highest scores, contest highlights. `getActivity()` — returns paginated activity feed. |
| **`categoryController.js`** | `getAll()` — returns all categories. `getSubjects()` — subjects for a category. `getTopics()` — topics for a subject. `getMicroTopics()` — micro-topics for a topic. |
| **`questionController.js`** | `create()`, `getById()`, `update()`, `delete()`, `bulkImport()` — handles CSV parsing and batch insert. |
| **`quizController.js`** | `uploadQuiz()` — receives CSV, parses, creates question_file + questions. `getMyQuizzes()` — returns user's uploaded quiz files. `getExploreQuizzes()` — returns quizzes grouped by category. |
| **`quizPlayController.js`** | `startSession()` — creates a quiz_session, randomly selects questions based on filters. `submitAnswer()` — records answer for a question. `submitQuiz()` — calculates final score, creates quiz_attempt, updates user stats. |
| **`battleController.js`** | `startBattle()` — creates 1v1 or solo session with selected params. `getBattle()` — returns session state. Real-time gameplay handled by `sockets/battleSocket.js`. |
| **`tournamentController.js`** | `listTournaments()` — with category filter. `getTournament()` — details + participant count. `joinTournament()` — adds user as participant. |
| **`leaderboardController.js`** | `getLeaderboard()` — returns top users sorted by total_points with category, quizzes count. `getWeeklyLeaderboard()` — computed from recent quiz_attempts. |
| **`bugReportController.js`** | `create()` — submits bug report. `getMyReports()` — user's own reports. |
| **`newsController.js`** | `getAll()` — returns news with optional tag filter. |
| **`adminController.js`** | `listUsers()` — paginated user list. `updateUserRole()` — upgrade/downgrade. `toggleUserActive()` — activate/deactivate. `changeUserPassword()`. `listQuizzes()`, `deleteQuiz()`, `getQuizQuestions()`, `deleteQuestion()`. `createTournament()`, `endTournament()`, `updateTournament()`. `listBugReports()`, `resolveReport()`. `createNewsUpdate()`. |
| **`uploadController.js`** | `uploadCSV()` — accepts file from multer, passes to `csvHandler`, sends back success/error. |

---

### `handlers/`

| File | Purpose |
|---|---|
| **`csvHandler.js`** | Coordinates the entire pipeline for bulk CSV uploads. Takes the raw file path, calls `csvParserService` to get validated JSON, filters out bad data, and acts as the transaction manager to insert records across the database efficiently using bulk queries. Returns detailed summaries of the operation back to the controller. |

---

### `services/`

| File | Purpose |
|---|---|
| **`csvParserService.js`** | Contains core business logic for reading large CSV files efficiently via streams. Wraps `csv-parse`, translates header names to standard schemas, maps text formats to JSON arrays, runs row-level structural validation, and provides explicit error mappings for rows that fail parsing. |

---

### `models/`

Each model encapsulates raw SQL queries for its table(s). They accept parameters, run parameterized queries via the `db.query()` pool, and return results.

| File | Tables Accessed |
|---|---|
| **`userModel.js`** | `users` |
| **`categoryModel.js`** | `categories`, `subjects`, `topics`, `micro_topics` |
| **`questionModel.js`** | `questions` |
| **`quizModel.js`** | `question_files` |
| **`quizSessionModel.js`** | `quiz_sessions`, `quiz_session_questions` |
| **`quizAttemptModel.js`** | `quiz_attempts` |
| **`tournamentModel.js`** | `tournaments`, `tournament_questions`, `tournament_participants` |
| **`bugReportModel.js`** | `bug_reports` |
| **`newsModel.js`** | `news_updates` |
| **`activityModel.js`** | `user_activity` |

---

### `utils/`

| File | Purpose |
|---|---|
| **`hashPassword.js`** | Exports `hashPassword(plain)` and `comparePassword(plain, hash)` using `bcryptjs` with salt rounds of 10. |
| **`generateToken.js`** | Exports `generateToken(payload)` — signs a JWT with `user_id` and `role`, set to expire in 7 days. Also `verifyToken(token)`. |
| **`csvParser.js`** | Parses an uploaded CSV file (via `csv-parse`) into an array of question objects matching the `questions` table schema. Validates required columns. |
| **`pagination.js`** | Exports `paginate(query, page, limit)` — appends `LIMIT` and `OFFSET` to SQL queries. Returns `{ data, total, page, totalPages }`. |
| **`apiResponse.js`** | Exports `success(res, data, message, statusCode)` and `error(res, message, statusCode)` for consistent API response formatting across all controllers. |

---

### `sockets/`

| File | Purpose |
|---|---|
| **`battleSocket.js`** | Handles Socket.io events for real-time 1v1 quiz battles. Events: `join-battle`, `answer-submitted`, `battle-update`, `battle-complete`. Manages rooms, timer sync, and live score updates between two players. Used only for 1v1 mode; solo mode uses standard REST. |

---

### `uploads/`

| Purpose |
|---|
| Temporary storage for uploaded CSV files and question images. This folder is `.gitignore`d. Files are processed by `csvParser.js` on upload, then the parsed data is inserted into the database. |

---

## Dependencies (package.json)

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `pg` | PostgreSQL client for Node.js |
| `dotenv` | Load environment variables from `.env` |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT generation & verification |
| `cors` | Cross-Origin Resource Sharing |
| `multer` | File upload handling (CSV files) |
| `csv-parse` | CSV parsing for bulk question import |
| `socket.io` | WebSocket support for real-time 1v1 battles |
| `morgan` | HTTP request logging (dev) |
| `nodemon` *(dev)* | Auto-restart server on file changes |

---

## API Base URL

All API endpoints will be prefixed with:

```
http://localhost:5000/api/
```

The frontend will be configured to proxy or directly call this base URL.

---

## Architecture Principles

1. **Separation of concerns**: Routes → Controllers → Models → Database
2. **No ORM**: Direct SQL via `pg` for full control and performance
3. **Parameterized queries**: All SQL uses `$1, $2...` placeholders to prevent SQL injection
4. **JWT-based auth**: Stateless authentication with role-based access control
5. **Consistent API responses**: Every endpoint returns `{ success: boolean, data?: any, message?: string, error?: string }`
6. **Error handling**: Global error middleware catches all unhandled errors
7. **File uploads**: Multer stores files to `uploads/`, then processed and removed
8. **Real-time**: Socket.io only for 1v1 battles; everything else uses REST
