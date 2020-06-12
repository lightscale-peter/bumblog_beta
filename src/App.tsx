import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {
  Header,
  Footer,
  Homepage,
  Keyword
} from './components';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path="/"><Homepage /></Route>
          <Route exact path="/keyword"><Keyword /></Route>
        </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
