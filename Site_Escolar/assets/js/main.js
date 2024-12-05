// Módulo de Interface do Usuário
const UI = {
    init() {
        this.setupNavigation();
        this.setupModals();
        this.setupMobileMenu();
        this.setupScrollToTop();
    },

    setupNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    },

    setupModals() {
        const modals = document.querySelectorAll('.modal');
        const modalTriggers = document.querySelectorAll('[data-modal]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.dataset.modal;
                this.openModal(modalId);
            });
        });

        modals.forEach(modal => {
            modal.querySelector('.close')?.addEventListener('click', () => {
                this.closeModal(modal.id);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    },

    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('.nav-links');

        menuBtn?.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    },

    setupScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        document.body.appendChild(scrollBtn);

        window.addEventListener('scroll', () => {
            scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Módulo de Quiz
const Quiz = {
    questions: [
        {
            question: "Quem é considerado o pai da Filosofia?",
            options: ["Platão", "Sócrates", "Tales de Mileto", "Aristóteles"],
            correct: 2
        },
        {
            question: "Qual destes pensadores é conhecido como o pai da Sociologia?",
            options: ["Karl Marx", "Auguste Comte", "Émile Durkheim", "Max Weber"],
            correct: 1
        },
        {
            question: "Em que período histórico ocorreu a Revolução Francesa?",
            options: ["Idade Média", "Idade Moderna", "Idade Contemporânea", "Antiguidade"],
            correct: 2
        }
    ],

    currentQuestion: 0,
    score: 0,

    init() {
        const startBtn = document.getElementById('startQuiz');
        startBtn?.addEventListener('click', () => this.start());
    },

    start() {
        this.currentQuestion = 0;
        this.score = 0;
        this.showQuestion();
    },

    showQuestion() {
        const container = document.querySelector('.quiz-container');
        const question = this.questions[this.currentQuestion];

        if (!container || !question) return;

        container.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-index="${index}">${option}</button>
                `).join('')}
            </div>
        `;

        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkAnswer(e));
        });
    },

    checkAnswer(e) {
        const selectedIndex = parseInt(e.target.dataset.index);
        const correct = this.questions[this.currentQuestion].correct;

        if (selectedIndex === correct) {
            this.score++;
            e.target.classList.add('correct');
        } else {
            e.target.classList.add('wrong');
        }

        this.disableOptions();
        setTimeout(() => this.nextQuestion(), 1000);
    },

    disableOptions() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });
    },

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    },

    showResults() {
        const container = document.querySelector('.quiz-container');
        const percentage = (this.score / this.questions.length) * 100;

        container.innerHTML = `
            <h3>Resultado do Quiz</h3>
            <p>Você acertou ${this.score} de ${this.questions.length} questões (${percentage}%)</p>
            <button class="btn" onclick="Quiz.start()">Tentar Novamente</button>
        `;
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    UI.init();
    Quiz.init();
});
