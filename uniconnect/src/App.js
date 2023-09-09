import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.js'
import Home2 from './Home2.js'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveAppBar from './components/ResponsiveAppBar.js';
import SignedIn from './components/signed-in.js';
import { Container } from '@mui/material';
import useLocalStorage from './utility/useLocalStorage.js';
import HomePage from './components/HomePage.js';
import ListaGruppi from './components/ListaGruppi.js';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {

  const [token, setToken] = useLocalStorage('TOKEN', '');


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar />

      <Container maxWidth="lg" sx={{ paddingTop: '25px' }}>
        <Router>
          <div className="App">
            <Routes>
              <Route exact path='/' element={!token ? < SignedIn /> : <HomePage />}></Route>
              <Route exact path='/gruppi' element={< ListaGruppi />}></Route>

            </Routes>
          </div>
        </Router>
      </Container>


    </ThemeProvider>


  );
}

export default App;
