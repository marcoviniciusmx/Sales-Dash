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
        categoriaTexto: 'Eletrônicos',
        valor: 4299,
        status: 'concluida',
        statusTexto: 'Concluída',
        statusClasse: 'completed',
        data: '12 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Marco Vinícius',
        abreviacao: 'MV',
        produto: 'Consultoria Semestral',
        categoria: 'servicos',
        categoriaTexto: 'Serviços',
        valor: 1500,
        status: 'pendente',
        statusTexto: 'Pendente',
        statusClasse: 'pending',
        data: '11 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Beatriz Pires',
        abreviacao: 'BP',
        produto: 'Fones de Ouvido Bluetooth',
        categoria: 'acessorios',
        categoriaTexto: 'Acessórios',
        valor: 250,
        status: 'cancelada',
        statusTexto: 'Cancelada',
        statusClasse: 'canceled',
        data: '10 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Henrique Monteiro',
        abreviacao: 'HM',
        produto: 'Apple iPhone 14 Pro Max',
        categoria: 'eletronicos',
        categoriaTexto: 'Eletrônicos',
        valor: 3460,
        status: 'concluida',
        statusTexto: 'Concluída',
        statusClasse: 'completed',
        data: '16 Out, 2025'
    },
    {
        id: gerarId(),
        cliente: 'João Ferreira',
        abreviacao: 'JF',
        produto: 'Personal e Nutricionista',
        categoria: 'servicos',
        categoriaTexto: 'Serviços',
        valor: 459,
        status: 'pendente',
        statusTexto: 'Pendente',
        statusClasse: 'pending',
        data: '15 Nov, 2025'
    },
    {
        id: gerarId(),
        cliente: 'Maria Luísa',
        abreviacao: 'ML',
        produto: 'Mesa Retrátil',
        categoria: 'acessorios',
        categoriaTexto: 'Acessórios',
        valor: 300,
        status: 'cancelada',
        statusTexto: 'Cancelada',
        statusClasse: 'canceled',
        data: '09 Dez, 2025'
    }
]



const areaDasVendas = document.querySelector('.sales-list')
const campoDeBusca = document.querySelector('#search-input')
const filtroDeStatus = document.querySelector('#status-select')
const filtroDeCategoria = document.querySelector('#category-select')

const formatoReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

filtroDeStatus.addEventListener('change', () => {
    const vendasFiltradas = filtrarVendas()

    renderizarVendas(vendasFiltradas)
})

filtroDeCategoria.addEventListener('change', () => {
    const categoriasFiltradas = filtrarVendas()

    renderizarVendas(categoriasFiltradas)
})

const filtrarVendas = () => {
    const statusSelecionado = filtroDeStatus.value
    const categoriaSelecionada = filtroDeCategoria.value

    const filtro = vendas.filter(venda => {
        const combinaStatus = statusSelecionado === 'todos-status' || venda.status === statusSelecionado
        const combinaCategoria = categoriaSelecionada === 'todas-categorias' || venda.categoria === categoriaSelecionada

        if (combinaStatus && combinaCategoria) {
            return true
        }
    })

    return filtro
}

const renderizarVendas = (vendasFiltradas, categoriasFiltradas) => {

    const areaDosCard = vendasFiltradas.map(venda => {
        return `
        <article class="sale-card sale-card--${venda.statusClasse}" data-status="${venda.status}" data-category="${venda.categoria}">
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
                <p class="sale-detail-value">${venda.categoriaTexto}</p>
            </div>

            <div class="sale-detail">
                <p class="sale-detail-label">Valor</p>
                <p class="sale-detail-value sale-value">${formatoReal.format(venda.valor)}</p>
            </div>

            <div class="sale-detail sale-detail-status">
                <p class="sale-detail-label">Status</p>
                <span class="sale-status sale-status--${venda.statusClasse}">${venda.statusTexto}</span>
            </div>

            <div class="sale-detail">
                <p class="sale-detail-label">Data</p>
                <p class="sale-detail-value sale-date">${venda.data}</p>
            </div>
        </article>
    `})
    areaDasVendas.innerHTML = areaDosCard.join('')
}

renderizarVendas(vendas)