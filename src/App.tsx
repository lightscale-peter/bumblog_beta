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
import {ModalDataType} from './modules/modal'



function App() {

  const ModalInitData: ModalDataType = {
    status: false,
    title: '',
    desc: '',
    confirm: {
      isShow: false
    }
  };

  return (
    <div className="bb-body">
      <BrowserRouter>
        <Header />
        <Modal data={ModalInitData} />
        <Route exact path="/" component={Homepage} />
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
