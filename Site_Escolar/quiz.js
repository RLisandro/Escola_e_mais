// Banco de dados das questões do quiz
const quizData = {
    Geografia: [
        {
            question: "Qual é o maior país do mundo em área territorial?",
            options: ["China", "Estados Unidos", "Rússia", "Canadá"],
            correct: 2,
            explanation: "A Rússia é o maior país do mundo em área territorial, com aproximadamente 17.1 milhões de quilômetros quadrados."
        },
        {
            question: "Qual é o rio mais extenso do mundo?",
            options: ["Nilo", "Amazonas", "Yangtzé", "Mississippi"],
            correct: 1,
            explanation: "O Rio Amazonas é o rio mais extenso do mundo, com aproximadamente 6.992 km de extensão."
        },
        {
            question: "Em qual continente está localizada a Austrália?",
            options: ["Oceania", "Ásia", "África", "América"],
            correct: 0,
            explanation: "A Austrália está localizada no continente da Oceania, sendo o maior país deste continente."
        },
        {
            question: "Qual é a capital do Brasil?",
            options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
            correct: 2,
            explanation: "Brasília é a capital do Brasil desde 1960, quando foi inaugurada durante o governo de Juscelino Kubitschek."
        },
        {
            question: "Qual é o maior deserto do mundo?",
            options: ["Deserto do Saara", "Deserto da Arábia", "Deserto de Gobi", "Deserto da Antártida"],
            correct: 3,
            explanation: "O Deserto da Antártida é o maior deserto do mundo. Embora seja coberto de gelo, é classificado como deserto devido à baixa precipitação."
        }
    ],
    História: [
        {
            question: "Em que ano começou a Segunda Guerra Mundial?",
            options: ["1939", "1940", "1941", "1938"],
            correct: 0,
            explanation: "A Segunda Guerra Mundial começou em 1939 com a invasão da Polônia pela Alemanha nazista."
        },
        {
            question: "Quem foi o primeiro presidente do Brasil?",
            options: ["Dom Pedro I", "Getúlio Vargas", "Marechal Deodoro da Fonseca", "Juscelino Kubitschek"],
            correct: 2,
            explanation: "Marechal Deodoro da Fonseca foi o primeiro presidente do Brasil, governando de 1889 a 1891."
        },
        {
            question: "Em que ano o Brasil foi descoberto pelos portugueses?",
            options: ["1498", "1500", "1502", "1494"],
            correct: 1,
            explanation: "O Brasil foi descoberto pelos portugueses em 1500, quando Pedro Álvares Cabral chegou ao atual estado da Bahia."
        },
        {
            question: "Qual foi o período da Idade Média?",
            options: ["Século III ao X", "Século V ao XV", "Século X ao XX", "Século I ao X"],
            correct: 1,
            explanation: "A Idade Média compreendeu o período entre os séculos V e XV, iniciando com a queda do Império Romano do Ocidente."
        },
        {
            question: "Quem foi o primeiro imperador do Brasil?",
            options: ["Dom Pedro I", "Dom Pedro II", "Dom João VI", "Dom Manuel I"],
            correct: 0,
            explanation: "Dom Pedro I foi o primeiro imperador do Brasil, governando de 1822 a 1831, quando abdicou em favor de seu filho."
        }
    ],
    Filosofia: [
        {
            question: "Quem é considerado o pai da filosofia ocidental?",
            options: ["Platão", "Aristóteles", "Sócrates", "Tales de Mileto"],
            correct: 2,
            explanation: "O filósofo grego Sócrates é amplamente considerado o pai da filosofia ocidental."
        },
        {
            question: "Qual filósofo é famoso pela frase 'Penso, logo existo'?",
            options: ["Kant", "Descartes", "Nietzsche", "Sartre"],
            correct: 1,
            explanation: "René Descartes é o autor da famosa frase 'Penso, logo existo' (Cogito, ergo sum), que é um dos princípios fundamentais da filosofia moderna."
        },
        {
            question: "O que significa a palavra 'filosofia'?",
            options: ["Sabedoria divina", "Amor à sabedoria", "Busca pelo conhecimento", "Estudo do ser"],
            correct: 1,
            explanation: "A palavra 'filosofia' vem do grego antigo philosophia, que significa 'amor pela sabedoria' (philo = amor e sophia = sabedoria)"
        },
        {
            question: "Qual destes é um filósofo do Iluminismo?",
            options: ["Voltaire", "Santo Agostinho", "Karl Marx", "Confúcio"],
            correct: 0,
            explanation: "Voltaire foi um dos principais filósofos do Iluminismo, movimento intelectual do século XVIII que enfatizava a razão e o individualismo."
        },
        {
            question: "Quem escreveu 'A República'?",
            options: ["Aristóteles", "Sócrates", "Platão", "Heráclito"],
            correct: 2,
            explanation: "A República foi escrita por Platão, onde ele descreve sua visão de uma sociedade ideal governada por filósofos-reis."
        }
    ],
    Sociologia: [
        {
            question: "Quem é considerado o pai da Sociologia?",
            options: ["Karl Marx", "Max Weber", "Auguste Comte", "Émile Durkheim"],
            correct: 2,
            explanation: "Auguste Comte é considerado o pai da Sociologia por ter sido o primeiro a usar o termo e estabelecer a disciplina como ciência."
        },
        {
            question: "O que é estratificação social?",
            options: ["Divisão da sociedade em camadas", "Organização política", "Sistema econômico", "Processo cultural"],
            correct: 0,
            explanation: "Estratificação social é a divisão da sociedade em diferentes camadas ou estratos baseados em critérios como renda, educação e prestígio."
        },
        {
            question: "Qual conceito Marx desenvolveu sobre a luta de classes?",
            options: ["Harmonia social", "Conflito social", "Cooperação social", "Integração social"],
            correct: 1,
            explanation: "Marx desenvolveu o conceito de luta de classes como motor da história, onde há um conflito constante entre a classe dominante e a classe trabalhadora."
        },
        {
            question: "O que é anomia social?",
            options: ["Ordem social", "Ausência de normas", "Harmonia social", "Controle social"],
            correct: 1,
            explanation: "Anomia social é um conceito desenvolvido por Durkheim que se refere à ausência ou quebra das normas sociais em uma sociedade."
        },
        {
            question: "Qual destes é um tipo de mobilidade social?",
            options: ["Vertical", "Diagonal", "Circular", "Paralela"],
            correct: 0,
            explanation: "A mobilidade social vertical refere-se ao movimento para cima ou para baixo na hierarquia social."
        }
    ]
};

// Variáveis de controle do quiz
let currentCategory = 'Geografia';  // Categoria atual
let currentQuestion = 0;           // Índice da questão atual
let score = 0;                     // Pontuação
let answered = false;              // Controle de resposta

// Inicialização do quiz
function initializeQuiz() {
    // Configuração dos botões de categoria
    const categoryButtons = document.querySelectorAll('.category-select-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Confirma mudança de categoria se já respondeu alguma questão
            if (!answered || confirm('Mudar de categoria irá reiniciar o quiz. Deseja continuar?')) {
                changeCategory(button.dataset.category);
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
        });
    });
    
    loadQuestion();  // Carrega a primeira questão
}

// Mudança de categoria
function changeCategory(category) {
    currentCategory = category;
    currentQuestion = 0;
    score = 0;
    answered = false;
    loadQuestion();
}

// Carregamento da questão
function loadQuestion() {
    answered = false;
    const questionData = quizData[currentCategory][currentQuestion];
    
    // Elementos do DOM
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const explanationElement = document.getElementById('explanation');
    const nextButton = document.getElementById('next-btn');
    
    // Atualiza a questão
    questionElement.textContent = questionData.question;
    optionsContainer.innerHTML = '';
    explanationElement.style.display = 'none';
    nextButton.style.display = 'none';
    
    // Cria os botões de opção
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

// Seleção de resposta
function selectOption(selectedIndex) {
    if (answered) return;  // Evita múltiplas respostas
    
    answered = true;
    const questionData = quizData[currentCategory][currentQuestion];
    
    // Elementos do DOM
    const optionButtons = document.querySelectorAll('.option-btn');
    const explanationElement = document.getElementById('explanation');
    const nextButton = document.getElementById('next-btn');
    
    // Processa a resposta
    optionButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === questionData.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex) {
            button.classList.add('wrong');
        }
    });
    
    // Atualiza a pontuação
    if (selectedIndex === questionData.correct) {
        score++;
    }
    
    // Mostra a explicação
    explanationElement.textContent = questionData.explanation;
    explanationElement.style.display = 'block';
    
    // Configura o botão de próxima questão
    if (currentQuestion < quizData[currentCategory].length - 1) {
        nextButton.style.display = 'block';
        nextButton.textContent = 'Próxima Pergunta';
        nextButton.onclick = () => {
            currentQuestion++;
            loadQuestion();
        };
    } else {
        nextButton.style.display = 'block';
        nextButton.textContent = 'Ver Resultado';
        nextButton.onclick = showResult;
    }
}

// Exibição do resultado
function showResult() {
    const container = document.querySelector('.quiz-container');
    const total = quizData[currentCategory].length;
    const percentage = (score / total) * 100;
    
    container.innerHTML = `
        <h2>Resultado Final</h2>
        <p>Você acertou ${score} de ${total} questões (${percentage}%)</p>
        <button onclick="resetQuiz()" class="option-btn">Tentar Novamente</button>
    `;
}

// Reinicialização do quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    loadQuestion();
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeQuiz);
