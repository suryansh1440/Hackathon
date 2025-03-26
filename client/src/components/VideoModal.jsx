import React from 'react';
import { FaTimes } from 'react-icons/fa';

const VideoModal = ({ videoId, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white/10 rounded-lg overflow-hidden shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/20 p-2 rounded-full"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Video player */}
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
