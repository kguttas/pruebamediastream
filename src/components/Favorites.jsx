import React, { Component } from 'react';
import { Col, Row, Card, CardBody } from 'reactstrap';
import GridView from './GridView';
import { GetFavoritos } from '../utiles';

export default class Favorites extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            favoritos: []
        }

    }

    componentDidMount(){
        
        this.setState({favoritos: GetFavoritos() || []});
    }

    render() {
        return (
            <Row className="mb-2">
                <Col>
                    <Card>
                        <CardBody>
                            <GridView
                                {...this.props}
                                movies={ this.state.favoritos } 
                                hiddenActionColumn={true}
                                handleTableChange={ null }
                                messageGrid={"No hay favoritos..."}
                                
                               
                            ></GridView>
                           
                         </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}
