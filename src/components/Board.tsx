import { useState } from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Lane from "./Lane";
import { LaneContent } from "../interface";
import { initialLaneContents } from "../data/data";

const useStyles = makeStyles(() => ({
  board: {
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

const reorderContents = (
  columns: LaneContent[],
  startColumn: string,
  endColumn: string,
  startIndex: number,
  endIndex: number
): LaneContent[] => {
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

const Board = () => {
  const classes = useStyles();
  const [columns, setColumns] = useState<LaneContent[]>(initialLaneContents);

  const onClickAddColumn = () => {
    const newLane: LaneContent = {
      id: columns.length + 1,
      title: "new lane",
      tasks: [],
    };

    setColumns(columns.concat(newLane));
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

    const updatedColumns = reorderContents(
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
        <Box className={classes.board}>
          <Box className={classes.Lane}>
            {columns.map((column) => (
              <Lane
                key={column.id}
                laneId={column.id}
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

export default Board;
