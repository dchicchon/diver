import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  addNewOpenTask,
  currentOpenTask,
  openTasks,
  setCurrentOpenTask,
} from '../../utils/store';
import { Divider } from '@mui/material';

interface TabProps {
  index: number;
  id: string;
  name: string;
  selected?: boolean;
}
function Tab(props: TabProps) {
  const [show, setShow] = useState(false);
  const [, setIndex] = useAtom(setCurrentOpenTask);
  const handleClick = () => {
    setIndex(props.index);
  };
  const closeTab = () => {
    console.log('close tab');
  };
  return (
    <Box
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
      sx={{
        display: 'flex',
        borderBottom: props.selected ? '1px solid cyan' : '',
      }}
    >
      <Button color="inherit" onClick={handleClick}>
        <Typography variant="body2">{props.name}</Typography>
      </Button>
      <Button
        sx={{
          opacity: show ? '1' : '0',
        }}
        onClick={closeTab}
      >
        <Typography variant="body2">x</Typography>
      </Button>
      <Divider flexItem orientation="vertical" />
    </Box>
  );
}
function AddButton() {
  const [, addRequest] = useAtom(addNewOpenTask);
  const handleAddTask = () => {
    addRequest();
  };

  return (
    <Button onClick={handleAddTask} color="inherit">
      <AddIcon />
    </Button>
  );
}
function RequestTabs() {
  const [openTaskIndex] = useAtom(currentOpenTask);
  const [tasks] = useAtom(openTasks);

  return (
    <Box p={1} display="flex">
      {tasks.map((task, i) => (
        <Tab
          index={i}
          selected={openTaskIndex == i}
          key={i}
          id={task.ID!}
          name={task.Name}
        />
      ))}
      <AddButton />
    </Box>
  );
}

export default RequestTabs;
