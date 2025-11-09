import { getDB, ObjectId } from "$lib/db.server.js";
import { fail } from "@sveltejs/kit";

export async function load() {
  try {
    const db = await getDB();
    const docs = await db.collection("movies").find().toArray();

    const movies = docs.map(m => ({
      id: m._id.toString(),
      title: m.title || "Unbekannter Titel",
      year: m.year || "N/A",
      length: m.length || "N/A",
      actors: Array.isArray(m.actors) ? m.actors : [],
      poster: m.poster || "/images/placeholder.jpg",
      watchlist: m.watchlist || false
    }));

    return { movies };
    
  } catch (error) {
    console.error("Fehler beim Laden der Filme:", error);
    return { movies: [] };
  }
}

export const actions = {
  addMovie: async ({ request }) => {
    try {
      const formData = await request.formData();
      const title = formData.get("title");
      const year = formData.get("year");
      const length = formData.get("length");

      if (!title || !year || !length) {
        return fail(400, { error: "Alle Felder müssen ausgefüllt sein" });
      }

      const db = await getDB();
      const newMovie = {
        title: title.toString(),
        year: parseInt(year.toString()) || 0,
        length: length.toString(),
        actors: [],
        poster: "/images/placeholder.jpg",
        watchlist: false
      };

      await db.collection("movies").insertOne(newMovie);

      return { success: true };
    } catch (error) {
      console.error("Fehler beim Hinzufügen:", error);
      return fail(500, { error: "Film konnte nicht hinzugefügt werden" });
    }
  },

  deleteMovie: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get("id");

      if (!id) {
        return fail(400, { error: "Keine Film-ID angegeben" });
      }

      const db = await getDB();
      const result = await db.collection("movies").deleteOne({ 
        _id: new ObjectId(id.toString()) 
      });

      if (result.deletedCount === 0) {
        return fail(404, { error: "Film nicht gefunden" });
      }

      return { success: true };
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      return fail(500, { error: "Film konnte nicht gelöscht werden" });
    }
  }
};
