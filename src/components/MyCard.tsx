import React from "react";
import { Card, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    width: 200,
  },
}));

const MyCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="タイトル" />
      <CardContent>内容内容内容</CardContent>
    </Card>
  );
};

export default MyCard;
