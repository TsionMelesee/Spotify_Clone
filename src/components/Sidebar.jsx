import {
  HomeIcon,
  MagnifyingGlassIcon,
  DocumentIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ onSearchClick }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      <div className="bg-black text-white w-64 flex flex-col p-4 space-y-6 overflow-y-auto flex-grow">
        <div className="space-y-4">
          <div
            className="flex items-center space-x-4 hover:text-spotifyGreen cursor-pointer"
            onClick={() => navigate("/")}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-sm font-semibold hidden lg:block">Home</span>
          </div>
          <div
            className="flex items-center space-x-4 hover:text-spotifyGreen cursor-pointer"
            onClick={onSearchClick}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span className="text-sm font-semibold hidden lg:block">
              Search
            </span>
          </div>
          <div
            className="flex items-center space-x-4 hover:text-spotifyGreen cursor-pointer"
            onClick={() => navigate("/playlist")}
          >
            <DocumentIcon className="h-6 w-6" />
            <span className="text-sm font-semibold hidden lg:block">
              Your Library
            </span>
          </div>
        </div>

        <hr className="border-t border-gray-700" />

        <div className="space-y-4">
          <p className="text-gray-400 uppercase text-xs">Playlists</p>
          <div className="flex flex-col space-y-3">
            <div
              className="flex items-center space-x-4 hover:text-spotifyGreen cursor-pointer"
              onClick={() => navigate("/playlist")}
            >
              <img
                src="assets/vinylrecord.jpg"
                alt="Album Cover"
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-sm font-medium hidden lg:block">
                My Playlist
              </span>
            </div>
            <div className="flex items-center space-x-4 hover:text-spotifyGreen cursor-pointer">
              <img
                src="assets/download.jpeg"
                alt="Album Cover"
                className="h-10 w-10 rounded-lg"
              />
              <span className="text-sm font-medium hidden lg:block">
                Top Hits
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-gray-500 text-xs text-center">
            © 2024 Spotify Clone
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
