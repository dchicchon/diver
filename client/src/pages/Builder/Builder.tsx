import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { Link } from 'wouter';
// import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';
import ButtonLink from '../../components/ButtonLink';

function Builder() {
  return (
    <Box>
      <Navbar title="Builder">
        <ButtonLink to="/" title="Diver" />
      </Navbar>
      <Container>
        <Box></Box>
      </Container>
    </Box>
  );
}

export default Builder;
