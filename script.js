// =============================
// RANDOM SONG LIST (EXACT NAMES)
// =============================
const songs = [
  "Dhairya.mp3",
  "TumPremHo.mp3",
  "Birthday.mp3",
  "Perfect.mp3"
];

// Pick ONE random song per page load
const randomSong = songs[Math.floor(Math.random() * songs.length)];

// =============================
// SECTIONS (ALL TEXT CONTENT)
// =============================
const sections = [
  { text: "Happy Birthday My Sanu Aarati. ❤️🎉🎊.\nI made this just for you.", musicButton: true },

  { text: "I Made this because Distance Makes the Quiet Moments Harder.\nNot the Big Things — Yhe Small, Everyday Ones.", musicButton: false },

  { text: "I can't Always be there in the Ways I'd Like.\nBut I'm Still Here.", musicButton: false },

  { text: "You don't have to Feel a Certain Way for Me.\nYou don't have to be Okay all the Time.", musicButton: false },

  { text: "Even from Far Away, I try to Show up — even when I don't know the Perfect Way.\nI Just Want You to know that You Matter,\nand that You're not Alone in this.", musicButton: false },

  { text: "When you feel Something and Feel Ready, just click Next.\nI Wrote Something for Each Feelings.", musicButton: false },

  { text: "🫶 When You Miss Me:\nMissing Someone Doesn’t Mean Weakness.\nIt just means Love Exists.", musicButton: false },

  { text: "🌙 When you feel Unsure:\nYou don’t need Answers Tonight.\nYou are Allowed to Rest.", musicButton: false },

  { text: "😔 When the Distance feels Heavy:\nYou don’t have to Carry it Alone.\nI’m Thinking of You.", musicButton: false },

  { text: "😊 When you’re Smiling:\nPlease don’t Hold it back.\nYour Happiness is Safe.", musicButton: false },

  { text: "Today isn’t about Distance.\nIt’s about YOU.\nAnd I’m really Glad you Exist.", musicButton: false }
];

// =============================
// ELEMENTS
// =============================
const textEl = document.getElementById("text");
const nextBtn = document.getElementById("nextBtn");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

// Inject random song into audio
bgMusic.src = randomSong;

// =============================
// STATE
// =============================
let currentSection = 0;
let musicStarted = false;
let endingShown = false;

// =============================
// TYPEWRITER EFFECT
// =============================
function typeText(text, callback) {
  let i = 0;
  textEl.textContent = "";
  textEl.style.opacity = 1;

  function type() {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// =============================
// SHOW SECTION
// =============================
function showSection(index) {
  nextBtn.style.display = "none";

  typeText(sections[index].text, () => {
    nextBtn.style.display = "inline-block";

    if (sections[index].musicButton && !musicStarted) {
      musicBtn.style.display = "inline-block";
    } else {
      musicBtn.style.display = "none";
    }
  });
}

// =============================
// MUSIC (BROWSER SAFE)
// =============================
function startMusic() {
  if (musicStarted) return;

  bgMusic.volume = 0.8;
  bgMusic.play().then(() => {
    musicStarted = true;
  }).catch(() => {});
}

// Allow first interaction to start music
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });

// =============================
// FINAL FADE OUT
// =============================
function fadeOutEnding() {
  nextBtn.style.display = "none";
  musicBtn.style.display = "none";

  let opacity = 1;
  const fadeText = setInterval(() => {
    opacity -= 0.01;
    textEl.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeText);
      textEl.textContent = "";
    }
  }, 100);

  let volume = bgMusic.volume;
  const fadeMusic = setInterval(() => {
    volume -= 0.01;
    bgMusic.volume = Math.max(volume, 0);
    if (volume <= 0) {
      clearInterval(fadeMusic);
      bgMusic.pause();
    }
  }, 100);

  setTimeout(showTheEnd, 10000);
}

// =============================
// THE END (FLICKER)
// =============================
function showTheEnd() {
  textEl.textContent = "THE END";
  textEl.style.opacity = 1;
  textEl.style.fontSize = "2em";

  let visible = true;
  setInterval(() => {
    textEl.style.opacity = visible ? 0.2 : 1;
    visible = !visible;
  }, 700);
}

// =============================
// NEXT BUTTON LOGIC
// =============================
nextBtn.addEventListener("click", () => {
  if (currentSection < sections.length - 1) {
    currentSection++;
    showSection(currentSection);
    return;
  }

  if (!endingShown) {
    endingShown = true;
    typeText(
      "Enjoy Your Day and Stay Blessed Dear.\nHappy Birthday Once Again, My SANU 😘❤️ I LOVE YOU",
      () => {
        nextBtn.textContent = "Let's Say Bye for Now 💗";
        nextBtn.onclick = fadeOutEnding;
      }
    );
  }
});

// =============================
// MUSIC BUTTON
// =============================
musicBtn.addEventListener("click", () => {
  startMusic();
  musicBtn.style.display = "none";
});

// =============================
// INITIAL LOAD
// =============================
window.addEventListener("DOMContentLoaded", () => {
  showSection(currentSection);
});
