import { useState } from 'react';
import { lerArquivo } from '../utils/fileHandlers';
import { Produto } from '../utils/calculations';

interface FileUploadProps {
  onFileLoaded: (produtos: Produto[], nomeArquivo: string) => void;
  isLoading?: boolean;
}

export function FileUpload({ onFileLoaded, isLoading = false }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
      alert('Por favor, envie um arquivo Excel (.xlsx, .xls) ou CSV');
      return;
    }

    try {
      const produtos = await lerArquivo(file);
      if (produtos.length === 0) {
        alert('Nenhum pedido válido encontrado no arquivo');
        return;
      }
      onFileLoaded(produtos, file.name);
    } catch (error) {
      alert(`Erro ao processar arquivo: ${error}`);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`upload-area ${dragActive ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
    >
      <div className="upload-content">
        <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <h2>Importar Planilha de Pedidos</h2>
        <p>Arraste o arquivo aqui ou clique para selecionar</p>
        <p className="file-format">Formatos aceitos: Excel (.xlsx, .xls) ou CSV</p>
        <label className="file-input-label">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            disabled={isLoading}
            style={{ display: 'none' }}
          />
          <span className="btn-browse">Selecionar Arquivo</span>
        </label>
      </div>
    </div>
  );
}
