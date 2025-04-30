import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../../utils/api';
import { Task } from '../../utils/interface';
import { useAtom } from 'jotai';
import { refreshTasksAtom, setRefreshTasksAtom } from '../../utils/store';

interface TaskItemProps {
  id: string;
  name: string;
}

function TaskItem(props: TaskItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRefreshTasks] = useAtom(setRefreshTasksAtom);
  // const [, setSelectedTask] = useAtom(selectedTask);

  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectTask = (id: string) => {
    console.log({ id });
  };

  const handleDeleteTask = async () => {
    const deleteResult = await deleteTask(props.id);
    console.log({ deleteResult });
    if (deleteResult.message === 'Task Deleted') {
      setRefreshTasks();
    }
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
      <ListItemButton onClick={() => selectTask(props.name)}>
        <Typography variant="body2">{props.name}</Typography>
      </ListItemButton>
    </ListItem>
  );
}

function TasksPanel() {
  // lets use jotai to handle our refresh
  const [tasks, setTasks] = useState([]);
  const [refreshTasks] = useAtom(refreshTasksAtom);

  // we should rerun this effect when we delete a task
  useEffect(() => {
    handleGetTasks();
  }, [refreshTasks]);

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
        width: '25%',
        height: '100%',
        borderRight: '1px solid',
        borderColor: 'border.main',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
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
