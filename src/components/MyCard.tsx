import React from "react";
import { Card, TextField, makeStyles } from "@material-ui/core";

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
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyCard = (props: MyCardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
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
  );
};

export default MyCard;
