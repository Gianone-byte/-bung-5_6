
import { MongoClient, ObjectId } from "mongodb";

const DB_URI = process.env.DB_URI;
if (!DB_URI) {
  throw new Error("DB_URI ist nicht gesetzt (Netlify Env oder .env prüfen)");
}

const client = new MongoClient(DB_URI);
const clientPromise = client.connect();

export async function getDB() {
  const client = await clientPromise;
 
  return client.db("ScreenStackDB");
}

export { ObjectId };