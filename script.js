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

const receitaTotal = document.querySelector('#total-revenue')
const vendasTotais = document.querySelector('#total-sales')
const ticketMedio = document.querySelector('#average-ticket')
const vendasConcluidas = document.querySelector('#completed-sales')

const formatoReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

const normalizarTexto = (texto) => {
    return texto
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

const filtrarVendas = () => {
    const statusSelecionado = filtroDeStatus.value
    const categoriaSelecionada = filtroDeCategoria.value
    const termoBuscado = normalizarTexto(campoDeBusca.value)

    const vendasFiltradas = vendas.filter((venda) => {
        const combinaStatus =
            statusSelecionado === 'todos-status' ||
            venda.status === statusSelecionado

        const combinaCategoria =
            categoriaSelecionada === 'todas-categorias' ||
            venda.categoria === categoriaSelecionada

        const clienteTratado = normalizarTexto(venda.cliente)
        const produtoTratado = normalizarTexto(venda.produto)

        const combinaBusca =
            clienteTratado.includes(termoBuscado) ||
            produtoTratado.includes(termoBuscado)

        return combinaStatus && combinaCategoria && combinaBusca
    })

    return vendasFiltradas
}

const calcularResumo = (lista) => {
    const resumo = lista.reduce(
        (resumo, venda) => {
            resumo.totalDeVendas++

            if (venda.status === 'concluida') {
                resumo.faturamentoTotal += venda.valor
                resumo.vendasConcluidas++
            }

            return resumo
        },
        {
            faturamentoTotal: 0,
            totalDeVendas: 0,
            vendasConcluidas: 0,
            ticketMedio: 0
        }
    )

    resumo.ticketMedio =
        resumo.vendasConcluidas > 0
            ? resumo.faturamentoTotal / resumo.vendasConcluidas
            : 0

    return resumo
}

const atualizarCardsResumo = (resumo) => {
    receitaTotal.textContent = formatoReal.format(resumo.faturamentoTotal)
    vendasTotais.textContent = resumo.totalDeVendas
    ticketMedio.textContent = formatoReal.format(resumo.ticketMedio)
    vendasConcluidas.textContent = resumo.vendasConcluidas
}

const renderizarVendas = (lista) => {
    if (lista.length === 0) {
        areaDasVendas.innerHTML = `
            <p class="empty-message">Nenhuma venda encontrada.</p>
        `
        return
    }

    const areaDosCards = lista.map((venda) => {
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
        `
    })

    areaDasVendas.innerHTML = areaDosCards.join('')
}

const atualizarDashboard = () => {
    const vendasFiltradas = filtrarVendas()
    const resumo = calcularResumo(vendasFiltradas)

    renderizarVendas(vendasFiltradas)
    atualizarCardsResumo(resumo)
}

filtroDeStatus.addEventListener('change', atualizarDashboard)
filtroDeCategoria.addEventListener('change', atualizarDashboard)
campoDeBusca.addEventListener('input', atualizarDashboard)

atualizarDashboard()