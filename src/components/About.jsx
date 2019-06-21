import React, { Component } from 'react';
import queryString from 'query-string';

export default class About extends Component {

    constructor(props, context) {
        super(props, context);
        
        this.state ={
            movieId: null
        }
    }
    
    componentDidMount(){

        //console.log(this.props.location);
       
        if(this.props.history.location){
            if(this.props.history.location.search){

                const values = queryString.parse(this.props.location.search);

                if(values.movieId){
                    this.setState({ movieId: values.movieId });
                }
            }
        }
    }

    render() {
        return (
            <div>
                About: {this.state.movieId}
            </div>
        )
    }
}
