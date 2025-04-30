import { atom } from 'jotai';
import { splitAtom } from 'jotai/utils';

import { OpenTask } from './interface';
import { PrimitiveAtom } from 'jotai';

// this is quite overcomplicated i think and could host a lot of bugs
// we should re-examine this to see if we could make this portion of the code more efficient and clean
// should i have a list of taskTabs
// and have a list of actual tasks?
// it gets harder to dig into the objects

export const atomOpenTasks = atom<OpenTask[]>([]);

// instead should I be creating an array of atoms?
// whats the difference between that and this?

export const atomListOpenTasks = splitAtom(atomOpenTasks);

// index
export const openTaskId = atom<string | undefined>();
export const setOpenTaskId = atom(null, (_get, set, newId: string) => {
  set(openTaskId, newId);
});

// use this to set atom
export const testOpenTaskAtom = atom<PrimitiveAtom<OpenTask>>();
export const selectOpenTask = atom(null, (_get, set, myAtom: PrimitiveAtom<OpenTask>) => {
  set(testOpenTaskAtom, myAtom);
});

export const selectNewTaskAtom = atom(null, (get, set) => {
  const splitTasks = get(atomListOpenTasks);
  const tasks = get(atomOpenTasks);
  const index = splitTasks.length - 1;
  set(selectedIdAtom, tasks[index].id);
  set(testOpenTaskAtom, splitTasks[splitTasks.length - 1]);
});

export const refreshTasksAtom = atom(false);
export const setRefreshTasksAtom = atom(null, (_get, set) => {
  set(refreshTasksAtom, (prev) => !prev);
});

export const saveModalOpen = atom(false);
export const setSaveModalOpen = atom(null, (_get, set, isOpen: boolean) => {
  set(saveModalOpen, isOpen);
});

export const selectedIdAtom = atom<string | undefined>();
