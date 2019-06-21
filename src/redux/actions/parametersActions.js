import { 
    GET_MOVIE_POPULAR,
    GET_MOVIE_REVIEWS
} from './types';

import { webConfig } from '../../GlobalConfig';

import axios from 'axios';

export const getMoviePopular = ({page = 1}) => async dispatch => {

    await axios.get(webConfig.urlBaseAPI + `movie/popular?api_key=${webConfig.apiKey}&page=${page}&language=es-CL`)
        .then(response => {
            //console.log(response);
            
            dispatch({
                type: GET_MOVIE_POPULAR,
                payload: response.data
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_MOVIE_POPULAR,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
}


export const getMovieReviews = ({movieId = null, page = 1}) => async dispatch => {

    await axios.get(webConfig.urlBaseAPI + `movie/${movieId}/reviews?api_key=${webConfig.apiKey}&language=en-US&page=${page}`)
        .then(response => {
            console.log(response);
            
            dispatch({
                type: GET_MOVIE_REVIEWS,
                payload: response
            });
            
        }).catch(error => {
            console.log(error);

            const infoError = { 
                error : true,
                msgError: "Hemos tenido un problema, intente más tarde por favor."
            };

            dispatch({
                type: GET_MOVIE_REVIEWS,
                payload: infoError
            });

        }).then((e) => {
            //stateSite.setLoading(false);
        });
}
