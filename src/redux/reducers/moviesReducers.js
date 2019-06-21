 import { 
    GET_MOVIE_POPULAR,
    GET_MOVIE_REVIEWS
} from '../actions/types';


const initialState = {
    moviePolular: null,
    movieReviews: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_MOVIE_POPULAR:
         
            return {
                ...state,
                moviePolular: action.payload
            }
        case GET_MOVIE_REVIEWS:
         
            return {
                ...state,
                movieReviews: action.payload
            }
        default:
            return state;
    }
}