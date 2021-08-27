import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import UpdateModel from './component/UpdateModel';


class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      updateModelShow:false,
      selectedBookId:0,
      selectedBook:{}
    }
  }
upModShowHandler=()=>{
  this.setState({
    updateModelShow:true
  })
}
upModHideHandler=()=>{
  this.setState({
    updateModelShow:false
  })
}


  componentDidMount() {

    this.props.bookstate(['12342134']);
    const { user} = this.props.auth0;
    console.log(`${process.env.REACT_APP_PORT}/books?${user.email}`);
    axios.get(`${process.env.REACT_APP_PORT}/books?email=${user.email}`).then(result => {
      this.props.bookstate(result.data);
    })
  }

  deleteBook=(e)=>{
 
    let _id=e.target.id;      
    axios.delete(`${process.env.REACT_APP_PORT}/books/${_id}?email=${this.props.email}`).then(result=>{
      this.props.bookstate(result.data);
    })
  }
  
  updateBook=async(e)=>{
    await this.setState({
      selectedBookId:e.target.id
    })
    await this.setState({
      selectedBook:this.props.booksdata.find((value)=>{
          console.log('value._id insede bestbooks js',value._id);
          // console.log('this.props.id',this.props.id)
         return value._id===this.state.selectedBookId;
     })    
     })
     console.log('inside best books. selected book',this.state.selectedBook)



    this.upModShowHandler();


  }

  render() {
    return (

      <Row  >
        <UpdateModel upModHideHandler={this.upModHideHandler} show={this.state.updateModelShow} data={this.props.booksdata} id={this.state.selectedBookId} bookstate={this.props.bookstate} selectedBook={this.state.selectedBook} />
        {this.props.booksdata &&

          this.props.booksdata.map(value => {

            return (

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{value.email}</Card.Subtitle>
                  <Card.Text>{value.description}
                  </Card.Text>
                  <Button variant="primary" id={value._id} onClick={this.deleteBook} name='BookButton'>delete book</Button>

                  <Button variant="primary" id={value._id} onClick={this.updateBook} name='updateBookButton'>Update</Button>

                </Card.Body>
              </Card>
            );
          })
        }</Row>
    )
  }
}

export default withAuth0(MyFavoriteBooks) ;
