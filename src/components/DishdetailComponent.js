import React from 'react';
import {Card, CardBody, CardTitle, CardImg, CardText, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <li key={comp.id}>
                <p>{comp.comment}</p>
                <p>-- {comp.author}, {new Intl.DateTimeFormat('en-IN', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comp.date)))}</p>
            </li>
        );
    });

    return comments;
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