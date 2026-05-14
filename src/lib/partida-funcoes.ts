import type { CronometroPeriodo, Jogador, Partida } from "@/types/partida";

let partidaAtual: Partida | null = null;
let cronometroAtivo: ReturnType<typeof setInterval> | null = null;
let cronometroTravadoNoFim = false;

const TEMPO_MAXIMO_SEGUNDOS = 10 * 60;

function garantirPartida(): Partida {
  if (!partidaAtual) {
    throw new Error("Nenhuma partida iniciada.");
  }

  return partidaAtual;
}

function formatarCronometro(totalSegundos: number): CronometroPeriodo {
  if (totalSegundos >= TEMPO_MAXIMO_SEGUNDOS) {
    return "10:00";
  }

  const minutos = Math.floor(totalSegundos / 60);
  const segundos = totalSegundos % 60;

  return `${minutos}:${segundos.toString().padStart(2, "0")}` as CronometroPeriodo;
}

function lerSegundos(cronometro: CronometroPeriodo): number {
  if (cronometro === "10:00") {
    return TEMPO_MAXIMO_SEGUNDOS;
  }

  const [minuto, segundo] = cronometro.split(":");
  return Number(minuto) * 60 + Number(segundo);
}

function limparCronometroAtivo() {
  if (!cronometroAtivo) {
    return;
  }

  clearInterval(cronometroAtivo);
  cronometroAtivo = null;
}

function obterJogadoresPorTime(partida: Partida, time: 1 | 2): Jogador[] {
  return time === 1 ? partida.jogadores1 : partida.jogadores2;
}

function clonarPartida(partida: Partida): Partida {
  return {
    ...partida,
    jogadores1: partida.jogadores1.map((jogador) => ({ ...jogador })),
    jogadores2: partida.jogadores2.map((jogador) => ({ ...jogador })),
  };
}

export function NovaPartida(time1: string, time2: string): Partida {
  limparCronometroAtivo();
  cronometroTravadoNoFim = false;

  partidaAtual = {
    periodo: 1,
    cronometroPeriodo: "0:00",
    time1: time1.trim(),
    pontos1: 0,
    jogadores1: [],
    time2: time2.trim(),
    pontos2: 0,
    jogadores2: [],
  };

  return clonarPartida(partidaAtual);
}

export function AvancarPeriodo(): Partida {
  const partida = garantirPartida();

  if (partida.periodo < 4) {
    partida.periodo = (partida.periodo + 1) as 1 | 2 | 3 | 4;
  }

  return clonarPartida(partida);
}

export function IniciarCronometro(): boolean {
  garantirPartida();

  if (cronometroTravadoNoFim || cronometroAtivo) {
    return false;
  }

  cronometroAtivo = setInterval(() => {
    if (!partidaAtual) {
      limparCronometroAtivo();
      return;
    }

    const segundosAtuais = lerSegundos(partidaAtual.cronometroPeriodo);
    const proximoSegundo = segundosAtuais + 1;

    if (proximoSegundo >= TEMPO_MAXIMO_SEGUNDOS) {
      partidaAtual.cronometroPeriodo = "10:00";
      cronometroTravadoNoFim = true;
      limparCronometroAtivo();
      return;
    }

    partidaAtual.cronometroPeriodo = formatarCronometro(proximoSegundo);
  }, 1000);

  return true;
}

export function PausarCronometro(): void {
  limparCronometroAtivo();
}

export function ReiniciarCronometro(): Partida {
  const partida = garantirPartida();

  limparCronometroAtivo();
  cronometroTravadoNoFim = false;
  partida.cronometroPeriodo = "0:00";

  return clonarPartida(partida);
}

export function NovoJogador(time: 1 | 2, nome: string): Jogador {
  const partida = garantirPartida();
  const jogadores = obterJogadoresPorTime(partida, time);
  const nomeNormalizado = nome.trim();

  if (jogadores.some((jogador) => jogador.nome === nomeNormalizado)) {
    throw new Error("Jogador já existe no time.");
  }

  const jogador: Jogador = {
    nome: nomeNormalizado,
    pontos: 0,
  };

  jogadores.push(jogador);
  return { ...jogador };
}

export function AdicionarPonto(jogador: string, pontos: number): Jogador {
  const partida = garantirPartida();

  if (!Number.isInteger(pontos) || pontos <= 0) {
    throw new Error("Pontuação inválida.");
  }

  const nomeJogador = jogador.trim();
  const jogadorTime1 = partida.jogadores1.find((item) => item.nome === nomeJogador);
  const jogadorTime2 = partida.jogadores2.find((item) => item.nome === nomeJogador);
  const jogadorEncontrado = jogadorTime1 ?? jogadorTime2;

  if (!jogadorEncontrado) {
    throw new Error("Jogador não encontrado.");
  }

  jogadorEncontrado.pontos += pontos;
  return { ...jogadorEncontrado };
}

export function OrdenarJogadores(time: 1 | 2): Jogador[] {
  const partida = garantirPartida();
  const jogadores = [...obterJogadoresPorTime(partida, time)].sort((a, b) => b.pontos - a.pontos);

  if (time === 1) {
    partida.jogadores1 = jogadores;
  } else {
    partida.jogadores2 = jogadores;
  }

  return jogadores.map((jogador) => ({ ...jogador }));
}

export function CalcularPontos(time: 1 | 2): number {
  const partida = garantirPartida();
  const jogadores = obterJogadoresPorTime(partida, time);
  const pontos = jogadores.reduce((soma, jogador) => soma + jogador.pontos, 0);

  if (time === 1) {
    partida.pontos1 = pontos;
  } else {
    partida.pontos2 = pontos;
  }

  return pontos;
}

export function ResetarPontos(): Partida {
  const partida = garantirPartida();

  for (const jogador of partida.jogadores1) {
    jogador.pontos = 0;
  }

  for (const jogador of partida.jogadores2) {
    jogador.pontos = 0;
  }

  partida.pontos1 = 0;
  partida.pontos2 = 0;

  return clonarPartida(partida);
}
