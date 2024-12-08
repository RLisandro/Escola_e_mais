
## Visão Geral

O Site Escolar é uma plataforma educacional interativa desenvolvida para proporcionar uma experiência de aprendizado dinâmica e envolvente. O sistema inclui funcionalidades de autenticação, quiz interativo e conteúdo educacional multimídia.

## Estrutura do Projeto

- `assets/`: Recursos estáticos do site

- `conteudo/`: Material didático e conteúdo educacional

- `images/`: Imagens utilizadas no site

- `login/`: Sistema de autenticação

- `frontend/`: Componentes da interface do usuário

## Tecnologias Utilizadas

- HTML5

- CSS3

- JavaScript (ES6+)

- PHP

- Node.js

## Principais Funcionalidades

1. **Sistema de Autenticação**

- Login de usuários

- Criação de novas contas

- Gerenciamento de sessões

2. **Quiz Interativo**

- Questões multimídia com vídeos e imagens

- Sistema de pontuação

- Feedback instantâneo

3. **Conteúdo Educacional**

- Material didático por área de estudo

- Recursos multimídia integrados

- Conteúdo downloadável

## Telas do Sistema

### 1. Página Inicial

A página inicial apresenta uma interface moderna e intuitiva com:

- Menu de navegação superior com ícones intuitivos

- Logo “Educação é Mais” com slogan

- Seções para diferentes disciplinas (História, Filosofia, Sociologia e Geografia)

- Botão de logout no canto superior direito

- Design responsivo adaptável a diferentes dispositivos

### 2. Sistema de Quiz

O sistema de quiz oferece uma experiência interativa de aprendizado:

- Cabeçalho com nome da categoria atual

- Indicador de progresso das questões

- Área de exibição da pergunta com suporte a conteúdo multimídia

- Opções de resposta claramente apresentadas

- Botão para próxima questão

- Feedback visual para respostas corretas/incorretas

### 3. Área de Login

A interface de autenticação inclui:

- Formulário de login com campos para usuário e senha

- Opção para criar nova conta

- Sistema de validação de dados

- Mensagens de feedback para o usuário

- Design minimalista e focado na usabilidade

### 4. Área de Conteúdo

Cada disciplina possui uma área dedicada com:

- Material didático organizado por tópicos

- Recursos multimídia integrados

- Interface de navegação intuitiva

- Suporte a diferentes tipos de conteúdo (texto, vídeo, imagens)

- Opções de acessibilidade como text-to-speech

### 5. Recursos de Acessibilidade

O site foi desenvolvido com foco em acessibilidade, incluindo:

- Suporte a leitores de tela

- Navegação por teclado

- Textos alternativos para imagens

- Contraste adequado

- Estrutura semântica HTML5

## Screenshots e Descrições Técnicas

### Página Inicial


**Tecnologias Utilizadas:**

- HTML5 para estruturação semântica

- CSS3 para estilização responsiva

- JavaScript para interatividade

- Font Awesome para ícones

**Funcionalidades Principais:**

- Menu de navegação dinâmico construído com HTML e CSS Flexbox

- Sistema de grid responsivo para organização do conteúdo

- Animações suaves implementadas com CSS transitions

- Integração com API de Text-to-Speech para acessibilidade

### Sistema de Quiz


**Tecnologias Utilizadas:**

- JavaScript ES6+ para lógica do quiz

- CSS3 para animações e transições

- HTML5 para estrutura semântica

- Local Storage para armazenamento de pontuações

**Funcionalidades Principais:**

- Sistema dinâmico de carregamento de questões

- Validação em tempo real das respostas

- Feedback visual e sonoro para acertos/erros

- Sistema de pontuação persistente

### Área de Login


**Tecnologias Utilizadas:**

- PHP para autenticação backend

- MySQL para banco de dados

- JavaScript para validação frontend

- CSS3 para design responsivo

**Funcionalidades Principais:**

- Sistema seguro de autenticação

- Validação de formulários em tempo real

- Proteção contra SQL injection

- Sistema de sessões para manter usuário logado

### Área de Conteúdo

![Área de Conteúdo](./images/conteudo.png)

**Tecnologias Utilizadas:**

- HTML5 para organização do conteúdo

- CSS Grid/Flexbox para layout

- JavaScript para interatividade

- PHP para gerenciamento de conteúdo

**Funcionalidades Principais:**

- Sistema de navegação por categorias

- Reprodutor de vídeo customizado

- Sistema de busca integrado

- Suporte a diferentes tipos de mídia

## Requisitos do Sistema

- Servidor Web (Apache/XAMPP)

- PHP 7.4+

- Node.js 14+

- Navegador web moderno com suporte a HTML5

## Configuração e Instalação

1. Instalar XAMPP

2. Clonar o repositório na pasta htdocs

3. Configurar as variáveis de ambiente no arquivo .env

4. Iniciar os serviços Apache e MySQL

5. Acessar através do localhost

# Site Escolar — Plataforma Educacional

Uma plataforma web educacional desenvolvida para facilitar o aprendizado e interação entre alunos e professores.

## Visão Geral

O Site Escolar é uma plataforma educacional interativa que oferece diversas funcionalidades para melhorar a experiência de aprendizado dos alunos.

## Telas do Sistema

### Página Inicial





A página inicial apresenta uma visão geral da plataforma e seus principais recursos.

### Área de Login


Interface de autenticação para acesso seguro à plataforma.

### Área de Estudo


Espaço dedicado para os alunos acessarem seus materiais de estudo.

### Conteúdo


![Conteúdo](./images/conteudo.png)Seção onde os alunos podem acessar os materiais didáticos.

### Quiz


Área interativa com questões e exercícios para praticar o conhecimento.

## Funcionalidades

- Sistema de login e autenticação

- Área de estudo personalizada

- Conteúdo didático organizado por disciplinas

- Sistema de quiz interativo

- Interface intuitiva e responsiva

## Tecnologias Utilizadas

- HTML5

- CSS3

- JavaScript

- PHP

- MySQL

- Bootstrap

## Instalação

1. Clone este repositório

2. Configure um servidor web (como XAMPP)

3. Importe o banco de dados

4. Configure as credenciais de conexão

5. Acesse através do navegador

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# E-mail Projeto — Sistema de Feedback

## Descrição do Projeto

Sistema de feedback para coleta de opiniões e sugestões de usuários do Site Escolar.

## Funcionalidades

Formulário de feedback interativo

- Salvamento de respostas em banco de dados MySQL

- Envio automático de email com detalhes do feedback

## Componentes Principais

- `feedback.html`: Formulário de coleta de feedback

- `salvar_feedback.php`: Script para processar e salvar feedback

- `create_feedback_table.sql`: Script de criação da tabela de feedback

## Configuração do Banco de Dados

### Tabela: `feedback_respostas`

- `id`: Identificador único

- `experiencia_geral`: Avaliação geral do site

- `facilidade_uso`: Nível de facilidade de uso

- `satisfacao`: Nível de satisfação (1–5)

- `sugestoes`: Texto de sugestões

- `data_envio`: Timestamp do feedback

## Configuração de Email

- **Serviço**: Gmail SMTP

- **Remetente**: rezendecazuza@gmail.com

- **Protocolo**: STARTTLS

- **Porta**: 587

## Dependências

- PHP 7.4+

- PHPMailer (v6.9)

- Composer para gerenciamento de dependências

## Logs

- Arquivo de log: `debug_feedback.log`

- Registra operações de salvamento e envio de email

## Próximos Passos

- Implementar validações adicionais

- Adicionar proteção contra spam

- Melhorar tratamento de erros

## Instalação

1. Clone o repositório

2. Instale as dependências com Composer

3. Configure as credenciais de email

4. Importe o script SQL para criar a tabela

5. Configure o servidor web (XAMPP/WAMP)

## Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Projeto desenvolvido para Site Escolar — Todos os direitos reservados.





