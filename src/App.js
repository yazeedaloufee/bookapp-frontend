import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './BestBooks';
import Login from './Login';
import Profile from './Profile'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      bookstate:[]
    }

    
  }
   bookDataInApp=(value)=>{
    this.setState({
      bookstate:value
    })
    console.log('inside app function',this.state.bookstate);
  }
  
  render() {
    console.log('portttttttttttt',process.env.REACT_APP_PORT);
    
    const {  isAuthenticated } = this.props.auth0;
    console.log('app', this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated === true ? <BestBooks bookstate={this.bookDataInApp} booksdata={this.state.bookstate}/> : <Login />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
