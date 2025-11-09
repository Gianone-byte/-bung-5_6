<script>
  import movies from '$data/movies.json';
  import MovieCard from '$components/MovieCard.svelte';

  const totalMinutes = movies.reduce((sum, movie) => {
    const numeric = parseInt(movie.length, 10);
    return sum + (Number.isNaN(numeric) ? 0 : numeric);
  }, 0);
</script>

<section class="py-5">
  <div class="container">
    <div class="row align-items-center g-3 mb-4">
      <div class="col-md">
        <h2 class="display-5 fw-bold">AI-Curated Watchlist</h2>
        <p class="text-secondary mb-0">
          Daten und Bilder generiert mit ChatGPT und DALL·E. Eine kuratierte Auswahl aus fiktiven Welten, perfekt
          für den nächsten Movie-Marathon.
        </p>
      </div>
      <div class="col-md-auto text-md-end">
        <div class="d-inline-flex flex-column align-items-md-end gap-1 text-secondary small">
          <span class="badge text-bg-light text-dark text-uppercase">{movies.length} Filme</span>
          <span>Gesamtlaufzeit: {totalMinutes} Minuten</span>
        </div>
      </div>
    </div>

    <div class="row g-4">
      {#each movies as movie}
        <div class="col-12 col-sm-6 col-lg-4 col-xxl-3">
          <MovieCard {movie} />
        </div>
      {/each}
    </div>
  </div>
</section>
