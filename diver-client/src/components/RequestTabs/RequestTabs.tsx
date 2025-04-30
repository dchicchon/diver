import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useAtom } from 'jotai';
import {
  // openTaskId,
  atomListOpenTasks,
  selectedIdAtom,
  selectNewTaskAtom,
  selectOpenTask,
  // testOpenTaskAtom,
} from '../../utils/store';
import { Divider } from '@mui/material';
import { OpenTask, Task } from '../../utils/interface';
import { PrimitiveAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';

interface TabProps {
  openTaskAtom: PrimitiveAtom<OpenTask>;
  remove: () => void;
}

function Tab({ openTaskAtom, remove }: TabProps) {
  const [openTask] = useAtom(openTaskAtom);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
  const [, selectTask] = useAtom(selectOpenTask);

  const handleClick = () => {
    selectTask(openTaskAtom);
    setSelectedId(openTask.id);
  };

  const closeTab = () => {
    remove();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '2px solid',
        borderColor: selectedId === openTask.id ? 'beta.main' : 'transparent',
      }}
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <Button color="inherit" onClick={handleClick}>
        <Typography variant="body2">
          {openTask.taskDetails.Name ||
            openTask.taskDetails.Parameters.url ||
            'Untitled Request'}
        </Typography>
      </Button>

      <Box display="flex" alignItems="center">
        <Button onClick={closeTab}>
          {show ? (
            <Typography
              sx={{
                opacity: show ? '1' : '0',
              }}
              variant="body2"
            >
              x
            </Typography>
          ) : (
            <Typography
              sx={{
                opacity: openTask.saved ? '0' : '1',
              }}
              variant="body2"
            >
              O
            </Typography>
          )}
        </Button>
      </Box>
      <Divider flexItem orientation="vertical" />
    </Box>
  );
}

function RequestTabs() {
  const [, selectNewTask] = useAtom(selectNewTaskAtom);
  const [tasks, dispatch] = useAtom(atomListOpenTasks);

  const addNewRequest = () => {

    const newTask: Task = {
      Name: '',
      Type: 'request',
      Parameters: {
        url: '',
        method: 'GET',
        requestBody: '',
      },
    };
    const currentId = uuidv4();
    const newOpenTask: OpenTask = {
      saved: false,
      id: currentId,
      taskDetails: newTask,
    };

    // this isn't great?
    // isn't this great?
    
    dispatch({
      type: 'insert',
      value: newOpenTask,
    });

    selectNewTask();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid',
        borderColor: 'border.main',
      }}
    >
      {tasks.map((openTaskAtom, i) => (
        <Tab
          remove={() => dispatch({ type: 'remove', atom: openTaskAtom })}
          openTaskAtom={openTaskAtom}
          key={i}
        />
      ))}
      <Button onClick={addNewRequest} color="inherit">
        <AddIcon />
      </Button>
    </Box>
  );
}

export default RequestTabs;
