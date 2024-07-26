// cards.js
export class CriadorCards {
    constructor() {
        this.card_atividade = document.getElementById('card_atividade');
        this.criar_card = document.getElementById('criar_card');
        this.input_nome = document.getElementById('input_nome');
        this.input_descricao = document.getElementById('input_descricao');

        this.addCard = this.addCard.bind(this);

        // Adicionando listener ao botão criar
        document.getElementById('btn_criar_card').addEventListener('click', this.addCard);

        // Inicializando os cards
        this.criarCards();
    }

    async criarCards() {
        const response = await fetch('http://127.0.0.1:3000/pegaCards');
        const data = await response.json();
        const atividade = data.atividade;

        this.card_atividade.innerHTML = '';
    
        for (let i = 0; i < atividade.length; i++) {
            const div = document.createElement('div');
            div.className = 'card';
    
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
    
            h3.textContent = atividade[i].nome;
            p.textContent = atividade[i].descricao;
    
            div.appendChild(h3);
            div.appendChild(p);
            this.card_atividade.appendChild(div);
        }
    }

    async addCard() {
        const nome = this.input_nome.value;
        const descricao = this.input_descricao.value;

        const response = await fetch('http://127.0.0.1:3000/addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao })
        });
        const result = await response.json();
        if (response.status === 201) {
            console.log(result.message);
            this.criarCards();
        } else {
            console.error(result.error);
        }
    }
}

// Instanciando a classe
document.addEventListener('DOMContentLoaded', () => {
    new CriadorCards();
});