import axios from 'axios';

const searchMovies = async (searchWord) => {
    try{
        const res = await axios.get(`https://omdbapi.com/?s=${searchWord}&apikey=`);
        return res.data.Search;
    }catch(err){
        console.log("There was an error", err)
    }
}

const searchMovie = async (imdbID) => {
    try{
        const res = await axios.get(`https://omdbapi.com/?i=${imdbID}&apikey=`);
        return res.data;
    }catch(err){
        console.log("There was an error", err)
    }
}

export {
    searchMovies,
    searchMovie
}
