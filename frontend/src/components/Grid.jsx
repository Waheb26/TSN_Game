import React, { useState, useEffect } from "react";
import videoCall from "../utils";
import VideoCard from "./Caroussel/VideoCard";
import "./Caroussel/VideoCard.scss";
import "./Grid.scss";

function Grid() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const fetchedVideos = await videoCall();
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos:", error);
      }
    }

    fetchVideos();
  }, []);

  return (
    <div className="video-grid">
      <div className="grid-container">
        {videos.map((video) => (
          <div key={video.id}>
            <VideoCard
              videoSrc={`${import.meta.env.VITE_BACKEND_URL}/assets/${
                video.videoSrc
              }`}
              caption={video.caption}
              title={video.title}
              description={video.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
