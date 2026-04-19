import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppShell } from "./components/layout/AppShell";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProvasPage } from "./pages/ProvasPage";
import { LocalProvaPage } from "./pages/LocalProvaPage";
import { CriarProvaPage } from "./pages/CriarProvaPage";
import { NotasPage } from "./pages/NotasPage";
import { AvaliacoesPage } from "./pages/AvaliacoesPage";
import { EscolasPage } from "./pages/EscolasPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";
import { BancoQuestoesPage } from "./pages/BancoQuestoesPage";
import { GestaoUsuariosPage } from "./pages/GestaoUsuariosPage";
import { SimuladosPage } from "./pages/SimuladosPage";
import { SimuladoPage } from "./pages/SimuladoPage";

function LegacySimuladoRedirect() {
  const { id } = useParams();
  return <Navigate to={`/simulados/${id ?? "1"}`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route path="/" element={<AppShell><DashboardPage /></AppShell>} />
        <Route path="/provas" element={<AppShell><ProvasPage /></AppShell>} />
        <Route path="/simulados" element={<AppShell><SimuladosPage /></AppShell>} />
        <Route path="/simulados/:id" element={<AppShell><SimuladoPage /></AppShell>} />
        <Route path="/dashboard/simulados" element={<Navigate to="/simulados" replace />} />
        <Route path="/dashboard/simulado/:id" element={<LegacySimuladoRedirect />} />
        <Route path="/diagnostico" element={<AppShell><PerformancePage /></AppShell>} />
        <Route path="/desempenho" element={<Navigate to="/diagnostico" replace />} />
        <Route path="/dashboard/performance" element={<Navigate to="/diagnostico" replace />} />
        <Route path="/local-prova" element={<AppShell><LocalProvaPage /></AppShell>} />
        <Route path="/historico" element={<Navigate to="/resultados" replace />} />
        <Route path="/turmas" element={<Navigate to="/aplicacoes" replace />} />
        <Route path="/relatorios" element={<Navigate to="/resultados-rede" replace />} />
        <Route path="/resultados-rede" element={<AppShell><RelatoriosPage /></AppShell>} />
        <Route path="/criar-prova" element={<AppShell><CriarProvaPage /></AppShell>} />
        <Route path="/notas" element={<Navigate to="/resultados" replace />} />
        <Route path="/resultados" element={<AppShell><NotasPage /></AppShell>} />
        <Route path="/avaliacoes" element={<Navigate to="/aplicacoes" replace />} />
        <Route path="/aplicacoes" element={<AppShell><AvaliacoesPage /></AppShell>} />
        <Route path="/escolas" element={<AppShell><EscolasPage /></AppShell>} />
        <Route path="/banco-questoes" element={<AppShell><BancoQuestoesPage /></AppShell>} />
        <Route path="/gestao-usuarios" element={ <AppShell><GestaoUsuariosPage /></AppShell>}/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
