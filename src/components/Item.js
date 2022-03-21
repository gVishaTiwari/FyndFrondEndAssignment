import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { deletemovie } from "../api/Api";
import {
  updateFavorites,
  updateTrending,
  deleteFavorites,
} from "../redux/movie/movieActions";

const Genres = ({genres})=>{
  return (
    <div style={{margin:'10px'}}>
      {
        genres.map((genre,i)=>{
          // style={{boxShadow: '0em 0em 1em rgba(0, 0, 0, 0.7)'}}
          return (
              <div style={{boxShadow: '0em 0em 1em rgba(0, 0, 0, 0.3)',display:'inline-block',color:'white',margin:'2px',padding:'2px 10px',
              backgroundColor:'#4c9c43',borderRadius:'100px'}}> {genre}</div>

          )
        })
      }
    </div>
  )
}

const Item = ({
  info,
  favoriteMovies,
  trendingMovies,
  updateFavorites,
  updateTrending,
  deleteFavorites,userDetails
}) => {
  const { name, imdb_score, isFavorite } = info;
  const handleClick = (id, isFavorite) => {
    // console.log("click", id, isFavorite);
    // console.log(favoriteMovies, trendingMovies);
    if (isFavorite) {
      info.isFavorite = !info.isFavorite;
      deleteFavorites(id);
    } else {
      info.isFavorite = !info.isFavorite;
      updateFavorites(info);
    }
  };
  const deleteMovie=(movie) => {
    let body={movie_id:movie.id}
    axios
    .post(deletemovie,body)
    .then((res) => {
      console.log("Delete Done")

      axios
        .get(deletemovie)
        .then((res) => {
          updateTrending(res.data.movies);
        })
        .catch((err) => {
          console.log(err);
        });
    
    })
    .catch((err) => {
      console.log(err);
    });
}

  return (
    <>
      <div className="col s12 m4" style={{boxShadow: '0em 0em 1em rgba(0, 0, 0, 0.3)'}} >
        <div className="card horizontal" style={{zIndex: '1',height:'300px',borderRadius:'10px',backgroundImage:'linear-gradient(0deg, black,rgba(0,0,0,0.3), transparent)'}}>
          {/* <div className="card-image">
              <img
                src={imgPrefix + imgURL}
                alt={title}
                style={{ width: "320px", height: "320px" }}
              />
            </div> */}
          <div className="card-stacked">
            <div className="card-content" style={{ padding:'10px '}}>
              <div>
                <Link
                  to={"/details/" + info.id}
                  className="nav-link"
                  style={{ fontWeight: "bold",fontSize: "20px",color:'rgb(76, 156, 67)'}}
                >
                  {name}{" "}
                </Link>
              
              </div>
            </div>
                <div  >Director: <b>{info.director}</b></div> 
                <div  >IMDB Score: <b>{imdb_score}/10</b></div> 
                <Genres genres={info.genre}/>
            <div className="card-action" style={{ display: "flex",justifyContent: "space-between"}}>
              <div
              disabled={userDetails && userDetails.profile.toLowerCase() !=='admin'}
                className="btn waves-effect waves-light blue darken-1"
                style={{ textAlign: "left" }}
                onClick={() => handleClick(info.id, isFavorite)}
              >
                <i className="material-icons">edit</i>{" "}
              </div>
              <div
              disabled={userDetails&&userDetails.profile.toLowerCase() !=='admin'}
                className="btn waves-effect waves-light red darken-1"
                style={{ textAlign: "left" }}
                onClick={() => deleteMovie(info)}
              >
                <i className="material-icons">delete</i>{" "}
              </div>
              <div
                className={
                  isFavorite
                    ? "btn waves-effect waves-light red darken-1"
                    : "btn waves-effect waves-light green darken-1"
                }
                style={{ textAlign: "left" }}
                onClick={() => handleClick(info.id, isFavorite)}
              >
                {isFavorite ? (
                  <>
                    <i className="material-icons">favorite</i>{" "}
                  </>
                ) : (
                  <>

                    <i className="material-icons ">favorite_border</i>{" "}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.userDetails,
    trendingMovies: state.movieReducer.trendingMovies,
    favoriteMovies: state.movieReducer.favoriteMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTrending: (data) => dispatch(updateTrending(data)),
    updateFavorites: (data) => dispatch(updateFavorites(data)),
    deleteFavorites: (data) => dispatch(deleteFavorites(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
