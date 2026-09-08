import * as XLSX from 'xlsx';
import { Produto, PedidoAgrupado } from './calculations';

const COLUNAS_ESPERADAS = [
  'CODIGO CLIENTE',
  'TIPO',
  'ANO',
  'MÊS',
  'DIA',
  'Nº PEDIDO',
  'CODIGO VENDEDOR',
  'VENDEDOR NOME',
  'VALOR',
  'CODIGO PRODUTO',
  'PESO PRODUTO',
  'VOLUME PRODUTO',
  'CUBAGEM PRODUTO',
  'QUANTIDADE PRODUTO',
  'valor produto'
];

export function lerArquivo(file: File): Promise<Produto[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const produtos: Produto[] = jsonData.map((row: any) => ({
          codigoCliente: String(row['CODIGO CLIENTE'] || ''),
          tipo: String(row['TIPO'] || ''),
          ano: parseInt(row['ANO'] || '0'),
          mes: parseInt(row['MÊS'] || '0'),
          dia: parseInt(row['DIA'] || '0'),
          nPedido: parseInt(row['Nº PEDIDO'] || '0'),
          codigoVendedor: String(row['CODIGO VENDEDOR'] || ''),
          vendedorNome: String(row['VENDEDOR NOME'] || ''),
          valor: parseFloat(String(row['VALOR'] || '0').replace(',', '.')),
          codigoProduto: String(row['CODIGO PRODUTO'] || ''),
          pesoProduto: parseFloat(String(row['PESO PRODUTO'] || '0').replace(',', '.')),
          volumeProduto: parseFloat(String(row['VOLUME PRODUTO'] || '0').replace(',', '.')),
          cubagemProduto: parseFloat(String(row['CUBAGEM PRODUTO'] || '0').replace(',', '.')),
          quantidadeProduto: parseFloat(String(row['QUANTIDADE PRODUTO'] || '0').replace(',', '.')),
          valorProduto: parseFloat(String(row['valor produto'] || '0').replace(',', '.'))
        }));

        resolve(produtos.filter(p => p.nPedido > 0));
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.readAsArrayBuffer(file);
  });
}

export function exportarParaExcel(pedidos: PedidoAgrupado[], nomeArquivo = 'roteirizacao.xlsx') {
  const dados: any[] = [];

  pedidos.forEach(pedido => {
    dados.push({
      'Nº PEDIDO': pedido.nPedido,
      'CODIGO CLIENTE': pedido.codigoCliente,
      'TIPO': pedido.tipo,
      'DATA': pedido.data,
      'VENDEDOR': pedido.vendedor,
      'QUANTIDADE ITENS': pedido.produtos.length,
      'QUANTIDADE TOTAL': pedido.quantidadeTotal,
      'PESO TOTAL (kg)': pedido.pesoTotal.toFixed(2),
      'CUBAGEM TOTAL (m³)': pedido.cubagemTotal.toFixed(4),
      'DENSIDADE (kg/m³)': pedido.densidade.toFixed(2),
      'VALOR TOTAL': pedido.valorTotal.toFixed(2)
    });

    pedido.produtos.forEach(produto => {
      dados.push({
        'Nº PEDIDO': '',
        'CODIGO CLIENTE': '',
        'TIPO': '',
        'DATA': '',
        'VENDEDOR': '',
        'QUANTIDADE ITENS': '',
        'QUANTIDADE TOTAL': '',
        'PESO TOTAL (kg)': '',
        'CUBAGEM TOTAL (m³)': '',
        'DENSIDADE (kg/m³)': '',
        'VALOR TOTAL': '',
        '  └─ Código Produto': produto.codigoProduto,
        '  └─ Peso Unit.': produto.pesoProduto.toFixed(2),
        '  └─ Cubagem Unit.': produto.cubagemProduto.toFixed(4),
        '  └─ Quantidade': produto.quantidadeProduto,
        '  └─ Peso Subtotal': (produto.pesoProduto * produto.quantidadeProduto).toFixed(2),
        '  └─ Cubagem Subtotal': (produto.cubagemProduto * produto.quantidadeProduto).toFixed(4)
      });
    });
  });

  const ws = XLSX.utils.json_to_sheet(dados);
  ws['!cols'] = [
    { wch: 12 }, { wch: 18 }, { wch: 6 }, { wch: 12 }, { wch: 20 },
    { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 14 },
    { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 16 }, { wch: 14 },
    { wch: 14 }, { wch: 16 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Pedidos Agrupados');
  XLSX.writeFile(wb, nomeArquivo);
}

export function exportarDetalhado(pedidos: PedidoAgrupado[], nomeArquivo = 'roteirizacao_detalhada.xlsx') {
  const ws = XLSX.utils.json_to_sheet(
    pedidos.flatMap(pedido =>
      pedido.produtos.map(p => ({
        'Nº PEDIDO': pedido.nPedido,
        'CODIGO CLIENTE': pedido.codigoCliente,
        'TIPO': pedido.tipo,
        'DATA': pedido.data,
        'VENDEDOR': pedido.vendedor,
        'CODIGO PRODUTO': p.codigoProduto,
        'PESO UNITÁRIO': p.pesoProduto,
        'CUBAGEM UNITÁRIA': p.cubagemProduto,
        'QUANTIDADE': p.quantidadeProduto,
        'PESO SUBTOTAL': p.pesoProduto * p.quantidadeProduto,
        'CUBAGEM SUBTOTAL': p.cubagemProduto * p.quantidadeProduto
      }))
    )
  );

  ws['!cols'] = [
    { wch: 12 }, { wch: 18 }, { wch: 6 }, { wch: 12 }, { wch: 20 },
    { wch: 14 }, { wch: 14 }, { wch: 16 }, { wch: 12 }, { wch: 14 }, { wch: 16 }
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Produtos');
  XLSX.writeFile(wb, nomeArquivo);
}
