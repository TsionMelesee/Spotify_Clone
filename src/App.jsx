import { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbbar";
import Sidebar from "./components/Sidebar";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import AlbumPage from "./components/AlbumPage";
import PlaylistPage from "./components/PlaylistPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchClick = () => {
    setIsSearching(true);
    const searchInput = document.querySelector("input[type='text']");
    if (searchInput) searchInput.focus();
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-spotifyBlack text-white">
        {user && (
          <Navbar
            isSearching={isSearching}
            setIsSearching={setIsSearching}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        <div className="flex flex-1">
          {user && <Sidebar onSearchClick={handleSearchClick} />}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              {user ? (
                <>
                  <Route
                    path="/"
                    element={<MainPage searchQuery={searchQuery} />}
                  />
                  <Route path="/album/:albumId" element={<AlbumPage />} />
                  <Route path="/playlist" element={<PlaylistPage />} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login setUser={setUser} />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
