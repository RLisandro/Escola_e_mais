document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "http://localhost:5000/api";

  // Verifica se o usuário está logado
  function verificarLogin() {
    const usuarioLogado = sessionStorage.getItem("usuarioLogado") || localStorage.getItem("usuarioLogado");
    
    // Se não estiver na página de login/cadastro e não estiver logado
    if (!usuarioLogado && 
        !window.location.href.includes("login.html") && 
        !window.location.href.includes("cadastro.html")) {
      window.location.href = "login.html";
    }
    // Se estiver logado e estiver na página de login/cadastro
    else if (usuarioLogado && 
            (window.location.href.includes("login.html") || 
             window.location.href.includes("cadastro.html"))) {
      window.location.href = "index.html";
    }
  }

  verificarLogin();

  // Formulário de Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("password").value;

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            senha: senha
          })
        });

        const data = await response.json();

        if (data.success) {
          // Salvar estado de login
          localStorage.setItem("usuarioLogado", "true");
          sessionStorage.setItem("usuarioLogado", "true");
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          
          // Redirecionar para a página principal
          window.location.href = data.redirect || "index.html";
        } else {
          alert(data.message || "Erro ao fazer login");
        }
      } catch (erro) {
        alert("Erro ao fazer login: " + erro.message);
      }
    });
  }

  // Formulário de Cadastro
  const cadastroForm = document.getElementById("cadastroForm");
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nome = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("password").value;
      const confirmarSenha = document.getElementById("confirm-password").value;

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/cadastro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nome, email, senha })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.erro);
        }

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } catch (erro) {
        alert(erro.message);
      }
    });
  }

  // Botão de Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("usuarioLogado");
      sessionStorage.removeItem("usuarioLogado");
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      window.location.href = "login.html";
    });
  }

  // Adicionar script para mostrar/ocultar senha
  const senhaInputs = document.querySelectorAll('input[type="password"]');
  senhaInputs.forEach((input) => {
    const toggleBtn = document.createElement("i");
    toggleBtn.className = "fas fa-eye toggle-password";
    toggleBtn.style.cursor = "pointer";
    toggleBtn.style.position = "absolute";
    toggleBtn.style.right = "20px";
    toggleBtn.style.top = "50%";
    toggleBtn.style.transform = "translateY(-50%)";

    input.parentElement.style.position = "relative";
    input.parentElement.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        toggleBtn.className = "fas fa-eye-slash toggle-password";
      } else {
        input.type = "password";
        toggleBtn.className = "fas fa-eye toggle-password";
      }
    });
  });
});
