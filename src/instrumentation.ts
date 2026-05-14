import { NovaPartida } from "@/lib/partida-funcoes";

export function register() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const time1 = process.env.NOVA_PARTIDA_TIME_1 ?? "Time 1";
  const time2 = process.env.NOVA_PARTIDA_TIME_2 ?? "Time 2";

  NovaPartida(time1, time2);
}
