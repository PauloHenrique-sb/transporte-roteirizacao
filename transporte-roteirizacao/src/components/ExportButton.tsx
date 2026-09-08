import { PedidoAgrupado } from '../utils/calculations';
import { exportarParaExcel, exportarDetalhado } from '../utils/fileHandlers';

interface ExportButtonProps {
  pedidos: PedidoAgrupado[];
  nomeArquivoOrigem?: string;
}

export function ExportButton({ pedidos, nomeArquivoOrigem = 'pedidos' }: ExportButtonProps) {
  if (!pedidos.length) return null;

  const timestamp = new Date().toISOString().split('T')[0];
  const baseName = nomeArquivoOrigem.replace(/\.[^.]+$/, '');

  const handleExportAgrupado = () => {
    exportarParaExcel(pedidos, `${baseName}_agrupado_${timestamp}.xlsx`);
  };

  const handleExportDetalhado = () => {
    exportarDetalhado(pedidos, `${baseName}_detalhado_${timestamp}.xlsx`);
  };

  return (
    <div className="export-section">
      <h3>Exportar Dados para Roteirização</h3>
      <div className="export-buttons">
        <button className="btn btn-primary" onClick={handleExportAgrupado}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" />
            <path d="M12 16V4" />
            <path d="M5 20h14" />
          </svg>
          Exportar Agrupado por Pedido
        </button>
        <button className="btn btn-secondary" onClick={handleExportDetalhado}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" />
            <path d="M12 16V4" />
            <path d="M5 20h14" />
          </svg>
          Exportar Detalhado por Produto
        </button>
      </div>
    </div>
  );
}
