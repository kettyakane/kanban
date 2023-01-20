export type LaneContent = {
  id: number;
  title: string;
  tasks: Task[];
};

export interface Task {
  id: number;
  title: string;
  content: string;
}
