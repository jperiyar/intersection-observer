import "./styles.css";

const container = document.querySelector(".container");
const cards = Array.from(document.querySelectorAll(".card"));

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) cardObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 1
    // rootMargin: "100px"
  }
);

cards.forEach((card) => {
  cardObserver.observe(card);
});

const loadNewCards = () => {
  const newFragment = document.createDocumentFragment();
  for (let i = 0; i < 10; i++) {
    const newCard = document.createElement("div");
    newCard.textContent = "New card added!";
    newCard.classList.add("card");
    cardObserver.observe(newCard);
    container.append(newCard);
  }
  // container.append(newFragment);
};

const lastCardObserver = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  console.log("last card is intersecting", entry.target);
  loadNewCards();
  // unobserve the previous last and observe the new last
  lastCardObserver.unobserve(entry.target);
  const newLastCard = document.querySelector(".card:last-child");
  lastCardObserver.observe(newLastCard);
});

const lastCard = document.querySelector(".card:last-child");
lastCardObserver.observe(lastCard);
