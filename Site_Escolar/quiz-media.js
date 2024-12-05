// Recursos multimídia para cada categoria do quiz
const quizMedia = {
    Geografia: {
        videos: [
            {
                titulo: "Geografia Física - Relevo",
                url: "https://www.youtube.com/embed/8h2dwCX9m0k",
                descricao: "Vídeo explicativo sobre as principais formas de relevo"
            },
            {
                titulo: "Hidrografia Mundial",
                url: "https://www.youtube.com/embed/example2",
                descricao: "Principais rios e bacias hidrográficas do mundo"
            }
        ],
        imagens: [
            {
                titulo: "Mapa Mundi Político",
                url: "assets/quiz-media/geografia/mapa-politico.jpg",
                descricao: "Mapa político mundial atualizado"
            },
            {
                titulo: "Relevo Mundial",
                url: "assets/quiz-media/geografia/relevo-mundial.jpg",
                descricao: "Principais formações de relevo do mundo"
            }
        ]
    },
    História: {
        videos: [
            {
                titulo: "Segunda Guerra Mundial",
                url: "https://www.youtube.com/embed/FrG4TEcSuRg",
                descricao: "Panorama geral da Segunda Guerra Mundial"
            },
            {
                titulo: "Brasil Colonial",
                url: "https://www.youtube.com/embed/example4",
                descricao: "História do Brasil no período colonial"
            }
        ],
        imagens: [
            {
                titulo: "Linha do Tempo - História do Brasil",
                url: "assets/quiz-media/historia/linha-tempo-brasil.jpg",
                descricao: "Principais eventos da história do Brasil"
            },
            {
                titulo: "Mapa Histórico - Segunda Guerra",
                url: "assets/quiz-media/historia/mapa-ww2.jpg",
                descricao: "Mapa da Europa durante a Segunda Guerra Mundial"
            }
        ]
    }
};

// Função para carregar recursos multimídia
function carregarRecursosMultimidia(categoria) {
    const mediaSection = document.getElementById('quiz-media-section');
    if (!mediaSection) return;

    const recursos = quizMedia[categoria];
    if (!recursos) return;

    let conteudo = '<div class="media-container">';
    
    // Adiciona vídeos
    if (recursos.videos && recursos.videos.length > 0) {
        conteudo += '<div class="videos-section"><h3>Vídeos de Referência</h3>';
        recursos.videos.forEach(video => {
            conteudo += `
                <div class="video-item">
                    <h4>${video.titulo}</h4>
                    <iframe width="560" height="315" 
                        src="${video.url}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    <p>${video.descricao}</p>
                </div>
            `;
        });
        conteudo += '</div>';
    }

    // Adiciona imagens
    if (recursos.imagens && recursos.imagens.length > 0) {
        conteudo += '<div class="imagens-section"><h3>Imagens de Referência</h3>';
        recursos.imagens.forEach(imagem => {
            conteudo += `
                <div class="imagem-item">
                    <h4>${imagem.titulo}</h4>
                    <img src="${imagem.url}" alt="${imagem.titulo}">
                    <p>${imagem.descricao}</p>
                    <a href="${imagem.url}" download class="download-btn">Baixar Imagem</a>
                </div>
            `;
        });
        conteudo += '</div>';
    }

    conteudo += '</div>';
    mediaSection.innerHTML = conteudo;
}

// Atualiza os recursos quando a categoria muda
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    if (categoryButtons) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                carregarRecursosMultimidia(button.dataset.category);
            });
        });
    }
    
    // Carrega recursos da categoria inicial
    carregarRecursosMultimidia('Geografia');
});
