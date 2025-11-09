
import { MongoClient, ObjectId } from "mongodb";

const DB_URI = process.env.DB_URI ?? process.env.MONGODB_URI;

if (!DB_URI) {
  throw new Error("DB_URI ist nicht gesetzt (Netlify Env Variable fehlt)");
}


let clientPromise;
if (!clientPromise) {
  const client = new MongoClient(DB_URI);
  clientPromise = client.connect();
}

export async function getDB() {
  const client = await clientPromise;
  return client.db("ScreenStackDB"); 
}




async function getMovies() {
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const movies = await collection.find({}).toArray();

  
    return movies.map((m) => ({
      ...m,
      _id: m._id.toString()
    }));
  } catch (error) {
    console.log("getMovies error:", error);
    return [];
  }
}


async function getMovie(id) {
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const movie = await collection.findOne({ _id: new ObjectId(id) });
    return movie ? { ...movie, _id: movie._id.toString() } : null;
  } catch (error) {
    console.log("getMovie error:", error);
    return null;
  }
}


async function createMovie(movie) {
  
  movie.poster = movie.poster ?? "/images/placeholder.jpg";
  movie.actors = movie.actors ?? [];
  movie.watchlist = movie.watchlist ?? false;

  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const result = await collection.insertOne(movie);
    return result.insertedId.toString();
  } catch (error) {
    console.log("createMovie error:", error);
    return null;
  }
}


async function updateMovie(movie) {
  try {
    const id = movie._id;
    delete movie._id;

    const db = await getDB();
    const collection = db.collection("movies");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: movie }
    );

    return result.matchedCount ? id : null;
  } catch (error) {
    console.log("updateMovie error:", error);
    return null;
  }
}


async function deleteMovie(id) {
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount ? id : null;
  } catch (error) {
    console.log("deleteMovie error:", error);
    return null;
  }
}

export default {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
};
export { ObjectId };