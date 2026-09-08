import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { SeatSelection } from './pages/SeatSelection';
import { BookingQueue } from './pages/BookingQueue';
import { BookingConfirmation } from './pages/BookingConfirmation';

export function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0B0C10] text-[#E1E1ED] flex flex-col justify-between selection:bg-gold-500 selection:text-surface-950">
          <Navbar />
          
          <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie-details" element={<MovieDetails />} />
              <Route path="/seats" element={<SeatSelection />} />
              <Route path="/queue" element={<BookingQueue />} />
              <Route path="/confirmation" element={<BookingConfirmation />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;
