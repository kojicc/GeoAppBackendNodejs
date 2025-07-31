# GeoApp Backend Setup Tutorial

This guide will help you set up and run the GeoApp backend server on your local machine.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 1. Clone the Repository

Clone this repository to your local machine:

```sh
git clone <your-repo-url>
cd GeoAppBackendNodejs
```

## 2. Install Dependencies

Install all required Node.js libraries:

```sh
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory. Add the following variables:

```
JWT_SECRET=your_jwt_secret
PORT=8000
```

Replace `your_jwt_secret` with a secure secret string.

## 4. Set Up the Database

The project uses [Prisma](https://www.prisma.io/) as the ORM and SQLite as the default database.

Run the following commands to apply database migrations and generate the Prisma client:

```sh
npx prisma migrate deploy
npx prisma generate
```

## 5. Seed the Database

To populate the database with initial data, run the provided seed script:

```sh
node prisma/seed.js
```

## 6. Start the Server

To start the server in development mode (with auto-reload):

```sh
npm run dev
```

Or to start normally:

```sh
npm start
```

The server should now be running at `http://localhost:8000` (or the port you set in `.env`).

## 7. Test the API

You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the API endpoints.

## Main Libraries Used

- express
- cors
- body-parser
- bcryptjs
- jsonwebtoken
- @prisma/client
- prisma
- nodemon (dev)

For the full list, see `package.json`.
