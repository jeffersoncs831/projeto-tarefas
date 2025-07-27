
    tailwind.config = {
      darkMode: 'class'
    }

  function abrirDrawer(){
        const divOverlay = document.querySelector("#overlay");
        const divDrawer = document.querySelector("#drawer");

        if(divOverlay.classList.contains("invisible")){
            divOverlay.classList.remove("opacity-0", "invisible");
            divDrawer.classList.remove("-right-[300px]");
            divDrawer.classList.add("right-0");
        } else{
            divOverlay.classList.add("opacity-0", "invisible");
            divDrawer.classList.remove("right-0");
            divDrawer.classList.add("-right-[300px]");
        }
    }

    function adicionarTarefa(){
    let valorDoTitulo = document.querySelector("#titulo").value
    let valorDaDescricao = document.querySelector("#Descricao").value


    let dataAtual = new Date();
    let dataFormatada = dataAtual.toLocaleDateString('pt-BR');


    let li = document.createElement("li")
    li.innerHTML = `
    
         <div class="bg-white shadow rounded p-4  dark:bg-neutral-700">
        
         <h3 class="font-bold dark:text-neutral-500">${valorDoTitulo}</h3>
       
         <p class="text-[14px] text-gray-500 line-clamp-3 mb-4 dark:text-neutral-500">${valorDaDescricao}</p>
        
         <div class="flex justify-between items-center">
         
           <span class="font-bold text-[10px] dark:text-neutral-500">${dataFormatada}</span>
          
           <div class="flex  gap-3">
           <button onclick="editarTarefa(this)" class="cursor-pointer dark:fill-neutral-500 hover:dark:fill-green-300">
            <box-icon type='solid' name='pencil'></box-icon>
          </button>
           <button onclick ="deletarTarefa(this)"    class="cursor-pointer dark:fill-neutral-500 hover:dark:fill-green-300">
              <box-icon type='solid' name='trash-alt'></box-icon>
            </button>
           </div>`


    document.querySelector("#lista-de-tarefas").appendChild(li)
    
    document.querySelector("#titulo").value = ""
    document.querySelector("#Descricao").value = ""
    
  }
  
function deletarTarefa(botao){
  const li = botao.closest("li")
  li.remove()
}

function editarTarefa(botao) {
  const tarefaDiv = botao.closest("li").querySelector("div");

  const tituloEl = tarefaDiv.querySelector("h3");
  const descricaoEl = tarefaDiv.querySelector("p");

  const tituloAtual = tituloEl.textContent;
  const descricaoAtual = descricaoEl.textContent;

  // Substitui título e descrição por campos editáveis
  tituloEl.outerHTML = `<input type="text" value="${tituloAtual}" class="border rounded w-full px-2 py-1 font-bold mb-2"/>`;
  descricaoEl.outerHTML = `<textarea class="border rounded w-full px-2 py-1 text-sm text-gray-700 mb-2">${descricaoAtual}</textarea>`;

  // Troca o botão de editar para salvar
  botao.innerHTML = `<box-icon name='save' type='solid'></box-icon>`;
  botao.setAttribute("onclick", "salvarTarefa(this)");
}

function salvarTarefa(botao) {
  const tarefaDiv = botao.closest("li").querySelector("div");

  const tituloInput = tarefaDiv.querySelector("input");
  const descricaoTextarea = tarefaDiv.querySelector("textarea");

  const novoTitulo = tituloInput.value;
  const novaDescricao = descricaoTextarea.value;

  // Substitui os inputs por texto novamente
  tituloInput.outerHTML = `<h3 class="font-bold">${novoTitulo}</h3>`;
  descricaoTextarea.outerHTML = `<p class="text-[14px] text-gray-500 line-clamp-3 mb-4">${novaDescricao}</p>`;

  // Troca o botão de salvar de volta para editar
  botao.innerHTML = `<box-icon type='solid' name='pencil'></box-icon>`;
  botao.setAttribute("onclick", "editarTarefa(this)");
}


  //   function buscarTarefas(){
  //       fetch("http://localhost:3000/tarefas")
  //       .then(resposta => resposta.json())
  //       .then(json =>{
  //           console.log(json);
  //       })
  //   }

//  tarefas.map(tarefa  => {
//         listaDeTarefa.innerHTML += `
//         <div class="bg-white shadow rounded p-4">
        
//         <h3 class="font-bold">${tarefa.titulo}</h3>
       
//         <p class="text-[14px] text-gray-500 line-clamp-3 mb-4">${tarefa.descricao}</p>
        
//         <div class="flex justify-between items-center">
         
//           <span class="font-bold text-[10px]">${tarefa.data}</span>
          
//           <div class="flex  gap-3">
//             <box-icon type='solid' name='pencil'></box-icon>
//           </div>
//             <box-icon type='solid' name='trash-alt'></box-icon>

//         </div>
//       </div>
