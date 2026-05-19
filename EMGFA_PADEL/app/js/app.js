/**
 * Aplicação Principal de Gestão de Resultados de Padel
 */

class PadelApp {
    constructor() {
        this.currentPage = 'classificacao';
        this.sortOrder = 'desc'; // Ordenação do histórico
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDataAtual();
        this.renderClasificacao();
        this.updateJogadoresList();
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        // Navegação
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.navegarPagina(e.target.dataset.page));
        });

        // Formulário de novo jogo
        document.getElementById('form-novo-jogo').addEventListener('submit', (e) => this.handleNovoJogo(e));

        // Busca na classificação
        document.getElementById('search-jogador').addEventListener('input', (e) => this.filterClasificacao(e.target.value));

        // Ordenação do histórico
        document.getElementById('btn-ordenar').addEventListener('click', () => this.toggleOrdenacao());

        // Limpar histórico
        document.getElementById('btn-limpar-historico').addEventListener('click', () => this.limparHistorico());
        // Export / Import online (GitHub Gist)
        const btnExport = document.getElementById('btn-export-online');
        const btnImport = document.getElementById('btn-import-online');
        if (btnExport) btnExport.addEventListener('click', () => this.exportToGist());
        if (btnImport) btnImport.addEventListener('click', () => this.importFromGist());

        // Fechar aplicação
        const btnClose = document.getElementById('btn-close-app');
        if (btnClose) {
            btnClose.addEventListener('click', () => this.closeApplication());
        }
    }

    /**
     * Definir data atual no input
     */
    setDataAtual() {
        const hoje = new Date().toISOString().split('T')[0];
        document.getElementById('data-jogo').value = hoje;
    }

    /**
     * Navegar entre páginas
     */
    navegarPagina(page) {
        // Remover active de todas as páginas e botões
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

        // Ativar página e botão selecionados
        document.getElementById(page).classList.add('active');
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        this.currentPage = page;

        // Renderizar conteúdo apropriado
        switch (page) {
            case 'classificacao':
                this.renderClasificacao();
                break;
            case 'historico':
                this.renderHistorico();
                break;
            case 'novo-jogo':
                document.getElementById('msg-jogo').innerHTML = '';
                break;
        }
    }

    /**
     * Renderizar classificação
     */
    renderClasificacao() {
        const classificacao = db.getClassificacao();
        const container = document.getElementById('clasificacao-list');

        if (classificacao.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Nenhum jogo registado ainda</div>';
            return;
        }

        container.innerHTML = classificacao.map((player, index) => {
            let topClass = '';
            if (index === 0) topClass = 'top1';
            else if (index === 1) topClass = 'top2';
            else if (index === 2) topClass = 'top3';

            return `
                <div class="table-row ${topClass}">
                    <div class="table-cell rank">${player.posicao}${this.getMedalha(index)}</div>
                    <div class="table-cell name">${player.nome}</div>
                    <div class="table-cell pts">${player.pontos}</div>
                    <div class="table-cell stats">${player.jogos}</div>
                    <div class="table-cell stats">${player.vitorias}-${player.derrotas}</div>
                </div>
            `;
        }).join('');
    }

    /**
     * Obter medalha para top 3
     */
    getMedalha(posicao) {
        if (posicao === 0) return '🥇';
        if (posicao === 1) return '🥈';
        if (posicao === 2) return '🥉';
        return '';
    }

    /**
     * Filtrar classificação por nome
     */
    filterClasificacao(searchTerm) {
        const classificacao = db.getClassificacao();
        const filtered = classificacao.filter(p => 
            p.nome.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const container = document.getElementById('clasificacao-list');
        
        if (filtered.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Jogador não encontrado</div>';
            return;
        }

        container.innerHTML = filtered.map((player, index) => {
            let topClass = '';
            if (player.posicao === 1) topClass = 'top1';
            else if (player.posicao === 2) topClass = 'top2';
            else if (player.posicao === 3) topClass = 'top3';

            return `
                <div class="table-row ${topClass}">
                    <div class="table-cell rank">${player.posicao}${this.getMedalha(player.posicao - 1)}</div>
                    <div class="table-cell name">${player.nome}</div>
                    <div class="table-cell pts">${player.pontos}</div>
                    <div class="table-cell stats">${player.jogos}</div>
                    <div class="table-cell stats">${player.vitorias}-${player.derrotas}</div>
                </div>
            `;
        }).join('');
    }

    /**
     * Atualizar lista de jogadores para autocomplete
     */
    updateJogadoresList() {
        const jogadores = db.getJogadoresList();
        const datalist = document.getElementById('jogadores-list');
        
        datalist.innerHTML = jogadores.map(j => `<option value="${j}">`).join('');
    }

    /**
     * Validar e processar novo jogo
     */
    handleNovoJogo(e) {
        e.preventDefault();

        try {
            // Validações básicas
            const equipa_a_j1 = document.getElementById('equipa-a-j1').value.trim();
            const equipa_a_j2 = document.getElementById('equipa-a-j2').value.trim();
            const equipa_b_j1 = document.getElementById('equipa-b-j1').value.trim();
            const equipa_b_j2 = document.getElementById('equipa-b-j2').value.trim();

            if (!equipa_a_j1 || !equipa_a_j2 || !equipa_b_j1 || !equipa_b_j2) {
                throw new Error('Por favor, preencha todos os nomes dos jogadores');
            }

            // Verificar se não há jogadores repetidos
            const todosJogadores = [equipa_a_j1, equipa_a_j2, equipa_b_j1, equipa_b_j2];
            const uniqueJogadores = new Set(todosJogadores);
            if (uniqueJogadores.size !== 4) {
                throw new Error('Não pode haver jogadores repetidos');
            }

            // Obter scores dos sets
            const sets = [];
            for (let i = 1; i <= 3; i++) {
                const scoreA = document.getElementById(`set${i}-a`).value;
                const scoreB = document.getElementById(`set${i}-b`).value;

                // Set é obrigatório apenas se for o primeiro ou segundo
                if (i <= 2) {
                    if (!scoreA || !scoreB) {
                        throw new Error(`Set ${i} incompleto`);
                    }
                    sets.push({ a: parseInt(scoreA), b: parseInt(scoreB) });
                } else if (scoreA || scoreB) {
                    // Set 3 é opcional, mas se preenchido deve ter ambos os valores
                    if (!scoreA || !scoreB) {
                        throw new Error('Set 3 deve ter ambos os valores ou estar vazio');
                    }
                    sets.push({ a: parseInt(scoreA), b: parseInt(scoreB) });
                }
            }

            // Validar sets (não podem estar vazios os dois primeiros)
            if (sets.length < 2) {
                throw new Error('Deve registar pelo menos 2 sets');
            }

            // Determinar vencedor (best of 3)
            let setsVitaA = 0;
            let setsVitaB = 0;
            let winner = null;

            for (let i = 0; i < sets.length; i++) {
                if (sets[i].a > sets[i].b) {
                    setsVitaA++;
                } else if (sets[i].b > sets[i].a) {
                    setsVitaB++;
                } else {
                    throw new Error(`Set ${i + 1} não pode ter empate`);
                }

                // Se alguém já ganhou 2 sets, não há terceiro set
                if (setsVitaA === 2) {
                    winner = 'A';
                    break;
                }
                if (setsVitaB === 2) {
                    winner = 'B';
                    break;
                }
            }

            if (!winner) {
                throw new Error('Resultado incompleto ou inválido');
            }

            // Guardar jogo
            const gameData = {
                equipa_a_j1,
                equipa_a_j2,
                equipa_b_j1,
                equipa_b_j2,
                sets: sets,
                winner: winner,
                date: document.getElementById('data-jogo').value
            };

            db.addGame(gameData);

            // Mostrar mensagem de sucesso
            const msgElement = document.getElementById('msg-jogo');
            msgElement.className = 'message success';
            msgElement.textContent = '✅ Jogo guardado com sucesso!';

            // Limpar formulário
            document.getElementById('form-novo-jogo').reset();
            this.setDataAtual();
            this.updateJogadoresList();

            // Esconder mensagem após 3 segundos
            setTimeout(() => {
                msgElement.textContent = '';
                msgElement.className = 'message';
            }, 3000);

        } catch (error) {
            const msgElement = document.getElementById('msg-jogo');
            msgElement.className = 'message error';
            msgElement.textContent = '❌ ' + error.message;
        }
    }

    /**
     * Renderizar histórico de jogos
     */
    renderHistorico() {
        let games = db.getGames();

        // Ordenar por data
        games.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

        const container = document.getElementById('historico-container');

        if (games.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Nenhum jogo registado</div>';
            return;
        }

        container.innerHTML = games.map(game => {
            const setsA = game.sets.map(s => `${s.a}`).join('-');
            const setsB = game.sets.map(s => `${s.b}`).join('-');
            
            const setDetails = game.sets.map((s, i) => `Set ${i + 1}: ${s.a}-${s.b}`).join(' | ');

            const teamAWinner = game.winner === 'A';
            const teamBWinner = game.winner === 'B';

            return `
                <div class="game-card">
                    <div class="game-header">
                        <div>
                            <div class="game-date">📅 ${this.formatarData(game.date)}</div>
                        </div>
                        <div class="game-score">${setsA} vs ${setsB}</div>
                        <button class="btn-delete" onclick="app.deleteGame(${game.id})">Remover</button>
                    </div>

                    <div class="game-teams">
                        <div class="team ${teamAWinner ? 'winner' : ''}">
                            <div class="team-name">EQUIPA A ${teamAWinner ? '🏆' : ''}</div>
                            <div class="team-player">👤 ${game.equipa_a.j1}</div>
                            <div class="team-player">👤 ${game.equipa_a.j2}</div>
                        </div>
                        <div class="vs-label">VS</div>
                        <div class="team ${teamBWinner ? 'winner' : ''}">
                            <div class="team-name">EQUIPA B ${teamBWinner ? '🏆' : ''}</div>
                            <div class="team-player">👤 ${game.equipa_b.j1}</div>
                            <div class="team-player">👤 ${game.equipa_b.j2}</div>
                        </div>
                    </div>

                    <div class="game-sets">
                        📊 ${setDetails}
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Formatar data para formato legível
     */
    formatarData(dateStr) {
        const date = new Date(dateStr + 'T00:00:00');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-PT', options);
    }

    /**
     * Alternar ordenação do histórico
     */
    toggleOrdenacao() {
        this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        const btn = document.getElementById('btn-ordenar');
        btn.textContent = this.sortOrder === 'desc' ? 'Ordenar por Data ↓' : 'Ordenar por Data ↑';
        this.renderHistorico();
    }

    /**
     * Remover um jogo
     */
    deleteGame(gameId) {
        if (confirm('Tem a certeza que deseja remover este jogo? Esta ação não pode ser desfeita.')) {
            db.removeGame(gameId);
            this.renderHistorico();
            this.renderClasificacao();
            this.updateJogadoresList();
        }
    }

    /**
     * Limpar todo o histórico
     */
    limparHistorico() {
        if (confirm('⚠️ AVISO: Isto vai remover TODOS os jogos e zerar a classificação. Tem a certeza?')) {
            if (confirm('Esta ação é irreversível! Deseja realmente continuar?')) {
                db.clearAll();
                this.renderHistorico();
                this.renderClasificacao();
                this.updateJogadoresList();
                alert('✅ Base de dados limpa com sucesso!');
            }
        }
    }

    /**
     * Exportar todos os dados para um Gist no GitHub (partilha online)
     * Pede ao utilizador um token pessoal (não é guardado) e cria um Gist privado com os dados.
     */
    async exportToGist() {
        try {
            const token = prompt('Cole o seu GitHub Personal Access Token (scopes: gist) para exportar os dados:');
            if (!token) return alert('Exportação cancelada. É necessário um token GitHub com permissão para criar Gists.');

            const payload = {
                padel_games: JSON.parse(localStorage.getItem('padel_games') || '[]'),
                padel_players: JSON.parse(localStorage.getItem('padel_players') || '{}'),
                padel_stats: JSON.parse(localStorage.getItem('padel_stats') || '{}')
            };

            const body = {
                description: 'PadelApp backup',
                public: false,
                files: {
                    'padel-data.json': {
                        content: JSON.stringify(payload, null, 2)
                    }
                }
            };

            const res = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: {
                    'Authorization': 'token ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || 'Erro ao criar Gist');
            }

            const data = await res.json();
            const url = data.html_url || data.url;
            prompt('Gist criado! Copie este link e partilhe:', url);
        } catch (error) {
            alert('Erro na exportação: ' + (error.message || error));
        }
    }

    /**
     * Importar dados de um Gist público (ou privado se o Gist for acessível com URL)
     * Pede ao utilizador o ID do Gist (ou URL) e importa os ficheiros padel-data.json
     */
    async importFromGist() {
        try {
            const input = prompt('Cole o ID do Gist ou a URL do Gist para importar os dados:');
            if (!input) return;

            // Extrair ID do input (se for URL)
            let id = input.trim();
            try {
                const u = new URL(id);
                const parts = u.pathname.split('/').filter(Boolean);
                id = parts[parts.length - 1];
            } catch (e) {
                // não é URL, assume-se ID
            }

            const res = await fetch(`https://api.github.com/gists/${id}`);
            if (!res.ok) throw new Error('Gist não encontrado ou privado');
            const data = await res.json();
            // Procurar ficheiro
            const fileEntry = data.files && data.files['padel-data.json'];
            if (!fileEntry) throw new Error('Ficheiro padel-data.json não encontrado no Gist');

            const content = fileEntry.content;
            const parsed = JSON.parse(content);

            if (!confirm('Irá substituir os dados locais com os dados do Gist. Deseja continuar?')) return;

            // Guardar jogos e recalculate
            localStorage.setItem('padel_games', JSON.stringify(parsed.padel_games || []));
            localStorage.setItem('padel_players', JSON.stringify(parsed.padel_players || {}));
            localStorage.setItem('padel_stats', JSON.stringify(parsed.padel_stats || {}));

            // Recalcular estatísticas com base nos jogos para coerência
            db.recalculateAllStats();
            this.updateJogadoresList();
            this.renderHistorico();
            this.renderClasificacao();

            alert('Importação concluída com sucesso.');
        } catch (error) {
            alert('Erro na importação: ' + (error.message || error));
        }
    }

    /**
     * Tenta fechar a janela do navegador
     */
    closeApplication() {
        try {
            window.open('', '_self');
            window.close();
        } catch (error) {
            console.warn('Falha ao fechar automaticamente:', error);
        }

        alert('Para encerrar a aplicação, feche esta aba ou janela do navegador.');
    }
}

// Inicializar aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PadelApp();
});
