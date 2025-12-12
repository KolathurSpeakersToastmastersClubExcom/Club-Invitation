
import React, { useState, useEffect } from 'react';

// Helper component for animating "bursting" particles
const BurstParticle: React.FC<{ delay: string, duration: string, position: string }> = ({ delay, duration, position }) => {
  return (
    <div
      className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-400 opacity-0 animate-ping-fade`}
      style={{
        animationDelay: delay,
        animationDuration: duration,
        ...JSON.parse(position) // e.g., { top: '10%', left: '20%' }
      }}
    ></div>
  );
};

// Helper component for animated confetti
const ConfettiParticle: React.FC<{ delay: string; duration: string; size: string; color: string; startPosition: string; driftXFactor: number }> = ({
  delay,
  duration,
  size,
  color,
  startPosition,
  driftXFactor,
}) => {
  const parsedStartPosition = JSON.parse(startPosition);
  return (
    <div
      className={`absolute opacity-0 animate-fall-confetti ${size} ${color}`}
      style={{
        animationDelay: delay,
        animationDuration: duration,
        ...parsedStartPosition,
        '--random-x': driftXFactor, // Set CSS variable for horizontal drift
      } as React.CSSProperties} // Cast to React.CSSProperties to allow custom CSS variables
    ></div>
  );
};

// Countdown Timer Component
const Countdown: React.FC = () => {
  const eventDate = new Date('2025-12-28T10:00:00').getTime(); // December 28, 2025, 10:00 AM

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fix: Replaced `JSX.Element` with `React.ReactElement` for type clarity and to resolve potential namespace issues.
  const timerComponents: React.ReactElement[] = [];

  Object.entries(timeLeft).forEach(([unit, value]) => {
    if (value > 0 || (unit === 'seconds' && Object.values(timeLeft).every(val => val === 0))) {
      timerComponents.push(
        <div key={unit} className="flex flex-col items-center justify-center p-2 bg-purple-100 rounded-md shadow-inner">
          <span className="text-2xl md:text-3xl font-bold text-purple-800">{String(value).padStart(2, '0')}</span>
          <span className="text-xs md:text-sm text-gray-600">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
        </div>
      );
    }
  });

  return (
    <div className="my-6">
      {Object.values(timeLeft).some(val => val > 0) ? (
        <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
          {timerComponents}
        </div>
      ) : (
        <p className="text-xl md:text-2xl font-bold text-green-700 animate-pulse">Event is LIVE!</p>
      )}
    </div>
  );
};


function App() {
  const mapLink = "https://maps.google.com/?q=46F4+R49,Thillai+Nagar,Kolathur,Chennai";
  const registrationLink = "https://forms.gle/Z3pwSDHKcykPBvRB7";
  const celebrationContentTop = `
    We’re excited to announce that Kolathur Toastmasters is officially becoming a chartered club! 🎉
  `;
  const celebrationContentBottom = `
    Join us as we celebrate this milestone, connect with fellow members, and enjoy an inspiring session with great speakers.
    Please fill in the form to confirm your participation.
    Your presence will make the occasion truly special.
    Looking forward to celebrating together! ✨
  `;

  const particlePositions = [
    { top: '10%', left: '20%', delay: '0s', duration: '3s' },
    { top: '30%', right: '15%', delay: '0.5s', duration: '3.2s' },
    { bottom: '20%', left: '10%', delay: '1s', duration: '2.8s' },
    { top: '50%', left: '50%', delay: '1.5s', duration: '3.5s' },
    { bottom: '5%', right: '30%', delay: '2s', duration: '3s' },
    { top: '25%', left: '70%', delay: '2.3s', duration: '3.1s' },
    { bottom: '40%', right: '5%', delay: '2.8s', duration: '2.9s' },
    { top: '65%', left: '15%', delay: '3.2s', duration: '3.3s' },
  ];

  const confettiColors = ['bg-yellow-300', 'bg-pink-300', 'bg-purple-300', 'bg-blue-300', 'bg-red-300', 'bg-green-300'];
  const confettiShapes = ['rounded-full', 'rounded-sm'];
  const numConfetti = 50; // Number of confetti particles

  const confettiParticles = Array.from({ length: numConfetti }).map((_, i) => {
    const delay = `${Math.random() * 5}s`;
    const duration = `${5 + Math.random() * 5}s`;
    const size = Math.random() < 0.5 ? 'w-2 h-2' : 'w-3 h-3';
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
    const startPosition = JSON.stringify({
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 20}%`, // Start slightly above the viewport
      transform: `rotate(${Math.random() * 360}deg)`,
    });
    const driftXFactor = (Math.random() - 0.5) * 30; // Random value between -15 and 15

    return (
      <ConfettiParticle
        key={`confetti-${i}`}
        delay={delay}
        duration={duration}
        size={`${size} ${shape}`}
        color={color}
        startPosition={startPosition}
        driftXFactor={driftXFactor}
      />
    );
  });

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">
      {/* Background with color changing flash effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-800 animate-gradient-shift"></div>

      {/* Layer 1: Subtle pulsating color overlay */}
      <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse-slow"></div>

      {/* Layer 2: More vibrant pulsating color overlay */}
      <div className="absolute inset-0 bg-green-500 opacity-15 animate-pulse-slower delay-700"></div>

      {/* Layer 3: Red pulsating color overlay */}
      <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse-slowest delay-1500"></div>

      {/* Ethereal Drifting Orb (Simulated Parallax) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-purple-400/50 to-pink-400/50 blur-3xl opacity-30 animate-drift-orb z-0"
           style={{animationDelay: '0.5s', animationDuration: '25s'}}></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-tl from-blue-400/50 to-indigo-400/50 blur-3xl opacity-30 animate-drift-orb-alt z-0"
           style={{animationDelay: '2s', animationDuration: '30s'}}></div>


      {/* "Propoller bursting effects" - simulated with animating particles */}
      {particlePositions.map((p, index) => (
        <BurstParticle
          key={`burst-${index}`}
          delay={p.delay}
          duration={p.duration}
          position={JSON.stringify({
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            transform: 'translate(-50%, -50%)',
          })}
        />
      ))}

      {/* Animated Confetti particles */}
      {confettiParticles}

      {/* Main content card */}
      <div className="relative z-10 w-full max-w-sm md:max-w-lg lg:max-w-xl bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 md:p-8 text-center text-gray-800 border border-gray-200">
        <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4 drop-shadow-md">
          Kolathur Toastmasters Club – Chartering Ceremony
        </h1>

        {/* Countdown Timer */}
        <Countdown />

        <p className="text-base md:text-lg leading-relaxed mb-4 px-2 md:px-4">
          {celebrationContentTop}
        </p>

        <div className="text-left text-gray-700 mt-4 mb-6 space-y-2">
          <p className="text-base md:text-lg">
            <span className="font-semibold text-purple-700">📅 Date:</span> 28th December 2025
          </p>
          <p className="text-base md:text-lg">
            <span className="font-semibold text-purple-700">🕒 Time:</span> 10:00 AM to 2:00 PM
          </p>
          <p className="text-base md:text-lg">
            <span className="font-semibold text-purple-700">📍 Venue:</span> P.A. Mahal, Thillai Nagar, Kolathur, Chennai – 600099
          </p>
          <p className="text-base md:text-lg">
            <span className="font-semibold text-purple-700">💵 Entry Fee:</span> ₹200 per person
          </p>
          <p className="text-sm italic text-gray-600 px-2">
            (Guests & Visiting Toastmasters)
          </p>
        </div>

        <p className="text-base md:text-lg leading-relaxed mb-6 px-2 md:px-4">
          {celebrationContentBottom}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          {/* Map Link */}
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="View event location on Google Maps"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            View Location
          </a>

          {/* Registration Link */}
          <a
            href={registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-teal-700 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            aria-label="Register for the club chartering ceremony"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v1H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-3V3a1 1 0 10-2 0v1H9zM7 8H5v10h10V8h-2v4a1 1 0 11-2 0V8H9v4a1 1 0 11-2 0V8z" clipRule="evenodd" />
            </svg>
            Register Now
          </a>
        </div>
      </div>

      {/* Custom styles for animations that cannot be fully expressed by default Tailwind classes
          In a full project, these would be in tailwind.config.js for custom keyframes.
          We define them here as an internal <style> tag to meet the 'single file' requirement
          while providing the requested animation complexity. */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
        @keyframes ping-fade {
          0% {
            transform: scale(0.2);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes drift-orb {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20%, 10%) scale(1.1); }
          50% { transform: translate(0%, 20%) scale(0.9); }
          75% { transform: translate(-20%, 10%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes drift-orb-alt {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-25%, -15%) scale(0.95); }
          50% { transform: translate(-10%, 0%) scale(1.1); }
          75% { transform: translate(15%, -10%) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes fall-confetti {
          0% {
            transform: translateY(-100%) translateX(0%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(calc(var(--random-x) * 1vw)) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        .animate-pulse-slowest {
          animation: pulse-slowest 10s ease-in-out infinite;
        }
        .animate-ping-fade {
          animation: ping-fade 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-drift-orb {
          animation: drift-orb var(--animation-duration, 20s) ease-in-out infinite;
        }
        .animate-drift-orb-alt {
          animation: drift-orb-alt var(--animation-duration, 25s) ease-in-out infinite;
        }
        .animate-fall-confetti {
          animation: fall-confetti var(--animation-duration, 8s) linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
