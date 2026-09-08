export interface Produto {
  codigoCliente: string;
  tipo: string;
  ano: number;
  mes: number;
  dia: number;
  nPedido: number;
  codigoVendedor: string;
  vendedorNome: string;
  valor: number;
  codigoProduto: string;
  pesoProduto: number;
  volumeProduto: number;
  cubagemProduto: number;
  quantidadeProduto: number;
  valorProduto: number;
}

export interface PedidoAgrupado {
  nPedido: number;
  codigoCliente: string;
  tipo: string;
  data: string;
  vendedor: string;
  produtos: Produto[];
  pesoTotal: number;
  cubagemTotal: number;
  quantidadeTotal: number;
  valorTotal: number;
  densidade: number;
}

export function calcularPorPedido(produtos: Produto[]): PedidoAgrupado[] {
  const agrupado = new Map<number, Produto[]>();

  produtos.forEach(produto => {
    if (!agrupado.has(produto.nPedido)) {
      agrupado.set(produto.nPedido, []);
    }
    agrupado.get(produto.nPedido)!.push(produto);
  });

  return Array.from(agrupado.entries()).map(([nPedido, prods]) => {
    const pesoTotal = prods.reduce((sum, p) => sum + (p.pesoProduto * p.quantidadeProduto), 0);
    const cubagemTotal = prods.reduce((sum, p) => sum + (p.cubagemProduto * p.quantidadeProduto), 0);
    const quantidadeTotal = prods.reduce((sum, p) => sum + p.quantidadeProduto, 0);
    const valorTotal = prods.reduce((sum, p) => sum + p.valor, 0);

    const primeiro = prods[0];
    const data = `${primeiro.dia}/${primeiro.mes}/${primeiro.ano}`;

    return {
      nPedido,
      codigoCliente: primeiro.codigoCliente,
      tipo: primeiro.tipo,
      data,
      vendedor: primeiro.vendedorNome || '',
      produtos: prods,
      pesoTotal,
      cubagemTotal,
      quantidadeTotal,
      valorTotal,
      densidade: cubagemTotal > 0 ? pesoTotal / cubagemTotal : 0
    };
  }).sort((a, b) => a.nPedido - b.nPedido);
}

export function validarDados(produtos: Produto[]): { validos: Produto[]; erros: string[] } {
  const erros: string[] = [];
  const validos: Produto[] = [];

  produtos.forEach((p, index) => {
    const errosLinha: string[] = [];

    if (!p.nPedido) errosLinha.push('Nº PEDIDO vazio');
    if (!p.codigoProduto) errosLinha.push('CODIGO PRODUTO vazio');
    if (p.pesoProduto < 0) errosLinha.push('PESO PRODUTO negativo');
    if (p.cubagemProduto < 0) errosLinha.push('CUBAGEM PRODUTO negativa');
    if (p.quantidadeProduto <= 0) errosLinha.push('QUANTIDADE PRODUTO inválida');

    if (errosLinha.length > 0) {
      erros.push(`Linha ${index + 1}: ${errosLinha.join(', ')}`);
    } else {
      validos.push(p);
    }
  });

  return { validos, erros };
}
