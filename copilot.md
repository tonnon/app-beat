# 🧠 GitHub Copilot — Regras do Projeto

Estas são as diretrizes **obrigatórias** para gerar e manter código neste projeto.

---

## 🧩 Padrões Gerais

- Seguir os princípios de **Clean Code**.  
- O código deve ser **legível**, **modular**, **performático** e de **fácil manutenção**.  
- **Nunca** usar `any`. Sempre utilizar **tipagem forte (TypeScript)**.  
- Aplicar **boas práticas de programação**: nomes claros, funções pequenas, reutilização e consistência.  
- Priorizar **simplicidade, clareza e performance** em todas as implementações.  
- Evitar renderizações desnecessárias, loops custosos e cálculos dentro do JSX.  
- Reutilizar hooks e componentes para evitar duplicação de lógica.
- Usar **nomes de classes em kebab-case** (ex: `auth-card-container`).  
- **Não usar** construções como:
  const menuClassName = ['mobile-menu', isOpen && 'is-open'].filter(Boolean).join(' ');

---

## ⚡️ Performance

- **Evitar re-renderizações desnecessárias**:
  - Usar `React.memo` em componentes que não mudam com frequência.  
  - Usar `useCallback` e `useMemo` para funções e valores derivados de estados.  
- **Evitar operações pesadas no render** — mover cálculos para hooks ou efeitos.  
- **Lazy load** para rotas, imagens e componentes grandes.  
- **Preferir estados locais** (`useState`) a globais, quando possível.  
- Usar **chaves (`key`) estáveis** em listas e evitar recriar arrays/objetos no render.  
- Garantir que cada componente tenha **responsabilidade única**.

---

## 🌍 Internacionalização (i18n)

- O projeto é **multilíngue** (Espanhol ↔ Catalão).  
- **Todo texto exibido na interface** (títulos, botões, mensagens, placeholders etc.) deve:
  - Ser colocado dentro do **mecanismo de tradução** do projeto.  
  - Usar `language.<chave>` ou `t('chave')` conforme o padrão.  
- **Nunca** deixar textos fixos diretamente no JSX ou strings.  
- Reutilizar chaves existentes quando possível.  
- Verificar se a tradução está centralizada antes de criar uma nova.

Exemplo:
```tsx
// ✅ Correto
<Button>{t('auth.login')}</Button>

// ❌ Errado
<Button>Entrar</Button>
