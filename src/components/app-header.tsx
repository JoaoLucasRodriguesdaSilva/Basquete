"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Partida", href: "/" },
  { label: "Histórico", href: "/historico" },
  { label: "Estatísticas", href: "/estatisticas" },
  { label: "Nova Partida", href: "/nova-partida" },
];
const iconPlaceholder = "[□]";

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
        <span className="app-header__symbol">[○]</span>
        <span className="app-header__title">Placar de Basquete</span>
      </div>

      <nav className="app-header__nav" aria-label="Navegação principal">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              className={getLinkClassName(isActive)}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              <span>{iconPlaceholder}</span>
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
        <span>{iconPlaceholder}</span>
        <span>Configurações</span>
      </Link>
    </header>
  );
}
