import axios from 'axios';

const searchMovies = async (searchWord) => {
    try{
        const res = await axios.get(`https://omdbapi.com/?s=${searchWord}&apikey=55a5c27d`);
        return res.data.Search;
    }catch(err){
        console.log("There was an error", err)
    }

}

export {
    searchMovies
}
