import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { MovieCard } from '../components/MovieCard';

export const Home = () => {
  const { MOVIES, setSelectedMovie } = useBooking();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredMovie = MOVIES[0];

  const categories = ['All', 'IMAX 3D', 'Dolby Cinema', '70mm IMAX', 'Sci-Fi', 'Action'];

  const filteredMovies = MOVIES.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && (movie.format.includes(activeCategory) || movie.genre.includes(activeCategory));
  });

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Banner (Stitch Screen 1) */}
      <section className="relative rounded-3xl overflow-hidden bg-surface-900 border border-surface-600/40 shadow-2xl min-h-[460px] flex items-end">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={featuredMovie.backdrop}
            alt={featuredMovie.title}
            className="w-full h-full object-cover object-center brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-950/80 to-transparent w-2/3" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gold-500 text-surface-950 text-xs font-bold rounded-full uppercase tracking-wider">
              Featured Premiere
            </span>
            <span className="px-3 py-1 bg-surface-950/80 text-gold-400 text-xs font-semibold rounded-full border border-gold-500/30">
              {featuredMovie.format}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold font-syne text-white tracking-tight leading-none">
            {featuredMovie.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base line-clamp-3 leading-relaxed">
            {featuredMovie.synopsis}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-300 pt-2">
            <span>Rating: <strong className="text-gold-400 font-bold">{featuredMovie.rating}★</strong></span>
            <span>•</span>
            <span>Duration: {featuredMovie.duration}</span>
            <span>•</span>
            <span>Director: {featuredMovie.director}</span>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <a
              href="#movies-grid"
              onClick={() => setSelectedMovie(featuredMovie)}
              className="px-6 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-surface-950 font-bold rounded-xl text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-gold-500/20 flex items-center gap-2"
            >
              <span>Get Tickets</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section id="movies-grid" className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-syne text-white tracking-wide">
              Now Showing <span className="text-gold-500 font-normal">({filteredMovies.length})</span>
            </h2>
            <p className="text-xs text-slate-400">Select a movie to choose seats and view live showtimes</p>
          </div>

          {/* Search box */}
          <div className="w-full md:w-auto flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search title, genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-800 border border-surface-600/60 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500/80"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Pill Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-surface-950 shadow-md shadow-gold-500/20'
                  : 'bg-surface-800 text-slate-300 hover:bg-surface-700 hover:text-white border border-surface-600/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Perks Section (from Stitch Home design) */}
      <section className="bg-surface-800/40 border border-surface-600/30 rounded-3xl p-8 sm:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-syne font-bold text-white text-base mb-1">2D Matrix Allocation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant matrix lookup algorithm guarantees real-time seat status across 140 cinema seats.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-syne font-bold text-white text-base mb-1">FIFO Queue Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fair linked-list queue structure guarantees request processing in exact order of submission.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <h4 className="font-syne font-bold text-white text-base mb-1">Auto Consecutive Seats</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart sliding window algorithm finds optimal adjoining seats for couples and groups.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
