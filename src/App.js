import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { fetchMusicApi } from "./app/musicSlice";
import Information from "./components/Information";
import Player from "./components/Player";

function App() {
  const dispatch = useDispatch();
  const musicList = useSelector((state) => state.musics.list);
  const [currentSong, setCurrentSong] = useState({});

  useEffect(() => {
    // Lấy dữ liệu từ sever
    const action = fetchMusicApi();
    dispatch(action);
  }, [dispatch]);

  // Bật một bài hát bất kỳ
  const handlePlaySongBySource = (infomation) => {
    setCurrentSong(infomation);
  };

  // Hiển thị danh sách bài hát
  const showSongs = (musics) => {
    let result = null;

    if (musics.length > 0) {
      result = musics.map((music, index) => {
        const { name, singer, source, image } = music;
        return (
          <Information
            key={index}
            name={name}
            singer={singer}
            image={image}
            source={source}
            handlePlaySongBySource={handlePlaySongBySource}
          />
        );
      });
    }

    return result;
  };

  return (
    <div className="app">
      {/* Audio */}
      <Player infoSong={currentSong} />

      {/* Music List */}
      <div className="music-list-div">
        <ul>{showSongs(musicList)}</ul>
      </div>
    </div>
  );
}

export default App;
