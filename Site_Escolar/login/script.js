document.addEventListener("DOMContentLoaded", function () {
  // Formulário de Cadastro
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const button = this.querySelector("button");
      const messageDiv = this.querySelector(".message");

      button.classList.add("loading");
      button.disabled = true;

      const formData = new FormData(this);

      fetch("cadastro.php", {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          messageDiv.textContent = data.message;
          messageDiv.className =
            "message " + (data.success ? "success" : "error");

          if (data.success) {
            // Redireciona para o login após 2 segundos
            setTimeout(() => {
              window.location.href = "login.php";
            }, 2000);
          }
        })
        .catch((error) => {
          messageDiv.textContent = "Erro ao processar requisição";
          messageDiv.className = "message error";
        })
        .finally(() => {
          button.classList.remove("loading");
          button.disabled = false;
        });
    });
  }

  // Formulário de Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const button = this.querySelector("button");
      const messageDiv = this.querySelector(".message");

      button.classList.add("loading");
      button.disabled = true;

      const formData = new FormData(this);

      fetch("login.php", {
        method: "POST",
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta do servidor: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Resposta do servidor:", data); // Debug
          messageDiv.textContent = data.message;
          messageDiv.className =
            "message " + (data.success ? "success" : "error");
          messageDiv.style.display = "block"; // Garante que a mensagem seja visível

          if (data.success && data.redirect) {
            // Redireciona para a página principal após 1 segundo
            setTimeout(() => {
              window.location.href = data.redirect;
            }, 1000);
          }
        })
        .catch((error) => {
          console.error("Erro:", error); // Debug
          messageDiv.textContent =
            "Erro ao processar requisição: " + error.message;
          messageDiv.className = "message error";
          messageDiv.style.display = "block";
        })
        .finally(() => {
          button.classList.remove("loading");
          button.disabled = false;
        });
    });
  }

  // Verificar mensagem na URL (para mensagens após exclusão de conta)
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get("message");
  if (message === "conta_excluida") {
    const messageDiv = document.querySelector(".message");
    if (messageDiv) {
      messageDiv.textContent = "Sua conta foi excluída com sucesso.";
      messageDiv.className = "message success";
    }
  }
});
