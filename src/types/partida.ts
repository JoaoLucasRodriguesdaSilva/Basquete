export type CronometroPeriodo = `${number}:${number}${number}`;

export interface Jogador {
  nome: string;
  pontos: number;
}

export interface Partida {
  periodo: 1 | 2 | 3 | 4;
  cronometroPeriodo: CronometroPeriodo;
  time1: string;
  pontos1: number;
  jogadores1: Jogador[];
  time2: string;
  pontos2: number;
  jogadores2: Jogador[];
}
