import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const MovieCard = ({ movie }) => {
  const { setSelectedMovie } = useBooking();

  return (
    <div className="group relative bg-surface-800/60 rounded-2xl overflow-hidden border border-surface-600/40 hover:border-gold-500/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/10 flex flex-col h-full">
      {/* Poster Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-900">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
        />
        
        {/* Format Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-surface-950/80 backdrop-blur-md rounded-full border border-gold-500/30 text-[11px] font-semibold text-gold-400">
          {movie.format}
        </div>

        {/* Rating Overlay */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-surface-950/80 backdrop-blur-md rounded-full border border-surface-600/50 text-xs font-bold text-white flex items-center gap-1">
          <span className="text-gold-400">★</span> {movie.rating}
        </div>

        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
            <span>{movie.genre.join(', ')}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>

          <h3 className="text-lg font-bold font-syne text-white group-hover:text-gold-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {movie.synopsis}
          </p>
        </div>

        {/* Showtimes Pill Strip */}
        <div className="space-y-3 pt-2 border-t border-surface-600/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Available Today</span>
            <span className="text-gold-400 font-semibold text-[11px]">Dolby Cinema</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {movie.showtimes.map((st) => (
              <span
                key={st.id}
                className="px-2.5 py-1 bg-surface-700/60 rounded-md text-[11px] font-mono text-slate-200 border border-surface-600/40 whitespace-nowrap"
              >
                {st.time}
              </span>
            ))}
          </div>

          {/* Book Action Button */}
          <Link
            to="/movie-details"
            onClick={() => setSelectedMovie(movie)}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-surface-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10 group-hover:shadow-gold-500/25"
          >
            <span>Book Tickets</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
