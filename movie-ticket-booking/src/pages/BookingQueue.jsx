import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const BookingQueue = () => {
  const navigate = useNavigate();
  const {
    bookingQueue,
    queueVersion,
    processNextInQueue,
    processingRequest,
    lastConfirmedBooking,
    selectedMovie
  } = useBooking();

  const queueItems = bookingQueue.toArray();
  const queueLength = bookingQueue.size();

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface-800/60 border border-surface-600/40 p-6 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold uppercase tracking-wider mb-1">
            <span>FIFO Booking Engine</span>
            <span>•</span>
            <span className="text-slate-400">Linked-List Queue DSA</span>
          </div>
          <h1 className="text-2xl font-bold font-syne text-white">
            Booking Request Processing Queue
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Requests are enqueued and dequeued strictly in First-In-First-Out order to guarantee fair seat reservations.
          </p>
        </div>

        {/* Manual Process Trigger (For testing/demo) */}
        <button
          onClick={processNextInQueue}
          disabled={queueLength === 0 || processingRequest !== null}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-lg ${
            queueLength > 0 && !processingRequest
              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-surface-950 shadow-gold-500/20 hover:scale-105'
              : 'bg-surface-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Process Next in Queue</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Active Processing Card (Stitch Screen 4) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface-800/90 border border-surface-600/40 rounded-3xl p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-600/40 pb-4">
              <h2 className="text-lg font-bold font-syne text-white flex items-center gap-2">
                <span>Head of Queue Processing</span>
                <span className="text-xs text-slate-400 font-sans font-normal">(O(1) Dequeue)</span>
              </h2>
              {processingRequest ? (
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold rounded-full animate-pulse flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  PROCESSING NOW
                </span>
              ) : (
                <span className="px-3 py-1 bg-surface-700 text-slate-400 text-xs font-medium rounded-full">
                  IDLE / WAITING
                </span>
              )}
            </div>

            {processingRequest ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-5 rounded-2xl bg-surface-900/90 border border-gold-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider">Request ID</span>
                      <div className="text-lg font-bold font-mono text-white">{processingRequest.id}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Customer</span>
                      <div className="text-sm font-bold text-slate-200">{processingRequest.customerName}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-3 border-y border-surface-600/40 text-xs">
                    <div>
                      <span className="text-slate-400 block">Movie</span>
                      <span className="font-bold text-white font-syne">{processingRequest.movieTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Showtime</span>
                      <span className="font-semibold text-slate-300">{processingRequest.showTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Reserved Seats</span>
                      <span className="font-mono font-bold text-gold-400">
                        {processingRequest.seats.map(s => s.id).join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Total Amount</span>
                      <span className="font-mono font-bold text-emerald-400">${processingRequest.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Verifying Seat Matrix Lock & Payment...</span>
                      <span className="font-mono text-gold-400 font-bold">75%</span>
                    </div>
                    <div className="w-full bg-surface-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-gold-500 to-amber-400 h-full w-3/4 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ) : lastConfirmedBooking ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-base font-bold font-syne text-white">Latest Booking Confirmed!</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Request <strong className="font-mono text-gold-400">{lastConfirmedBooking.id}</strong> has been successfully booked in the matrix.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/confirmation')}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-surface-950 font-bold text-xs rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                >
                  View Digital Ticket
                </button>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-surface-900/50 border border-dashed border-surface-600/50 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-surface-800 text-slate-400 flex items-center justify-center mx-auto text-lg font-bold">
                  ⏳
                </div>
                <h3 className="text-sm font-bold text-slate-300">No Request Currently Processing</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Submit a seat booking from the matrix page to populate the FIFO linked-list queue.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Waiting Queue List Column (Stitch Queue Cards) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-800/80 border border-surface-600/40 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-600/40 pb-3">
              <h3 className="text-base font-bold font-syne text-white flex items-center gap-2">
                <span>Waiting Queue</span>
                <span className="px-2 py-0.5 bg-gold-500 text-surface-950 font-bold text-[10px] rounded-full">
                  {queueLength}
                </span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">FIFO Linked List</span>
            </div>

            {queueLength === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                <div>Queue is empty</div>
                <button
                  onClick={() => navigate('/seats')}
                  className="text-gold-400 hover:underline font-semibold"
                >
                  + Go to Seat Matrix to add a booking
                </button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {queueItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-surface-900 border border-surface-600/50 flex items-center justify-between space-x-3 transition-all hover:border-gold-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-surface-800 border border-surface-600/60 font-mono font-bold text-gold-400 flex items-center justify-center text-xs shrink-0">
                        #{item.queuePosition}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-mono">{item.id}</div>
                        <div className="text-[11px] text-slate-400">{item.customerName} • {item.seats.length} seats</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-gold-400">${item.totalAmount.toFixed(2)}</div>
                      <span className="text-[9px] px-2 py-0.5 bg-surface-800 text-amber-400 rounded-full uppercase tracking-wider font-semibold">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
