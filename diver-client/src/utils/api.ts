import { Task } from './interface';

const serverUrl = 'http://localhost:1323';

export const getTasks = async () => {
  const data = await fetch(`${serverUrl}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await data.json();
  return result;
};

export const saveTask = async (task: Task) => {
  const data = await fetch(`${serverUrl}/tasks/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const result = await data.json();
  return result;
};

// should i be running a saved task
// should i be running task that is not saved?
// lets just autosave the task, I think thats fine
export const runTask = async (task: Task) => {
  const data = await fetch(`${serverUrl}/tasks/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const result = await data.json();
  return result;
};

export const deleteTask = async (id: string) => {
  const data = await fetch(`${serverUrl}/tasks/${id}`, {
    method: 'DELETE',
  });
  const result = await data.json();
  return result;
};
