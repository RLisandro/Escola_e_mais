// Adicionar suporte a navegação por teclado no quiz
function setupKeyboardNavigation() {
  const quizButtons = document.querySelectorAll(".category-select-btn");

  quizButtons.forEach((button, index) => {
    button.addEventListener("keydown", (e) => {
      let targetButton;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          targetButton = quizButtons[index + 1] || quizButtons[0];
          break;
        case "ArrowLeft":
        case "ArrowUp":
          targetButton =
            quizButtons[index - 1] || quizButtons[quizButtons.length - 1];
          break;
      }

      if (targetButton) {
        targetButton.focus();
        e.preventDefault();
      }
    });
  });
}

// Anunciar resultados do quiz para leitores de tela
function announceQuizResult(result) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "alert");
  announcement.setAttribute("aria-live", "polite");
  announcement.classList.add("visually-hidden");
  announcement.textContent = `Resultado: ${result}`;
  document.body.appendChild(announcement);

  setTimeout(() => announcement.remove(), 3000);
}
