import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basquete",
  description: "Next.js environment configured for TSX development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="app-header">
          <div className="app-header__brand">
            <span className="app-header__symbol">[○]</span>
            <span className="app-header__title">Placar de Basquete</span>
          </div>

          <nav className="app-header__nav" aria-label="Navegação principal">
            <button className="app-header__link app-header__link--active" type="button">
              <span>[□]</span>
              <span>Partida</span>
            </button>
            <button className="app-header__link" type="button">
              <span>[□]</span>
              <span>Histórico</span>
            </button>
            <button className="app-header__link" type="button">
              <span>[□]</span>
              <span>Estatísticas</span>
            </button>
            <button className="app-header__link" type="button">
              <span>[□]</span>
              <span>Nova Partida</span>
            </button>
          </nav>

          <button className="app-header__link app-header__settings" type="button">
            <span>[□]</span>
            <span>Configurações</span>
          </button>
        </header>
        {children}
      </body>
    </html>
  );
}
