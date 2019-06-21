import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ReactTooltip from 'react-tooltip';
import { ButtonGroup, ButtonToolbar,Button, Row } from 'reactstrap';
import { AddFavoritos } from '../utiles';
import SimpleBar from 'simplebar-react';// or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import '../css/simpleBar.css';
import {webConfig} from '../GlobalConfig';

export default class GridView extends Component {

    columnsGridJobsOffers = [
        {
            dataField: 'id',
            text: 'Id',
            hidden: true,
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
                        <img src={ webConfig.imageMovie + `${row.poster_path}`} alt={`${row.title}`}  width="72"></img> 
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
        },{
            dataField: 'vote_average',
            text: 'Puntaje',
            sort: false,
            headerStyle: (colum, colIndex) => {
            return { width: '80px', textAlign: 'left' };
            },
            style: { 'whiteSpace': 'wrap',
            "verticalAlign": "middle"}
        }, {
            dataField: 'release_date',
            text: 'Publicada',
            sort: false,
            
            headerStyle: (colum, colIndex) => {
            return { width: '80px', textAlign: 'left' };
            },
            style: { 'whiteSpace': 'wrap',
            "verticalAlign": "middle"}
        },{
            dataField: 'actionButtons',
            isDummyField: true,
            hidden: false,
            text: 'Acción',
            headerStyle: (colum, colIndex) => {
				return { width: '100px', textAlign: 'center' };
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
                                    
                                    const movie = this.props.movies.filter((item) => {
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

                                <Button hidden={this.props.hiddenActionColumn} data-for={"btnAddFav_" + row.id} data-tip={"Agregar a favoritos " +  row.title} color="warning" onClick={(e) => { 
                                    
                                    const movie = this.props.movies.filter((item) => {
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
     
    render() {
        return (
            <SimpleBar>
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
                    <strong>{this.props.messageGrid}</strong>
                }
                data={ this.props.movies } 
                
                columns={ this.columnsGridJobsOffers } 

                onTableChange={ this.props.handleTableChange }
            ></BootstrapTable>
            </SimpleBar>
        )
    }
}
