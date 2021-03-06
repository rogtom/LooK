import React, { useState, useEffect } from 'react';
import Search from '../Search';
import FilmCard from '../Card';
import DetailsModal from '../Details';



const Home = () => {

  const [term, setTerm] = useState('');
  const [filmSearch, setFilmSearch] = useState(null);
  const [filmData, setFilmData] = useState([]);
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [details, setDetails] = useState([]);


  useEffect(() => {


    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${term}&page=1&r=json`, {
      'method': 'GET',
      'headers': {
        'x-rapidapi-key': '790017f6aemsh6c9d13e8a3f3896p12bf9bjsn9cfbc465c4f2',
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(data => data.Search)
      .then(data => setFilmSearch(data))
      .then(() => setFilmData([]))
      .catch(err => {
        console.error(err);
      });
  }, [term]);

  useEffect(() => {


    filmSearch?.forEach(el => fetch(`https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=${el.imdbID}&source=imdb`, {
      'method': 'GET',
      'headers': {
        'x-rapidapi-key': '790017f6aemsh6c9d13e8a3f3896p12bf9bjsn9cfbc465c4f2',
        'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(films => films.collection)
      .then(films => Object.values(films).length !== 0 && setFilmData(prev => [...prev, films]))

      .catch(err => {
        console.error(err);
      }));


  }, [filmSearch]);


  const handleSearchSubmit = (search) => {

    setTerm(search);
    setError('');

  };

  const handleDetailsShow = () => {

    setModalShow(true);

  };


  const getDetails = (imdbID) => {

    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${imdbID}&r=json`, {
      'method': 'GET',
      'headers': {
        'x-rapidapi-key': '790017f6aemsh6c9d13e8a3f3896p12bf9bjsn9cfbc465c4f2',
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com',
      },
    })
      .then(response => response.json())
      .then(response => setDetails(response))
      .catch(err => {
        console.error(err);
      });

  };


  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <h3>Go anf find something interesting </h3>
      <Search submitTerm={handleSearchSubmit} />

      <div className="d-flex justify-content-center flex-lg-wrap ">
        {error === '' ? filmData?.map(film => {
            return (


              <FilmCard key={film.id}
                        id={film.id}
                        imdbID={film.source_ids.imdb.id}
                        title={film.name}
                        picture={film.picture}
                        locations={film.locations}
                        imdbRating={details.imdbRating}
                        getDetails={getDetails}
                        showDetails={handleDetailsShow}

              />
            );
          })

          : <p>{error.message}</p>}

        <>
          <DetailsModal
            details={details}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      </div>
    </div>
  );
};

export default Home;