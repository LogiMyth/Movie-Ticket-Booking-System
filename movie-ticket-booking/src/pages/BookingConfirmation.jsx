// BookingConfirmation component
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const BookingConfirmation = () => {
  const { lastConfirmedBooking, selectedMovie, selectedShowtime, selectedDate } = useBooking();

  const ticket = lastConfirmedBooking || {
    id: 'REQ-8492',
    customerName: 'Alex Mercer',
    movieTitle: selectedMovie?.title || 'Dune: Part Three',
    showTime: `${selectedDate} • ${selectedShowtime?.time || '18:00'}`,
    seats: [
      { id: 'E6', tierName: 'Premium', price: 22.00 },
      { id: 'E7', tierName: 'Premium', price: 22.00 }
    ],
    totalAmount: 47.50,
    status: 'CONFIRMED'
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 pb-16">
      {/* Top Banner */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-bold shadow-xl shadow-emerald-500/10">
          ✓
        </div>
        <h1 className="text-3xl font-extrabold font-syne text-white tracking-tight">
          Booking Confirmed!
        </h1>
        <p className="text-xs text-slate-300">
          Your reservation has been processed through the FIFO Queue and registered in the 2D Matrix engine.
        </p>
      </div>

      {/* Ticket Card Component (Matching Stitch Screen 5 Ticket Design) */}
      <div className="bg-surface-800 border border-surface-600/50 rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Ticket Header Gradient */}
        <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-amber-500 p-6 text-surface-950 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono font-extrabold tracking-widest opacity-80">
              CINÉPULSE DIGITAL PASS
            </div>
            <div className="text-xl font-black font-syne tracking-wide">
              {ticket.movieTitle}
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-black px-3 py-1 bg-surface-950/20 rounded-full">
              IMAX 3D
            </span>
          </div>
        </div>

        {/* Ticket Body Content */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs border-b border-surface-600/40 pb-6">
            <div>
              <span className="text-slate-400 block font-medium">Ticket ID</span>
              <span className="font-mono font-bold text-gold-400 text-sm">{ticket.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Customer</span>
              <span className="font-bold text-white text-sm">{ticket.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Showtime</span>
              <span className="font-semibold text-slate-200">{ticket.showTime}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Seats Reserved</span>
              <span className="font-mono font-bold text-gold-400 text-sm">
                {ticket.seats.map(s => s.id).join(', ')}
              </span>
            </div>
          </div>

          {/* QR Code & Barcode Placeholder Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-surface-900/80 p-6 rounded-2xl border border-surface-600/50">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-slate-300">Scan at Entry Gate</div>
              <div className="text-[11px] text-slate-500 font-mono">Present this digital barcode at Screen 1 entrance</div>
              <div className="text-xs font-mono text-emerald-400 font-bold mt-2">
                Total Paid: ${ticket.totalAmount.toFixed(2)}
              </div>
            </div>

            {/* QR Mockup */}
            <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-full h-full text-surface-950" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v10H40zM50 30h10v10H50zM30 50h10v10H30zM70 70h10v10H70zM90 90h10v10H90zM60 80h20v10H60z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Ticket Perforated Edge Divider */}
        <div className="relative border-t border-dashed border-surface-600/60 my-2">
          <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-[#0B0C10]" />
          <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-[#0B0C10]" />
        </div>

        <div className="p-6 bg-surface-850/60 flex items-center justify-between text-xs">
          <span className="text-slate-400">DSA Phase 1 Verification Passed</span>
          <Link to="/" className="text-gold-400 hover:underline font-bold">
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
