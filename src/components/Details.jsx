import React, { Component } from 'react';

import {  
    Col, 
    Row, 
    Card, 
    CardBody, 
    ListGroup, 
    ListGroupItem } from 'reactstrap';
import Paginator from './Paginator';
    // Redux
import { connect } from 'react-redux';
import { getMovieReviews } from '../redux/actions/moviesActions';
import { isIterable } from 'core-js';

class Details extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state ={
            movie: null,
            movieReviews: null,

            pageNumber: 1,
            totalRegister: 0
        }

        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    componentWillReceiveProps(nextProps, nextContext){

        const { movieReviews } = nextProps;

        if(this.props.movieReviews !== movieReviews){
           
            this.setState({movieReviews: movieReviews.results, totalRegister: movieReviews.total_results, error: movieReviews.error });
          
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

    }

    handlePageChange(pageNumber, pageSize) {
       
        this.setState({
            pageNumber
        });

        this.props.getMovieReviews({ movieId: this.state.movie.id, page: pageNumber});
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
                                                    
                                                    isIterable(movieReviews) && movieReviews.length > 0 ? 
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
                                                        <Paginator
                                                            handleSizePageChange={null}
                                                            handlePageChange={this.handlePageChange}
                                                            pageNumber={this.state.pageNumber}
                                                            totalRegister={this.state.totalRegister}
                                                        ></Paginator>
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