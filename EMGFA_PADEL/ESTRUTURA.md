# 📁 Estrutura do Projeto PADEL

## Árvore de Ficheiros

```
EMGFA_PADEL/
│
├── 📄 index.html                    ← ABRA AQUI! (Página de entrada)
├── 📄 README.md                     (Documentação completa)
├── 📄 QUICKSTART.md                 (Guia de início rápido)
├── 📄 MANUAL.md                     (Manual detalhado do utilizador)
├── 📄 ESTRUTURA.md                  (Este ficheiro)
│
└── 📁 app/                          (Pasta da aplicação web)
    ├── 📄 index.html                (Aplicação principal)
    │
    ├── 📁 css/
    │   └── 📄 styles.css            (Design responsivo)
    │
    └── 📁 js/
        ├── 📄 database.js           (Gestão de dados localStorage)
        └── 📄 app.js                (Lógica da aplicação)
```

---

## Descrição dos Ficheiros

### 🚀 Entrada

#### `index.html` (Raiz)
- **Propósito**: Página de entrada/launcher
- **Conteúdo**: 
  - Botão "Abrir Aplicação"
  - Botão "Carregar Dados de Teste"
- **Uso**: Abra este ficheiro primeiro no navegador

---

### 📚 Documentação

#### `README.md`
- **Descrição**: Documentação técnica completa
- **Conteúdo**:
  - Funcionalidades gerais
  - Instruções de uso
  - Regras do sistema
  - Compatibilidade
  - Privacidade

#### `QUICKSTART.md`
- **Descrição**: Guia de início rápido
- **Conteúdo**:
  - Passos de instalação
  - Exemplo prático
  - Dicas importantes
  - Troubleshooting

#### `MANUAL.md`
- **Descrição**: Manual completo do utilizador
- **Conteúdo**:
  - Interface detalhada
  - Passo a passo de cada função
  - FAQ respondidas
  - Atalhos de teclado

#### `ESTRUTURA.md`
- **Descrição**: Este ficheiro
- **Conteúdo**: Descrição técnica da organização

---

### 🎯 Aplicação (Pasta `/app/`)

#### `app/index.html`
- **Propósito**: Aplicação web principal
- **Conteúdo**:
  - Estrutura HTML5
  - Navegação (Classificação, Novo Jogo, Histórico)
  - Formulários
  - Containers para renderização dinâmica
- **Referências**: Links para `css/styles.css` e `js/*.js`

#### `app/css/styles.css`
- **Propósito**: Design responsivo
- **Conteúdo**:
  - Tema moderno com gradientes
  - Mobile-first responsivo
  - Design para impressão
  - Animações suaves
  - Medias queries para:
    - Desktop (1200px+)
    - Tablet (768px - 1200px)
    - Mobile (480px - 768px)
    - Smartphone (< 480px)

#### `app/js/database.js`
- **Propósito**: Gestão de dados (localStorage)
- **Classe**: `PadelDatabase`
- **Métodos**:
  - `addGame()`: Adicionar novo jogo
  - `getClassificacao()`: Obter ranking ordenado
  - `getGames()`: Obter lista de jogos
  - `getJogadoresList()`: Obter nomes dos jogadores
  - `removeGame()`: Remover um jogo
  - `recalculateAllStats()`: Recalcular todas as estatísticas
  - `clearAll()`: Limpar todos os dados

#### `app/js/app.js`
- **Propósito**: Lógica da aplicação
- **Classe**: `PadelApp`
- **Funcionalidades**:
  - Navegação entre páginas
  - Renderização de classificação
  - Processamento de novo jogo
  - Gestão de histórico
  - Filtros e ordenação
  - Validações

---

## Fluxo de Dados

```
┌─────────────────┐
│   index.html    │ (Entrada)
└────────┬────────┘
         │ clica
         ↓
┌─────────────────┐
│  app/index.html │ (Interface)
└────────┬────────┘
         │
         ├─→ CSS (Estilos) ────→ app/css/styles.css
         │
         └─→ JavaScript
            ├─→ Database ────→ app/js/database.js → localStorage
            └─→ App Logic ───→ app/js/app.js
```

---

## Armazenamento de Dados

### localStorage Keys

```javascript
// Chaves utilizadas no localStorage:

1. "padel_games" → Array de objetos
   {
     id: número único,
     date: "AAAA-MM-DD",
     equipa_a: { j1: string, j2: string },
     equipa_b: { j1: string, j2: string },
     sets: [{ a: número, b: número }, ...],
     winner: "A" ou "B"
   }

2. "padel_players" → Dicionário de nomes
   {
     "João Silva": true,
     "Maria Santos": true,
     ...
   }

3. "padel_stats" → Estatísticas calculadas
   {
     "João Silva": {
       nome: string,
       pontos: número,
       jogos: número,
       vitorias: número,
       derrotas: número,
       setsGanhos: número,
       setsPerdidos: número
     },
     ...
   }
```

---

## Responsividade

### Breakpoints
- **Desktop**: 1200px+
  - Grid com todos os elementos
  - Conteúdo expandido
  
- **Tablet**: 768px - 1200px
  - Ajuste de fontes
  - Padding reduzido
  
- **Smartphone**: 480px - 768px
  - Grid compactado
  - Botões adaptados
  
- **Mini**: < 480px
  - Visualização minimalista
  - Stack vertical

---

## Compatibilidade

### Navegadores Suportados
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (Android/iOS)

### APIs Utilizadas
- `localStorage` (Web Storage API)
- `JSON` (nativo)
- `Date` (nativo)
- `DOM` manipulation (nativo)

---

## Segurança e Privacidade

✅ **Nenhum servidor necessário**
✅ **Dados locais apenas**
✅ **Sem tracking**
✅ **Sem publicidade**
✅ **100% privado**

---

## Como Executar

### Local (Ficheiro)
```bash
1. Duplo clique em index.html
2. Clique em "Abrir Aplicação"
```

### Local (Servidor)
```bash
# Windows - Command Prompt
cd EMGFA_PADEL
python -m http.server 8000

# Linux/Mac - Terminal
python3 -m http.server 8000

# Com npm
npx http-server
```
Depois: `http://localhost:8000`

### Online (Deploy)
- Copie a pasta `app/` para um hosting
- Aceda ao URL

---

## Performance

| Métrica | Valor |
|---------|-------|
| Tamanho HTML | ~15 KB |
| Tamanho CSS | ~20 KB |
| Tamanho JS | ~30 KB |
| **Total** | **~65 KB** |
| Tempo Carregamento | < 1 segundo |
| Compatibilidade | 100% |

---

## Futuras Melhorias

- [ ] Sincronização em nuvem (Firebase/Supabase)
- [ ] Gráficos de desempenho
- [ ] Exportar para CSV/PDF
- [ ] Notificações
- [ ] App nativa (Electron/Tauri)
- [ ] Modo escuro
- [ ] Múltiplos torneios
- [ ] Ranking semanal/mensal

---

## Suporte e Contacto

Para dúvidas:
1. Consulte `README.md` para documentação técnica
2. Consulte `MANUAL.md` para guia do utilizador
3. Consulte `QUICKSTART.md` para início rápido

---

**Versão**: 1.0  
**Data**: Maio 2026  
**Estado**: ✅ Completo e Funcional
