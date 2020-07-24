import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {
  Header,
  Footer,
  Homepage,
  BoardHome,
  BoardView,
  BoardWrite
} from './components';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Homepage} />
        <Switch>
          <Route path="/board/write" component={BoardWrite} />
          <Route path="/board/view" component={BoardView} />
          <Route path="/board" component={BoardHome} />
        </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
