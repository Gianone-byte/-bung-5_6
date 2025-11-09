<script>
  export let movie;
</script>

<article class="card bg-dark border-secondary h-100 shadow-sm movie-card">
  <img src={movie.poster} alt={`Poster of ${movie.title}`} class="card-img-top poster" loading="lazy" />
  <div class="card-body d-flex flex-column gap-3">
    <div>
      <h3 class="card-title h5 mb-1">{movie.title}</h3>
      <div class="d-flex justify-content-between text-secondary small">
        <span>{movie.year}</span>
        <span>{movie.length}</span>
      </div>
    </div>
    {#if movie.genres?.length}
      <div class="d-flex flex-wrap gap-2">
        {#each movie.genres as genre}
          <span class="badge text-bg-primary opacity-75">{genre}</span>
        {/each}
      </div>
    {/if}
    {#if movie.actors?.length}
      <p class="mb-0 text-secondary small">
        <span class="text-uppercase fw-semibold text-white-50">Cast:</span>
        {movie.actors.join(', ')}
      </p>
    {/if}
  </div>
</article>

<style>
  .poster {
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .movie-card {
    transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
  }

  .movie-card:hover {
    transform: translateY(-6px);
    border-color: rgba(0, 123, 255, 0.4);
    box-shadow: 0 1rem 2rem -0.75rem rgba(0, 123, 255, 0.6);
  }
</style>
