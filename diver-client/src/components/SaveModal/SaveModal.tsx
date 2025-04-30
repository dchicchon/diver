import { Backdrop, Button, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useAtom } from 'jotai';
import { saveModalOpen, setRefreshTasksAtom, testOpenTaskAtom } from '../../utils/store';
import { useEffect, useState } from 'react';
import { OpenTask } from '../../utils/interface';
import { PrimitiveAtom } from 'jotai';
import { saveTask } from '../../utils/api';

// only open this modal to set name of task
interface SaveModalInnerProps {
  openTaskAtom: PrimitiveAtom<OpenTask>;
}
function SaveModalInner(props: SaveModalInnerProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, tasksRefresh] = useAtom(setRefreshTasksAtom);
  const [openTask, setOpenTask] = useAtom(props.openTaskAtom);
  const [taskName, setTaskName] = useState(openTask.taskDetails.Name);
  const [open, setOpen] = useAtom(saveModalOpen);

  useEffect(() => {
    if (!openTask.taskDetails.Name) {
      setTaskName(openTask.taskDetails.Parameters.url);
    }
  }, [openTask]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSaveTask = async () => {
    if (taskName.length === 0) {
      console.log('Must include a request name');
      return;
    }
    try {
      const result = await saveTask({
        ...openTask.taskDetails,
        Name: taskName,
      });
      // run a refresh on the tasks panel?
      console.log({ result });
      setOpenTask((prev) => ({
        ...prev,
        saved: true,
        taskDetails: {
          ...prev.taskDetails,
          Name: taskName,
          // ID: result,
        },
      }));
      tasksRefresh();
    } catch (err) {
      console.log('Unable to save task');
      console.log(err);
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          backgroundColor: 'primary.main',
          border: '1px solid',
          borderColor: 'border.main',
          bgcolor: 'alpha.main',
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="body2">Request Name</Typography>
        <TextField
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
        <Box>
          <Button onClick={handleSaveTask} color="success">
            Save Request
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
function SaveModal() {
  const [openTask] = useAtom(testOpenTaskAtom);
  if (!openTask) return;
  return <SaveModalInner openTaskAtom={openTask} />;
}

export default SaveModal;
