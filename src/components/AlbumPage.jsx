import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import Loading from "./Loading";

const getAccessToken = async () => {
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
  return response.data.access_token;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const location = useLocation();
  const [albumDetails, setAlbumDetails] = useState(location.state?.album || {});
  const [albumTracks, setAlbumTracks] = useState([]);
  const [loadingTracks, setLoadingTracks] = useState(true);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const token = await getAccessToken();

        const albumResponse = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlbumDetails(albumResponse.data);

        const trackResponse = await axios.get(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlbumTracks(trackResponse.data.items || []);
      } catch (error) {
        console.error("Error fetching album details or tracks:", error);
      } finally {
        setLoadingTracks(false);
      }
    };

    fetchAlbumDetails();
  }, [albumId]);

  const handlePlayPreview = (previewUrl) => {
    if (!previewUrl) {
      alert("No preview available for this track.");
      return;
    }

    const audio = new Audio(previewUrl);
    audio.play();

    if (window.currentPreviewAudio) {
      window.currentPreviewAudio.pause();
    }
    window.currentPreviewAudio = audio;
  };

  const handleAddToPlaylist = (track) => {
    const playlist = JSON.parse(localStorage.getItem("playlist")) || [];
    const isTrackInPlaylist = playlist.some((t) => t.id === track.id);

    if (!isTrackInPlaylist) {
      localStorage.setItem("playlist", JSON.stringify([...playlist, track]));
      alert(`${track.name} has been added to your playlist!`);
    } else {
      alert("Track is already in the playlist.");
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-b from-[#1e1e1e] to-black text-white h-full overflow-y-auto">
      <div className="flex items-center space-x-6">
        <img
          src={
            albumDetails.images?.[0]?.url || "https://via.placeholder.com/200"
          }
          alt={albumDetails.name}
          className="h-40 w-40 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold">{albumDetails.name}</h1>
          <p className="text-lg text-gray-400">
            {albumDetails.artists?.[0]?.name}
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Tracks</h2>
        <div className="space-y-2">
          {loadingTracks ? (
            <Loading />
          ) : albumTracks.length > 0 ? (
            albumTracks.map((track) => (
              <div
                key={track.id}
                className="flex justify-between items-center bg-[#2e2e2e] p-4 rounded-lg hover:bg-[#3a3a3a] cursor-pointer"
              >
                <div onClick={() => handlePlayPreview(track.preview_url)}>
                  <p className="font-medium">{track.name}</p>
                  <p className="text-gray-400 text-sm">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToPlaylist(track)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  <PlusCircleIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            ))
          ) : (
            <p>No tracks available for this album.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AlbumPage;
