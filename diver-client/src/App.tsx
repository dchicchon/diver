import { Route, Switch } from 'wouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Diver from './pages/Diver';
import Builder from './pages/Builder';

const lightTheme = createTheme({
  typography: {
    allVariants: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
  palette: {
    mode: 'light',

    // @ts-expect-error custom colors allowed
    alpha: {
      main: '#fdf6e3',
    },
    beta: {
      main: '#3b849b',
    },
    border: {
      main: '#c7c3b9',
    },

    // text
    primary: {
      main: 'rgba(0, 0, 0, 0.87)',
      // main: '#fdf6e3',
      // contrastText: 'rgba(0, 0, 0, 0.87)',
      // contrastText: '#c7c3b9',
    },
    // secondary: {
    // main: '#3b849b',
    // contrastText: 'rgba(0, 0, 0, 0.87)',
    // },
    background: {
      default: '#fdf6e3',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'rgba(33, 33, 33, 0.54)',
    },
  },
});

const useDark = false;

function App() {
  return (
    <ThemeProvider theme={useDark ? darkTheme : lightTheme}>
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
