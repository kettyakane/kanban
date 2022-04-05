import React, { useState } from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
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

const initialTodoTasks = [
  { id: 1, title: "テスト1", content: "テストの内容" },
  { id: 2, title: "テスト2", content: "テストの内容" },
];

const initialDoneTasks = [
  { id: 3, title: "テスト3", content: "テストの内容" },
  { id: 4, title: "テスト4", content: "テストの内容" },
];

const Kanban = () => {
  const classes = useStyles();

  const [todoTasks, setTodoTasks] = useState<Task[]>(initialTodoTasks);
  const [doneTasks, setDoneTasks] = useState<Task[]>(initialDoneTasks);

  const onClickAddCardToTodo = () => {
    const addTodoTask = {
      id: todoTasks.length,
      title: `テスト${todoTasks.length}`,
      content: "テスト内容",
    };

    setTodoTasks(todoTasks.concat(addTodoTask));
  };

  const onClickAddCardToDone = () => {
    const addDoneTask = {
      id: doneTasks.length,
      title: `テスト${doneTasks.length}`,
      content: "テスト内容",
    };

    setDoneTasks(doneTasks.concat(addDoneTask));
  };

  return (
    <>
      <Typography variant="h5">kettyタスク一覧</Typography>
      <Box className={classes.kanban}>
        <Lane title="todo" tasks={todoTasks} onClick={onClickAddCardToTodo} />
        <Lane title="done" tasks={doneTasks} onClick={onClickAddCardToDone} />
      </Box>
    </>
  );
};

export default Kanban;
