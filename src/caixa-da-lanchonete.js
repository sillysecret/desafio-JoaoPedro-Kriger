class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        //enum com os valores dos produtos
        const precos = {
            cafe: 3, 
            chantily: 1.5,
            suco: 6.2,
            sanduiche: 6.5,
            queijo: 2,
            salgado: 7.25,
            combo1: 9.5,
            combo2: 7.5,
        };
    //validações de entrada
        if (!itens || itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
    
        if (metodoDePagamento !== 'dinheiro' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'debito') {
            return 'Forma de pagamento inválida!';
        }
    //separando os itens e validando tranformando em objetos com nome e quantidade do item atraves do split-pela e virgula e map  
        const itensSeparados = itens.map(item => {
            const [nome, quantidade] = item.split(',');
            return { nome, quantidade: parseFloat(quantidade) };
        });
    //iniciando variaveis de controle
        let temCafe = false;
        let temSandu = false;
        let total = 0;
    
        for (const item of itensSeparados) {
                //validando o item a ser comprado
                if (!(item.nome in precos)) {
                    return 'Item inválido!';
                }
                //validando a quantidade do item
                if (item.quantidade === 0 || isNaN(item.quantidade)) {
                    return 'Quantidade inválida!';
                }
                
                if (item.nome === 'cafe') {
                    temCafe = true;
                }
                
                if (item.nome === 'chantily') {
                    if (!temCafe) {
                        return 'Item extra não pode ser pedido sem o principal';
                    }
                } 
                
                if (item.nome === 'sanduiche') {
                    temSandu = true;
                }
                
                if (item.nome === 'queijo') {
                    if (!temSandu) {
                        return 'Item extra não pode ser pedido sem o principal';
                    } 
                }
    //calculando o total da compra de acordo com o item e repetindo para quantidade de itens
                total += precos[item.nome] * item.quantidade; 
        }
    //calculando o valor final de acordo com o metodo de pagamento
        let formt = 0;
            if (metodoDePagamento === "dinheiro") {
                formt = 0.95 * total;
            }
            if (metodoDePagamento === "credito") {
                formt = 1.03 * total;
            }
            if (metodoDePagamento === 'debito') {
                formt = total;
            }
    //formatando o valor final
        formt = `R$ ${formt.toFixed(2).replace('.', ',')}`;

    return formt;
    }
}

export { CaixaDaLanchonete };
