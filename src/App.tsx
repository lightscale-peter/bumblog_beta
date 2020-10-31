import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {
  Header,
  Footer,
  Modal,
  Login,
  BoardHome,
  BoardView,
  BoardWrite
} from './components';
import './App.scss';

export type matchType = {
  list_id: string;
}

function App() {
  return (
    <div className="bb-body">
      <BrowserRouter>
        <Header />
        <Modal />
        <Route exact path="/" component={BoardHome} />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/board/write/:list_id" component={BoardWrite} />
          <Route path="/board/write" component={BoardWrite} />
          <Route path="/board/view/:list_id" component={BoardView} />
          <Route path="/board" component={BoardHome} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
