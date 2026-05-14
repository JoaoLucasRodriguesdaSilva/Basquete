type MinutoRegular = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type DezenaSegundo = "0" | "1" | "2" | "3" | "4" | "5";
type UnidadeSegundo = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type SegundoValido = `${DezenaSegundo}${UnidadeSegundo}`;

export type CronometroPeriodo = `${MinutoRegular}:${SegundoValido}` | "10:00";

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
