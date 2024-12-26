import { useState, useEffect } from "react";

const PlayList = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
    setPlaylist(storedPlaylist);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-b from-[#1e1e1e] to-black text-white h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Your Playlist</h1>
      {playlist.length > 0 ? (
        <div className="space-y-2">
          {playlist.map((track) => (
            <div
              key={track.id}
              className="flex justify-between items-center bg-[#2e2e2e] p-4 rounded-lg"
            >
              <p className="font-medium">{track.name}</p>
              <p className="text-gray-400 text-sm">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Your playlist is empty.</p>
      )}
    </div>
  );
};

export default PlayList;
