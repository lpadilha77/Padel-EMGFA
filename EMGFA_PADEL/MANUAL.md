# 📖 Manual Completo - PADEL Gestor de Resultados

## Índice
1. [Instalação](#instalação)
2. [Interface](#interface)
3. [Registar Jogos](#registar-jogos)
4. [Classificação](#classificação)
5. [Histórico](#histórico)
6. [FAQ](#faq)

---

## Instalação

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Sem instalação necessária
- Sem acesso à internet necessário

### Como Iniciar

**Forma 1 - Rápida**
1. Abra o ficheiro `index.html` (na raiz)
2. Clique em "Abrir Aplicação"

**Forma 2 - Com Exemplos**
1. Abra o ficheiro `index.html` (na raiz)
2. Clique em "Carregar Dados de Teste"
3. Exploure com dados de exemplo

**Forma 3 - Servidor Local**
```bash
# Windows - Command Prompt
cd EMGFA_PADEL
python -m http.server 8000

# Linux/Mac - Terminal
cd EMGFA_PADEL
python3 -m http.server 8000

# Com npm
npx http-server
```
Depois aceda a: `http://localhost:8000`

---

## Interface

### Barra de Navegação
```
🎾 PADEL | [Classificação] [Novo Jogo] [Histórico]
```

Três seções principais:
- **Classificação**: Rankings dos jogadores
- **Novo Jogo**: Registar novos resultados
- **Histórico**: Consultar jogos passados

### Cores e Ícones
- 🥇 Posição 1 (Ouro)
- 🥈 Posição 2 (Prata)
- 🥉 Posição 3 (Bronze)
- 🏆 Equipa vencedora
- 👤 Jogador
- 📅 Data
- 📊 Estatísticas

---

## Registar Jogos

### Passo 1: Abrir Novo Jogo
Clique no botão **"Novo Jogo"** na navegação

### Passo 2: Preencher Equipa A
```
Equipa A
├─ Jogador 1 * [Campo de texto]
└─ Jogador 2 * [Campo de texto]
```

**Dica**: Comece a escrever e aparecerá autocomplete com jogadores anteriores

### Passo 3: Preencher Equipa B
```
Equipa B
├─ Jogador 1 * [Campo de texto]
└─ Jogador 2 * [Campo de texto]
```

### Passo 4: Resultados dos Sets
```
Set 1: [score] - [score] *
Set 2: [score] - [score] *
Set 3: [score] - [score]
```

**Obrigatório**: Sets 1 e 2
**Opcional**: Set 3 (só se necessário)

**Exemplo**:
- Set 1: 6 - 4 (Equipa A vence o set)
- Set 2: 3 - 6 (Equipa B vence o set)
- Set 3: 6 - 2 (Equipa A vence)
→ Resultado: **Equipa A vence 2-1**

### Passo 5: Data do Jogo
```
Data do Jogo: [AAAA-MM-DD]
```
Por defeito, mostra a data de hoje. Pode alterar se o jogo foi noutro dia.

### Passo 6: Guardar
Clique em **"Guardar Jogo"**

**Resultado**:
✅ Mensagem verde: "Jogo guardado com sucesso!"
- A classificação atualiza automaticamente
- Os nomes dos jogadores ficam guardados para próximos jogos
- O jogo aparece no histórico

**Erros Comuns**:
- ❌ "Por favor, preencha todos os nomes dos jogadores"
  → Todos os 4 campos de nomes devem ter texto

- ❌ "Não pode haver jogadores repetidos"
  → Os 4 jogadores devem ser diferentes

- ❌ "Set 1 incompleto"
  → Ambos os campos de score devem ter valores

- ❌ "Resultado incompleto ou inválido"
  → Verifique se alguém ganhou 2 sets

- ❌ "Não pode ter empate"
  → Um set não pode terminar com o mesmo score

### Validações Automáticas

#### Sem Empates
Exemplo ❌: Set 1: 5 - 5 (NÃO ACEITE)
Exemplo ✅: Set 1: 6 - 4 (ACEITE)

#### Best of 3
- Se a Equipa A ganha Set 1 e Set 2 → Set 3 não é necessário
- Se ficou 1-1 em sets → Set 3 é obrigatório
- Máximo 3 sets

#### Exemplo Automático
```
Set 1: 6-4 (A vence 1-0)
Set 2: 6-3 (A vence 2-0)
→ Jogo termina aqui
→ Set 3 é ignorado mesmo que preenchido
```

---

## Classificação

### Vista Geral
```
Pos  Jogador              Pts  Jogos  V-D
 🥇  João Silva           12    4     4-0
 🥈  Maria Santos         10    4     3-1
 🥉  Pedro Costa           7    4     2-2
```

**Colunas**:
- **Pos**: Posição (com medalhas para top 3)
- **Jogador**: Nome do jogador
- **Pts**: Total de pontos
- **Jogos**: Número de jogos disputados
- **V-D**: Vitórias - Derrotas

### Ordenação

**Ordem Automática**:
1. Por **Pontos** (descendente) - Mais pontos = Melhor posição
2. Por **Diferença V-D** (descendente) - Se empate em pontos
3. Por **Vitórias** (descendente) - Se ainda empatado

**Exemplo**:
```
João Silva:    12 pts (4 vitórias - 0 derrotas = +4 diferença)
Maria Santos:  12 pts (3 vitórias - 1 derrota = +2 diferença)
→ João fica acima porque tem melhor diferença
```

### Sistema de Pontos

#### Vitória (3 pontos por jogador)
- Equipa vence 2 sets
- Cada jogador: +3 pontos

#### Derrota (1 ponto por jogador)
- Equipa perde
- Cada jogador: +1 ponto

**Sem Empates**
- Um resultado sempre tem vencedor e perdedor
- Não há empate no resultado final

**Exemplo Completo**:
```
João Silva (A) + Maria Santos (A) vs Pedro Costa (B) + Ana Oliveira (B)

Resultado: 6-4, 3-6, 6-2

→ Equipa A vence 2-1

Pontos Atribuídos:
- João Silva:       3 pontos (vitória)
- Maria Santos:     3 pontos (vitória)
- Pedro Costa:      1 ponto  (derrota)
- Ana Oliveira:     1 ponto  (derrota)
```

### Buscar Jogador

Clique no campo **"🔍 Procurar jogador..."**

```
Escreva o nome → A classificação filtra automaticamente
```

**Exemplos**:
- Escreva "João" → Mostra todos com João
- Escreva "Maria" → Mostra todos com Maria
- Escreva "Silva" → Mostra todos com Silva (apelido)

---

## Histórico

### Consultar Jogos
Clique em **"Histórico"** na navegação

Cada jogo mostra:
```
📅 Sexta, 16 de maio de 2026
Resultado: 6-4 vs 6-3

EQUIPA A 🏆           VS       EQUIPA B
João Silva                      Pedro Costa
Maria Santos                     Ana Oliveira

📊 Set 1: 6-4 | Set 2: 6-3
```

### Ordenar
Clique em **"Ordenar por Data"** para alternar:
- **↓ Descendente**: Mais recentes primeiro
- **↑ Ascendente**: Mais antigos primeiro

### Remover Jogo
Clique em **"Remover"** ao lado do jogo

**Aviso**: 
- ⚠️ A ação não pode ser desfeita
- ✅ A classificação é automaticamente recalculada
- 👥 Todos os jogadores de acordo com os outros resultados

**Exemplo**:
```
João Silva tem 12 pontos (4 vitórias)

Remove-se um jogo que ele ganhou
→ João fica com 9 pontos (3 vitórias)
→ Classificação atualiza automaticamente
```

### Limpar Histórico
Clique em **"Limpar Histórico"** para apagar TUDO

**Aviso Duplo**:
1️⃣ "Isto vai remover TODOS os jogos e zerar a classificação"
2️⃣ "Esta ação é irreversível!"

**Resultado**:
- 🔴 Todos os jogos são removidos
- 🔴 Toda a classificação é zerada
- 🔴 Todos os jogadores volta ao estado inicial

---

## FAQ

### P: Onde os dados são guardados?
**R**: No localStorage do navegador, 100% privado no seu dispositivo.

### P: Posso usar em mobile?
**R**: Sim! Design responsivo funciona em qualquer dispositivo.

### P: Os dados ficam entre dispositivos?
**R**: Não por defeito. Veja abaixo como sincronizar.

### P: Como sincronizar entre PC e Mobile?

**1️⃣ Exportar (PC)**:
```javascript
// Abra o Navegador
// Pressione F12 (DevTools)
// Vá para Console
// Copie isto e cole:

copy(JSON.stringify(localStorage))
```
Isto copia todos os dados para a clipboard.

**2️⃣ Importar (Mobile)**:
```javascript
// Abra o Navegador no Mobile
// Pressione F12 (DevTools)
// Vá para Console
// Limpe os dados antigos:

localStorage.clear()

// Cole isto (substitua os ... pelos dados copiados):

Object.entries(JSON.parse('...dados...copiados...')).forEach(([k,v]) => localStorage.setItem(k,v))
```

### P: Posso usar sem internet?
**R**: Sim! A aplicação funciona completamente offline.

### P: O que acontece se limpar o cache do navegador?
**R**: Os dados são apagados. Por isso, guarde backups se necessário.

### P: Posso editar um jogo já registado?
**R**: Não diretamente. Remova e registar novamente.

### P: Qual é o score máximo de um set?
**R**: Tecnicamente ilimitado, mas tipicamente até 10-15 pontos num jogo real.

### P: Posso ter 2 jogadores com o mesmo nome?
**R**: Não no mesmo jogo. Mas em jogos diferentes, sim.

### P: A classificação atualiza em tempo real?
**R**: Sim, imediatamente após guardar um jogo.

### P: Posso usar em Multiple Navegadores?
**R**: Cada navegador tem dados separados. Use a sincronização para partilhar.

### P: E se o navegador fechar sem guardar?
**R**: O localStorage guarda tudo automaticamente. Não há perda.

### P: Existe backup automático?
**R**: Não. Use a exportação manual para manter backups.

### P: Posso imprimir a classificação?
**R**: Sim, use Ctrl+P ou o menu do navegador. O design é otimizado para impressão.

---

## Atalhos de Teclado

| Atalho | Função |
|--------|--------|
| F12 | Abrir Developer Tools (para debugging) |
| Ctrl+P | Imprimir página |
| Ctrl+F | Procurar na página |
| Tab | Navegar entre campos |
| Enter | Guardar formulário |

---

## Compatibilidade

| Browser | Status | Versão Mínima |
|---------|--------|---------------|
| Chrome | ✅ Suportado | 60+ |
| Firefox | ✅ Suportado | 55+ |
| Safari | ✅ Suportado | 11+ |
| Edge | ✅ Suportado | 79+ |
| Android Chrome | ✅ Suportado | 60+ |
| iOS Safari | ✅ Suportado | 11+ |

---

## Dicas e Truques

1. **Guardar o Bookmark**: Adicione a URL à barra de marcadores para acesso rápido
2. **Atalho na Desktop**: Faça um atalho do ficheiro `index.html` no desktop
3. **Autopreenchimento**: Os nomes dos jogadores aparecem automaticamente
4. **Busca Rápida**: Use Ctrl+F na classificação para procurar
5. **Impressão**: A classificação imprime bem em papel

---

## Contacto e Suporte

Para problemas ou sugestões, verifique:
1. Este manual (páginas anteriores)
2. O ficheiro README.md para documentação técnica
3. O QUICKSTART.md para início rápido

---

**Versão**: 1.0 | **Atualizado**: Maio 2026 | **Idioma**: Português (Portugal)
