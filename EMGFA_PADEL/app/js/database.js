/**
 * Sistema de Gestão de Base de Dados para Padel
 * Armazenamento em localStorage
 */

class PadelDatabase {
    constructor() {
        this.STORAGE_KEY_GAMES = 'padel_games';
        this.STORAGE_KEY_PLAYERS = 'padel_players';
        this.STORAGE_KEY_STATS = 'padel_stats';
        this.initializeDatabase();
    }

    /**
     * Inicializa a base de dados (cria estruturas vazias se não existirem)
     */
    initializeDatabase() {
        if (!localStorage.getItem(this.STORAGE_KEY_GAMES)) {
            localStorage.setItem(this.STORAGE_KEY_GAMES, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_PLAYERS)) {
            localStorage.setItem(this.STORAGE_KEY_PLAYERS, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.STORAGE_KEY_STATS)) {
            localStorage.setItem(this.STORAGE_KEY_STATS, JSON.stringify({}));
        }
    }

    /**
     * Adiciona um novo jogo à base de dados
     */
    addGame(gameData) {
        try {
            const games = JSON.parse(localStorage.getItem(this.STORAGE_KEY_GAMES)) || [];
            const newGame = {
                id: Date.now(),
                date: gameData.date || new Date().toISOString().split('T')[0],
                equipa_a: {
                    j1: gameData.equipa_a_j1.trim(),
                    j2: gameData.equipa_a_j2.trim()
                },
                equipa_b: {
                    j1: gameData.equipa_b_j1.trim(),
                    j2: gameData.equipa_b_j2.trim()
                },
                sets: gameData.sets,
                winner: gameData.winner // 'A' ou 'B'
            };

            games.push(newGame);
            localStorage.setItem(this.STORAGE_KEY_GAMES, JSON.stringify(games));

            // Atualizar estatísticas dos jogadores
            this.updatePlayerStats(newGame);

            return newGame;
        } catch (error) {
            console.error('Erro ao adicionar jogo:', error);
            throw new Error('Erro ao guardar jogo');
        }
    }

    /**
     * Atualiza as estatísticas dos jogadores após um jogo
     */
    updatePlayerStats(game) {
        const stats = JSON.parse(localStorage.getItem(this.STORAGE_KEY_STATS)) || {};
        const players = JSON.parse(localStorage.getItem(this.STORAGE_KEY_PLAYERS)) || {};

        // Criar entrada para cada jogador se não existir
        [game.equipa_a.j1, game.equipa_a.j2, game.equipa_b.j1, game.equipa_b.j2].forEach(jogador => {
            if (!stats[jogador]) {
                stats[jogador] = {
                    nome: jogador,
                    pontos: 0,
                    jogos: 0,
                    vitorias: 0,
                    derrotas: 0,
                    setsGanhos: 0,
                    setsPerdidos: 0
                };
            }
            if (!players[jogador]) {
                players[jogador] = true;
            }
        });

        // Calcular pontos com base no resultado
        if (game.winner === 'A') {
            // Equipa A venceu: 3 pontos cada
            stats[game.equipa_a.j1].pontos += 3;
            stats[game.equipa_a.j2].pontos += 3;
            stats[game.equipa_a.j1].vitorias += 1;
            stats[game.equipa_a.j2].vitorias += 1;

            // Equipa B perdeu: 1 ponto cada
            stats[game.equipa_b.j1].pontos += 1;
            stats[game.equipa_b.j2].pontos += 1;
            stats[game.equipa_b.j1].derrotas += 1;
            stats[game.equipa_b.j2].derrotas += 1;
        } else {
            // Equipa B venceu: 3 pontos cada
            stats[game.equipa_b.j1].pontos += 3;
            stats[game.equipa_b.j2].pontos += 3;
            stats[game.equipa_b.j1].vitorias += 1;
            stats[game.equipa_b.j2].vitorias += 1;

            // Equipa A perdeu: 1 ponto cada
            stats[game.equipa_a.j1].pontos += 1;
            stats[game.equipa_a.j2].pontos += 1;
            stats[game.equipa_a.j1].derrotas += 1;
            stats[game.equipa_a.j2].derrotas += 1;
        }

        // Atualizar sets ganhos/perdidos
        stats[game.equipa_a.j1].jogos += 1;
        stats[game.equipa_a.j2].jogos += 1;
        stats[game.equipa_b.j1].jogos += 1;
        stats[game.equipa_b.j2].jogos += 1;

        // Contar sets
        game.sets.forEach(set => {
            const scoreA = parseInt(set.a) || 0;
            const scoreB = parseInt(set.b) || 0;

            if (scoreA > scoreB) {
                stats[game.equipa_a.j1].setsGanhos += 1;
                stats[game.equipa_a.j2].setsGanhos += 1;
                stats[game.equipa_b.j1].setsPerdidos += 1;
                stats[game.equipa_b.j2].setsPerdidos += 1;
            } else if (scoreB > scoreA) {
                stats[game.equipa_b.j1].setsGanhos += 1;
                stats[game.equipa_b.j2].setsGanhos += 1;
                stats[game.equipa_a.j1].setsPerdidos += 1;
                stats[game.equipa_a.j2].setsPerdidos += 1;
            }
        });

        localStorage.setItem(this.STORAGE_KEY_STATS, JSON.stringify(stats));
        localStorage.setItem(this.STORAGE_KEY_PLAYERS, JSON.stringify(players));
    }

    /**
     * Obtém a classificação ordenada dos jogadores
     */
    getClassificacao() {
        const stats = JSON.parse(localStorage.getItem(this.STORAGE_KEY_STATS)) || {};
        
        return Object.values(stats)
            .sort((a, b) => {
                // Ordenar por pontos (descendente)
                if (b.pontos !== a.pontos) {
                    return b.pontos - a.pontos;
                }
                // Se iguais, ordenar por diferença de vitórias/derrotas
                const diffA = a.vitorias - a.derrotas;
                const diffB = b.vitorias - b.derrotas;
                if (diffB !== diffA) {
                    return diffB - diffA;
                }
                // Se iguais, ordenar por vitórias
                return b.vitorias - a.vitorias;
            })
            .map((player, index) => ({
                ...player,
                posicao: index + 1,
                diferenca: player.vitorias - player.derrotas
            }));
    }

    /**
     * Obtém todos os jogos
     */
    getGames() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY_GAMES)) || [];
    }

    /**
     * Obtém todos os nomes de jogadores (para autocomplete)
     */
    getJogadoresList() {
        const players = JSON.parse(localStorage.getItem(this.STORAGE_KEY_PLAYERS)) || {};
        return Object.keys(players);
    }

    /**
     * Remove um jogo e recalcula as estatísticas
     */
    removeGame(gameId) {
        const games = JSON.parse(localStorage.getItem(this.STORAGE_KEY_GAMES)) || [];
        const gameIndex = games.findIndex(g => g.id === gameId);

        if (gameIndex !== -1) {
            games.splice(gameIndex, 1);
            localStorage.setItem(this.STORAGE_KEY_GAMES, JSON.stringify(games));
            
            // Recalcular todas as estatísticas
            this.recalculateAllStats();
            return true;
        }
        return false;
    }

    /**
     * Recalcula todas as estatísticas com base nos jogos
     */
    recalculateAllStats() {
        const games = JSON.parse(localStorage.getItem(this.STORAGE_KEY_GAMES)) || [];
        const stats = {};
        const players = {};

        // Inicializar stats para todos os jogadores
        games.forEach(game => {
            [game.equipa_a.j1, game.equipa_a.j2, game.equipa_b.j1, game.equipa_b.j2].forEach(jogador => {
                if (!stats[jogador]) {
                    stats[jogador] = {
                        nome: jogador,
                        pontos: 0,
                        jogos: 0,
                        vitorias: 0,
                        derrotas: 0,
                        setsGanhos: 0,
                        setsPerdidos: 0
                    };
                }
                if (!players[jogador]) {
                    players[jogador] = true;
                }
            });
        });

        // Recalcular para cada jogo
        games.forEach(game => {
            if (game.winner === 'A') {
                stats[game.equipa_a.j1].pontos += 3;
                stats[game.equipa_a.j2].pontos += 3;
                stats[game.equipa_a.j1].vitorias += 1;
                stats[game.equipa_a.j2].vitorias += 1;

                stats[game.equipa_b.j1].pontos += 1;
                stats[game.equipa_b.j2].pontos += 1;
                stats[game.equipa_b.j1].derrotas += 1;
                stats[game.equipa_b.j2].derrotas += 1;
            } else {
                stats[game.equipa_b.j1].pontos += 3;
                stats[game.equipa_b.j2].pontos += 3;
                stats[game.equipa_b.j1].vitorias += 1;
                stats[game.equipa_b.j2].vitorias += 1;

                stats[game.equipa_a.j1].pontos += 1;
                stats[game.equipa_a.j2].pontos += 1;
                stats[game.equipa_a.j1].derrotas += 1;
                stats[game.equipa_a.j2].derrotas += 1;
            }

            stats[game.equipa_a.j1].jogos += 1;
            stats[game.equipa_a.j2].jogos += 1;
            stats[game.equipa_b.j1].jogos += 1;
            stats[game.equipa_b.j2].jogos += 1;

            game.sets.forEach(set => {
                const scoreA = parseInt(set.a) || 0;
                const scoreB = parseInt(set.b) || 0;

                if (scoreA > scoreB) {
                    stats[game.equipa_a.j1].setsGanhos += 1;
                    stats[game.equipa_a.j2].setsGanhos += 1;
                    stats[game.equipa_b.j1].setsPerdidos += 1;
                    stats[game.equipa_b.j2].setsPerdidos += 1;
                } else if (scoreB > scoreA) {
                    stats[game.equipa_b.j1].setsGanhos += 1;
                    stats[game.equipa_b.j2].setsGanhos += 1;
                    stats[game.equipa_a.j1].setsPerdidos += 1;
                    stats[game.equipa_a.j2].setsPerdidos += 1;
                }
            });
        });

        localStorage.setItem(this.STORAGE_KEY_STATS, JSON.stringify(stats));
        localStorage.setItem(this.STORAGE_KEY_PLAYERS, JSON.stringify(players));
    }

    /**
     * Limpa toda a base de dados
     */
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY_GAMES);
        localStorage.removeItem(this.STORAGE_KEY_PLAYERS);
        localStorage.removeItem(this.STORAGE_KEY_STATS);
        this.initializeDatabase();
    }
}

// Criar instância global da base de dados
const db = new PadelDatabase();
