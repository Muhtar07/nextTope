const { createUserTask, endingTask } = require('../controllers/task-conroller');

describe('Checking user controllers:', () => {
  it('must check how the task is created', async () => { 
    const checkTask = { task: 'checkTask' };
    const task = await createUserTask(1, checkTask).catch((e) => e);
    expect(task.task).toBe(checkTask.task)
    await endingTask(1, task.id).catch((e) => e);
  })
  it('Сhecking to create a new task when the old one is not finished', async () => {
    const checkTask = { task: 'checkTask' };
    const task = await createUserTask(1, checkTask).catch((e) => e);
    const newtask = await createUserTask(1, checkTask).catch((e) => e);
    expect(newtask).toBeNull();
    await endingTask(1, task.id).catch((e) => e);
  })
});
