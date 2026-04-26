import Booking from '../../models/Booking.js';
import Show from '../../models/Show.js';
import Movie from '../../models/Movie.js';

/**
 * Book a seat
 */
export const bookSeat = async (userId, seatId) => {
  const movie = await Movie.findOne({ title: 'DHURANDHAR' });
  const show = await Show.findOne({ movie: movie._id });

  if (!show) throw new Error('Show not found');
  if (!show.availableSeats.includes(Number(seatId))) {
    throw new Error('Seat already booked or invalid');
  }

  // Create booking
  const booking = await Booking.create({
    user: userId,
    show: show._id,
    seats: [Number(seatId)],
    totalPrice: show.price,
  });

  // Update available seats
  show.availableSeats = show.availableSeats.filter(s => s !== Number(seatId));
  await show.save();

  return booking;
};

/**
 * Get user bookings
 */
export const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId }).populate('show');
  
  // Map to frontend format
  return bookings.map(b => ({
    id: b.seats[0], // Frontend uses seat ID as booking ID
    movie: 'DHURANDHAR',
  }));
};
