import React from "react";
import { Card, TextField, makeStyles } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(() => ({
  card: {
    width: 200,
    height: "auto",
    marginBottom: "10px",
  },
}));

interface MyCardProps {
  id: number;
  title: string;
  content: string;
  laneTitle: string;
  index: number;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyCard = (props: MyCardProps) => {
  const classes = useStyles();
  return (
    <Draggable draggableId={`${props.laneTitle}_${props.index.toString()}`} index={props.index}>
      {(provided) => (
        <Card
          className={classes.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TextField value={props.title} id={props.id.toString()} onChange={props.onChangeTitle} />
          <TextField
            multiline
            minRows={2}
            variant="standard"
            id={props.id.toString()}
            value={props.content}
            onChange={props.onChangeContent}
          />
        </Card>
      )}
    </Draggable>
  );
};

export default MyCard;
