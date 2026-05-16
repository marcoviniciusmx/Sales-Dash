const gerarId = () => {
    return Math.floor(Math.random() * 1000000)
}

const vendas = [
    {
        id: gerarId(),
        cliente: 'Ricardo Lemos',
        abreviacao: 'RL',
        produto: 'Smartphone Galaxy S23',
        categoria: 'eletronicos',
        valor: 4299,
        status: 'concluida',
        data: '12 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Marco Vinícius',
        abreviacao: 'MV',
        produto: 'Consultoria Semestral',
        categoria: 'servicos',
        valor: 1500,
        status: 'pendente',
        data: '11 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Beatriz Pires',
        abreviacao: 'BP',
        produto: 'Fones de Ouvido Bluetooth',
        categoria: 'acessorios',
        valor: 250,
        status: 'cancelada',
        data: '10 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Henrique Monteiro',
        abreviacao: 'HM',
        produto: 'Apple iPhone 14 Pro Max',
        categoria: 'eletronicos',
        valor: 3460,
        status: 'concluida',
        data: '16 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'João Ferreira',
        abreviacao: 'JF',
        produto: 'Personal e Nutricionista',
        categoria: 'servicos',
        valor: 459,
        status: 'pendente',
        data: '15 Nov, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Maria Luísa',
        abreviacao: 'ML',
        produto: 'Mesa Retrátil',
        categoria: 'acessorios',
        valor: 300,
        status: 'cancelada',
        data: '09 Dez, 2025'
    }
]

const areaDasVendas = document.querySelector('.sales-list')

const areaDosCard = vendas.map(venda => {

    return `
        <article class="sale-card" data-status="${venda.status}" data-category="${venda.categoria}">
            <div class="sale-customer">
                <div class="sale-avatar">
                    <span>${venda.abreviacao}</span>
                </div>

                <div class="sale-customer-info">
                    <h4 class="sale-customer-name">${venda.cliente}</h4>
                    <p class="sale-product">${venda.produto}</p>
                </div>
            </div>

            <div class="sale-detail">
                <p class="sale-detail-label">Categoria</p>
                <p class="sale-detail-value">${venda.categoria}</p>
            </div>

            <div class="sale-detail">
                <p class="sale-detail-label">Valor</p>
                <p class="sale-detail-value sale-value">${venda.valor}</p>
            </div>

            <div class="sale-detail sale-detail-status">
                <p class="sale-detail-label">Status</p>
                <span class="sale-status">${venda.status}</span>
            </div>

            <div class="sale-detail">
                <p class="sale-detail-label">Data</p>
                <p class="sale-detail-value sale-date">${venda.data}</p>
            </div>
        </article>
    `
})

areaDasVendas.innerHTML = areaDosCard.join('')