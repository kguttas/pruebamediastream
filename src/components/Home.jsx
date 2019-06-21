import React, { Component } from 'react'
import {  ButtonGroup,
    ButtonToolbar,Button, Col, Row, Card, CardBody } from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';


import ReactTooltip from 'react-tooltip';

import Paginator from './Paginator';
import { AddFavoritos } from '../utiles';

// Redux
import { connect } from 'react-redux';
import { getMoviePopular, getMovieReviews } from '../redux/actions/parametersActions';


class Home extends Component {

    columnsGridJobsOffers = [
        {
            dataField: 'id',
            text: 'Id',
            hidden: false,
            headerStyle: (colum, colIndex) => {
            return { width: '100px', textAlign: 'left' };
            },
            sort: true
        },{
            dataField: 'poster_path',
            isDummyField: true,
           
            text: 'Poster',
            headerStyle: (colum, colIndex) => {
				return { width: '75px', textAlign: 'center' };
            },
            style: { 
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle",
                textAlign: "center"
            },
            formatter: (cellContent, row) => {
                
                

                return(
                    
                    <Row className="justify-content-center align-items-center"> 
                        
                            <img src={`https://image.tmdb.org/t/p/w500/${row.poster_path}`} alt={`${row.title}`}  width="72"></img>
                        
                    </Row>
                );
                
            }
           
        },{
            dataField: 'title',
            text: 'Título',
            sort: false,
            
            headerStyle: (colum, colIndex) => {
            return { width: '300px', textAlign: 'left' };
            },
            style: { 'whiteSpace': 'wrap',
            "verticalAlign": "middle"}
        }, {
            dataField: 'release_date',
            text: 'Publicada',
            sort: false,
            
            headerStyle: (colum, colIndex) => {
            return { width: '100px', textAlign: 'left' };
            },
            style: { 'whiteSpace': 'wrap',
            "verticalAlign": "middle"}
        },{
            dataField: 'actionButtons',
            isDummyField: true,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '180px', textAlign: 'center' };
            },
            style: { 
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle",
                textAlign: "center"
            },
            formatter: (cellContent, row) => {
        
                return(
                    <Row className="justify-content-center align-items-center">
                        <ReactTooltip id={"btnViewMovie_" + row.id}>
                        </ReactTooltip> 
                        <ReactTooltip id={"btnAddFav_" + row.id}>
                        </ReactTooltip>  
                        
                        <ButtonToolbar>
                            <ButtonGroup size="sm">
                                <Button data-for={"btnViewMovie_" + row.id} data-tip={"Ver película" +  row.title}  color="primary" onClick={(e) => { 
                                    
                                    const movie = this.state.movies.filter((item) => {
                                        if(item.id === row.id) return item;
                                        return false;
                                    });

                                    this.props.history.push({
                                         pathname: '/Details',
                                         search: '?movieId=' + row.id,
                                         state: { movie: movie[0] }
                                    });
                                
                                } } >
                                    Detalles
                                </Button>

                                <Button data-for={"btnAddFav_" + row.id} data-tip={"Agregar a favoritos " +  row.title} color="warning" onClick={(e) => { 
                                    
                                    const movie = this.state.movies.filter((item) => {
                                        if(item.id === row.id) return item;
                                        return false;
                                    });

                                    AddFavoritos(movie[0]);
                                } } >
                                    Favorito
                                </Button>
                                
                                

                                
                            </ButtonGroup>
                        </ButtonToolbar>
                    
                    </Row>
                );
                
            }
        }];
     

    constructor(props) {
        super(props);
        
        this.state = {
            pageNumber: 1,
            totalRegister: 0,
            error: false,

            movies: []
        };

        this.handlePageChange = this.handlePageChange.bind(this);
    }
    
    componentWillReceiveProps(nextProps, nextContext){

        const { moviePolular } = nextProps;

        if(this.props.moviePolular !== moviePolular){
            //console.log(moviePolular.results);
            this.setState({movies: moviePolular.results, totalRegister: moviePolular.total_results, error: moviePolular.error });
            //this.props.passDataService(moviePolular);
        }
    }

    componentDidMount(){
        this.props.getMoviePopular({page: 1});
    }

    handlePageChange(pageNumber, pageSize) {
       
        this.setState({
            pageNumber
        });

        this.props.getMoviePopular({ page: pageNumber});
    }
    

    render() {

        return (
            <Row className="mb-2">
                <Col>
                    <Card>
                        <CardBody>
                            <BootstrapTable
                                id="mapping_table"
                                striped
                                hover
                                condensed
                                bootstrap4
                                remote
                            
                                ref={ n => this.node = n }
                            
                                keyField='id'
                                //caption="Plain text header"
                                noDataIndication={ 
                                    () =>
                                    <strong>Buscado medias...</strong>
                                }
                                data={ this.state.movies } 
                                
                                columns={ this.columnsGridJobsOffers } 

                                onTableChange={ this.handleTableChange }
                            ></BootstrapTable>
                           <Paginator
                                handleSizePageChange={null}
                                handlePageChange={this.handlePageChange}
                                pageNumber={this.state.pageNumber}
                                totalRegister={this.state.totalRegister}
                            ></Paginator>
                         </CardBody>
                    </Card>
                </Col>
            </Row>
            
                               
        )
    }
}

const mapStateToProps = state => ({
    moviePolular: state.parameters.moviePolular,
    movieReviews: state.parameters.movieReviews,
});


export default connect(mapStateToProps, { 
    getMoviePopular,
    getMovieReviews
})(Home);