import Show from '../../models/Show.js';
import Movie from '../../models/Movie.js';

/**
 * Get all seats for a specific show (Hardcoded for DHURANDHAR for now as per UI)
 */
export const getSeats = async () => {
  // Find or create a default movie and show for the UI
  let movie = await Movie.findOne({ title: 'DHURANDHAR' });
  if (!movie) {
    movie = await Movie.create({
      title: 'DHURANDHAR',
      description: 'Action Thriller',
      duration: 165,
      genre: ['Action', 'Thriller'],
    });
  }

  let show = await Show.findOne({ movie: movie._id });
  if (!show) {
    show = await Show.create({
      movie: movie._id,
      theater: 'DLF Promenade',
      startTime: new Date(),
      price: 250,
      totalSeats: 25,
      availableSeats: Array.from({ length: 25 }, (_, i) => i + 1),
    });
  }

  // Map to the format frontend expects
  const seats = [];
  for (let i = 1; i <= show.totalSeats; i++) {
    seats.push({
      id: i,
      isbooked: show.availableSeats.includes(i) ? 0 : 1,
    });
  }
  return seats;
};

/**
 * Get Trending Movies from OMDb API
 */
export const getTrendingMovies = async () => {
  try {
    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
      console.warn("OMDB_API_KEY is not defined in .env");
      throw new Error("Missing API Key");
    }

    // High-profile recent/popular movie IMDb IDs to simulate a "trending" feed
    const trendingIds = [
      'tt15239678', // Dune: Part Two
      'tt15398776', // Oppenheimer
      'tt1630029',  // Avatar: The Way of Water
      'tt1877830',  // The Batman
      'tt9362722'   // Spider-Man: Across the Spider-Verse
    ];

    const moviePromises = trendingIds.map(id =>
      fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}`).then(res => res.json())
    );

    const moviesData = await Promise.all(moviePromises);

    return moviesData
      .filter(movie => movie.Response === "True")
      .map(movie => ({
        title: movie.Title,
        year: movie.Year,
        genre: movie.Genre,
        poster: movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'
      }));

  } catch (error) {
    console.error("Error fetching movies from OMDb:", error.message);
    // Fallback data in case the API fails
    return [
      {
        title: 'Avatar: Fire and Ash',
        year: '2025',
        genre: 'Sci-Fi • Action',
        poster: 'https://m.media-amazon.com/images/M/MV5BNmU5YzE1N2EtYzUyNy00YTliLTk3YmYtY2RkYjM4YzVjNjY4XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'
      },
      {
        title: 'Avengers: Doomsday',
        year: '2026',
        genre: 'Action • Adventure',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMwMDM5NjY0OF5BMl5BanBnXkFtZTgwNjY0Mjc2MzE@._V1_.jpg'
      },
      {
        title: 'Superman',
        year: '2025',
        genre: 'Action • Fantasy',
        poster: 'https://m.media-amazon.com/images/M/MV5BMzYwMzYyMDctZTMzZC00YmU4LWIxMDQtNjVjN2FiMDhlZjM1XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg'
      },
      {
        title: 'Jurassic World: Rebirth',
        year: '2025',
        genre: 'Adventure • Sci-Fi',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMwMDM5NjY0OF5BMl5BanBnXkFtZTgwNjY0Mjc2MzE@._V1_.jpg'
      },
      {
        title: 'Zootopia 2',
        year: '2025',
        genre: 'Animation • Comedy',
        poster: 'https://m.media-amazon.com/images/M/MV5BMjMwMDM5NjY0OF5BMl5BanBnXkFtZTgwNjY0Mjc2MzE@._V1_.jpg'
      }
    ];
  }
};
