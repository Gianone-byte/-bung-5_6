import { MongoClient, ObjectId } from "mongodb";

let clientPromise;

// DB_URI wird direkt aus process.env gelesen
const DB_URI = process.env.DB_URI;

if (!DB_URI) {
  throw new Error("DB_URI ist nicht in .env definiert");
}

if (!clientPromise) {
  const client = new MongoClient(DB_URI);
  clientPromise = client.connect();
}

export async function getDB() {
  const client = await clientPromise;
  return client.db("ScreenStackDB");
}

//////////////////////////////////////////
// Movies
//////////////////////////////////////////

// Get all movies
async function getMovies() {
  let movies = [];
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const query = {};
    movies = await collection.find(query).toArray();
    movies.forEach((movie) => {
      movie._id = movie._id.toString();
    });
  } catch (error) {
    console.log(error);
  }
  return movies;
}

// Get movie by id
async function getMovie(id) {
  let movie = null;
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) };
    movie = await collection.findOne(query);

    if (!movie) {
      console.log("No movie with id " + id);
    } else {
      movie._id = movie._id.toString();
    }
  } catch (error) {
    console.log(error.message);
  }
  return movie;
}

// create movie
async function createMovie(movie) {
  movie.poster = "/images/placeholder.jpg";
  movie.actors = [];
  movie.watchlist = false;
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const result = await collection.insertOne(movie);
    return result.insertedId.toString();
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// update movie
async function updateMovie(movie) {
  try {
    let id = movie._id;
    delete movie._id;
    const db = await getDB();
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) };
    const result = await collection.updateOne(query, { $set: movie });

    if (result.matchedCount === 0) {
      console.log("No movie with id " + id);
    } else {
      console.log("Movie with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

// delete movie by id
async function deleteMovie(id) {
  try {
    const db = await getDB();
    const collection = db.collection("movies");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No movie with id " + id);
    } else {
      console.log("Movie with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

export default {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
