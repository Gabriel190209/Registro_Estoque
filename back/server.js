const mysql = require('mysql2/promise')

const conn = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'registro'
})

async function cadastrarProdutos(nome, marca, volume, uni_medida, tipo_embalagem, aplicacao, estoque, estoque_minimo) {
    const sql = 'insert into produtos (nome, marca, volume, uni_medida, tipo_embalagem, aplicacao, estoque, estoque_minimo) values (?,?,?,?,?,?,?,?)';
    const [result] = await conn.execute(sql, [nome, marca, volume, uni_medida, tipo_embalagem, aplicacao, estoque, estoque_minimo]);
    return result;

}

async function vizualizarProdutos() {
  const sqll = 'SELECT nome, marca, volume, uni_medida, tipo_embalagem, aplicacao, estoque, estoque_minimo FROM produtos';
  const [result] = await conn.execute(sqll);
  return result;
}

async function atualizarEstoque(nome_produto, quantidade, tipo, ip_maquina, data_mov) {
    const [produto] = await conn.execute('SELECT * FROM produtos WHERE nome = ?', [nome_produto]);
    if (produto.length === 0) {
      return { affectedRows: 0, msg: 'Produto não encontrado' };
    }
  
    const estoqueAtual = produto[0].estoque;
    let novoEstoque = estoqueAtual;
  
    if (tipo === 'adicao') {
      novoEstoque = estoqueAtual + quantidade;
    } else if (tipo === 'remocao') {
      if (estoqueAtual < quantidade) {
        return { affectedRows: 0, msg: 'Estoque insuficiente para remover' };
      }
      novoEstoque = estoqueAtual - quantidade;
    } else {
      return { affectedRows: 0, msg: 'Tipo inválido. Use "adicao" ou "remocao".' };
    }

    const [update] = await conn.execute(
      'UPDATE produtos SET estoque = ? WHERE nome = ?',
      [novoEstoque, nome_produto]
    );

    if (update.affectedRows > 0) {
      const movimentacaoSQL = `
        INSERT INTO movimentacao (nome_produto, id_computador, tipo, quantidade, data_mov)
        VALUES (?, ?, ?, ?, ?)
      `;
      await conn.execute(movimentacaoSQL, [nome_produto, ip_maquina, tipo, quantidade, data_mov]);
    }

    return update;
}

async function vizualizarAlertas() {
    const sqlv = 'SELECT nome, estoque, estoque_minimo FROM produtos WHERE estoque < estoque_minimo';
    const [vizu] = await conn.execute(sqlv);
    return vizu;
}

module.exports = {
    cadastrarProdutos,
    vizualizarProdutos,
    atualizarEstoque,
    vizualizarAlertas
};