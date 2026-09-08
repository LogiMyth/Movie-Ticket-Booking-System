import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ROW_LABELS, SeatMatrix } from '../dsa/SeatMatrix';


export const SeatSelection = () => {
  const {
    selectedMovie,
    selectedShowtime,
    selectedDate,
    seatMatrix,
    handleToggleSeat,
    handleAutoSelectSeats,
    handleClearSelection,
    selectedSeats,
    subtotal,
    matrixStats,
    submitBookingToQueue,
    processNextInQueue
  } = useBooking();

  const navigate = useNavigate();
  const [autoCount, setAutoCount] = useState(2);
  const [autoNotice, setAutoNotice] = useState('');

  const handleAutoSelect = () => {
    const result = handleAutoSelectSeats(autoCount);
    if (result) {
      setAutoNotice(`Auto-selected ${autoCount} consecutive seats in Row ${result.row} (Cols ${result.startCol}-${result.endCol})`);
    } else {
      setAutoNotice(`Could not find ${autoCount} consecutive seats available.`);
    }
  };

  const handleConfirmAndProceed = () => {
    if (selectedSeats.length === 0) return;
    submitBookingToQueue('Alex Mercer');
    // Auto trigger FIFO queue processing for live interactive feel
    setTimeout(() => {
      processNextInQueue();
    }, 500);
    navigate('/queue');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-800/60 border border-surface-600/40 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold uppercase tracking-wider mb-1">
            <span>Seat Matrix Selection</span>
            <span>•</span>
            <span className="text-slate-400">2D Matrix Engine</span>
          </div>
          <h1 className="text-2xl font-bold font-syne text-white">
            {selectedMovie.title}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            {selectedDate} • {selectedShowtime?.time} ({selectedShowtime?.type}) • {selectedShowtime?.hall}
          </p>
        </div>

        {/* DSA Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-surface-900/80 p-2 rounded-2xl border border-surface-600/50">
          <div className="flex items-center gap-2 pl-2">
            <span className="text-xs text-slate-300 font-medium">Auto-Select:</span>
            <select
              value={autoCount}
              onChange={(e) => setAutoCount(Number(e.target.value))}
              className="bg-surface-800 text-xs font-bold text-gold-400 border border-surface-600/60 rounded-lg px-2 py-1 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n} Seats</option>
              ))}
            </select>
            <button
              onClick={handleAutoSelect}
              className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-surface-950 font-bold text-xs rounded-lg transition-all"
            >
              Find Best
            </button>
          </div>

          {selectedSeats.length > 0 && (
            <button
              onClick={handleClearSelection}
              className="px-3 py-1.5 bg-surface-800 hover:bg-ruby-600 text-slate-300 hover:text-white font-semibold text-xs rounded-lg transition-all border border-surface-600/50"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {autoNotice && (
        <div className="p-3 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs rounded-xl flex items-center justify-between">
          <span>⚡ {autoNotice}</span>
          <button onClick={() => setAutoNotice('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Grid + Sidebar Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Seat Matrix 2D Grid Column */}
        <div className="lg:col-span-8 bg-surface-900/90 border border-surface-600/40 rounded-3xl p-6 sm:p-8 space-y-8 flex flex-col items-center overflow-x-auto">
          
          {/* Cinema Screen Arc (Curved Screen graphic from Stitch) */}
          <div className="w-full max-w-lg space-y-2 text-center">
            <div className="relative h-12 w-full flex items-center justify-center">
              <svg className="w-full h-full text-gold-500/40" viewBox="0 0 500 40" fill="none">
                <path
                  d="M 10 35 Q 250 5 490 35"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-transparent blur-md -z-10" />
            </div>
            <span className="text-[11px] font-syne uppercase tracking-widest text-slate-400 font-bold block">
              CINEMA SCREEN THIS WAY
            </span>
          </div>

          {/* 10 x 14 Matrix Render */}
          <div className="space-y-2 py-4">
            {/* Column Numbers Header */}
            <div className="flex items-center gap-1.5 sm:gap-2 pl-8 pr-2 mb-3 text-[10px] font-mono text-slate-500 font-bold">
              {Array.from({ length: 14 }, (_, i) => i + 1).map(num => (
                <div key={num} className={`w-6 sm:w-8 text-center ${[3, 11].includes(num) ? 'mr-3 sm:mr-5' : ''}`}>
                  {num}
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            {seatMatrix.grid.map((row, r) => {
              const rowLabel = ROW_LABELS[r];
              const tier = SeatMatrix.getSeatTier(r);
              
              return (
                <div key={rowLabel} className="flex items-center gap-1.5 sm:gap-2">
                  {/* Row Label */}
                  <span className="w-6 text-xs font-mono font-bold text-slate-400 text-center shrink-0">
                    {rowLabel}
                  </span>

                  {/* 14 Seats in Row with 3-8-3 Aisle Split */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {row.map((state, c) => {
                      const colNum = c + 1;
                      const isAisleGap = colNum === 3 || colNum === 11;
                      
                      let stateStyle = "bg-surface-800 text-slate-400 border-surface-600/60 hover:border-gold-500 hover:text-white";
                      let icon = `${rowLabel}${colNum}`;

                      if (state === 1) {
                        // BOOKED
                        stateStyle = "bg-surface-950 text-slate-600 border-surface-700/50 cursor-not-allowed opacity-60";
                        icon = "✕";
                      } else if (state === 2) {
                        // SELECTED
                        stateStyle = "bg-gold-500 text-surface-950 font-bold border-gold-400 shadow-lg shadow-gold-500/30 scale-105";
                      }

                      return (
                        <React.Fragment key={c}>
                          <button
                            disabled={state === 1}
                            onClick={() => handleToggleSeat(r, c)}
                            title={`${rowLabel}${colNum} - ${tier.name} ($${tier.price.toFixed(2)})`}
                            className={`w-6 sm:w-8 h-7 sm:h-9 rounded-md sm:rounded-lg border text-[10px] sm:text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center ${stateStyle}`}
                          >
                            {icon}
                          </button>
                          {isAisleGap && <div className="w-3 sm:w-5 shrink-0" />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend Bar (Matching Stitch design) */}
          <div className="pt-6 border-t border-surface-600/40 w-full flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-surface-800 border border-surface-600" />
              <span>Available ($18.50 - $32)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gold-500 border border-gold-400 shadow-sm" />
              <span className="font-semibold text-gold-400">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-surface-950 border border-surface-700 text-slate-600 text-[10px] flex items-center justify-center">✕</div>
              <span className="text-slate-500">Booked</span>
            </div>
          </div>
        </div>

        {/* Sidebar Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Booking Summary Box (Stitch Sidebar) */}
          <div className="bg-surface-800/80 border border-surface-600/40 rounded-3xl p-6 space-y-6">
            <h3 className="text-lg font-bold font-syne text-white border-b border-surface-600/40 pb-4">
              Booking Summary
            </h3>

            {/* Selected Seats Pill List */}
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Selected Seats ({selectedSeats.length})
              </div>

              {selectedSeats.length === 0 ? (
                <div className="p-4 rounded-xl bg-surface-900/50 border border-dashed border-surface-600/50 text-center text-xs text-slate-500">
                  Click on available seats in the matrix or use "Auto-Select" above
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedSeats.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-surface-900 border border-surface-600/50 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center font-mono font-bold">
                          {s.id}
                        </span>
                        <div>
                          <div className="font-bold text-white">{s.tierName} Seat</div>
                          <div className="text-[10px] text-slate-400">Row {s.rowLabel}, Col {s.colNumber}</div>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-gold-400">${s.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 pt-4 border-t border-surface-600/40 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Tickets Subtotal</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Convenience Fee</span>
                <span className="font-mono text-white">$3.50</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-surface-600/40">
                <span>Total Payable</span>
                <span className="font-mono text-gold-400">${(subtotal > 0 ? subtotal + 3.50 : 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Submit to FIFO Queue Action Button */}
            <button
              disabled={selectedSeats.length === 0}
              onClick={handleConfirmAndProceed}
              className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xl ${
                selectedSeats.length > 0
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-surface-950 shadow-gold-500/20'
                  : 'bg-surface-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Submit to Booking Queue</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Matrix Stats Widget */}
          <div className="bg-surface-800/40 border border-surface-600/30 rounded-2xl p-5 text-xs space-y-3">
            <div className="font-syne font-bold text-white uppercase tracking-wider text-[11px]">
              Matrix DSA Metrics
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-surface-900 p-2 rounded-xl">
                <div className="text-[10px] text-slate-400">Available</div>
                <div className="font-mono font-bold text-emerald-400">{matrixStats.available}</div>
              </div>
              <div className="bg-surface-900 p-2 rounded-xl">
                <div className="text-[10px] text-slate-400">Booked</div>
                <div className="font-mono font-bold text-slate-400">{matrixStats.booked}</div>
              </div>
              <div className="bg-surface-900 p-2 rounded-xl">
                <div className="text-[10px] text-slate-400">Selected</div>
                <div className="font-mono font-bold text-gold-400">{matrixStats.selected}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
