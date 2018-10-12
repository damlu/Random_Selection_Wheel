import ReactPlayer from "react-player";

const videoPlayer = url => {
  return <ReactPlayer url={`${url}`} />;
};

export default videoPlayer;
