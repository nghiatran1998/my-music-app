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

  // Hiển thị danh sách bài hát
  const showSongs = (musics) => {
    let result = null;

    if (musics.length > 0) {
      result = musics.map((music, index) => {
        const { name, singer, mp3, image } = music;
        return (
          <Information
            key={index}
            name={name}
            singer={singer}
            image={image}
            mp3={mp3}
            handlePlaySongBySource={handlePlaySongBySource}
          />
        );
      });
    }

    return result;
  };

  // Bật bài hát đầu tiên khi load trang
  if (musicList.length > 0) {
    const currentSongLength = Object.keys(currentSong).length;
    if (currentSongLength === 0) {
      setCurrentSong(musicList[0]);
    }
  }

  // Bật một bài hát bất kỳ
  const handlePlaySongBySource = (infomation) => {
    setCurrentSong(infomation);
  };

  // Tự động chuyển bài
  const handlePlayNextSong = (name, audio) => {
    if (musicList.length > 0) {
      // Tìm index
      let index = -1;
      for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].name === name) {
          index = i;
          if (index <= musicList.length - 2) {
            index += 1;
            const nextSong = musicList[index];
            setCurrentSong(nextSong);
            audio.current.currentTime = 0;
            audio.current.play();
          }
        }
      }
    }
  };

  // Bật lại bài trước
  const nextSongOnClick = (name, audio) => {
    if (musicList.length > 0) {
      // Tìm index
      let index = -1;
      for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].name === name) {
          index = i;
          if (index > 0) {
            index -= 1;
            const nextSong = musicList[index];
            setCurrentSong(nextSong);
            audio.current.currentTime = 0;
            audio.current.play();
          }
        }
      }
    }
  };

  // Bật bài tiếp theo
  const previousSongOnClick = (name, audio) => {
    handlePlayNextSong(name, audio);
  };

  return (
    <div className="app">
      <h1>My Music App</h1>
      {/* Audio */}
      <Player
        infoSong={currentSong}
        handlePlayNextSong={handlePlayNextSong}
        nextSongOnClick={nextSongOnClick}
        previousSongOnClick={previousSongOnClick}
      />

      {/* Music List */}
      <div className="music-list-div">
        <ul>{showSongs(musicList)}</ul>
      </div>
    </div>
  );
}

export default App;
