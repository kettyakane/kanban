import React, { useState } from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

const Kanban = () => {
  const classes = useStyles();

  const [todoTasks, setTodoTasks] = useState<Task[]>(initialTodoTasks);
  const [doneTasks, setDoneTasks] = useState<Task[]>(initialDoneTasks);

  const onClickAddCardToTodo = () => {
    const addTodoTask = {
      id: todoTasks.length + 1,
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
    const id = Number(event.target.id) - 1;
    const newTodoTasks = [...todoTasks];
    newTodoTasks[id].title = event.target.value;

    setTodoTasks(newTodoTasks);
  };

  const onChangeCardContent = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const id = Number(event.target.id) - 1;
    const newTodoTasks = [...todoTasks];
    newTodoTasks[id].content = event.target.value;

    setTodoTasks(newTodoTasks);
  };

  return (
    <>
      <Typography variant="h5">kettyタスク一覧</Typography>
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
    </>
  );
};

export default Kanban;
