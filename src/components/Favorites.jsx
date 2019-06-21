import React, { Component } from 'react'

import { GetFavoritos } from '../utiles';

export default class Favorites extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            favoritos: null
        }
    }

    componentDidMount(){
        console.log( GetFavoritos());
        this.setState({favoritos: GetFavoritos()});
    }

    render() {
        return (
            <div>
                Favortios
            </div>
        )
    }
}
