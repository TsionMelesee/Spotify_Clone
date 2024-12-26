/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
} from "@heroicons/react/20/solid";
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const searchInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          "grant_type=client_credentials",
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(
                "769ea67eaf0344fdb27de3b978519b7c:1101f37a87704d93a31113d701001937"
              )}`,
            },
          }
        );
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            q: searchQuery,
            type: "album",
            limit: 5,
          },
        });
        setSearchResults(response.data.albums.items || []);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    if (accessToken) {
      fetchAlbums();
    }
  }, [searchQuery, accessToken]);

  const handleAlbumClick = (album) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/album/${album.id}`, { state: { album } });
  };

  return (
    <div className="flex items-center justify-between bg-black px-4 py-2 h-14">
      <div className="flex items-center space-x-4">
        <img src="/assets/Spotify.png" alt="Spotify Logo" className="w-8 h-8" />
        <button className="text-white p-1 rounded-full hover:bg-gray-700">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button className="text-white p-1 rounded-full hover:bg-gray-700">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="relative flex items-center bg-[#121212] px-4 py-1 rounded-full flex-grow mx-4">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          ref={searchInputRef}
          placeholder="Search for an album..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-gray-400 placeholder-gray-400 flex-grow px-2 outline-none"
        />
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 mt-2 bg-gray-800 text-white text-sm p-2 rounded shadow-lg w-full">
            {searchResults.map((album) => (
              <div
                key={album.id}
                className="flex items-center space-x-4 p-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleAlbumClick(album)}
              >
                <img
                  src={album.images[0]?.url || "https://via.placeholder.com/50"}
                  alt={album.name}
                  className="w-10 h-10 rounded"
                />
                <span>{album.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-white text-black px-4 py-1 rounded-full font-semibold">
          Explore Premium
        </button>
        <button className="text-white">
          <BellIcon className="w-6 h-6" />
        </button>
        <button className="text-white">
          <UserIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
