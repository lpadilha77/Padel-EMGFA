# 🚀 Guia de Início Rápido

## Passo 1: Abrir a Aplicação

### Opção A - Direto no Navegador (Mais Simples)
1. Duplo clique no ficheiro `index.html` (raiz do projeto)
2. Clique em **"Abrir Aplicação"**

### Opção B - Com Dados de Teste
1. Duplo clique no ficheiro `index.html` (raiz do projeto)
2. Clique em **"Carregar Dados de Teste"**
3. A aplicação abrirá com 5 jogos de exemplo

### Opção C - Servidor Local (Opcional)
```bash
# Na pasta do projeto
cd EMGFA_PADEL

# Iniciar servidor
python -m http.server 8000
# ou: npx http-server

# Abrir no navegador
http://localhost:8000
```

## Passo 2: Primeiros Passos

### 1. Registar um Jogo (Novo Jogo)
- Clique em **"Novo Jogo"**
- Preencha os 4 nomes de jogadores (autocomplete disponível)
- Introduza os scores dos sets
- Clique em **"Guardar Jogo"**
- ✅ Classificação atualiza automaticamente

### 2. Ver Classificação
- Clique em **"Classificação"** (padrão)
- Veja os pontos, jogos e vitórias/derrotas
- Procure por um jogador no campo de pesquisa

### 3. Consultar Histórico
- Clique em **"Histórico"**
- Veja todos os jogos registados
- Use o botão para ordenar por data
- Clique em "Remover" para apagar um jogo individual

## 📊 Exemplo Prático

### Registar Jogo:
```
EQUIPA A
- João Silva
- Maria Santos

EQUIPA B
- Pedro Costa
- Ana Oliveira

RESULTADO
Set 1: 6-4 (Equipa A)
Set 2: 3-6 (Equipa B)
Set 3: 6-2 (Equipa A)
→ Equipa A vence 2-1

PONTOS ATRIBUÍDOS
João Silva: +3 (vitória)
Maria Santos: +3 (vitória)
Pedro Costa: +1 (derrota)
Ana Oliveira: +1 (derrota)
```

## 💡 Dicas Importantes

### Pontuação
- ✅ Vitória = 3 pontos
- ✅ Derrota = 1 ponto
- ✅ Sem empates permitidos
- ✅ Estatísticas individualizadas por jogador

### Sets
- ✅ Best of 3 (máximo 3 sets)
- ✅ Vence quem fizer 2 sets
- ✅ Terceiro set é opcional
- ✅ Sem empates nos sets

### Classificação
Ordenada por:
1. Pontos totais
2. Diferença V-D (vitórias menos derrotas)
3. Vitórias totais

### Dados
- 💾 Tudo fica armazenado localmente
- 🔐 Sem servidor, 100% privado
- 📱 Funciona offline
- 🌐 Sincroniza entre abas do mesmo navegador

## ⚠️ Atenção

- **Não limpe o cache do navegador** se quiser manter os dados
- **Remover jogo** recalcula toda a classificação
- **Limpar histórico** é irreversível
- Dados são específicos de cada navegador/dispositivo

## 🔄 Sincronizar entre PC e Mobile

### Exportar (PC):
```javascript
// Abra DevTools (F12) → Console
copy(JSON.stringify(localStorage))
```

### Importar (Mobile):
```javascript
// Cole o seguinte e execute:
Object.entries(JSON.parse('COLAR_DADOS_AQUI')).forEach(([k,v]) => localStorage.setItem(k,v))
```

## 📱 Testar em Mobile

### Via USB:
1. PC: `python -m http.server 8000`
2. Encontre IP do PC: `ipconfig` (Windows)
3. Mobile: Aceda a `http://IP_DO_PC:8000`

### Via QR Code:
- Use apps como [ngrok](https://ngrok.com/) para criar URL pública
- Gere QR code da URL
- Escaneie no mobile

## 🎯 Funcionalidades Disponíveis

| Funcionalidade | Status | Notas |
|---|---|---|
| Registar jogos | ✅ | Até 3 sets |
| Classificação | ✅ | Atualização em tempo real |
| Histórico | ✅ | Ordenável por data |
| Busca | ✅ | Por nome de jogador |
| Remover jogo | ✅ | Recalcula estatísticas |
| Offline | ✅ | Sem internet necessária |
| Responsivo | ✅ | Mobile, tablet, PC |
| Dados privados | ✅ | Sem servidor |

## ❌ Solução de Problemas

### "Dados não aparecem"
→ Atualize a página (Ctrl+R ou F5)

### "Classificação não atualiza"
→ Verifique se o jogo foi guardado (mensagem verde)

### "Dados sumiram"
→ Verifique se não limpou o cache
→ Use DevTools para verificar localStorage

### "Não consigo registar jogador repetido"
→ Cada jogador deve ser único no jogo

### "Set com empate é aceite"
→ Verifique: o score está completamente preenchido?

## 📞 Suporte

Para problemas:
1. Verifique o README.md para mais detalhes
2. Consulte o console do navegador (F12 → Console)
3. Tente recarregar a página
4. Tente noutro navegador

---

**Versão**: 1.0 | **Última atualização**: Maio 2026
