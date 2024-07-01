//formata para o leiaute esperado pela API - sem caracteres não numericos
function formatarCEP(cep) {
    return cep.replace(/\D/g, '');
}
//função que busca o endereço através do CEP
async function buscarEndereco(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    //const response = await fetch(url);
    //const dados = await response.json();

    try{
        const response =await fetch(url);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log('Erro ao buscar o endereço:',error);
        return null;
    }
}
//função para preencher o card com os dados do endereço
function preencherEndereco(endereco) {
    document.getElementById('cepResultado').textContent = endereco.cep;
    document.getElementById('logradouroResultado').textContent = endereco.logradouro;
    document.getElementById('bairroResultado').textContent = endereco.bairro;
    document.getElementById('cidadeEstadoResultado').textContent =`${endereco.localidade} /${endereco.uf}` ;

    document.getElementById('enderecoCard').style.display = 'block'; //mostra o card de endereço
    
}
//adiciona um escutador para o evento submit
document.getElementById('cepForm').addEventListener('submit', async function(event){

    event.preventDefault(); //previne o envio antecipado do formulário
    const cep = document.getElementById('cep').value;
    const cepFormatado = formatarCEP(cep);
    const endereco = await buscarEndereco(cepFormatado);

    if(endereco !== null){
        preencherEndereco(endereco);
    }
    else{
        alert('cep não encontrado. verifique e tente novamente');
    }
});
