import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppShell } from "./components/layout/AppShell";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProvasPage } from "./pages/ProvasPage";
import { LocalProvaPage } from "./pages/LocalProvaPage";
import { HistoricoPage } from "./pages/HistoricoPage";
import { CriarProvaPage } from "./pages/CriarProvaPage";
import { TurmasPage } from "./pages/TurmasPage";
import { NotasPage } from "./pages/NotasPage";
import { AvaliacoesPage } from "./pages/AvaliacoesPage";
import { EscolasPage } from "./pages/EscolasPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";
import { BancoQuestoesPage } from "./pages/BancoQuestoesPage";
import { GestaoUsuariosPage } from "./pages/GestaoUsuariosPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route path="/" element={<AppShell><DashboardPage /></AppShell>} />
        <Route path="/provas" element={<AppShell><ProvasPage /></AppShell>} />
        <Route path="/desempenho" element={<AppShell><PerformancePage /></AppShell>} />
        <Route path="/local-prova" element={<AppShell><LocalProvaPage /></AppShell>} />
        <Route path="/historico" element={<AppShell><HistoricoPage /></AppShell>} />
        <Route path="/turmas" element={<AppShell><TurmasPage /></AppShell>} />
        <Route path="/relatorios" element={<AppShell><RelatoriosPage /></AppShell>} />
        <Route path="/criar-prova" element={<AppShell><CriarProvaPage /></AppShell>} />
        <Route path="/notas" element={<AppShell><NotasPage /></AppShell>} />
        <Route path="/avaliacoes" element={<AppShell><AvaliacoesPage /></AppShell>} />
        <Route path="/escolas" element={<AppShell><EscolasPage /></AppShell>} />
        <Route path="/banco-questoes" element={<AppShell><BancoQuestoesPage /></AppShell>} />
        <Route path="/gestao-usuarios" element={ <AppShell><GestaoUsuariosPage /></AppShell>}/>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
