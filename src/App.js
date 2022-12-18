
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import MissionPage from './admin/mission/MissionPage';
import LoginPage from './admin/LoginPage';
import UserPage from './admin/user/UserPage';
import Header from './admin/Header';
import BoardPage from './admin/board/BoardPage';
import CharacterPage from './admin/character/CharacterPage';
import UserCommentPage from './admin/comment/UserCommentPage';
import ReportPage from './admin/report/ReportPage';
import { useState } from 'react';
import { UserContext } from './context/UserContext';
import HomePage from './admin/HomePage';



function App() {
  const [loginUser, setLoginUser] = useState('');
  return (
    <UserContext.Provider value={{ loginUser, setLoginUser }}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/admin/mission" component={MissionPage} />
          <Route path="/admin/board" component={BoardPage} />
          <Route path="/admin/login" component={LoginPage} />
          <Route path="/admin/user" component={UserPage} />
          <Route path="/admin/character" component={CharacterPage} />
          <Route path="/admin/comment" component={UserCommentPage} />
          <Route path="/admin/report" component={ReportPage} />
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
