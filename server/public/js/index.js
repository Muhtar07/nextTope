/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
const $taskForm = document.forms.taskForm;
const $table = document.querySelector('#table');

function newTask(dataFromBack) {
  return `
  <tr data-task = "${dataFromBack.id}">
    <td>${dataFromBack.task}</td>
    <td>${dataFromBack.beginning}</td>
    <td></td>
    <td></td>
    <td>
      <a href="#">STOP</a> 
    </td>
  </tr>
    `;
}

function updateTask(dataFromBack) {
  return `
  <tr data-task = "${dataFromBack.id}">
    <td>${dataFromBack.task}</td>
    <td>${dataFromBack.beginning}</td>
    <td>${dataFromBack.ending}</td>
    <td>${dataFromBack.time_spent}</td>
    <td>
      <p>The task is finished</p> 
    </td>
  </tr>
    `;
}

if ($taskForm) {
  $taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData($taskForm));
    const response = await fetch('/task', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const dataFromBack = await response.json();
      if (!dataFromBack) {
        alert('Сomplete the task');
      } else {
        $table.insertAdjacentHTML('beforeend', newTask(dataFromBack));
      }
    }
  });
}

$table.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.innerText === 'STOP') {
    const id = event.target.closest('[data-task]').dataset.task;
    const response = await fetch('/task/stop', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      const dataFromBack = await response.json();
      event.target.closest('[data-task]').innerHTML = updateTask(dataFromBack);
    }
  }
});
