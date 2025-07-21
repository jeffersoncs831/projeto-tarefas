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

    function buscarTarefas(){
        fetch("http://localhost:3000/tarefas")
        .then(resposta => resposta.json())
        .then(json =>{
            console.log(json);
        })
    }

function carregarTarefas(lista){
const listaDeTarefas = document.querySelector("#lista-de-tarefas");
lista.map(tarefa => {
})
}