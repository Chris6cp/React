import React, { Component } from 'react';
import { Card,CardImg,CardText,CardBody,CardTitle,BreadcrumbItem,Breadcrumb, Button, ModalHeader, Modal, ModalBody, Row, Col, Label, Input } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


   
function RenderDish({dish}){
        if(dish!= null){
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name} /> 
                        <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

function RenderComments({comments}){
       
       
        const cmt = comments.map(comment => {
            return(
                <li key = {comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}</p>
                    

                </li>
                
            )
        });

        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {cmt}
                </ul>
                <CommentForm />
            </div>
        );
    }

    const Dishdetail = (props) => 
    {

    
        if (props.dish == null) {
            return (
            <div></div>
            );
        }

      
        return(
            <div className="container">

                <div className="row">
                    <Breadcrumb>
                        
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>    
                <div className="row">
                    <RenderDish dish ={props.dish} />
                    <RenderComments comments ={props.comments} />
                </div>
                
                
           </div>
        );
    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len );
    const minLength = (len) => (val) => (val) && (val.length >= len);


    class CommentForm extends Component{

        constructor(props){
            super(props);


            this.state={
               isModalOpen: false  

            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

        }

        handleSubmit(values){
            console.log("Current state is: " + JSON.stringify(values))
            alert("Current state is: " + JSON.stringify(values));
        }

        toggleModal(){

            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

       
      

        render(){
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm>
                                <Row className="form-group">
                                    <Label htmlFor=".rating" md={5}>Rating</Label>
                                    <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                       
                                    </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".author" md={5}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" name="author" placeholder="Your Name"  className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(15) }} />
                                        <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be lesser than 15 characters'
                                        }}/>

                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".cmnt" md={5}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".cmnt" name="cmnt" rows="6" className="form-control" 
                                        validators={{required}}/>

                                        <Errors 
                                        className="text-danger"
                                        model=".cmt"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                        
                    </Modal>
                </React.Fragment>

               
            );
        }
    }

export default Dishdetail; 

