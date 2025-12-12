/* --------------------------
   COUNTDOWN TIMER
--------------------------- */
function startCountdown() {
  const eventDate = new Date("2025-12-28T10:00:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = eventDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `
      <div class="flex justify-center gap-3 md:gap-4 flex-wrap">
        ${countBox(d,"Days")}
        ${countBox(h,"Hours")}
        ${countBox(m,"Minutes")}
        ${countBox(s,"Seconds")}
      </div>
    `;
  }

  function countBox(num, label) {
    return `
      <div class="flex flex-col items-center justify-center p-2 bg-purple-100 rounded-md shadow-inner">
        <span class="text-2xl md:text-3xl font-bold text-purple-800">${String(num).padStart(2,'0')}</span>
        <span class="text-xs md:text-sm text-gray-600">${label}</span>
      </div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* --------------------------
   CONFETTI GENERATION
--------------------------- */
function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["bg-yellow-300","bg-pink-300","bg-purple-300","bg-blue-300","bg-red-300","bg-green-300"];

  for (let i = 0; i < 50; i++) {
    const el = document.createElement("div");
    el.className = `confetti w-${Math.random() > 0.5 ? "2" : "3"} h-${Math.random() > 0.5 ? "2" : "3"} ${colors[Math.floor(Math.random()*colors.length)]}`;
    el.style.left = Math.random() * 100 + "%";
    el.style.top = "-" + Math.random() * 20 + "%";
    el.style.setProperty("--drift", (Math.random() - 0.5) * 30 + "vw");
    el.style.animationDuration = 5 + Math.random() * 5 + "s";
    el.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(el);
  }
}

/* --------------------------
   BURST PARTICLES
--------------------------- */
function createBursts() {
  const positions = [
    { top:"10%", left:"20%" },
    { top:"30%", right:"15%" },
    { bottom:"20%", left:"10%" },
    { top:"50%", left:"50%" },
    { bottom:"5%", right:"30%" },
    { top:"25%", left:"70%" },
    { bottom:"40%", right:"5%" },
    { top:"65%", left:"15%" }
  ];

  const container = document.getElementById("burst-container");

  positions.forEach(p => {
    const el = document.createElement("div");
    el.className = "burst";
    Object.assign(el.style, p);
    el.style.animationDuration = (2.5 + Math.random()) + "s";
    container.appendChild(el);
  });
}

/* INIT EVERYTHING */
startCountdown();
createConfetti();
createBursts();
