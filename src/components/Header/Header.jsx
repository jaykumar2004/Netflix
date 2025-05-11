import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../../utils/constants";
import { toggleGptSearchView } from "../../utils/gptSlice";
import { changeLanguage } from "../../utils/configSlice";

const Header = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when the components unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={LOGO} alt="logo" />

      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-lg m-2"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifer} value={lang.identifer}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 cursor-pointer rounded-lg"
            onClick={handleGptSearchClick}
          >
            GPT Search
          </button>
          <img src={user?.photoURL} className="w-12 h-12 " alt="user-profile" />
          <button
            onClick={handleSignOut}
            className="ml-4 font-bold text-white cursor-pointer"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
