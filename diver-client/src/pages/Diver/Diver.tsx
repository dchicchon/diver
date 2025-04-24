import Box from '@mui/material/Box';
import Navbar from '../../components/Navbar';
import TasksPanel from '../../components/TasksPanel';
import MainPanel from '../../components/MainPanel';
import SaveModal from '../../components/SaveModal';

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
          border: '1px solid var(--border-color)',
          height: '100%',
        }}
      >
        <TasksPanel />
        <MainPanel />
        <SaveModal />
      </Box>
    </Box>
  );
}

export default Diver;
