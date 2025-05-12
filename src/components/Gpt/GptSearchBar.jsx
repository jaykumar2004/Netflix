import { useRef, useState } from "react";
import lang from "../../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../../utils/constants";
import { addGptMovieResult } from "../../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [movieSuggestions, setMovieSuggestions] = useState([]);

  // Search a movie on TMDB
  const searchMovieTMBD = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const query = searchText.current.value;

    const prompt = `
Act as a Movie Recommendation system. For the following user query: "${query}", suggest exactly 5 movie names.

Return only the movie names, comma-separated in a single line. Do not include any other explanation or text.

Example format: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya
`;

    let gptMovies = [];

    try {
      const response = await fetch(
        "https://api.together.xyz/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 652a50b97e6e1cb0bcf8a3f561d4da21d63317aee508016958d6976daf5d77a7",
          },
          body: JSON.stringify({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const movieList = data.choices?.[0]?.message?.content;

      if (movieList) {
        gptMovies = movieList
          .split(",")
          .map((movie) => movie.trim())
          .slice(0, 5);

        setMovieSuggestions(gptMovies);
      } else {
        setMovieSuggestions([]);
        return;
      }
    } catch (error) {
      console.error("GPT search failed:", error);
      setMovieSuggestions([]);
      return;
    }

    // Search each movie on TMDB and collect results
    try {
      const promiseArray = gptMovies.map((movie) => searchMovieTMBD(movie));
      const tmbdResults = await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames: gptMovies,movieResults: tmbdResults}));
    } catch (err) {
      console.error("TMDB fetch failed:", err);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex flex-col items-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-white col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
