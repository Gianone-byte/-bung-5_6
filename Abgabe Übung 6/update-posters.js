import { MongoClient } from "mongodb";
import "dotenv/config";

const DB_URI = process.env.DB_URI;

async function updatePosters() {
  const client = new MongoClient(DB_URI);
  
  try {
    await client.connect();
    const db = client.db("ScreenStackDB");
    const collection = db.collection("movies");
    
    // Mapping: Filmtitel → neuer Bildname
    const posterMapping = {
      "Casablanca": "/images/casablanca.png",
      "L.A. Confidential": "/images/la_confidential.png",
      "Seven Samurai": "/images/seven_samurai.png",
      "Parasite": "/images/parasite.png",
      "Schindler's List": "/images/schindlers_list.png",
      "Toy Story 4": "/images/toy_story_4.png",
      "The Avengers": "/images/the_avengers.png"
    };
    
    for (const [title, poster] of Object.entries(posterMapping)) {
      const result = await collection.updateOne(
        { title: title },
        { $set: { poster: poster } }
      );
      console.log(`✓ ${title}: ${result.modifiedCount} aktualisiert`);
    }
    
    console.log("\n✅ Alle Poster aktualisiert!");
    
  } catch (error) {
    console.error("Fehler:", error);
  } finally {
    await client.close();
  }
}

updatePosters();
