import React, { Component } from 'react'
import {  ButtonGroup,
    ButtonToolbar,Button, Col, Row, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink , Container, } from 'reactstrap';
import Img from 'react-image';
import SimpleBar from 'simplebar-react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import '../css/rc-pagination.css';

import ReactTooltip from 'react-tooltip';
import esLocale from 'moment/locale/es';
import moment from 'moment-timezone';
import Select from 'rc-select';
import 'rc-select/assets/index.css';
import {isMobile} from 'react-device-detect';

// Redux
import { connect } from 'react-redux';
import { getMoviePopular, getMovieReviews } from '../redux/actions/parametersActions';
import { isIterable } from 'core-js';

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
                
            },
            style: {
                'whiteSpace': 'nowrap',
                "verticalAlign": "middle"
            }
        },{
            dataField: 'title',
            text: 'Título',
            sort: true,
            
            headerStyle: (colum, colIndex) => {
            return { width: '300px', textAlign: 'left' };
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
                                    
                                    this.props.history.push({
                                         pathname: '/About',
                                         search: '?movieId=' + row.id
                                    });
                                
                                } } >
                                    Detalles
                                </Button>

                                <Button data-for={"btnAddFav_" + row.id} data-tip={"Agregar a favoritos " +  row.title} color="warning" onClick={(e) => { 
                                    //this.onClick_CopyJobOffer(row);
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

        const customPaginator = (handlePageChange, pageNumber, pageSize, total) => {

            const arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' +
            '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' +
            '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' +
            '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

            const doublePath = [
            'M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6' +
            '.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0' +
            '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
            '1c9.1-11.7 9.1-27.9 0-39.5z',
            'M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6' +
            '.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0' +
            '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' +
            '1c9.1-11.7 9.1-27.9 0-39.5z',
            ];

            const getSvgIcon = (path, reverse, type) => {
            const paths = Array.isArray(path) ? path : [path];
            const renderPaths = paths.map((p, i) => {
                return (
                <path key={i} d={p} />
                );
            });
            return (
                <i className={`custom-icon-${type}`} style={{
                fontSize: '16px',
                }}
                >
                <svg
                    viewBox="0 0 1024 1024"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    style={{
                    verticalAlign: '-.125em',
                    transform: `rotate(${reverse ?  180 : 0}deg)`,
                    }}
                >
                    {renderPaths}
                </svg>
                </i>
            );
            };

            const nextIcon = getSvgIcon(arrowPath, false, 'next');
            const prevIcon = getSvgIcon(arrowPath, true, 'prev');
            const jumpNextIcon = () => getSvgIcon(doublePath, false, 'jump-next');
            const jumpPrevIcon = () => getSvgIcon(doublePath, true, 'jump-prev');

            const iconsProps = {
                prevIcon,
                nextIcon,
                jumpPrevIcon,
                jumpNextIcon,
              } ;

            
              
            if(isMobile){

                return (   
                    <Row>
                        
                        <Col xs="12" className="align-self-center">
                            <div className="d-flex justify-content-center justify-content-lg-end">
                                <Pagination 
                                    onChange={handlePageChange} 
                                    onShowSizeChange={this.handleSizePageChange}
                                    current={pageNumber} 
                                    total={total} 
                                    pageSize={pageSize}
                                    selectComponentClass={Select}
                                    {...iconsProps}
                                    showLessItems
                                    showTitle={false}
                                    
                                ></Pagination>
                            </div>                                   
                        </Col>
                    </Row>
    
                );
            }

            return (   
                <Row>
                    
                    <Col xs="12" className="align-self-center">
                        <div className="d-flex justify-content-center justify-content-lg-end">
                            <Pagination 
                                onChange={handlePageChange} 
                                onShowSizeChange={this.handleSizePageChange}
                                current={pageNumber} 
                                total={total} 
                                pageSizeOptions={["5","10","20","30","40","50"]}
                                pageSize={pageSize}
                                selectComponentClass={Select}
                                showQuickJumper
                                showSizeChanger={false}
                                showLessItems
                                showTitle={false}
                                showPrevNextJumpers={true}
                                {...iconsProps}
                                showTotal={(total, range) => (
                                    <div>
                                        mostrando {range[0]} - {range[1]} de {total} registros
                                    </div>
                                )}
                                 
                                locale={{
                                    // Options.jsx
                                    items_per_page: '/ ofertas',
                                    jump_to: 'Ir a',
                                    jump_to_confirm: 'confirmar',
                                    page: '',
                                  
                                    // Pagination.jsx
                                    prev_page: 'Página anterior',
                                    next_page: 'Página siguiente',
                                    prev_5: '5 páginas previas',
                                    next_5: '5 páginas siguientes',
                                    prev_3: '3 páginas previas',
                                    next_3: '3 páginas siguientes'
                                  }}
                                ></Pagination>
                        </div>                                   
                    </Col>
                </Row>

            );
        }

        return (
            <Row className="mb-2">
                <Col>
                    <Card>
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
                         {customPaginator(this.handlePageChange, this.state.pageNumber, 20, this.state.totalRegister)}
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