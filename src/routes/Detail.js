import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movies);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movies.medium_cover_image} />
          <h2>
            <a href={movies.url}>{movies.title}</a>
          </h2>
          <p>{movies.description_full}</p>
          <ul>
            <li>{movies.genres}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
