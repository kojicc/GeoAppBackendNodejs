# GeoApp Backend

## Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd geoapp-backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and update the values as needed.
   - If `.env.example` does not exist, create a `.env` file with at least:
     ```
     JWT_SECRET=your_jwt_secret
     PORT=8000
     ```

4. **Set up the database:**

   ```sh
   npx prisma migrate deploy
   ```

5. **(Optional) Seed the database with test data:**

   ```sh
   node prisma/seed.js
   ```

6. **Start the server:**
   ```sh
   npm run dev
   ```
   or
   ```sh
   npm start
   ```

## Main Libraries Used

- express
- cors
- body-parser
- bcryptjs
- jsonwebtoken
- @prisma/client
- prisma
- nodemon (dev)

See [package.json](package.json) for the full list.
