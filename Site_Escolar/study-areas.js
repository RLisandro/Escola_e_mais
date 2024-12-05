// Dados das áreas de estudo
const studyAreas = {
    filosofia: {
        title: 'Filosofia',
        icon: 'fas fa-brain',
        color: '#4CAF50',
        topics: [
            {
                title: 'O que é Filosofia?',
                content: 'A Filosofia é o estudo dos problemas fundamentais relacionados à existência, conhecimento, valores, razão, mente e linguagem.',
                questions: [
                    {
                        question: 'Qual é o principal objetivo da Filosofia?',
                        options: [
                            'Ganhar dinheiro',
                            'Buscar a sabedoria e compreensão fundamental',
                            'Fazer experimentos científicos',
                            'Criar obras de arte'
                        ],
                        correct: 1
                    },
                    {
                        question: 'Quem é considerado o pai da Filosofia ocidental?',
                        options: [
                            'Platão',
                            'Aristóteles',
                            'Sócrates',
                            'Tales de Mileto'
                        ],
                        correct: 2
                    }
                ]
            },
            {
                title: 'Ética e Moral',
                content: 'A Ética é o estudo filosófico dos princípios que guiam o comportamento humano, enquanto a Moral são as regras e costumes de uma sociedade.',
                questions: [
                    {
                        question: 'Qual a diferença principal entre Ética e Moral?',
                        options: [
                            'Não há diferença',
                            'A Ética é teórica, a Moral é prática',
                            'A Moral é universal, a Ética é individual',
                            'A Ética é religiosa, a Moral é secular'
                        ],
                        correct: 1
                    }
                ]
            }
        ]
    },
    historia: {
        title: 'História',
        icon: 'fas fa-landmark',
        color: '#2196F3',
        topics: [
            {
                title: 'Brasil Colônia',
                content: 'O período colonial brasileiro começou em 1500 com a chegada dos portugueses e terminou em 1822 com a Independência.',
                questions: [
                    {
                        question: 'Quando começou o período colonial no Brasil?',
                        options: [
                            '1500',
                            '1822',
                            '1889',
                            '1494'
                        ],
                        correct: 0
                    }
                ]
            },
            {
                title: 'Revolução Industrial',
                content: 'A Revolução Industrial foi um conjunto de mudanças que aconteceram na Europa nos séculos XVIII e XIX. A principal característica dessa revolução foi a substituição do trabalho artesanal pelo assalariado e com o uso das máquinas.',
                questions: [
                    {
                        question: 'Qual foi a principal mudança trazida pela Revolução Industrial?',
                        options: [
                            'O fim da escravidão',
                            'A substituição do trabalho artesanal pelo uso de máquinas',
                            'O início da democracia',
                            'A descoberta da América'
                        ],
                        correct: 1
                    }
                ]
            }
        ]
    },
    geografia: {
        title: 'Geografia',
        icon: 'fas fa-globe-americas',
        color: '#FF9800',
        topics: [
            {
                title: 'Clima e Tempo',
                content: 'Clima é o conjunto de condições atmosféricas que caracterizam uma região, analisado por um longo período. Tempo é o estado momentâneo da atmosfera em um determinado local.',
                questions: [
                    {
                        question: 'Qual a diferença entre clima e tempo?',
                        options: [
                            'São a mesma coisa',
                            'Clima é momentâneo, tempo é prolongado',
                            'Clima é prolongado, tempo é momentâneo',
                            'Não há relação entre eles'
                        ],
                        correct: 2
                    }
                ]
            }
        ]
    },
    sociologia: {
        title: 'Sociologia',
        icon: 'fas fa-users',
        color: '#9C27B0',
        topics: [
            {
                title: 'O que é Sociologia?',
                content: 'A Sociologia é a ciência que estuda a sociedade, os padrões de relações sociais, interação social e cultura da vida cotidiana.',
                questions: [
                    {
                        question: 'Qual é o objeto de estudo da Sociologia?',
                        options: [
                            'O indivíduo isolado',
                            'A sociedade e as relações sociais',
                            'A natureza',
                            'A economia'
                        ],
                        correct: 1
                    }
                ]
            }
        ]
    }
};

// Função para criar o HTML das áreas de estudo
function createStudyAreas() {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    Object.entries(studyAreas).forEach(([key, area]) => {
        const section = document.createElement('section');
        section.className = 'study-area';
        section.id = key;

        const header = document.createElement('div');
        header.className = 'study-area-header';
        header.style.backgroundColor = area.color;
        header.innerHTML = `
            <i class="${area.icon}" aria-hidden="true"></i>
            <h2>${area.title}</h2>
        `;

        const content = document.createElement('div');
        content.className = 'study-area-content';

        area.topics.forEach((topic, index) => {
            const topicElement = document.createElement('div');
            topicElement.className = 'topic-item';
            topicElement.setAttribute('tabindex', '0');
            topicElement.innerHTML = `
                <i class="fas fa-book" aria-hidden="true"></i>
                <span>${topic.title}</span>
            `;

            topicElement.addEventListener('click', () => showTopicModal(area, topic));
            topicElement.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    showTopicModal(area, topic);
                }
            });

            content.appendChild(topicElement);
        });

        section.appendChild(header);
        section.appendChild(content);
        mainContent.appendChild(section);
    });
}

// Função para mostrar o modal do tópico
function showTopicModal(area, topic) {
    const modal = document.createElement('div');
    modal.className = 'topic-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title');

    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `
        <button class="close-modal" aria-label="Fechar">&times;</button>
        <h4 id="modal-title">${topic.title}</h4>
        <p>${topic.content}</p>
        <div class="questions">
            ${topic.questions.map((q, i) => `
                <div class="question" data-index="${i}">
                    <p><strong>Questão ${i + 1}:</strong> ${q.question}</p>
                    <div class="options">
                        ${q.options.map((opt, j) => `
                            <label class="option">
                                <input type="radio" name="question${i}" value="${j}">
                                ${opt}
                            </label>
                        `).join('')}
                    </div>
                    <p class="feedback" style="display: none;"></p>
                </div>
            `).join('')}
        </div>
        <button class="check-answers">Verificar Respostas</button>
    `;

    modal.appendChild(content);

    // Fechar modal
    const closeBtn = content.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Verificar respostas
    const checkButton = content.querySelector('.check-answers');
    checkButton.addEventListener('click', () => {
        const questions = content.querySelectorAll('.question');
        questions.forEach((q, i) => {
            const selected = q.querySelector('input:checked');
            const feedback = q.querySelector('.feedback');
            if (selected) {
                const isCorrect = parseInt(selected.value) === topic.questions[i].correct;
                feedback.textContent = isCorrect ? 'Correto!' : 'Incorreto. Tente novamente.';
                feedback.style.color = isCorrect ? '#4CAF50' : '#f44336';
                feedback.style.display = 'block';
            }
        });
    });

    document.body.appendChild(modal);

    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });

    // Fechar modal clicando fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Inicializar as áreas de estudo quando o documento carregar
document.addEventListener('DOMContentLoaded', createStudyAreas);
