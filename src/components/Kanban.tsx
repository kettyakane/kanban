import React, { useState } from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
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

const reorderTasks = (list: Task[], startIndex: number, endIndex: number): Task[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorderColumns = (
  columns: Column[],
  startColumn: string,
  endColumn: string,
  startIndex: number,
  endIndex: number
): Column[] => {
  if (startColumn === endColumn) {
    const tasks = columns.filter((column) => column.title === startColumn)[0].tasks;
    const [removed] = tasks.splice(startIndex, 1);
    tasks.splice(endIndex, 0, removed);

    const updatedColumns = columns.map((column) => {
      if (column.title === startColumn) {
        return {
          ...column,
          tasks,
        };
      }
      return column;
    });

    return updatedColumns;
  }

  const sourceColumnTasks = columns.filter((column) => column.title === startColumn)[0].tasks;
  const [removed] = sourceColumnTasks.splice(startIndex, 1);

  const destinationColumnTasks = columns.filter((column) => column.title === endColumn)[0].tasks;
  destinationColumnTasks.splice(endIndex, 0, removed);

  const updatedColumns = columns.map((column) => {
    if (column.title === startColumn) {
      return {
        ...column,
        tasks: sourceColumnTasks,
      };
    }

    if (column.title === endColumn) {
      return {
        ...column,
        tasks: destinationColumnTasks,
      };
    }
    return column;
  });

  return updatedColumns;
};

const Kanban = () => {
  const classes = useStyles();
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

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    // 変更先がnullの場合
    if (!result.destination) {
      return;
    }

    const sourceColumn = result.source.droppableId;
    const destinationColumn = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // ドラッグアンドドロップ前後で変更がない場合
    if (sourceColumn === destinationColumn && sourceIndex === destinationIndex) {
      return;
    }

    const updatedColumns = reorderColumns(
      columns,
      sourceColumn,
      destinationColumn,
      sourceIndex,
      destinationIndex
    );

    setColumns(updatedColumns);
  };

  return (
    <>
      <Typography variant="h5">kettyタスク一覧</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box className={classes.kanban}>
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
          </Box>
          <IconButton onClick={onClickAddColumn}>
            <AddIcon />
          </IconButton>
        </Box>
      </DragDropContext>
    </>
  );
};

export default Kanban;
