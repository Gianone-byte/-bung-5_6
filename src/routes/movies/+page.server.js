
import { getDB } from "$lib/db.server.js";

export async function load() {
  try {
    const db = await getDB();
    const movies = await db.collection("movies").find({}).toArray();

    return {
      movies: movies.map((m) => ({
        ...m,
        _id: m._id.toString()
      }))
    };
  } catch (err) {
    console.error("Fehler beim Laden der Filme:", err);
    return { movies: [] };
  }
}