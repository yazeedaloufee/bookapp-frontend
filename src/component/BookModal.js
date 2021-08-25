import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
class BookModal extends React.Component {


    addBook = (e) => {
        e.preventDefault();
        this.props.modalCloseHandler();
        const { user } = this.props.auth0;
        let bookInfo = {
            bookName: e.target.bookName.value,
            description: e.target.description.value,
            email: user.email
        }
        axios.post(`${process.env.REACT_APP_PORT}/addbooks`, bookInfo).then(result => {
            this.props.bookstate(result.data);
        })


    }


    render() {

        console.log('props', this.props);
        return (

            <Modal
                show={this.props.show}

                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton onClick={this.props.modalCloseHandler} >
                    <Modal.Title>Fill in the form to add a new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* adding form */}
                    <Form onSubmit={this.addBook}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Book Name" name='bookName' />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="description" name='description' />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>



                </Modal.Body>

            </Modal>


        )
    }
}

export default withAuth0(BookModal);