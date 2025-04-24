import { atom } from 'jotai';
import { Task } from './interface';

export const openTasks = atom<Task[]>([]);

export const addTaskToOpen = atom(null, (get, set) => {});

export const addNewOpenTask = atom(null, (get, set) => {
  const newTask: Task = {
    Name: 'Untitled Request',
    Type: 'request',
    Parameters: {},
  };

  const newIndex = get(openTasks).length;
  set(openTasks, (prev) => [...prev, newTask]);
  console.log({ newIndex });
  set(currentOpenTask, newIndex);
});

export const closeOpenTask = atom(null, (_get, set, removeIndex: number) => {
  console.log({ removeIndex });
  set(openTasks, (prev) => prev.filter((_, index) => index === removeIndex));
});

export const currentOpenTask = atom<number | undefined>();
export const setCurrentOpenTask = atom(null, (_get, set, newIndex: number) => {
  set(currentOpenTask, newIndex);
});
export const saveModalOpen = atom(false);
export const setSaveModalOpen = atom(null, (_get, set, isOpen: boolean) => {
  set(saveModalOpen, isOpen);
});
export const selectedTask = atom<string | undefined>();
export const setSelectedTask = atom(null, (_get, set, newTask: string) => {
  set(selectedTask, newTask);
});
