import React, { useCallback, useEffect, useMemo } from 'react';
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
import axios from 'axios';
import useAuth from './hooks/useAuth';

function App() {

  const {onLogin, authState} = useAuth();

  const checkLoginStatus = () =>{
    axios({
      method: 'get',
      url: '/api/auth/check'
    }).then((res) =>{
      console.log('post_res', res.data);
      
      if(res.data.status){ // Yes Login
        const loginData = {
          email: res.data.info.email,
          name: res.data.info.name
        }
        onLogin(loginData);
      }
    });
  }

  useEffect(()=>{
    checkLoginStatus();
  }, [])




  return (
    <div className="bb-body">
      <BrowserRouter>
        <Header />
        <Modal />
        <Switch>
          <Route exact path="/" component={BoardHome} />
          <Route path="/login" component={Login} />
          <Route path="/board/write/:id" component={BoardWrite} />
          <Route path="/board/write" component={BoardWrite} />
          <Route path="/board/view/:id" component={BoardView} />
          <Route path="/board" component={BoardHome} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
