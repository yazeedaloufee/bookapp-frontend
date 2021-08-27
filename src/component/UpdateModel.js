import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class UpdateModel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            book:{}
        }
    }


 
    
    
    // axios.post(`${process.env.REACT_APP_PORT}/addbooks`, bookInfo).then(result => {
        //     this.props.bookstate(result.data);
        // })
        
        selectedBook=async(e)=>{
            e.preventDefault();
            const { user } = this.props.auth0;
        let name=e.target.bookName.value;
        let description=e.target.description.value;
        // console.log('dataaaaaaaaaaaaaaaa',this.props.data)
        
        console.log('this props in the update model',this.props)
       
        let data=await axios.put(`${process.env.REACT_APP_PORT}/updatebook/${this.props.selectedBook._id}`,{email:user.email,title:name,description:description})
console.log('data coming from update funtion',data)
        this.props.bookstate(data.data);
        this.props.upModHideHandler();
       

    }
    


    
    render() {
       

       
        return (
            <Modal
            show={this.props.show}
                

                backdrop="static"
                keyboard={false}
            >
                {/* <>{this.selectedBook()}</> */}
                <Modal.Header closeButton onClick={this.props.upModHideHandler} >
                    <Modal.Title>Fill in the form to Update this book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* adding form */}
                    <Form onSubmit={this.selectedBook}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.selectedBook.title} name='bookName' placeholder={String(this.props.id)}/>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.selectedBook.description} name='description' placeholder={String(this.state.book.description)}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.upModHideHandler}>
                            Submit
                        </Button>
                       
                    </Form>



                </Modal.Body>

            </Modal>


        )
    }
}

export default withAuth0(UpdateModel);