# 🎰 StratusBet - Campanha Educativa CIPA

<p align="center">

<img src="logo.png" width="280">

</p>

## 📖 Sobre o projeto

O **StratusBet** é um jogo educativo desenvolvido para uma campanha da **CIPA**, com o objetivo de conscientizar os colaboradores sobre os riscos das apostas online, do vício em jogos de azar e seus impactos na saúde mental.

O projeto simula uma plataforma de apostas, utilizando mecanismos psicológicos semelhantes aos encontrados em cassinos virtuais, conduzindo o jogador até uma perda inevitável para promover reflexão e conscientização.

---

# 🎯 Objetivos

- Demonstrar como plataformas de apostas utilizam recompensas para prender o usuário.
- Simular o efeito psicológico do "quase ganhou".
- Mostrar o impacto emocional da perda total.
- Incentivar a reflexão sobre o vício em apostas.
- Coletar métricas anônimas para análise da campanha da CIPA.

---

# 🚀 Funcionalidades

## 🎮 Jogo

- Crédito inicial de 100 moedas
- Sistema de rodadas
- Ganhos aleatórios
- Jackpots
- Quase vitória
- Derrotas
- Game Over
- Tela Final educativa
- Tela "Jogar Novamente"
- Sons
- Vibração (mobile)
- Confetes
- Interface responsiva

---

## ☁️ Firebase

O projeto utiliza **Firebase Firestore** para registrar estatísticas em tempo real.

São armazenados:

- Jogadores únicos
- Total de acessos
- Partidas realizadas
- Ganhos
- Derrotas
- Jackpots
- Game Over
- Tela Final
- Jogar Novamente
- Sexta Rodada

Cada jogador recebe um identificador único armazenado na sessão do navegador.

---

## 📊 Dashboard Administrativo

Foi desenvolvido um painel administrativo em tempo real.

### Resumo Geral

- 👥 Jogadores únicos
- 👁️ Acessos
- 🎮 Partidas

### Resultados

- 💰 Ganhos
- 💸 Derrotas
- 🏆 Jackpots

### Engajamento

- ☠️ Game Over
- 🔁 Jogar Novamente
- 🏁 Tela Final
- 🎯 Sexta Rodada

### Indicadores

- Média de partidas por jogador
- Taxa de vitória
- Taxa de Jackpot
- Taxa de Game Over
- Conversão para Tela Final

### Ranking

Top 3 jogadores por:

- número de acessos
- quantidade de "Jogar Novamente"

### Recursos

- Atualização em tempo real
- Gráficos com Chart.js
- Botão para limpar dados do Firebase

---

# 📁 Estrutura do projeto

```
StratusBet/

│
├── index.html
├── style.css
├── script.js
├── firebase.js
│
├── dashboard.html
├── dashboard.css
├── dashboard.js
│
├── logo.png
├── final.png
├── divida.png
├── musicaJogo.mp3
│
├── README.md
└── .github/
    └── workflows/
        └── pages.yml
```

---

# 🛠 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Firebase Firestore
- Chart.js
- GitHub Pages
- GitHub Actions

---

# ☁️ Hospedagem

## Jogo

```
https://junnyorbraga.github.io/StratusBet/
```

## Dashboard

```
https://junnyorbraga.github.io/StratusBet/dashboard.html
```

---

# 📊 Banco de Dados

Firestore

Coleções utilizadas:

```
estatisticas
```

Documento:

```
jogo
```

Coleção:

```
jogadores
```

Cada jogador possui um documento próprio contendo:

- acessos
- partidas
- ganhos
- derrotas
- jackpots
- gameOver
- jogarNovamente
- telaFinal
- sextaRodada
- primeiraVisita
- ultimaVisita

---

# 🔄 Fluxo do jogo

1. Jogador recebe 100 moedas
2. Primeiras rodadas estimulam o engajamento
3. O jogo alterna entre ganhos e perdas
4. O jogador perde todas as moedas
5. É exibida uma mensagem educativa
6. O jogador pode optar por "Jogar Novamente"
7. Todas as ações são registradas no Firebase

---

# 📈 Métricas coletadas

- Número de jogadores únicos
- Quantidade de acessos
- Número de partidas
- Vitórias
- Derrotas
- Jackpots
- Game Over
- Tela Final
- Recomeços do jogo
- Média de partidas por jogador
- Taxa de vitória
- Taxa de Jackpot

---

# 📱 Responsividade

O projeto foi desenvolvido com foco em:

- Smartphones
- Tablets
- Desktop
- Leitura via QR Code

---

# 🔒 Segurança

Atualmente:

- Firestore protegido por regras de segurança
- Dashboard com botão de limpeza dos dados
- Dados anônimos (nenhuma informação pessoal é armazenada)

### Melhorias futuras

- Firebase Authentication
- Dashboard protegida por login
- Apenas administradores poderão limpar os dados
- Exportação para Excel e CSV
- Histórico diário da campanha

---

# 💡 Objetivo Educacional

Este projeto não possui finalidade comercial.

Foi desenvolvido exclusivamente para ações educativas da **CIPA**, abordando:

- Saúde Mental
- Jogos de Azar
- Dependência em Apostas
- Educação Preventiva

---

# 👨‍💻 Autor

**Junnyor Braga**

Projeto desenvolvido como parte de uma campanha educativa da CIPA utilizando tecnologias web modernas e Firebase.

---

# ❤️ Agradecimentos

- CIPA
- Firebase
- GitHub
- Chart.js
- Comunidade Open Source

---

# 📜 Licença

Projeto desenvolvido exclusivamente para fins educacionais e de conscientização.

Não destinado para uso comercial.

---

> **"Sua saúde mental vale mais do que qualquer aposta."**