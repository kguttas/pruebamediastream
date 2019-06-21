import React, { Component } from 'react';
import queryString from 'query-string';
import {  ButtonGroup,
    ButtonToolbar,Button, Col, Row, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink , Container,ListGroup, ListGroupItem } from 'reactstrap';

    // Redux
import { connect } from 'react-redux';
import { getMovieReviews } from '../redux/actions/parametersActions';
import { isIterable } from 'core-js';

class Details extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state ={
            movie: null,
            movieReviews: null
        }
    }
    
    componentWillReceiveProps(nextProps, nextContext){

        const { movieReviews } = nextProps;

        if(this.props.movieReviews !== movieReviews){
            //console.log(movieReviews.results);
            this.setState({movieReviews: movieReviews.results, totalRegister: movieReviews.total_results, error: movieReviews.error });
            //this.props.passDataService(moviePolular);
        }
    }

    componentDidMount(){

        const movie = this.props.location.state ? this.props.location.state.movie : null;

        // Si no hay detos para mostrar detalle retorna al home.
        if(!movie){
            this.props.history.push({
                pathname: '/'
           });
        }else{
            this.setState({movie});
            this.props.getMovieReviews({movieId: movie.id, page: 1});
        }

        
        /*if(this.props.history.location){
            if(this.props.history.location.search){

                const values = queryString.parse(this.props.location.search);

                if(values.movieId){
                    this.setState({ movieId: values.movieId });
                }
            }
        }*/
    }

    render() {

        const {movie, movieReviews} = this.state;

        return (
            <>
                {
                    movie ?
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <Row className="ml-0">    
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title}`}  width="92"></img>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <p className="text-justify" style={{whiteSpace: "pre-wrap"}}>
                                                <strong>Descripción</strong><br></br>
                                                {movie.overview}
                                            </p>
                                            </Col>
                                        </Row>
                                        <Row>    
                                            <Col>
                                                {
                                                    
                                                    movieReviews ? 
                                                    <>
                                                        <strong>Reviews</strong><br></br>
                                                        <ListGroup>
                                                        {
                                                            movieReviews.map((item, idx) => (
                                                                <ListGroupItem key={idx}>
                                                                    <span>Autor: {item.author}</span>
                                                                    <p className="text-justify">Contenido: {item.content}</p>
                                                                    
                                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">Referencia</a> 
                                                                </ListGroupItem>
                                                            ))
                                                        }
                                                        </ListGroup>
                                                    </>
                                                    
                                                    : null
                                                }
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    :null
                }

            </>
        )
    }
}


const mapStateToProps = state => ({
    movieReviews: state.parameters.movieReviews,
});


export default connect(mapStateToProps, { 
    getMovieReviews
})(Details);