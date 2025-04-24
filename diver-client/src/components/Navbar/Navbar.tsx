// import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import { Link } from 'wouter';
// import Button from '@mui/material/Button';

interface NavbarProps {
  title: string;
  children?: React.ReactNode;
}

function Navbar(props: NavbarProps) {
  return (
    <Box
      p={1}
      sx={{
        // height: '3rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--border-color)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          margin: '0 3rem',
          // border: '1px solid var(--border-color)',
        }}
      >
        {/* flex start */}
        <Box>
          <Typography variant="h5">{props.title}</Typography>
        </Box>
        {/* flex end? */}
        <Box>{props.children}</Box>
      </Box>
    </Box>
  );
}

export default Navbar;
