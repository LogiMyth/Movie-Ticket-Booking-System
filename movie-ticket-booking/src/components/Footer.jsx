// Footer component

export const Footer = () => {
  return (
    <footer className="bg-surface-900 border-t border-surface-600/40 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-surface-950 font-bold">
                CP
              </div>
              <span className="text-lg font-bold font-syne text-white tracking-wider">
                CINÉ<span className="text-gold-500">PULSE</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Next-generation movie ticket booking system powered by 2D Matrix seat allocation and FIFO booking queues.
            </p>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white uppercase tracking-wider mb-3">DSA Features</h4>
            <ul className="space-y-2">
              <li>• 2D Matrix Seat Grid (10x14)</li>
              <li>• Linked-List FIFO Booking Queue</li>
              <li>• O(R×C) Consecutive Seat Finder</li>
              <li>• Real-Time Queue Processing Engine</li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white uppercase tracking-wider mb-3">Cinemas</h4>
            <ul className="space-y-2">
              <li>IMAX 70mm Grand Dolby</li>
              <li>Dolby Atmos Experience</li>
              <li>4DX Motion Suites</li>
              <li>VIP Lounge Cinema</li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-bold text-white uppercase tracking-wider mb-3">System Info</h4>
            <p className="text-slate-400 mb-2">Phase 1 Frontend & DSA Engine</p>
            <span className="inline-block px-3 py-1 bg-surface-800 text-gold-400 font-mono text-[11px] rounded-full border border-gold-500/20">
              v1.0.0 — Phase 1 Complete
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-600/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 CinéPulse Movie Ticket Booking System. College DSA Project.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold-400 transition-colors">DSA Documentation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
