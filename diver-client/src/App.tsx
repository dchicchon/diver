import { Route, Switch } from 'wouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Diver from './pages/Diver';
import Builder from './pages/Builder';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgb(33, 33, 33)',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Switch>
        <Route path="/" component={Diver} />
        <Route path="/builder" component={Builder} />
        <Route>404 Page</Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
