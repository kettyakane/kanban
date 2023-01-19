import { LaneContent, Task } from "../interface";

export const initialTodoTasks: Task[] = [{ id: 1, title: "テスト1", content: "テストの内容" }];
export const initialLaneContents: LaneContent[] = [
  {
    id: 1,
    title: "todo",
    tasks: initialTodoTasks,
  },
  {
    id: 2,
    title: "done",
    tasks: [],
  },
];
