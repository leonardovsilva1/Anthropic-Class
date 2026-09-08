const form = document.getElementById("form-tarefa");
const input = document.getElementById("input-tarefa");
const lista = document.getElementById("lista-tarefas");

async function carregarTarefas() {
  const resposta = await fetch("/api/tasks");
  const tarefas = await resposta.json();
  renderizar(tarefas);
}

function renderizar(tarefas) {
  lista.innerHTML = "";
  tarefas.forEach((tarefa) => {
    const item = document.createElement("li");
    item.className = tarefa.done ? "done" : "";

    const texto = document.createElement("span");
    texto.textContent = tarefa.text;
    texto.addEventListener("click", () => alternarTarefa(tarefa.id));

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "✕";
    botaoExcluir.className = "excluir";
    botaoExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));

    item.appendChild(texto);
    item.appendChild(botaoExcluir);
    lista.appendChild(item);
  });
}

async function adicionarTarefa(texto) {
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: texto }),
  });
  await carregarTarefas();
}

async function alternarTarefa(id) {
  await fetch(`/api/tasks/${id}`, { method: "PATCH" });
  await carregarTarefas();
}

async function excluirTarefa(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  await carregarTarefas();
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;
  adicionarTarefa(texto);
  input.value = "";
});

carregarTarefas();
