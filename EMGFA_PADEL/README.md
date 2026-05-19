# 🎾 PADEL - Gestor de Resultados

Aplicação web responsiva para gestão de resultados de jogos de padel com classificações automáticas e sincronização em tempo real.

## 📋 Funcionalidades

✅ **Registar Jogos**: Adicione novos jogos com equipas de 2 jogadores  
✅ **Sistema de Pontos**:
- Vitória: 3 pontos
- Derrota: 1 ponto
- Sem empates permitidos

✅ **Classificação Automática**: Ordenada por pontos e diferença de vitórias/derrotas  
✅ **Individualizações**: Estatísticas por jogador, não por equipa  
✅ **Best of 3 Sets**: Máximo 3 sets, vitória com 2 sets (terceiro não se disputa)  
✅ **Responsivo**: Funciona perfeitamente em PC, tablet e mobile  
✅ **Offline**: Dados armazenados no localStorage - não requer internet  
✅ **Histórico**: Consulte todos os jogos com datas e resultados  
✅ **Busca**: Procure jogadores por nome na classificação

## 🚀 Como Usar

### Abrir a Aplicação

**Opção 1 - Simples (Recomendado)**
1. Abra o ficheiro `index.html` com o seu navegador (duplo clique)

**Opção 2 - Com servidor local**
```bash
cd app
python -m http.server 8000
# Ou com Node.js:
npx http-server
```
Depois aceda a `http://localhost:8000`

### Funcionalidades Principais

#### 1. **Classificação** 🏆
- Veja ranking em tempo real
- Procure por jogador
- Top 3 destacados com medalhas
- Mostra: Posição, Nome, Pontos, Jogos, Vitórias-Derrotas

#### 2. **Novo Jogo** ➕
- Selecione os 4 jogadores
- Introduza os resultados dos sets
- Máximo 3 sets (best of 3)
- Terceiro set é opcional (só se necessário)
- Atualização instantânea da classificação

#### 3. **Histórico** 📅
- Veja todos os jogos registados
- Ordenação por data (ascendente/descendente)
- Detalhes completos: Equipas, Resultados, Data
- Remova jogos individuais
- Opção para limpar todo o histórico

## 📊 Regras do Sistema

### Pontuação
- **Vitória**: 3 pontos por jogador
- **Derrota**: 1 ponto por jogador
- **Sem empates**: Cada set tem um vencedor

### Estrutura do Jogo
- **Equipas**: 2 jogadores cada
- **Sets**: Best of 3 (máximo 3 sets)
  - Ganha quem fizer 2 sets
  - Terceiro set não se disputa se alguém já tiver 2 vitórias
- **Classificação Individual**: Cada jogador tem estatísticas próprias

### Classificação
Ordenação por:
1. **Pontos totais** (descendente)
2. **Diferença V-D** (vitórias menos derrotas)
3. **Vitórias** (em caso de empate)

## 💾 Dados

Todos os dados são armazenados no `localStorage` do navegador:
- Jogos: Lista completa de todos os jogos
- Jogadores: Nomes únicos de jogadores
- Estatísticas: Calculadas automaticamente

**Importante**: Os dados são específicos de cada navegador/dispositivo. Se limpar o cache do navegador, os dados serão perdidos.

## 🔄 Sincronização

Para sincronizar dados entre dispositivos (PC e Mobile):

1. **Exportar dados** (PC):
   - Abra Developer Tools (F12)
   - Console > Digite: `JSON.stringify(localStorage)`
   - Copie o resultado

2. **Importar dados** (Mobile):
   - Abra Developer Tools
   - Console > Digite: `localStorage.clear()`
   - Digite: `Object.entries(JSON.parse('{dados copiados}')).forEach(([k,v]) => localStorage.setItem(k,v))`

*Nota: Uma solução em nuvem será adicionada em versões futuras*

## 🎯 Exemplo de Utilização

### Registar um Jogo
```
Equipa A: João Silva + Maria Santos
Equipa B: Pedro Costa + Ana Oliveira

Set 1: 6-4 (Equipa A vence)
Set 2: 3-6 (Equipa B vence)
Set 3: 6-2 (Equipa A vence)

Resultado: Equipa A vence 2-1

Pontos:
- João Silva: +3
- Maria Santos: +3
- Pedro Costa: +1
- Ana Oliveira: +1
```

## 📱 Compatibilidade

- ✅ Chrome/Edge (versão 60+)
- ✅ Firefox (versão 55+)
- ✅ Safari (versão 11+)
- ✅ Android Chrome
- ✅ iOS Safari
- ✅ Modo Offline

## 🛠️ Tecnologia

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo mobile-first
- **JavaScript Vanilla**: Sem dependências externas
- **localStorage**: Armazenamento local seguro

## 📝 Notas

- A aplicação não requer internet para funcionar
- Todos os dados ficam locais no seu dispositivo
- Nenhuma informação é enviada para servidores
- Design otimizado para impressão

## 🔐 Privacidade

- Sem rastreamento
- Sem publicidade
- Sem cookies de terceiros
- Dados 100% privados

## 📞 Sugestões e Melhorias

Futuros desenvolvimentos:
- [ ] Sincronização em nuvem
- [ ] Estatísticas avançadas
- [ ] Geração de gráficos
- [ ] Notificações
- [ ] App nativa
- [ ] Modo offline PWA melhorado

---

**Versão**: 1.0  
**Data**: Maio 2026  
**Desenvolvido para**: Comunidade de Padel 🎾
