import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const MovieDetails = () => {
  const navigate = useNavigate();
  const {
    selectedMovie,
    selectedShowtime,
    setSelectedShowtime,
    selectedDate,
    setSelectedDate
  } = useBooking();

  const dates = [
    { label: 'Today', date: 'Sep 9', day: 'Wed' },
    { label: 'Tomorrow', date: 'Sep 10', day: 'Thu' },
    { label: 'Friday', date: 'Sep 11', day: 'Fri' },
    { label: 'Saturday', date: 'Sep 12', day: 'Sat' },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Movie Details Hero Banner (Stitch Screen 2) */}
      <div className="relative rounded-3xl overflow-hidden bg-surface-900 border border-surface-600/40 p-6 sm:p-10 flex flex-col lg:flex-row gap-8 items-start">
        {/* Backdrop background blur */}
        <div className="absolute inset-0 z-0">
          <img
            src={selectedMovie.backdrop}
            alt={selectedMovie.title}
            className="w-full h-full object-cover brightness-[0.2] blur-xl scale-110"
          />
        </div>

        {/* Poster Card */}
        <div className="relative z-10 w-full sm:w-64 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-surface-600/60 shrink-0">
          <img
            src={selectedMovie.poster}
            alt={selectedMovie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Column */}
        <div className="relative z-10 flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-gold-500 text-surface-950 text-xs font-bold rounded-full uppercase">
              {selectedMovie.format}
            </span>
            <span className="px-3 py-1 bg-surface-800 text-slate-300 text-xs font-semibold rounded-full border border-surface-600/50">
              {selectedMovie.ageRating}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Release: {selectedMovie.releaseYear}
            </span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-syne text-white tracking-tight">
              {selectedMovie.title}
            </h1>
            <p className="text-gold-400 font-syne text-sm sm:text-base font-semibold mt-1">
              "{selectedMovie.tagline}"
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 max-w-md py-3 px-4 bg-surface-950/60 backdrop-blur-md rounded-2xl border border-surface-600/40 text-center">
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Rating</div>
              <div className="text-lg font-bold font-syne text-gold-400">★ {selectedMovie.rating}</div>
            </div>
            <div className="border-x border-surface-600/40">
              <div className="text-xs text-slate-400 uppercase font-medium">Duration</div>
              <div className="text-lg font-bold font-syne text-white">{selectedMovie.duration}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-medium">Genre</div>
              <div className="text-xs font-bold text-slate-200 mt-1 truncate">{selectedMovie.genre[0]}</div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Synopsis</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              {selectedMovie.synopsis}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cast & Director</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-surface-800/80 rounded-lg text-xs text-gold-400 font-semibold border border-gold-500/20">
                Director: {selectedMovie.director}
              </span>
              {selectedMovie.cast.map(c => (
                <span key={c} className="px-3 py-1 bg-surface-800/60 rounded-lg text-xs text-slate-300 border border-surface-600/40">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Showtime & Date Selection Block */}
      <div className="bg-surface-800/50 rounded-3xl border border-surface-600/40 p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="text-xl font-bold font-syne text-white mb-4 flex items-center gap-2">
            <span>Select Date & Time</span>
            <span className="text-xs font-sans text-gold-500 font-medium px-2.5 py-0.5 bg-gold-500/10 rounded-full border border-gold-500/30">Step 1 of 3</span>
          </h2>

          {/* Date Picker Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {dates.map((d) => {
              const fullDateStr = `${d.label}, ${d.date}`;
              const isSelected = selectedDate === fullDateStr;
              return (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(fullDateStr)}
                  className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-gold-500 text-surface-950 border-gold-400 font-bold shadow-lg shadow-gold-500/20'
                      : 'bg-surface-800 text-slate-300 border-surface-600/50 hover:border-gold-500/50 hover:bg-surface-700'
                  }`}
                >
                  <div className="text-xs uppercase opacity-80">{d.day}</div>
                  <div className="text-lg font-bold font-syne mt-0.5">{d.date}</div>
                  <div className="text-[10px] uppercase font-semibold mt-1 opacity-90">{d.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showtimes Grid */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Available Showtimes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {selectedMovie.showtimes.map((st) => {
              const isSelected = selectedShowtime?.id === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedShowtime(st)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-32 ${
                    isSelected
                      ? 'bg-surface-750 border-gold-500 ring-2 ring-gold-500/40 shadow-xl'
                      : 'bg-surface-800/80 border-surface-600/40 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-syne text-white">{st.time}</span>
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                      isSelected ? 'bg-gold-500 text-surface-950' : 'bg-surface-700 text-slate-300'
                    }`}>
                      {st.type}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-slate-300 font-medium">{st.hall}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Dolby Atmos Surround sound</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Proceed to Seat Matrix Button */}
        <div className="pt-4 border-t border-surface-600/30 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Selected Showtime</span>
            <span className="text-sm font-bold text-gold-400 font-syne">
              {selectedDate} at {selectedShowtime?.time} ({selectedShowtime?.type})
            </span>
          </div>

          <button
            onClick={() => navigate('/seats')}
            className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-surface-950 font-bold rounded-xl text-sm uppercase tracking-wider shadow-lg shadow-gold-500/20 flex items-center gap-2 transition-all"
          >
            <span>Select Seats Matrix</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
