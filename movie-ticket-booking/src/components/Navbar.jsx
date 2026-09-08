import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const Navbar = () => {
  const location = useLocation();
  const { bookingQueue, queueVersion } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const queueCount = bookingQueue.size();

  const navItems = [
    { label: 'Movies', path: '/' },
    { label: 'Seat Selection', path: '/seats' },
    { label: 'Booking Queue', path: '/queue', badge: queueCount > 0 ? queueCount : null },
    { label: 'Tickets', path: '/confirmation' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C10]/90 backdrop-blur-md border-b border-surface-600/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-6 h-6 text-surface-900" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 3v2h-2V3H8v2H6V3H4v18h2v-2h2v2h8v-2h2v2h2V3h-2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/>
            </svg>
          </div>
          <div>
            <span className="text-xl font-bold font-syne tracking-wider text-white flex items-center gap-1">
              CINÉ<span className="text-gold-500">PULSE</span>
            </span>
            <span className="block text-[10px] tracking-widest text-slate-400 font-medium uppercase -mt-1">
              Cinema OS
            </span>
          </div>
        </Link>

        {/* Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-surface-800/80 p-1.5 rounded-full border border-surface-600/40">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gold-500 text-surface-950 font-semibold shadow-md shadow-gold-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-surface-700/50'
                }`}
              >
                {item.label}
                {item.badge !== null && item.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive ? 'bg-surface-950 text-gold-400' : 'bg-gold-500 text-surface-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Profile */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-surface-800 border border-surface-600/50 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500/60 w-44 transition-all focus:w-56"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-surface-600/40">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-surface-800 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-xs shadow-inner">
              AM
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-850 border-b border-surface-600 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname === item.path
                  ? 'bg-gold-500 text-surface-950 font-bold'
                  : 'text-slate-300 hover:bg-surface-700'
              }`}
            >
              {item.label}
              {item.badge && <span className="ml-2 px-2 py-0.5 text-xs bg-gold-400 text-surface-950 rounded-full font-bold">{item.badge}</span>}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
