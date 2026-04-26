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
 * Get Trending Movies
 */
export const getTrendingMovies = async () => {
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
};
