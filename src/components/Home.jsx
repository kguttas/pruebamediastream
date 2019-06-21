import React, { Component } from 'react'
import { Col, Row, Card, CardBody } from 'reactstrap';
import GridView from './GridView'; 
import Paginator from './Paginator';

// Redux
import { connect } from 'react-redux';
import { getMoviePopular } from '../redux/actions/moviesActions';


class Home extends Component { 

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
            this.setState({movies: moviePolular.results, totalRegister: moviePolular.total_results, error: moviePolular.error });   
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
                            <GridView
                                {...this.props}
                                movies={ this.state.movies } 
                                hiddenActionColumn={false}
                                handleTableChange={ this.handleTableChange }
                                messageGrid={" Buscado películas..."}
                            ></GridView>
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
    moviePolular: state.parameters.moviePolular
});


export default connect(mapStateToProps, { 
    getMoviePopular
})(Home);