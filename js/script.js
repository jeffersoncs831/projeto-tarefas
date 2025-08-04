let lista = []
tailwind.config = {
  darkMode: 'class'
}


document.addEventListener('DOMContentLoaded', function () {
  const themeToggleBtn = document.getElementById('trocaTema');

  if (localStorage.getItem('tema') === 'dark') {
    document.documentElement.classList.add('dark');
  }

  themeToggleBtn.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('tema', 'dark');
    } else {
      localStorage.setItem('tema', 'light');
    }
  });
});


function abrirDrawer(editar = false) {
  const divOverlay = document.querySelector("#overlay");
  const divDrawer = document.querySelector("#drawer");
  const formCriar = document.querySelector("#formCriar");
   const formEditar = document.querySelector("#formEditar");

  if (divOverlay.classList.contains("invisible")) {
    divOverlay.classList.remove("opacity-0", "invisible");
    divDrawer.classList.remove("-right-[300px]");
    divDrawer.classList.add("right-0");
  } else {
    divOverlay.classList.add("opacity-0", "invisible");
    divDrawer.classList.remove("right-0");
    divDrawer.classList.add("-right-[300px]");
  }
}


function buscarTarefas() {
  fetch("http://localhost:3000/tarefas")
    .then(resposta => resposta.json())
    .then(json => {
      lista = json;
      carregarTarefas(json);
    })
}

buscarTarefas()

function carregarTarefas(tarefas) {
  const listaDeTarefas = document.querySelector("#lista-de-tarefas");
  tarefas.map(tarefa => {
    listaDeTarefas.innerHTML += `
            <div class="bg-white shadow rounded p-4">
                <h3 class="font-bold">${tarefa.titulo}</h3>
                <p class="text-[14px] text-gray-500 line-clamp-3 mb-4">${tarefa.descricao}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-[10px]">${tarefa.data}</span>
                    <div class="flex gap-3">
                   <button onclick="abrirDrawer(true), preencherFormulario(${tarefa.id})" class="cursor-pointer dark:fill-neutral-500 hover:dark:fill-green-300">
                      <box-icon type='solid' name='pencil'></box-icon>
                    </button>
                    <button onclick ="deletarTarefa('${tarefa.id}')"    class="cursor-pointer dark:fill-neutral-500 hover:dark:fill-green-300">
                        <box-icon type='solid' name='trash-alt'></box-icon>
                      </button>
                    </div>
                </div>
            </div>
        `;
  })
}


function criarTarefa(){
    event.preventDefault();

    fetch("http://localhost:3000/tarefas", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(capturarDados("#formCriar"))
    })
}

function editarTarefa(){
    event.preventDefault();
    const id =document.querySelector("#formEditar input[name='tarefa_id']").value;
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: "put",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(capturarDados("#formCriar"))
    })
}




function deletarTarefa(idDaTarefa){
  let confirmou = confirm("Deseja realmente apagar este item?");
  if(confirmou){

    fetch(`http://localhost:3000/tarefas/${idDaTarefa}`, {
        method: "delete",
    })
  }
}

function capturarDados(idDeUmFormulario){
    let form = document.querySelector(idDeUmFormulario);
    let formData = new FormData(form);
    let dados = Object.fromEntries(formData.entries())
    let data = new Date();
    dados.data = data.toLocaleDateString().split('/').reverse().join('-');
    return dados;
}

function formData(data){
  let dataFormatada = new Date(data);
  return dataFormatada.toLocaleDateString();
}

function preencherFormulario(idDaTarefa){
  let idValue = document.querySelector("#formEditar input[name= 'tarefa_id']");
  let tituloValue = document.querySelector("#formEditar input[name= 'titulo']");
  let descricaoValue = document.querySelector("#formEditar textarea[name= 'descricao']");
  let tarefa = lista.find(item => item.id == idDatarefa);

}
idValue.value = tarefa.id;
tituloValue.value = tarefa.titulo;
descricaoValue.value = tarefa.descricao;