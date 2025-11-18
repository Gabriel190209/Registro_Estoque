document.getElementById('formCadastro').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        nome: form.nome.value,
        marca: form.marca.value,
        volume: parseFloat(form.volume.value),
        uni_medida: form.unidadeMedida.value,
        tipo_embalagem: form.tipoEmbalagem.value,
        aplicacao: form.aplicacao.value,
        estoque: parseInt(form.estoque.value, 10),
        estoque_minimo: parseInt(form.estoqueMinimo.value, 10)
    };

    try {
        const response = await fetch('/adicionar-produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.msg + ': ' + formData.nome);
            form.reset();
        } else {
            alert('Falha ao cadastrar produto: ' + data.msg);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor ao cadastrar produto.');
    }
});