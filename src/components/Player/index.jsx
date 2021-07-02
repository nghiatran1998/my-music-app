import PropTypes from "prop-types";
import React from "react";
import "./Player.scss";

Player.propTypes = {
  infoSong: PropTypes.object,
};

Player.defaultProps = {
  infoSong: null,
};

function Player(props) {
  const { infoSong } = props;
  const { name, singer, image, mp3 } = infoSong;

  return (
    <div className="player">
      <img
        className={image ? "img-song" : "hidden-img"}
        src={image}
        alt="song-img"
      />

      <p>
        {name} - {singer}
      </p>

      <audio src={mp3} autoPlay controls>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Player;
