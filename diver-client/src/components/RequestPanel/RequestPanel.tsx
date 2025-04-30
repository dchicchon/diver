import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { runTask } from '../../utils/api';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { setSaveModalOpen, testOpenTaskAtom } from '../../utils/store';
import { OpenTask } from '../../utils/interface';
import { PrimitiveAtom } from 'jotai';

interface ActualPanelProps {
  openTaskAtom: PrimitiveAtom<OpenTask>;
}

// this works if I use the atom in a subcomponent?
function ActualPanel(props: ActualPanelProps) {
  const [openTask, setOpenTask] = useAtom(props.openTaskAtom);
  const [response, setResponse] = useState();
  const [, openModal] = useAtom(setSaveModalOpen);

  const handleRunRequest = async () => {
    try {
      const task = openTask.taskDetails;
      const data = await runTask(task);
      console.log({ data });
      setResponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value;
    setOpenTask((prev) => ({
      ...prev,
      taskDetails: {
        ...prev.taskDetails,
        Parameters: {
          ...prev.taskDetails.Parameters,
          url: newUrl,
        },
      },
    }));
  };

  const handleMethodChange = (event: SelectChangeEvent) => {
    // we're changing the method on the task so i should update it
    const newMethod = event.target.value;
    console.log({ newMethod });

    // can i use immer atom instead here?
    setOpenTask((prev) => ({
      ...prev,
      taskDetails: {
        ...prev.taskDetails,
        Parameters: {
          ...prev.taskDetails.Parameters,
          method: newMethod,
        },
      },
    }));
  };

  return (
    <>
      {/* Save stuff */}
      <Box display="flex" p={1}>
        <Box flex={7}>
          <Typography>{openTask.taskDetails.Name}</Typography>
        </Box>
        <Box flex={1}>
          <Button onClick={() => openModal(true)}>
            <Typography variant="body2">Save</Typography>
          </Button>
        </Box>
      </Box>
      {/* // URL stuff */}
      <Box
        id="request-panel-url"
        sx={{
          display: 'flex',
          // width: '100%',
          borderBottom: '1px solid',
          borderColor: 'border.main',
        }}
      >
        <Select
          sx={{
            minWidth: 120,
            flex: '0 0 auto',
          }}
          value={openTask.taskDetails.Parameters.method}
          onChange={handleMethodChange}
        >
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
          sx={{ color: 'white', flex: 12 }}
          value={openTask.taskDetails.Parameters.url}
          onChange={handleUrlChange}
        />

        <Button sx={{ flexGrow: 1 }} onClick={handleRunRequest}>
          <Typography variant="body2">Request</Typography>
        </Button>
      </Box>
      {/* // request properties */}
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'border.main',
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
          borderBottom: ' 1px solid',
          borderColor: 'border.main',
        }}
      >
        <Typography variant="body1">
          {/* <pre> */}
          {JSON.stringify(response, null, 2)}
          {/* </pre> */}
        </Typography>
      </Box>
    </>
  );
}

function RequestPanel() {
  const [testAtom] = useAtom(testOpenTaskAtom);
  if (!testAtom) return;
  return <ActualPanel openTaskAtom={testAtom} />;
}

export default RequestPanel;
