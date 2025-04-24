import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { runTask } from '../../utils/api';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { currentOpenTask, selectedTask, setSaveModalOpen } from '../../utils/store';
import RequestTabs from '../RequestTabs';

/**
 * Consists of multiple panels?
 */
function MainPanel() {
  const [openTaskIndex] = useAtom(currentOpenTask);
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [taskName] = useAtom(selectedTask);
  const [, openModal] = useAtom(setSaveModalOpen);
  const [response, setResponse] = useState();

  const handleSaveTask = async () => {
    openModal(true);
    // open the modal here
    // try {
    //   const data = await saveTask({
    //     Name: taskName,
    //     Type: 'request',
    //     Parameters: {
    //       url,
    //       method,
    //     },
    //   });
    //   console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleRunTask = async () => {
    try {
      const data = await runTask({
        Name: 'exampleTask',
      });
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ width: '85%' }} id="main-panel">
      {/* opened request tabs */}
      <RequestTabs />

      {openTaskIndex || openTaskIndex === 0 ? (
        <>
          {/* Save stuff */}
          <Box display="flex" p={1}>
            <Box flex={7}>
              <Typography>{taskName}</Typography>
            </Box>
            <Box flex={1}>
              <Button onClick={handleSaveTask}>Save</Button>
            </Box>
          </Box>
          {/* // URL stuff */}
          <Box
            id="request-panel-url"
            sx={{
              display: 'flex',
              width: '100%',
              border: '1px solid var(--border-color)',
            }}
          >
            <Select value={method} onChange={(event) => setMethod(event.target.value)}>
              <MenuItem value="GET">
                <Typography variant="body2">GET</Typography>
              </MenuItem>
              <MenuItem value="POST">
                <Typography variant="body2">POST</Typography>
              </MenuItem>
              <MenuItem value="PUT">
                <Typography variant="body2">PUT</Typography>
              </MenuItem>
              <MenuItem value="DELETE">
                <Typography variant="body2">DELETE</Typography>
              </MenuItem>
            </Select>
            <TextField
              placeholder="Enter URL"
              sx={{ color: 'white', flex: 2 }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={handleRunTask}>Request</Button>
          </Box>
          {/* // request properties */}
          <Box
            sx={{
              border: '1px solid var(--border-color)',
            }}
            id="request-panel-properties"
          >
            <Box id="request-property-columns"></Box>
            <Box id="request-property-values"></Box>
          </Box>
          {/* response panel */}
          <Box
            id="response-panel"
            sx={{
              maxHeight: '100%',
              border: ' 1px solid var(--border-color)',
            }}
          >
            <Typography variant="body1">{response}</Typography>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
}

export default MainPanel;
