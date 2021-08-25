import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { withAuth0 } from '@auth0/auth0-react';


class MyFavoriteBooks extends React.Component {
  componentDidMount() {
    console.log('did mount function is working');
    // console.log(this.props.bookstate);
    this.props.bookstate(['12342134']);
    const { user} = this.props.auth0;

    // console.log(this.props.bookstate);
    console.log(`${process.env.REACT_APP_PORT}/books?${user.email}`);

    axios.get(`${process.env.REACT_APP_PORT}/books?email=${user.email}`).then(result => {
      //  this.props.bookstate=result.data;
      // console.log(result.data);
      this.props.bookstate(result.data);
      // console.log(this.props.bookstate);
      // console.log(process.env.APP_PORT);
    })

    //   // console.log(`${process.env.PORT}/books`);


    //   // let booksData=await axios.get(`${process.env.PORT}/books`);
    //   // console.log(booksData.data);
    //   // this.props.bookstate=booksData.data;
    //   // console.log(this.props.bookstate);

  }

  render() {
    return (
      <Row  >
        {this.props.booksdata &&

          this.props.booksdata.map(value => {


            return (

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{value.email}</Card.Subtitle>
                  <Card.Text>{value.description}
                  </Card.Text>

                </Card.Body>
              </Card>


            );


          })

        }</Row>


      // return(
      //   <Jumbotron>
      //     <h1>My Favorite Books</h1>
      //     <p>
      //       This is a collection of my favorite books
      //     </p>
      //   </Jumbotron>
      // )
    )
  }
}

export default withAuth0(MyFavoriteBooks) ;
