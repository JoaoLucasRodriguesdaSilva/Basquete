"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsBarChartFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { MdOutlineScoreboard, MdOutlineSportsBasketball } from "react-icons/md";
import { RiLoopLeftLine } from "react-icons/ri";

const navItems = [
  { label: "Partida", href: "/", icon: MdOutlineScoreboard },
  { label: "Histórico", href: "/historico", icon: LuAlarmClock },
  { label: "Estatísticas", href: "/estatisticas", icon: BsBarChartFill },
  { label: "Nova Partida", href: "/nova-partida", icon: RiLoopLeftLine },
];

const getLinkClassName = (isActive: boolean, isSettings?: boolean) =>
  ["app-header__link", isSettings && "app-header__settings", isActive && "app-header__link--active"]
    .filter(Boolean)
    .join(" ");

export function AppHeader() {
  const pathname = usePathname();
  const isSettingsActive = pathname === "/configuracoes";

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__symbol" aria-hidden="true">
          <MdOutlineSportsBasketball />
        </span>
        <span className="app-header__title">Placar de Basquete</span>
      </div>

      <nav className="app-header__nav" aria-label="Navegação principal">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              className={getLinkClassName(isActive)}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              <span aria-hidden="true">
                <Icon />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Link
        className={getLinkClassName(isSettingsActive, true)}
        href="/configuracoes"
        aria-current={isSettingsActive ? "page" : undefined}
      >
        <span aria-hidden="true">
          <IoSettingsOutline />
        </span>
        <span>Configurações</span>
      </Link>
    </header>
  );
}
