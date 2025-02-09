import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, VIDEO_URL } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) =>{
    const dispatch = useDispatch();

    const trailerVideo = useSelector(store=>store.movies.trailerVideo);

  const getMovieVideos = async () => {
    const data = await fetch(VIDEO_URL+movieId+"/videos?language=en-US", API_OPTIONS );
    const json = await data.json();

    const trailerData = json.results.filter(
      (movie) => movie.type === "Trailer"
    );
    const trailer = trailerData.length ? trailerData[0] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    !trailerVideo && getMovieVideos();
  }, []);
}

export default useMovieTrailer;