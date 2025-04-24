// do tasks have to fit in this mold or can we have our own defined tasks in our build?
// tasks do not need to be http requests. we should be able to create our own tasks

export interface RequestBody {
  [key: string]: unknown;
}

export interface TaskParameters {
  [key: string]: unknown;
}

export interface Task {
  ID?: string;
  Name: string;
  Type: string;
  Parameters: TaskParameters;
  // url: string;
  // method: string;
  // requestBody: RequestBody;
}

export interface RunParameters {
  Name: string;
}
