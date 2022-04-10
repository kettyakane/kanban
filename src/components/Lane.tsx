import React from "react";
import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Droppable } from "react-beautiful-dnd";
import MyCard from "./MyCard";

const useStyles = makeStyles(() => ({
  lane: {
    width: 200,
    height: "85%",
    margin: "30px 10px",
    padding: "20px",
    backgroundColor: "#cfe9f7",
    borderRadius: "5px",
  },
}));

export interface Task {
  id: number;
  title: string;
  content: string;
}

interface LaneProps {
  title: string;
  tasks: Task[];
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChangeCardTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCardContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Lane = (props: LaneProps) => {
  const classes = useStyles();

  return (
    <>
      <Droppable droppableId={props.title}>
        {(provided) => (
          <Box className={classes.lane}>
            <Typography variant="h5">{props.title}</Typography>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.tasks.map((x, index) => (
                <MyCard
                  key={x.id}
                  id={x.id}
                  title={x.title}
                  content={x.content}
                  onChangeTitle={props.onChangeCardTitle}
                  onChangeContent={props.onChangeCardContent}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
            <IconButton onClick={props.onClick}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default Lane;
