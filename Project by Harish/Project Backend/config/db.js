import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "users";

const client = new MongoClient(url);

let db;

export const connectDB = async () => {
  if (!db) {
    const connection = await client.connect();
    db = connection.db(dbName);
  }
  return db;
};

