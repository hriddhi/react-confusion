import React from 'react';
import {Card, CardBody, CardTitle, CardImg, CardText, Breadcrumb, BreadcrumbItem, Button,
        Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        alert(JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} outline>
                    <span className="fa fa-edit fa-md"> Submit Comment</span>
                </Button>
            
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" name="rating" className="form-control" defaultValue="1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            <Label htmlFor="author" className="mt-1">Your Name</Label>
                            <Control.text model=".author" name="author" placeholder="Enter your name"
                                className="form-control"
                                validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}
                            />
                            <Errors className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required, ',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be less than 15 characters'
                                }} />
                            <Label htmlFor="comment" className="mt-1">Comment</Label>
                            <Control.textarea model=".comment" name="comment"
                                rows="12" className="form-control" />
                            <Button type="submit" color="primary" className="mt-1">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComment({comment}) {

    const comments = comment.map((comp) => {
        return (
            <React.Fragment>
                <li key={comp.id}>
                    <p>{comp.comment}</p>
                    <p>-- {comp.author}, {new Intl.DateTimeFormat('en-IN', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comp.date)))}</p>
                </li>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            {comments}
            <CommentForm/>
        </React.Fragment>
        );
}

const DishDetail = (props) => {

    const dish = props.dish;
    
    if(dish != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4 className="m-0 p-0">Comments</h4>
                        <ul className="list-unstyled">
                            <RenderComment comment={props.comments}/>
                        </ul> 
                        
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;