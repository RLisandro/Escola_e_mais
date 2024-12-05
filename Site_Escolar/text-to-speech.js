class LeitorDeTela {
  constructor() {
    console.log("Inicializando LeitorDeTela...");
    this.synthesis = window.speechSynthesis;
    this.voiceSelect = null;
    this.isReading = false;
    this.currentUtterance = null;
    this.currentVoice = null;

    // Configurar vozes quando disponíveis
    this.voices = [];

    // Carregar vozes imediatamente se disponíveis
    const voicesAvailable = this.synthesis.getVoices();
    if (voicesAvailable.length > 0) {
      this.voices = voicesAvailable.filter((voice) =>
        voice.lang.startsWith("pt")
      );
      console.log("Vozes carregadas:", this.voices);
    }

    // Adicionar listener para quando as vozes estiverem disponíveis
    this.synthesis.addEventListener("voiceschanged", () => {
      this.voices = this.synthesis
        .getVoices()
        .filter((voice) => voice.lang.startsWith("pt"));
      console.log("Vozes atualizadas:", this.voices);
      this.atualizarVozes(); // Atualizar lista de vozes quando disponíveis
    });
  }

  inicializar() {
    console.log("Método inicializar chamado");
    this.criarControlesLeitor();
    this.marcarElementosLegiveis();
    this.adicionarEventosLeitura();
  }

  criarControlesLeitor() {
    console.log("Criando controles do leitor...");

    // Remover instância anterior se existir
    const controleExistente = document.querySelector(".controles-leitor");
    if (controleExistente) {
      controleExistente.remove();
    }

    // Criar elementos manualmente para maior controle
    const controles = document.createElement("div");
    controles.className = "controles-leitor";

    const container = document.createElement("div");
    container.className = "leitor-container";

    const botao = document.createElement("button");
    botao.className = "btn-leitor";
    botao.id = "toggleLeitor";
    botao.setAttribute("aria-label", "Ativar leitor de tela");

    const icone = document.createElement("i");
    icone.className = "fas fa-headphones-alt";

    botao.appendChild(icone);
    container.appendChild(botao);

    const opcoesDiv = document.createElement("div");
    opcoesDiv.className = "leitor-opcoes";
    opcoesDiv.id = "leitorOpcoes";
    opcoesDiv.hidden = true;

    opcoesDiv.innerHTML = `
        <select id="voiceSelect" aria-label="Selecionar voz">
            <option value="">Selecione uma voz</option>
        </select>
        <div class="leitor-botoes">
            <button id="playPause" aria-label="Iniciar ou pausar leitura">
                <i class="fas fa-play"></i>
            </button>
            <button id="stopReading" aria-label="Parar leitura">
                <i class="fas fa-stop"></i>
            </button>
        </div>
    `;

    container.appendChild(opcoesDiv);
    controles.appendChild(container);

    // Adicionar ao final do body
    document.body.appendChild(controles);

    console.log("Elementos criados:", {
      controles: controles,
      botao: botao,
      icone: icone
    });

    // Verificar se o botão foi criado
    const botaoCriado = document.getElementById("toggleLeitor");
    if (botaoCriado) {
      console.log("Botão criado com sucesso");
      // Adicionar evento de teste
      botaoCriado.addEventListener("click", () => {
        console.log("Botão clicado");
        this.testarLeitor();
      });
    } else {
      console.error("Falha ao criar o botão");
    }

    this.atualizarVozes();
  }

  testarLeitor() {
    const textoTeste =
      "Teste do leitor de tela. Se você está ouvindo esta mensagem, o leitor está funcionando.";
    this.lerTexto(textoTeste);
  }

  atualizarVozes() {
    const voiceSelect = document.getElementById("voiceSelect");
    if (!voiceSelect) return;

    // Limpar opções existentes
    voiceSelect.innerHTML = '<option value="">Selecione uma voz</option>';

    // Adicionar novas opções
    this.voices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });

    // Selecionar primeira voz em português se disponível
    if (this.voices.length > 0) {
      this.currentVoice = this.voices[0];
      voiceSelect.value = this.currentVoice.name;
    }
  }

  lerTexto(texto) {
    if (!texto) return;

    console.log("Iniciando leitura:", texto);

    try {
      // Parar qualquer leitura em andamento
      if (this.isReading) {
        this.pararLeitura();
      }

      this.currentUtterance = new SpeechSynthesisUtterance(texto);

      // Configurar a voz
      if (this.currentVoice) {
        this.currentUtterance.voice = this.currentVoice;
      } else if (this.voices.length > 0) {
        this.currentVoice = this.voices[0];
        this.currentUtterance.voice = this.currentVoice;
      }

      // Configurar parâmetros
      this.currentUtterance.lang = "pt-BR";
      this.currentUtterance.rate = 1;
      this.currentUtterance.pitch = 1;
      this.currentUtterance.volume = 1;

      // Adicionar handlers de eventos
      this.currentUtterance.onstart = () => {
        console.log("Leitura iniciada");
        this.isReading = true;
        this.atualizarBotaoPlayPause();
      };

      this.currentUtterance.onend = () => {
        console.log("Leitura finalizada");
        this.isReading = false;
        this.atualizarBotaoPlayPause();
      };

      this.currentUtterance.onerror = (evento) => {
        console.error("Erro na leitura:", evento);
        this.isReading = false;
        this.atualizarBotaoPlayPause();
      };

      // Iniciar a leitura
      window.speechSynthesis.speak(this.currentUtterance);
    } catch (erro) {
      console.error("Erro ao tentar ler texto:", erro);
      this.isReading = false;
      this.atualizarBotaoPlayPause();
    }
  }

  adicionarEventosLeitura() {
    const toggleLeitor = document.getElementById("toggleLeitor");
    const leitorOpcoes = document.getElementById("leitorOpcoes");
    const playPause = document.getElementById("playPause");
    const stopReading = document.getElementById("stopReading");
    const voiceSelect = document.getElementById("voiceSelect");

    if (toggleLeitor) {
      toggleLeitor.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = leitorOpcoes.hidden;
        leitorOpcoes.hidden = !isHidden;
        toggleLeitor.setAttribute("aria-expanded", !isHidden);
      });
    }

    // Melhorar a detecção de elementos clicáveis
    document.addEventListener("click", (e) => {
      const elemento = e.target.closest("[data-readable]");
      if (elemento && !this.isReading) {
        e.preventDefault();
        e.stopPropagation();

        // Limpar o texto antes de ler
        let texto = elemento.textContent || elemento.innerText;
        texto = texto.trim().replace(/\s+/g, " ");

        if (texto) {
          console.log("Tentando ler texto:", texto);
          this.lerTexto(texto);
        }
      }
    });

    // Melhorar o controle de leitura
    if (playPause) {
      playPause.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.isReading) {
          this.pausarLeitura();
        } else {
          this.continuarLeitura();
        }
      });
    }

    if (stopReading) {
      stopReading.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.pararLeitura();
      });
    }

    if (voiceSelect) {
      voiceSelect.addEventListener("change", (e) => {
        const selectedVoice = this.voices.find(
          (voice) => voice.name === e.target.value
        );
        if (selectedVoice) {
          this.currentVoice = selectedVoice;
          // Testar a voz selecionada
          this.lerTexto("Voz selecionada com sucesso");
        }
      });
    }
  }

  pausarLeitura() {
    this.synthesis.pause();
    this.isReading = false;
    this.atualizarBotaoPlayPause();
  }

  continuarLeitura() {
    this.synthesis.resume();
    this.isReading = true;
    this.atualizarBotaoPlayPause();
  }

  pararLeitura() {
    this.synthesis.cancel();
    this.isReading = false;
    this.atualizarBotaoPlayPause();
  }

  atualizarBotaoPlayPause() {
    const playPause = document.getElementById("playPause");
    const icon = playPause.querySelector("i");

    if (this.isReading) {
      icon.className = "fas fa-pause";
      playPause.setAttribute("aria-label", "Pausar leitura");
    } else {
      icon.className = "fas fa-play";
      playPause.setAttribute("aria-label", "Iniciar leitura");
    }
  }

  marcarElementosLegiveis() {
    const elementosLegiveis = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, li, .card"
    );
    elementosLegiveis.forEach((elemento) => {
      if (!elemento.hasAttribute("data-readable")) {
        elemento.setAttribute("data-readable", "true");
        elemento.setAttribute("tabindex", "0");
        elemento.style.cursor = "pointer";
      }
    });
  }
}

// Configuração do leitor de tela
let synth = window.speechSynthesis;
let utterance = null;
let isReading = false;

// Elementos do DOM
const btnLeitor = document.getElementById('btnLeitor');
const leitorOpcoes = document.querySelector('.leitor-opcoes');
const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');
const btnStop = document.getElementById('btnStop');

// Função para iniciar a leitura
function startReading() {
  if (!isReading) {
    const textToRead = document.querySelector('main').textContent;
    utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;
    
    synth.speak(utterance);
    isReading = true;
    
    utterance.onend = function() {
      isReading = false;
      updateControls();
    };
    
    updateControls();
  }
}

// Função para pausar a leitura
function pauseReading() {
  if (isReading) {
    synth.pause();
    isReading = false;
    updateControls();
  }
}

// Função para retomar a leitura
function resumeReading() {
  if (!isReading) {
    synth.resume();
    isReading = true;
    updateControls();
  }
}

// Função para parar a leitura
function stopReading() {
  synth.cancel();
  isReading = false;
  updateControls();
}

// Função para atualizar os controles
function updateControls() {
  btnPlay.style.display = isReading ? 'none' : 'flex';
  btnPause.style.display = isReading ? 'flex' : 'none';
}

// Event Listeners
btnLeitor.addEventListener('click', () => {
  leitorOpcoes.style.display = leitorOpcoes.style.display === 'none' ? 'block' : 'none';
});

btnPlay.addEventListener('click', () => {
  if (synth.paused) {
    resumeReading();
  } else {
    startReading();
  }
});

btnPause.addEventListener('click', pauseReading);
btnStop.addEventListener('click', stopReading);

// Inicialização
updateControls();
