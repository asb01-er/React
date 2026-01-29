import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Todo from './components/Todo';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#FF5722',
      dark: '#d50000',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Todo />
    </ThemeProvider>
  );
}

export default App;
