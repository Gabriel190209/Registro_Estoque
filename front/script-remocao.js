document.getElementById('formRemocao').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        nome: form.produtoRemocao.value,
        quantidade: parseInt(form.quantidadeRemocao.value, 10)
    };

    try {
        const response = await fetch('/estoque/remover', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Saída registrada com sucesso: ' + data.msg);
            form.reset();
        } else {
            alert('Falha ao registrar saída: ' + data.msg);
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão com o servidor ao registrar saída.');
    }
});