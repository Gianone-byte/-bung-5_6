<script>
  export let data;
  export let form;
</script>

<section class="container py-5">
  <h1 class="display-3 mb-4 text-light fw-bold text-center">Movies</h1>
  <p class="text-muted mb-4 text-center">
    Daten und Bilder <span class="small-text">(teilweise)</span> generiert mit ChatGPT und DALL-E
  </p>

  <!-- Formular zum Hinzufügen neuer Filme -->
  <div class="card text-light mb-5" style="border: 2px solid #1a1f36; background-color: #0e1b33;">
    <div class="card-body">
      <h3 class="card-title mb-3">Neuen Film hinzufügen</h3>
      <form method="POST" action="?/addMovie">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="title" class="form-label">Titel</label>
            <input type="text" class="form-control bg-secondary text-light border-0" id="title" name="title" required />
          </div>
          <div class="col-md-3">
            <label for="year" class="form-label">Jahr</label>
            <input type="number" class="form-control bg-secondary text-light border-0" id="year" name="year" required />
          </div>
          <div class="col-md-3">
            <label for="length" class="form-label">Dauer</label>
            <input type="text" class="form-control bg-secondary text-light border-0" id="length" name="length" placeholder="z.B. 120 Min" required />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-sm" style="background-color: #fbbf24; color: #0e1b33; border: none; font-weight: 600; padding: 0.5rem 1.5rem;">Film hinzufügen</button>
          </div>
        </div>
      </form>
      {#if form?.success}
        <div class="alert alert-success mt-3">Film erfolgreich hinzugefügt!</div>
      {/if}
      {#if form?.error}
        <div class="alert alert-danger mt-3">{form.error}</div>
      {/if}
    </div>
  </div>

  <!-- Filme anzeigen -->
  {#if data.movies && data.movies.length > 0}
    <div class="row g-4">
      {#each data.movies as movie}
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card h-100 text-light border-0 shadow-sm movie-card">
            <img
              src={movie.poster}
              alt={movie.title}
              class="card-img-top"
              style="height: 350px; object-fit: cover;"
              on:error={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
            />
            <div class="card-body">
              <h5 class="card-title">{movie.title}</h5>
              <p class="card-text mb-1">Jahr: {movie.year}</p>
              <p class="card-text mb-1">Dauer: {movie.length}</p>
              {#if movie.actors && movie.actors.length > 0}
                <p class="card-text small text-muted mt-2">Cast:</p>
                <ul class="small text-muted ps-3 mb-0">
                  {#each movie.actors as actor}
                    <li>{actor}</li>
                  {/each}
                </ul>
              {/if}
            </div>
            <div class="card-footer bg-transparent border-0">
              <form method="POST" action="?/deleteMovie">
                <input type="hidden" name="id" value={movie.id} />
                <button type="submit" class="btn btn-sm w-100" style="background-color: #fbbf24; color: #0e1b33; border: none; font-weight: 600;">
                  🗑️ Löschen
                </button>
              </form>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="alert alert-info mt-5 text-center">
      Noch keine Filme vorhanden. Füge Filme hinzu.
    </div>
  {/if}
</section>

<style>
  .small-text {
    font-size: 0.65rem;
  }
  
  .movie-card {
    background: #0e1b33;
    background-image: none;
  }
  
  .card {
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
</style>