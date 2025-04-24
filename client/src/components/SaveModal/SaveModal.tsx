import { Button, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { saveModalOpen } from '../../utils/store';
import { useState } from 'react';
import { saveTask } from '../../utils/api';
import { Task } from '../../utils/interface';

function SaveModal() {
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useAtom(saveModalOpen);
  const handleClose = () => {
    setTaskName('');
    setOpen(false);
  };

  const handleSaveTask = async () => {
    // should the task parameters be stored globally as well?
    // pass in task parameters?
    const task: Task = {
      Name: taskName,
      Type: 'request',
      Parameters: {},
    };
    const result = await saveTask(task);
    console.log({ result });
    // once we get the result that is okay we can close this modal
  };

  return (
    <Modal
      // hideBackdrop
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          border: '1px solid var(--border-color)',
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      >
        <Typography variant="body2">Save Request</Typography>
        <TextField
          placeholder="Enter a Request name"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
        />
        <Box>
          <Button color="success">Save Request</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SaveModal;
