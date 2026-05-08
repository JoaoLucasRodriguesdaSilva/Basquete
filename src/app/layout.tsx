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
            <a className="app-header__link app-header__link--active" href="#">
              <span>[□]</span>
              <span>Partida</span>
            </a>
            <a className="app-header__link" href="#">
              <span>[□]</span>
              <span>Histórico</span>
            </a>
            <a className="app-header__link" href="#">
              <span>[□]</span>
              <span>Estatísticas</span>
            </a>
            <a className="app-header__link" href="#">
              <span>[□]</span>
              <span>Nova Partida</span>
            </a>
          </nav>

          <a className="app-header__link app-header__settings" href="#">
            <span>[□]</span>
            <span>Configurações</span>
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
