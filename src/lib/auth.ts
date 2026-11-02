import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

// MongoDB Connection String
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

// Reuse the MongoDB client during development
const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

const client =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

// Select Database
const db = client.db("booknookDB");

// BetterAuth Configuration
export const auth = betterAuth({
  appName: "BookNook",

  database: mongodbAdapter(db, {
    client,
  }),

 emailAndPassword: {
  enabled: true,
  minPasswordLength: 6,
  autoSignIn: false,
},

 // JWT Plugin
  plugins: [
    jwt(),
  ],

});