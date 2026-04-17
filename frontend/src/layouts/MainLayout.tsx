import { NavLink, Outlet, useLocation } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Simulados", href: "/dashboard/simulados" },
  { name: "Desempenho", href: "/dashboard/performance" },
  { name: "Perfil", href: "/dashboard/perfil" },
];

function getPageTitle(pathname: string) {
  if (pathname.includes("/simulados")) return "Simulados";
  if (pathname.includes("/simulado/")) return "Simulado";
  if (pathname.includes("/performance")) return "Desempenho";
  if (pathname.includes("/perfil")) return "Perfil";
  return "Dashboard";
}

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 bg-[#1A2A44] text-white lg:flex lg:flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-xs uppercase tracking-[0.14em] text-blue-100">
              Secretaria da Educação
            </p>
            <h1 className="mt-2 text-xl font-semibold leading-7">
              Sistema de Avaliação
            </h1>
            <p className="mt-2 text-sm leading-6 text-blue-100/90">
              Ambiente de simulados e acompanhamento de desempenho.
            </p>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard"}
                className={({ isActive }) =>
                  [
                    "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-blue-100 hover:bg-white/5 hover:text-white",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/10 px-6 py-5">
            <div className="rounded-2xl bg-white/5 px-4 py-4">
              <p className="text-sm font-medium text-white">
                Ambiente acadêmico
              </p>
              <p className="mt-1 text-xs leading-5 text-blue-100/85">
                Estrutura preparada para futura integração com backend e base de
                dados.
              </p>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-[#F4F2EE]/95 backdrop-blur">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  Sistema institucional
                </p>
                <h2 className="mt-1 text-xl font-semibold text-[#1A2A44]">
                  {getPageTitle(location.pathname)}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium text-slate-800">
                    Área do estudante
                  </p>
                  <p className="text-xs text-slate-500">
                    Rede estadual de ensino
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A2A44] text-sm font-semibold text-white">
                  J
                </div>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 bg-white lg:hidden">
            <div className="flex gap-2 overflow-x-auto px-4 py-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === "/dashboard"}
                  className={({ isActive }) =>
                    [
                      "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-[#1B4FBF] bg-[#1B4FBF] text-white"
                        : "border-slate-200 bg-white text-slate-600",
                    ].join(" ")
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
