import input from "readline-sync"


const RESET = "\x1b[0m";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const WHITE = "\x1b[37m";

const BG_RED = "\x1b[41m";
const BG_GREEN = "\x1b[42m";
const BG_YELLOW = "\x1b[43m";
const BG_BLUE = "\x1b[44m";
const BG_MAGENTA = "\x1b[45m";
const BG_CYAN = "\x1b[46m";
const BG_WHITE = "\x1b[47m";


export function titulo(texto) {
    console.log(`\n${BG_BLUE}========== ${texto} ==========${RESET}\n`);
}

export function subtitulo(texto) {
    console.log(`\n${BG_MAGENTA}========== ${texto} ==========${RESET}\n`);
}

export function notificacao(tipo, texto) {
    let COLOR;
    if (tipo === 1) {
        COLOR = GREEN;
    } else if (tipo === 2) {
        COLOR = RED;
    } else {
        console.log("Ou é 1 ou 2");
        return
    }
    console.log(`\n ${COLOR}${texto}${RESET}\n`)
}

export function inputINT() {
    while (true) {
        const valor = input.question("Digite: ").trim();
        const numero = parseInt(valor);

        if (!isNaN(numero)) {
            return numero;
        }

        notificacao(2, "Opção inválida! Insira um número inteiro válido.");
    }
}

export function verificacao(texto) {
    console.log(`\n${texto}`)
    console.log("1.Sim\n2.Não");
    const opcao = inputINT()
    if (opcao === 2) {
        notificacao(2, "Operação cancelada.")
        return true
    }
}

export function dataFormatada() {
    while (true) {
        try {
            function formatInt(texto, caractere) {
                while (true) {
                    const num = parseInt(input.question(`${texto}: `))
                    if (!isNaN(num)) {
                        return num
                    } else {
                        notificacao(2, `Insira um ${texto} valido!`)
                    }
                }

            }
            const dia = formatInt("Dia")
            const mes = formatInt("Mes")
            const ano = formatInt("Ano")
            const data = new Date(ano, mes - 1, dia)

            const dd = String(data.getDate()).padStart(2, "0");
            const mm = String(data.getMonth() + 1).padStart(2, "0");
            const yyyy = data.getFullYear();

            return `${yyyy}-${mm}-${dd}`;

        }
        catch {
            notificacao(2, "Formato de data invalido!")
        }
    }
}

export function extrairData(desc) {
    while (true) {
        const texto = input.question(`> ${desc} (dd/mm/aaaa): `);

        // Separar dia, mês e ano
        const partes = texto.split("/");
        if (partes.length !== 3) {
            notificacao(2, "Formato inválido! Use dd/mm/aaaa");
            continue;
        }

        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; // mês começa do 0
        const ano = parseInt(partes[2], 10);

        const data = new Date(ano, mes, dia);

        // Verifica se a data é válida
        if (data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia) {
            const diaStr = String(dia).padStart(2, "0");
            const mesStr = String(mes + 1).padStart(2, "0");
            return `${diaStr}/${mesStr}/${ano}`;
        } else {
            notificacao(2, "Data inválida! Verifique dia, mês e ano.");
        }
    }
}
