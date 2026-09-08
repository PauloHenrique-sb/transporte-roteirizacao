# 📦 Roteirização de Transportes

Aplicação web moderna para processar pedidos de transportes de materiais, calcular cubagem e peso, e exportar dados preparados para roteirização.

## 🎯 Funcionalidades

- **📤 Importação de Planilhas**: Suporta Excel (.xlsx, .xls) e CSV
- **🧮 Cálculos Automáticos**:
  - Peso total por pedido
  - Cubagem total por pedido
  - Densidade (kg/m³)
  - Totalizações por cliente
- **✅ Validação de Dados**: Identifica linhas com problemas
- **📊 Visualização**: Tabelas interativas com sumários
- **📥 Exportação em Excel**: 
  - Formato agrupado por pedido (resumido)
  - Formato detalhado por produto
  - Pronto para sistemas de roteirização

## 🚀 Como Usar

### Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Passos de Uso

1. **Prepare sua planilha** com as seguintes colunas obrigatórias:
   - CODIGO CLIENTE
   - TIPO (O/P)
   - ANO, MÊS, DIA
   - Nº PEDIDO
   - CODIGO VENDEDOR, VENDEDOR NOME
   - VALOR
   - CODIGO PRODUTO
   - PESO PRODUTO
   - VOLUME PRODUTO
   - CUBAGEM PRODUTO
   - QUANTIDADE PRODUTO
   - valor produto

2. **Importe o arquivo**: Arraste ou selecione a planilha
3. **Revise os dados**: Verifique erros e sumários
4. **Exporte o resultado**: Escolha entre formato agrupado ou detalhado

## 📋 Estrutura de Dados

### Importação
A planilha deve ter uma linha por produto/pedido com:
- Informações do pedido (número, cliente, vendedor)
- Informações do produto (código, peso, cubagem, quantidade)

### Exportação - Formato Agrupado
Agrupa todos os produtos de um pedido em uma linha com:
- Nº PEDIDO
- CODIGO CLIENTE
- TIPO
- DATA
- VENDEDOR
- QUANTIDADE ITENS (quantidade de produtos diferentes)
- QUANTIDADE TOTAL (somatório de quantidades)
- PESO TOTAL
- CUBAGEM TOTAL
- DENSIDADE
- VALOR TOTAL
- Detalhes de cada produto (aninhados)

### Exportação - Formato Detalhado
Uma linha por produto com:
- Dados do pedido (Nº PEDIDO, CLIENTE, etc)
- Dados do produto (código, peso unitário, cubagem unitária)
- Cálculos (subtotais de peso e cubagem)

## 🛠️ Tecnologias

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **XLSX** - Processamento de Excel
- **CSS3** - Estilização responsiva

## 💡 Características Principais

- ✨ Interface moderna e responsiva
- 🔄 Processamento 100% local (sem enviar dados para servidor)
- 📱 Mobile-friendly
- 🎨 Design limpo e intuitivo
- ⚡ Performance otimizada
- 🌙 Tema light/dark ready

## 📝 Licença

MIT

## 👤 Autor

Sistema desenvolvido para otimizar processos de roteirização de transportes.

---

**Nota**: Todos os dados são processados localmente no seu navegador. Nenhuma informação é enviada para servidores externos.
