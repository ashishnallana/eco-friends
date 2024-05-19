import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./components/Routes/Private";
import Register from "./pages/auth/Register";
import Profile from "./pages/profiles/Profile";
import EditProfile from "./pages/profiles/EditProfile";
import NewInitiative from "./pages/initiatives/NewInitiative";
import Initiatives from "./pages/initiatives/Initiatives";
import NewArticle from "./pages/articles/NewArticle";
import Articles from "./pages/articles/Articles";
import Article from "./pages/articles/Article";
import MyMap from "./pages/map/MyMap";
import Challenges from "./pages/challenges/Challenges";
import NewChallenge from "./pages/challenges/NewChallenge";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profiles/:id" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/new-initiative" element={<NewInitiative />} />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/new-challenge" element={<NewChallenge />} />
        </Route>

        <Route path="/map" element={<MyMap />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
