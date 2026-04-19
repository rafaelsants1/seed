import type { UserRole } from '../types/auth';

export interface NavigationItem {
  label: string;
  path: string;
  aliases?: string[];
}

interface RoleNavigation {
  defaultPath: string;
  items: NavigationItem[];
}

export const navigationByRole: Record<UserRole, RoleNavigation> = {
  aluno: {
    defaultPath: '/',
    items: [
      { label: 'Início', path: '/' },
      { label: 'Minhas Provas', path: '/provas' },
      { label: 'Simulados', path: '/simulados', aliases: ['/simulados/'] },
      { label: 'Resultados', path: '/resultados' },
      { label: 'Diagnóstico', path: '/diagnostico' },
      { label: 'Local de Prova', path: '/local-prova' },
    ],
  },
  professor: {
    defaultPath: '/',
    items: [
      { label: 'Painel de Provas', path: '/' },
      { label: 'Montar Prova', path: '/criar-prova' },
      { label: 'Banco de Questões', path: '/banco-questoes' },
      { label: 'Aplicações', path: '/aplicacoes' },
      { label: 'Resultados', path: '/resultados' },
      { label: 'Diagnóstico da Turma', path: '/diagnostico' },
    ],
  },
  secretaria: {
    defaultPath: '/',
    items: [
      { label: 'Painel Macro', path: '/' },
      { label: 'Aplicações', path: '/aplicacoes' },
      { label: 'Resultados da Rede', path: '/resultados-rede' },
      { label: 'Banco de Questões', path: '/banco-questoes' },
      { label: 'Escolas de Aplicação', path: '/escolas' },
      { label: 'Gestão de Acesso', path: '/gestao-usuarios' },
    ],
  },
};

export function getDefaultPathByRole(role: UserRole) {
  return navigationByRole[role].defaultPath;
}

export function getNavigationItemsByRole(role: UserRole) {
  return navigationByRole[role].items;
}

export function isPathAllowedForRole(role: UserRole, pathname: string) {
  return navigationByRole[role].items.some((item) => {
    if (item.path === pathname) return true;
    return item.aliases?.some((alias) => pathname.startsWith(alias)) ?? false;
  });
}
