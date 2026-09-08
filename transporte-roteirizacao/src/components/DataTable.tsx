import { PedidoAgrupado } from '../utils/calculations';

interface DataTableProps {
  pedidos: PedidoAgrupado[];
  erros?: string[];
}

export function DataTable({ pedidos, erros }: DataTableProps) {
  if (!pedidos.length) return null;

  const totalPeso = pedidos.reduce((sum, p) => sum + p.pesoTotal, 0);
  const totalCubagem = pedidos.reduce((sum, p) => sum + p.cubagemTotal, 0);
  const totalValor = pedidos.reduce((sum, p) => sum + p.valorTotal, 0);
  const quantidadePedidos = pedidos.length;

  return (
    <div className="data-section">
      <div className="summary-cards">
        <div className="summary-card">
          <div className="card-label">Pedidos</div>
          <div className="card-value">{quantidadePedidos}</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Peso Total</div>
          <div className="card-value">{totalPeso.toFixed(2)} kg</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Cubagem Total</div>
          <div className="card-value">{totalCubagem.toFixed(4)} m³</div>
        </div>
        <div className="summary-card">
          <div className="card-label">Valor Total</div>
          <div className="card-value">R$ {totalValor.toFixed(2)}</div>
        </div>
      </div>

      {erros && erros.length > 0 && (
        <div className="errors-section">
          <h3>⚠️ Validações ({erros.length})</h3>
          <ul>
            {erros.map((erro, i) => (
              <li key={i}>{erro}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nº PEDIDO</th>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Itens</th>
              <th>Qtd Total</th>
              <th>Peso (kg)</th>
              <th>Cubagem (m³)</th>
              <th>Densidade</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.nPedido}>
                <td className="pedido-id">{pedido.nPedido}</td>
                <td>{pedido.codigoCliente}</td>
                <td>{pedido.tipo}</td>
                <td>{pedido.data}</td>
                <td>{pedido.vendedor}</td>
                <td className="center">{pedido.produtos.length}</td>
                <td className="center">{pedido.quantidadeTotal}</td>
                <td className="number">{pedido.pesoTotal.toFixed(2)}</td>
                <td className="number">{pedido.cubagemTotal.toFixed(4)}</td>
                <td className="number">{pedido.densidade.toFixed(2)}</td>
                <td className="number">R$ {pedido.valorTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
