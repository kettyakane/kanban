import React from "react";
import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    width: 200,
    height: "auto",
    marginBottom: "10px",
  },
}));

interface MyCardProps {
  title: string;
  content: string;
}

const MyCard = (props: MyCardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title={props.title} />
      <CardContent>{props.content}</CardContent>
    </Card>
  );
};

export default MyCard;
