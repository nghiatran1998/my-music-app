import React from "react";
import PropTypes from "prop-types";
import "./Information.scss";

Information.propTypes = {
  name: PropTypes.string,
  singer: PropTypes.string,
  mp3: PropTypes.string,
  image: PropTypes.string,
  handlePlaySongBySource: PropTypes.func,
};

Information.defaultProps = {
  name: "",
  singer: "",
  mp3: "",
  image: "",
  handlePlaySongBySource: null,
};

function Information(props) {
  const { name, singer, mp3, image, handlePlaySongBySource } = props;

  const info = {
    name: name,
    singer: singer,
    image: image,
    mp3: mp3,
  };

  const handlePLaySong = (infomation) => {
    handlePlaySongBySource(infomation);
  };

  return (
    <li className="songs-list" onClick={() => handlePLaySong(info)}>
      <b>{name}</b> - {singer}
    </li>
  );
}

export default Information;
