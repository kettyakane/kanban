import React, { useState } from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Lane, { Task } from "./Lane";

interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

const useStyles = makeStyles(() => ({
  kanban: {
    display: "flex",
    backgroundColor: "#63abd4",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  Lane: {
    display: "inline-flex",
    height: "700px",
  },
}));

const initialTodoTasks = [{ id: 1, title: "テスト1", content: "テストの内容" }];
const initialDoneTasks: Task[] = [];
const initialColumns: Column[] = [
  {
    id: 1,
    title: "todo",
    tasks: initialTodoTasks,
  },
  {
    id: 2,
    title: "done",
    tasks: initialDoneTasks,
  },
];

const reorder = (list: Task[], startIndex: number, endIndex: number): Task[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Kanban = () => {
  const classes = useStyles();

  const [todoTasks, setTodoTasks] = useState<Task[]>(initialTodoTasks);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const onClickAddColumn = () => {
    const newColumn: Column = {
      id: columns.length + 1,
      title: "new lane",
      tasks: [],
    };

    setColumns(columns.concat(newColumn));
  };

  const onClickAddCard = (columnId: number) => {
    const newId = columns[columnId - 1].tasks.length + 1;
    const addTask = {
      id: newId,
      title: "",
      content: "",
    };

    const updatedColumns = [...columns];
    updatedColumns[columnId - 1].tasks.push(addTask);
    setColumns(updatedColumns);
  };

  const onChangeCardTitle = (columnId: number, taskId: number, value: string): void => {
    const tasks = columns[columnId - 1].tasks;
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: value };
      }
      return task;
    });

    const updatedColumns = [...columns];
    updatedColumns[columnId - 1].tasks = newTasks;
    setColumns(updatedColumns);
  };

  const onChangeCardContent = (columnId: number, taskId: number, value: string): void => {
    const tasks = columns[columnId - 1].tasks;
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, content: value };
      }
      return task;
    });

    const updatedColumns = [...columns];
    updatedColumns[columnId - 1].tasks = newTasks;
    setColumns(updatedColumns);
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
        <Droppable droppableId="kanban" type="COLUMN" direction="horizontal">
          {(provided) => (
            <Box className={classes.kanban}>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Box className={classes.Lane}>
                  {columns.map((column) => (
                    <Lane
                      key={column.id}
                      id={column.id}
                      title={column.title}
                      tasks={column.tasks}
                      onClick={onClickAddCard}
                      onChangeCardTitle={onChangeCardTitle}
                      onChangeCardContent={onChangeCardContent}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              </div>
              <IconButton onClick={onClickAddColumn}>
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Kanban;
