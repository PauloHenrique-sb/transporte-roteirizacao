import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DataTable } from './components/DataTable';
import { ExportButton } from './components/ExportButton';
import { calcularPorPedido, validarDados, Produto, PedidoAgrupado } from './utils/calculations';
import './App.css';

function App() {
  const [pedidos, setPedidos] = useState<PedidoAgrupado[]>([]);
  const [erros, setErros] = useState<string[]>([]);
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleFileLoaded = async (produtos: Produto[], nome: string) => {
    setCarregando(true);
    try {
      const { validos, erros: validacaoErros } = validarDados(produtos);

      if (validacaoErros.length > 0) {
        setErros(validacaoErros);
      }

      const pedidosAgrupados = calcularPorPedido(validos);
      setPedidos(pedidosAgrupados);
      setNomeArquivo(nome);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📦 Roteirização de Transportes</h1>
          <p>Importe pedidos, calcule cubagem e peso, e exporte para roteirização</p>
        </div>
      </header>

      <main className="app-main">
        <FileUpload onFileLoaded={handleFileLoaded} isLoading={carregando} />

        {pedidos.length > 0 && (
          <>
            <DataTable pedidos={pedidos} erros={erros} />
            <ExportButton pedidos={pedidos} nomeArquivoOrigem={nomeArquivo} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Sistema de Roteirização | Processamento local de dados</p>
      </footer>
    </div>
  );
}

export default App;
