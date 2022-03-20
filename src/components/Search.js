import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setResults, setSearchLoading } from "../redux/movie/movieActions";

const genreList = ['Adventure', 'Animation', 'Crime', 'History', 'Horror', 'Romance', 'Thriller', 'Mystery', 'Family', 'Fantasy', 'Musical', 'Sci-Fi', 'Action', 'Darama', 'War']

const Search = ({ setResults, movies, setSearchLoading }) => {
  const [localData, setLocalData] = useState("Search Movie By Movie Name or Director Name");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [filterOpen,setFilterOpen]=useState(false);
  const [checkList, setCheckList] = useState(Array(genreList.length).fill(false))
  let filters=JSON.parse(localStorage.getItem("filter"));
  useEffect(() => {
    
    if(filters){
      let tempCheckList = checkList
    
      for(const filter of filters){
        let idx = genreList.indexOf(filter)
        // let val = tempCheckList[idx]
        tempCheckList[idx] = true
        
      }
      setCheckList([...tempCheckList])
    }
  },[])
  const handleClick = (e) => {
    setLocalData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/dashboard/searchResult");
    setLoading(true);
    // const queryParams = {
    // //  api_key: API_KEY,
    //   query: localData,
    // };

    //const queryString = new URLSearchParams(queryParams).toString();
    const URL = "/movies/searchMovie/" + localData;
    setSearchLoading(true);

    axios
      .get(URL)
      .then((el) => {
        console.log(el.data.Movies);
        setResults(el.data.Movies);
        setLoading(false);
        setSearchLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setSearchLoading(false);
      });
  };
  const handleOnChange = (e) => {
    let tempCheckList = checkList
    let idx = genreList.indexOf(e.target.value)
    let val = tempCheckList[idx]
    tempCheckList[idx] = !val
    setCheckList([...tempCheckList])
    let data = JSON.parse(localStorage.getItem('filter')) || [];
    if (!val) {
      data.push(e.target.value);
    } else {
      const index = data.indexOf(e.target.value);
      if (index > -1) {
        data.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    localStorage.setItem('filter', JSON.stringify(data));
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <div style={{
        height: '50px', borderRadius: '100px',
        display: 'flex', alignItems: 'center', width: '70%', backgroundColor: 'white'
      }}>
        <form style={{ width: '100%', marginLeft: '20px' }} onSubmit={(e) => handleSubmit(e)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="input-field">

            <div style={{ width: '100%' }}>
              <input
                style={{ borderBottom: 'none', width: '80%' }}
                id="search"
                type="search"
                placeholder={localData}
                onChange={(e) => handleClick(e)}
                required
              />

            </div>
            {loading ? (
              <div> <i
                className="material-icons red-text text-darken-4"
                onClick={(e) => handleSubmit(e)}
              >
                motion_photos_on
              </i></div>
            ) : (
              <div><i
                className="material-icons grey-text text-darken-4"
                onClick={(e) => handleSubmit(e)}
              >
                search
              </i></div>
            )}
            <div style={{zIndex: '2',color: 'white', fontSize: '20px', marginLeft: '10px', height: '50px', width: '15%', borderRadius: '0px 100px 100px 0px', backgroundColor: 'rgb(76, 156, 67)' }}>
              <div onClick={()=>setFilterOpen(!filterOpen)}style={{ marginTop: '10px' }}>
                <b>{filters?.length>0?'Filtered':'Filter'}</b>
              </div>
              {
                filterOpen && <div style={{ marginTop: '10px', width: '150px',backgroundColor: '#263238', textAlign: 'left', padding: '10px', borderRadius: '10px' }}>
                {genreList.map((genre, i) => {
                  return (
                    <div key={i}>
                      <label>

                        <input
                          onChange={(e) => handleOnChange(e)}
                          checked={checkList[genreList.indexOf(genre)]}
                          id={genre}
                          name={genre}
                          value={genre}
                          type='checkbox'
                        />
                        <span>{genre}</span>
                      </label>
                    </div>
                  )
                })}
                <button style={{ marginLeft: '60px',marginTop: '10px'}}className="btn btn-primary"onClick={()=>window.location.reload()}>Apply</button>
              </div>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movieReducer.searchResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setResults: (data) => dispatch(setResults(data)),
    setSearchLoading: () => dispatch(setSearchLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
