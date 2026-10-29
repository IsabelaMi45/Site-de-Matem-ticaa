//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "Uma pessoa tem 3 camisas e 4 calças. De quantas maneiras diferentes ela pode se vestir?",
        alternativas: ["7", "10", "12", "24"],
        correta: 2,
        explicacao: "Pelo Princípio Fundamental da Contagem, multiplicamos as possibilidades: 3 × 4 = 12."
    },
    {
        pergunta: "Qual é o valor de 5!?",
        alternativas: ["25", "60", "120", "720"],
        correta: 2,
        explicacao: "5! = 5 × 4 × 3 × 2 × 1 = 120."
    },
    {
        pergunta: "Quantos anagramas tem a palavra AMOR?",
        alternativas: ["12", "16", "24", "256"],
        correta: 2,
        explicacao: "As 4 letras são diferentes, então o total é a permutação simples: 4! = 24."
    },
    {
        pergunta: "Qual é a principal diferença entre arranjo e combinação?",
        alternativas: ["No arranjo a ordem importa; na combinação não importa", "Na combinação a ordem importa; no arranjo não importa", "O arranjo só usa números pares", "Não há diferença entre eles"],
        correta: 0,
        explicacao: "No arranjo, trocar a ordem gera um agrupamento diferente. Na combinação, importa apenas quais elementos foram escolhidos."
    },
    {
        pergunta: "De um grupo de 5 alunos, quantas duplas diferentes podem ser formadas?",
        alternativas: ["5", "10", "20", "25"],
        correta: 1,
        explicacao: "A ordem não importa, então usamos combinação: C(5, 2) = 5! / (2! · 3!) = 10."
    },
    {
        pergunta: "Em uma corrida com 5 atletas, de quantas maneiras podem ser distribuídas as medalhas de ouro e prata?",
        alternativas: ["10", "15", "20", "25"],
        correta: 2,
        explicacao: "Ouro e prata são posições distintas, então a ordem importa: A(5, 2) = 5 × 4 = 20."
    },
    {
        pergunta: "Quantos anagramas tem a palavra ARARA?",
        alternativas: ["10", "20", "60", "120"],
        correta: 0,
        explicacao: "Há letras repetidas (3 A e 2 R): 5! / (3! · 2!) = 120 / 12 = 10."
    },
    {
        pergunta: "De quantas maneiras 4 pessoas podem se sentar ao redor de uma mesa redonda?",
        alternativas: ["4", "6", "12", "24"],
        correta: 1,
        explicacao: "Na permutação circular, o total é (n − 1)!. Para 4 pessoas: 3! = 6."
    },
    {
        pergunta: "Quantas senhas de 3 dígitos podem ser formadas com os algarismos de 0 a 9, permitindo repetição?",
        alternativas: ["30", "720", "900", "1000"],
        correta: 3,
        explicacao: "Cada dígito tem 10 opções: 10 × 10 × 10 = 1000."
    },
    {
        pergunta: "Por que o sorteio das 6 dezenas da Mega-Sena é resolvido com combinação?",
        alternativas: ["Porque a ordem de sorteio das dezenas não importa", "Porque as dezenas podem se repetir", "Porque a ordem de sorteio muda o prêmio", "Porque só existem 6 números possíveis"],
        correta: 0,
        explicacao: "O que importa é quais dezenas foram sorteadas, não a ordem. Por isso usamos C(60, 6) = 50.063.860."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
