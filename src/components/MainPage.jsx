import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const CLIENT_ID = "769ea67eaf0344fdb27de3b978519b7c";
const CLIENT_SECRET = "1101f37a87704d93a31113d701001937";

const getAccessToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    "grant_type=client_credentials",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
      },
    }
  );
  return response.data.access_token;
};

const MainPage = () => {
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const token = await getAccessToken();
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTrendingAlbums(response.data.albums.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending albums:", error);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleAlbumClick = (album) => {
    if (album.id === "your-playlist") {
      navigate("/playlist");
    } else {
      navigate(`/album/${album.id}`, { state: { album } });
    }
  };

  const handleShowAllClick = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="flex flex-col p-6 space-y-8 bg-gradient-to-b from-[#1e1e1e] to-black text-white h-full overflow-y-auto">
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Playlist</h2>
        <div
          className="flex flex-col rounded-lg p-3 hover:bg-[#3a3a3a] cursor-pointer"
          onClick={() =>
            handleAlbumClick({ id: "your-playlist", name: "Your Playlist" })
          }
        >
          <img
            src="assets/vinylrecord.jpg"
            alt="Your Playlist"
            className="h-32 w-32 rounded-lg mb-2"
          />
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Trending</h2>
          <button
            className="text-spotifyGreen hover:underline"
            onClick={handleShowAllClick}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trendingAlbums
              .slice(0, showAll ? trendingAlbums.length : 6)
              .map((album) => (
                <div
                  key={album.id}
                  className="flex flex-col items-center rounded-lg p-3 hover:bg-[#3a3a3a] cursor-pointer"
                  onClick={() => handleAlbumClick(album)}
                >
                  <img
                    src={
                      album.images[0]?.url || "https://via.placeholder.com/120"
                    }
                    alt="Trending Album"
                    className="h-32 w-32 rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium text-center">
                    {album.name}
                  </p>
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;
