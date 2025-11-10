// Typing text effect
const typedText = document.getElementById("typed-text");
const textArray = [
  "Front-End Developer",
  "Social Media Manager",
  "Creative Technologist",
];
let index = 0,
  charIndex = 0;

function type() {
  if (charIndex < textArray[index].length) {
    typedText.textContent += textArray[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typedText.textContent = textArray[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % textArray.length;
    setTimeout(type, 500);
  }
}
document.addEventListener("DOMContentLoaded", type);

// Reveal on scroll (IntersectionObserver)
const fadeSections = document.querySelectorAll(".fade-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {threshold: 0.15}
);
fadeSections.forEach((section) => observer.observe(section));

document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Enter a city!");

  // OpenWeatherMap free API (replace 'YOUR_API_KEY' with your key)
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=YOUR_API_KEY`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        alert("City not found!");
        return;
      }
      document.getElementById("weatherCity").textContent = `City: ${data.name}`;
      document.getElementById(
        "weatherTemp"
      ).textContent = `Temp: ${data.main.temp}°C`;
      document.getElementById(
        "weatherDesc"
      ).textContent = `Weather: ${data.weather[0].description}`;
    })
    .catch((err) => alert("Error fetching data"));
});
