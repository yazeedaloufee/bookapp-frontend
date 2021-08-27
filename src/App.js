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
import Button from 'react-bootstrap/Button';
import BookModal from './component/BookModal';
import axios from 'axios'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      bookstate:[],
      modalShow:false
    }

    
  }
   componentDidMount() {

    this.setState({
         bookstate:this.state.bookstate
       })
    
    // console.log(`${process.env.REACT_APP_PORT}/books?${user.email}`);
    //  axios.get(`${process.env.REACT_APP_PORT}/books?email=${user.email}`).then(result => {
    //  this.setState({
    //    bookstate:result
    //  })
    // })
  }


   bookDataInApp=(value)=>{
    this.setState({
      bookstate:value
    })
    console.log('inside app function',this.state.bookstate);
  }

   modalShowHandler=async ()=>{
    await this.setState({
      modalShow:true
    })
    // console.log('modal show value',this.state.modalShow);
  }

  modalCloseHandler=async ()=>{
    await this.setState({
      modalShow:false
    })
    // console.log('modal show value',this.state.modalShow);
  }





  render() {
   
    
    const { user, isAuthenticated } = this.props.auth0;
    
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
        


              
                



              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated === true ? <BestBooks bookstate={this.bookDataInApp} booksdata={this.state.bookstate} email={user.email}/> : <Login />}
              <BookModal   modalCloseHandler={this.modalCloseHandler}  show={this.state.modalShow} bookstate={this.bookDataInApp}/>
           { isAuthenticated && <Button onClick={this.modalShowHandler} >Add a Book</Button>}
              
              
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
