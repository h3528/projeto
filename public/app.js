document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const taskList = document.getElementById('task-list');

  // Função para obter todas as tarefas da API e atualizar a UI
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tasks');
      const tasks = await response.json();
      renderTaskList(tasks);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para renderizar a lista de tarefas na tela
  const renderTaskList = (tasks) => {
    taskList.innerHTML = ''; // Limpar lista existente

    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.classList.add('task-item');
      li.innerHTML = `
        <span>${task.title}</span> - <span>${task.status}</span>
        <button class="delete-btn" data-id="${task.id}">Excluir</button>
        <button class="toggle-status-btn" data-id="${task.id}">Alterar Status</button>
      `;
      taskList.appendChild(li);
    });

    // Adicionar eventos aos botões de exclusão e alteração de status
    addEventListenersToButtons();
  };

  // Função para adicionar um evento de escuta aos botões
  const addEventListenersToButtons = () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteTask);
    });

    const toggleStatusButtons = document.querySelectorAll('.toggle-status-btn');
    toggleStatusButtons.forEach(button => {
      button.addEventListener('click', toggleTaskStatus);
    });
  };

  // Função para excluir uma tarefa
  const deleteTask = async (event) => {
    const taskId = event.target.dataset.id;
    try {
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE'
      });
      fetchTasks(); // Recarregar as tarefas após excluir
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  // Função para alterar o status de uma tarefa
  const toggleTaskStatus = async (event) => {
    const taskId = event.target.dataset.id;
    try {
      // Buscar a tarefa para obter o status atual
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`);
      const task = await response.json();
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      
      // Atualizar o status
      await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      fetchTasks(); // Recarregar as tarefas após alteração de status
    } catch (error) {
      console.error('Erro ao alterar o status da tarefa:', error);
    }
  };

  // Função para adicionar uma nova tarefa
  taskForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impedir o envio padrão do formulário

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === '') {
      alert('Por favor, insira um título para a tarefa.');
      return;
    }

    try {
      const newTask = { title, description, status: 'pending' };

      // Enviar a tarefa para a API
      await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });

      // Limpar os campos do formulário
      titleInput.value = '';
      descriptionInput.value = '';

      // Atualizar a lista de tarefas
      fetchTasks();
    } catch (error) {
      console.error('Erro ao criar nova tarefa:', error);
    }
  });

  // Carregar as tarefas ao carregar a página
  fetchTasks();
});
