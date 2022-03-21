// export const API_KEY = "026376fa616caf5bf23e83d4e169dd01";
const isLive = true;
export const API_KEY = "983a905b1b49eb7940cb5fc1215f70fd";
export const rootURL = isLive? 'https://backendfynd.herokuapp.com':'http://localhost:3300';

// export const top_rated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
 export const detailURL = `https://api.themoviedb.org/3/movie/`;
// export const queryURL = `https://api.themoviedb.org/3/search/movie?`;
export const queryURL =`${rootURL}/movies/searchMovie`;
export const top_rated=`${rootURL}/movies/allMovies`;
export const createSession=`${rootURL}/user/createSession`;
export const deleteMovie = `${rootURL}/movies/deleteMovie`;
export const loggedUsed=`${rootURL}/user/loggedUsed`;
export const usercreate=`${rootURL}/user/create`;
