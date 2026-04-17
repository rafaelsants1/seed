# Arquitetura de Hooks - frontend_seed

## Visão Geral

Esta documentação descreve a camada de hooks React implementada para desacoplar as páginas dos services e preparar a integração com backend real.

## Estrutura de Pastas

```
src/features/
├── auth/
│   ├── api/
│   │   └── auth.service.ts
│   ├── types/
│   │   └── user.types.ts
│   └── hooks/
│       ├── index.ts       (export: useAuth)
│       └── useAuth.ts
│
├── exams/
│   ├── api/
│   │   └── exams.service.ts
│   ├── types/
│   │   ├── exam.types.ts
│   │   ├── question.types.ts
│   │   └── attempt.types.ts
│   └── hooks/
│       ├── index.ts       (export: useExams)
│       └── useExams.ts
│
└── performance/
    ├── api/
    │   └── performance.service.ts
    ├── types/
    │   └── performance.types.ts
    └── hooks/
        ├── index.ts       (export: usePerformance)
        └── usePerformance.ts
```

## Hooks Implementados

### useAuth

**Local:** `src/features/auth/hooks/useAuth.ts`

**Funcionalidades:**

- Gerenciamento automático da sessão ao montar o componente
- Login com persistência em localStorage
- Logout com limpeza de estado
- Refresh explícito de sessão
- Estados de loading e error

**API:**

```typescript
const {
  user, // User | null
  isAuthenticated, // boolean
  isLoading, // boolean
  error, // string | null
  login, // (payload) => Promise<void>
  logout, // () => Promise<void>
  refreshSession, // () => Promise<void>
} = useAuth();
```

**Exemplo de uso:**

```tsx
import { useAuth } from "@/features/auth/hooks";

function LoginPage() {
  const { user, isAuthenticated, isLoading, login } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    await login({ email, password });
  };

  // ...
}
```

---

### useExams

**Local:** `src/features/exams/hooks/useExams.ts`

**Funcionalidades:**

- Carregamento automático ou manual de simulados
- Busca de simulado por ID
- Carregamento de questões por simulado
- Submit de respostas com resultado
- Estados de loading, submitting e error
- Limpeza de estado e erro

**API:**

```typescript
const {
  exams,             // Exam[]
  currentExam,       // Exam | null
  questions,         // Question[]
  isLoading,         // boolean
  isSubmitting,      // boolean
  error,             // string | null
  loadExams,         // () => Promise<void>
  loadExamById,      // (id: string) => Promise<Exam | null>
  loadQuestions,     // (examId: string) => Promise<Question[]>
  submitExam,        // (answers) => Promise<ExamResultSummary | null>
  clearError,        // () => void
  clearCurrentExam,  // () => void
} = useExams(options?);

// Options: { autoLoad?: boolean }
```

**Exemplo de uso:**

```tsx
import { useExams } from "@/features/exams/hooks";

function SimuladosPage() {
  const { exams, isLoading, error } = useExams();

  // ...
}

function SimuladoPage() {
  const { currentExam, questions, loadExamById, loadQuestions, submitExam } =
    useExams({
      autoLoad: false,
    });

  useEffect(() => {
    loadExamById(id);
    loadQuestions(id);
  }, [id]);

  // ...
}
```

---

### usePerformance

**Local:** `src/features/performance/hooks/usePerformance.ts`

**Funcionalidades:**

- Carregamento de performance por userId
- Refresh explícito de dados
- Estados de loading e error
- Limpeza de erro

**API:**

```typescript
const {
  performance,        // PerformanceData | null
  isLoading,          // boolean
  error,              // string | null
  loadPerformance,    // (userId: string) => Promise<void>
  refreshPerformance, // () => Promise<void>
  clearError,         // () => void
} = usePerformance(options?);

// Options: { autoLoad?: boolean, userId?: string }
```

**Exemplo de uso:**

```tsx
import { usePerformance } from "@/features/performance/hooks";

function PerformancePage() {
  const { performance, isLoading, loadPerformance } = usePerformance({
    autoLoad: true,
    userId: "1",
  });

  // ...
}
```

---

## Padrões de Implementação

### 1. Tipagem Forte

Todos os hooks usam TypeScript com tipos importados das respectivas camadas:

```typescript
import type { Exam } from "../types/exam.types";
import type { Question } from "../types/question.types";
```

### 2. useCallback para Funções

Funções expostas pelo hook usam `useCallback` para estabilidade de referência:

```typescript
const loadExams = useCallback(async () => {
  // ...
}, []);
```

### 3. Estados Padronizados

Cada hook expõe estados consistentes:

- `isLoading`: indica carregamento inicial
- `error`: mensagem de erro ou null
- `isSubmitting` / `isMutating`: para operações de escrita

### 4. Sem Acesso Direto a Mock

Hooks **não** acessam `mockData.ts` diretamente. Eles consomem apenas os services:

```typescript
// ✅ Correto
import { getExams } from "../api/exams.service";

// ❌ Incorreto
import { mockExams } from "../../../data/mockData";
```

### 5. Preparado para Backend Real

Para migrar para backend real, basta substituir a implementação do service:

```typescript
// Antes (mock)
export async function getExams(): Promise<Exam[]> {
  return Promise.resolve(mockExams);
}

// Depois (API real)
export async function getExams(): Promise<Exam[]> {
  const response = await fetch("/api/exams");
  return response.json();
}
```

O hook permanece inalterado.

---

## Páginas Refatoradas

| Página                | Hook Utilizado   | Mudanças                                  |
| --------------------- | ---------------- | ----------------------------------------- |
| `PerfilPage.tsx`      | `useAuth`        | Removeu useState/useEffect para sessão    |
| `SimuladosPage.tsx`   | `useExams`       | Removeu carga manual de simulados         |
| `SimuladoPage.tsx`    | `useExams`       | Usa loadExamById/loadQuestions/submitExam |
| `PerformancePage.tsx` | `usePerformance` | Removeu carga manual de performance       |

---

## Benefícios da Arquitetura

1. **Desacoplamento:** Páginas não dependem de implementação de services
2. **Testabilidade:** Hooks podem ser mockados em testes
3. **Reutilização:** Lógica de estado compartilhada entre componentes
4. **Manutenibilidade:** Mudanças no backend afetam apenas o service
5. **Consistência:** Padrão uniforme em todas as features

---

## Próximos Passos (Sugestões)

1. **React Query / TanStack Query:** Substituir hooks por `useQuery`/`useMutation` para caching e revalidação automática
2. **Context API:** Criar `AuthProvider` para estado global de autenticação
3. **Custom Error Handling:** Centralizar tratamento de erros em um hook `useApiError`
4. **Retry Logic:** Adicionar tentativas automáticas para falhas de rede

---

## Checklist para Novos Hooks

Ao criar um hook para uma nova feature:

- [ ] Criar pasta `hooks/` dentro da feature
- [ ] Nomear arquivo como `use<Nome>.ts` (PascalCase após "use")
- [ ] Exportar via `index.ts` da pasta hooks
- [ ] Usar `useState` + `useEffect` + `useCallback`
- [ ] Tipar todos os estados e retornos
- [ ] Não acessar mockData diretamente
- [ ] Consumir apenas services da camada `api/`
- [ ] Documentar API do hook com JSDoc
- [ ] Adicionar exemplo de uso nesta documentação
