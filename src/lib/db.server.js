import { MongoClient, ObjectId } from "mongodb";

const DB_URI = "mongodb+srv://beethovensstuhl_db_user:Testpasswort1234@cluster0.c3ubhae.mongodb.net/ScreenStackDB?retryWrites=true&w=majority&appName=Cluster0";

let clientPromise;

if (!DB_URI) {
  throw new Error("DB_URI ist nicht definiert");
}

if (!clientPromise) {
  const client = new MongoClient(DB_URI);
  clientPromise = client.connect();
}

export async function getDB() {
  const client = await clientPromise;
  return client.db("ScreenStackDB");
}

export { ObjectId };
