import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import TasksPanel from '../../components/TasksPanel';
import SaveModal from '../../components/SaveModal';
import RequestTabs from '../../components/RequestTabs';
import RequestPanel from '../../components/RequestPanel';

function Diver() {
  return (
    <Box
      id="page-panel"
      display="flex"
      flexDirection="column"
      sx={{
        height: '100%',
      }}
    >
      <Navbar title="Diver">{/* <ButtonLink to="/builder" title="Builder" /> */}</Navbar>
      <Box
        id="content-panel"
        sx={{
          display: 'flex',
          height: '100%',
        }}
      >
        <TasksPanel />
        <Box sx={{ width: '75%' }} id="main-panel">
          <RequestTabs />
          <RequestPanel />
        </Box>
      </Box>
      <SaveModal />
    </Box>
  );
}

export default Diver;
