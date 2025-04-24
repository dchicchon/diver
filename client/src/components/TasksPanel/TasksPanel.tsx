import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Typography,
} from '@mui/material';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../../utils/api';
import { Task } from '../../utils/interface';
import { selectedTask } from '../../utils/store';

interface TaskItemProps {
  id: string;
  name: string;
}

function TaskItem(props: TaskItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const [, setSelectedTask] = useAtom(selectedTask);

  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = async () => {
    const deleteResult = await deleteTask(props.id);
    console.log({ deleteResult });
  };

  const open = Boolean(anchorEl);

  return (
    <ListItem
      secondaryAction={
        <>
          <Button onClick={handlePopover}>...</Button>
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            onClose={handleClose}
            open={open}
          >
            <Box p={1} display="flex" flexDirection="column">
              <Button>
                <Typography variant="body2">Test Button</Typography>
              </Button>
              <Button onClick={handleDeleteTask} color="error">
                <Typography variant="body2">Delete Request</Typography>
              </Button>
            </Box>
          </Popover>
        </>
      }
      disablePadding
    >
      <ListItemButton onClick={() => setSelectedTask(props.name)}>
        <Typography variant="body2">{props.name}</Typography>
      </ListItemButton>
    </ListItem>
  );
}

function TasksPanel() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    handleGetTasks();
  }, []);

  //   here's where jotoi comes in i think
  const handleGetTasks = async () => {
    console.log('handleGetTasks');
    try {
      const response = await getTasks();
      console.log(response.results);
      setTasks(response.results);
    } catch (err) {
      console.log('error getting tasks');
      console.log(err);
    }
  };

  return (
    <Box
      id="side-panel"
      sx={{
        width: '15%',
        height: '100%',
        border: '1px solid var(--border-color)',
      }}
    >
      <Box display="flex" alignItems={'center'}>
        <Typography variant="body1">Requests</Typography>
      </Box>
      <List>
        {tasks.map((task: Task, i: number) => (
          <Box key={i}>
            <Divider />
            <TaskItem id={task.ID!} name={task.Name} />
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default TasksPanel;
