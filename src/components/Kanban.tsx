import React, { useState } from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext } from "react-beautiful-dnd";
import Lane, { Task } from "./Lane";

const useStyles = makeStyles(() => ({
  kanban: {
    display: "flex",
    height: "700px",
    backgroundColor: "#63abd4",
    overflowY: "scroll",
    overflowX: "hidden",
  },
}));

const initialTodoTasks = [{ id: 1, title: "テスト1", content: "テストの内容" }];
const initialDoneTasks: Task[] = [];

const reorder = (list: Task[], startIndex: number, endIndex: number): Task[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Kanban = () => {
  const classes = useStyles();

  const [todoTasks, setTodoTasks] = useState<Task[]>(initialTodoTasks);
  const [doneTasks, setDoneTasks] = useState<Task[]>(initialDoneTasks);

  const onClickAddCardToTodo = () => {
    const addTodoTask = {
      id: todoTasks.length + 1,
      lane: "",
      title: "",
      content: "",
    };

    setTodoTasks(todoTasks.concat(addTodoTask));
  };

  const onClickAddCardToDone = () => {
    const addDoneTask = {
      id: doneTasks.length + 1,
      title: "",
      content: "",
    };

    setDoneTasks(doneTasks.concat(addDoneTask));
  };

  const onChangeCardTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTodoTasks = todoTasks.map((x) => {
      if (x.id === Number(event.target.id)) {
        return { id: x.id, title: event.target.value, content: x.content };
      }
      return x;
    });

    setTodoTasks(newTodoTasks);
  };

  const onChangeCardContent = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTodoTasks = todoTasks.map((x) => {
      if (x.id === Number(event.target.id)) {
        return { id: x.id, title: x.title, content: event.target.value };
      }
      return x;
    });

    setTodoTasks(newTodoTasks);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const tasks = reorder(todoTasks, result.source.index, result.destination.index);

    setTodoTasks(tasks);
  };

  return (
    <>
      <Typography variant="h5">kettyタスク一覧</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box className={classes.kanban}>
          <Lane
            title="todo"
            tasks={todoTasks}
            onClick={onClickAddCardToTodo}
            onChangeCardTitle={onChangeCardTitle}
            onChangeCardContent={onChangeCardContent}
          />
          <Lane
            title="done"
            tasks={doneTasks}
            onClick={onClickAddCardToDone}
            onChangeCardTitle={onChangeCardTitle}
            onChangeCardContent={onChangeCardContent}
          />
          <IconButton>
            <AddIcon />
          </IconButton>
        </Box>
      </DragDropContext>
    </>
  );
};

export default Kanban;
