import React from "react";
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import CreateLink from './Link/CreateLink'
import LinkDetail from './Link/LinkDetail'
import SearchLinks from './Link/SearchLinks'
import LinkList from './Link/LinkList'
import ForgotPassword from './Auth/ForgotPassword'
import Login from './Auth/Login'
function App() {
  return (
    
    <BrowserRouter>
   
      <Switch>
    
        <Route exact path="/" render={()=> <Redirect to="/new/1" /> } />
          <Route  path="/create" component={CreateLink} />
          <Route  path="/login" component={Login} /> 
          <Route  path="/forgot" component={ForgotPassword} />
          <Route  path="/search" component={SearchLinks} />
          <Route  path="/top" component={LinkList} />
        <Route  path="/new/:page" component={LinkList} />
        <Route  path="/link/:linkId" component={LinkDetail} />
          
      </Switch>
    
    </BrowserRouter>
  
  );
}

export default App;