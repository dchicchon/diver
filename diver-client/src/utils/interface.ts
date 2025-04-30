// do tasks have to fit in this mold or can we have our own defined tasks in our build?
// tasks do not need to be http requests. we should be able to create our own tasks

export interface RequestBody {
  [key: string]: unknown;
}

export interface TaskParameters {
  [key: string]: string;
}

// the difference with this one should
// show metadata in our client vs whats stored
// in the server
export interface OpenTask {
  saved: boolean;
  id: string;
  taskDetails: Task;
}
export interface Task {
  ID?: string;
  Name: string;
  Type: string;
  Parameters: TaskParameters;
}

export interface RunParameters {
  Name: string;
}
