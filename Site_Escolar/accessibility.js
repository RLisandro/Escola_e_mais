document.addEventListener('DOMContentLoaded', function() {
    // Mapeamento de teclas de atalho
    const keyboardShortcuts = {
        'h': '#inicio',            // Home
        '1': '#historia-card',     // História
        '2': '#filosofia-card',    // Filosofia
        '3': '#sociologia-card',   // Sociologia
        '4': '#geografia-card',    // Geografia
        'q': '#quis',             // Quiz
        'f': 'feedback.html',      // Feedback
        '?': null                  // Ajuda
    };

    // Adicionar navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        if (e.altKey) {
            const key = e.key.toLowerCase();
            if (keyboardShortcuts.hasOwnProperty(key)) {
                e.preventDefault();
                navigateToSection(keyboardShortcuts[key]);
            }
        }

        if (e.key === '?' && !e.altKey && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            showKeyboardHelp();
        }
    });

    // Função para navegar para uma seção
    function navigateToSection(target) {
        if (!target) return;
        if (target.startsWith('#')) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.focus();
            }
        } else {
            window.location.href = target;
        }
    }

    // Função para mostrar ajuda de teclado
    function showKeyboardHelp() {
        const helpDialog = document.createElement('div');
        helpDialog.role = 'dialog';
        helpDialog.ariaLabel = 'Ajuda de Teclado';
        helpDialog.className = 'keyboard-help-dialog';
        
        helpDialog.innerHTML = `
            <div class="help-content">
                <h2>Atalhos de Teclado</h2>
                <button class="close-help" aria-label="Fechar ajuda">×</button>
                <div class="shortcuts-grid">
                    <div class="shortcut-group">
                        <h3>Navegação</h3>
                        <ul>
                            <li><kbd>Alt + H</kbd> Início</li>
                            <li><kbd>Alt + 1</kbd> História</li>
                            <li><kbd>Alt + 2</kbd> Filosofia</li>
                            <li><kbd>Alt + 3</kbd> Sociologia</li>
                            <li><kbd>Alt + 4</kbd> Geografia</li>
                            <li><kbd>Alt + Q</kbd> Quiz</li>
                            <li><kbd>Alt + F</kbd> Feedback</li>
                        </ul>
                    </div>
                </div>
            </div>`;
        
        document.body.appendChild(helpDialog);
        
        const closeButton = helpDialog.querySelector('.close-help');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(helpDialog);
        });
    }
});
