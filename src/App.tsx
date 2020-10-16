import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {
  Header,
  Footer,
  Modal,
  Homepage,
  BoardHome,
  BoardView,
  BoardWrite
} from './components';
import './App.scss';



function App() {

  return (
    <div className="bb-body">
      <BrowserRouter>
        <Header />
        <Modal />
        <Route exact path="/" component={BoardHome} />
          <Switch>
            <Route path="/board/write" component={BoardWrite} />
            <Route path="/board/view" component={BoardView} />
            <Route path="/board" component={BoardHome} />
          </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
