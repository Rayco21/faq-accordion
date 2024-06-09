const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");
const icons = document.querySelectorAll(".icon");

function toggleAnswer(i) {
  if (!answers[i].classList.contains("open")) {
    setTimeout(() => {
      answers[i].classList.add("apply-transition");
    }, 1);
  } else {
    answers[i].classList.remove("apply-transition");
  }

  answers[i].classList.toggle("hidden");
  answers[i].classList.toggle("open");

  icons[i].src = answers[i].classList.contains("open")
    ? "./assets/images/icon-minus.svg"
    : "./assets/images/icon-plus.svg";
}

for (let i = 0; i < questions.length; i++) {
  questions[i].addEventListener("click", () => {
    toggleAnswer(i);
  });

  questions[i].addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleAnswer(i);
    }
  });
}

document.addEventListener("keydown", (e) => {
  let currentIndex = getCurrentFocusIndex();
  let nextIndex;

  if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
  if (currentIndex === null && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
    nextIndex = 0;
    questions[nextIndex].focus();
    return;
  }

  if (e.key === "ArrowUp") {
    nextIndex = currentIndex - 1 < 0 ? questions.length - 1 : currentIndex - 1;
  }
  if (e.key === "ArrowDown") {
    nextIndex = currentIndex + 1 >= questions.length ? 0 : currentIndex + 1;
  }

  questions[nextIndex].focus();
});

function getCurrentFocusIndex() {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i] === document.activeElement) return i;
  }

  return null;
}
