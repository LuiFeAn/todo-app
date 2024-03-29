export interface Todo {
    createdAt: string;
    description: string;
    id: string;
    mustBeCompletedIn: string;
    finishedIn: string,
    priority: string;
    title: string;
    userId: string;
  }

export interface TodosWithColorProp extends Todo {

    color: string;

}