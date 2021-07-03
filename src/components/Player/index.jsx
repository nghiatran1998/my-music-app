import PropTypes from "prop-types";
import React, { useRef } from "react";
import "./Player.scss";

Player.propTypes = {
  infoSong: PropTypes.object,
  handlePlayNextSong: PropTypes.func,
  nextSongOnClick: PropTypes.func,
  previousSongOnClick: PropTypes.func,
};

Player.defaultProps = {
  infoSong: null,
  handlePlayNextSong: null,
  nextSongOnClick: null,
  previousSongOnClick: null,
};

function Player(props) {
  const { infoSong, handlePlayNextSong, nextSongOnClick, previousSongOnClick } =
    props;
  const { name, singer, image, mp3 } = infoSong;
  const audioRef = useRef();

  // Gửi thông tin bài hát đã kết thúc cho Component cha
  const handleEndSong = (name, audioRef) => {
    handlePlayNextSong(name, audioRef);
  };

  const handlePlayPreviousSongOnClick = (name, audioRef) => {
    nextSongOnClick(name, audioRef);
  };

  const handlePlayNextSongOnClick = (name, audioRef) => {
    previousSongOnClick(name, audioRef);
  };

  return (
    <div className="player">
      <img
        className={image ? "img-song" : "hidden-img"}
        src={image}
        alt="song-img"
      />

      <p>
        <b>{name}</b> - {singer}
      </p>

      <audio
        ref={audioRef}
        src={mp3}
        autoPlay
        controls
        onEnded={() => handleEndSong(name, audioRef)}
      >
        Your browser does not support the audio element.
      </audio>

      <div className="btns-list">
        <button
          className="btn"
          onClick={() => handlePlayPreviousSongOnClick(name, audioRef)}
        >
          <i className="fas fa-fast-backward"></i>
        </button>

        <button
          className="btn"
          onClick={() => handlePlayNextSongOnClick(name, audioRef)}
        >
          <i className="fas fa-fast-forward"></i>
        </button>
      </div>
    </div>
  );
}

export default Player;
