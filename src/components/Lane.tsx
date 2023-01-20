import { Box, IconButton, Typography, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import MyCard from "./MyCard";
import { Task } from "../interface";

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

type LaneProps = {
  laneId: number;
  title: string;
  tasks: Task[];
  onClick: (columnId: number) => void;
  onChangeCardTitle: (columnId: number, taskId: number, value: string) => void;
  onChangeCardContent: (columnId: number, taskId: number, value: string) => void;
};

const Lane = (props: LaneProps) => {
  const classes = useStyles();

  return (
    <>
      <Droppable droppableId={props.title}>
        {(provided: DroppableProvided) => (
          <Box className={classes.lane}>
            <Typography variant="h5">{props.title}</Typography>
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.tasks.map((x, index) => (
                <MyCard
                  key={index}
                  id={x.id}
                  title={x.title}
                  content={x.content}
                  laneTitle={props.title}
                  onChangeTitle={(event) => {
                    props.onChangeCardTitle(
                      props.laneId,
                      Number(event.target.id) ?? 0,
                      event.target.value
                    );
                  }}
                  onChangeContent={(event) => {
                    props.onChangeCardContent(
                      props.laneId,
                      Number(event.target.id) ?? 0,
                      event.target.value
                    );
                  }}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
            <IconButton
              onClick={() => {
                props.onClick(props.laneId);
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Droppable>
    </>
  );
};

export default Lane;
