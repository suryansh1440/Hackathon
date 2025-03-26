import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const CATEGORIES = [
  {
    id: 'math',
    name: 'Mathematics',
    query: 'mathematics tutorial for students',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500',
    lightBg: 'bg-purple-100',
    textColor: 'text-purple-600'
  },
  {
    id: 'physics',
    name: 'Physics',
    query: 'physics concepts for students',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500',
    lightBg: 'bg-blue-100',
    textColor: 'text-blue-600'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    query: 'chemistry lessons for students',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500',
    lightBg: 'bg-green-100',
    textColor: 'text-green-600'
  },
  {
    id: 'biology',
    name: 'Biology',
    query: 'biology lessons for students',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-500',
    lightBg: 'bg-rose-100',
    textColor: 'text-rose-600'
  }
];

const VideoModal = ({ videoId, onClose }) => (
  <>
    {/* Backdrop with blur effect */}
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 z-40" onClick={onClose} />
    
    {/* Modal Content */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl">
        {/* Close button */}
        <div className="absolute -right-2 -top-2 z-50">
          <button
            onClick={onClose}
            className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-lg hover:bg-white hover:text-gray-600 transition-all duration-300 group"
          >
            <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Video container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

const VideoCard = ({ video, onPlay }) => (
  <div className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
    <div className="relative group">
      <img
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
        className="w-full h-40 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onPlay(video.id.videoId)}
          className="bg-white text-red-600 p-3 rounded-full transform hover:scale-110 transition-transform duration-300"
        >
          <FaPlay className="text-xl" />
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
        {video.snippet.title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
        {video.snippet.description}
      </p>
      <p className="text-xs text-gray-500">
        {video.snippet.channelTitle}
      </p>
    </div>
  </div>
);

const CourseVideos = () => {
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fetchVideos = async (category) => {
    if (videos[category.id]) return;

    setLoading(prev => ({ ...prev, [category.id]: true }));
    setError(prev => ({ ...prev, [category.id]: null }));

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            part: 'snippet',
            maxResults: 8,
            q: category.query,
            type: 'video',
            key: API_KEY,
            videoCategoryId: '27', // Education category
            safeSearch: 'strict',
            relevanceLanguage: 'en'
          }
        }
      );

      setVideos(prev => ({
        ...prev,
        [category.id]: response.data.items
      }));
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(prev => ({
        ...prev,
        [category.id]: 'Failed to load videos. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, [category.id]: false }));
    }
  };

  useEffect(() => {
    CATEGORIES.forEach(category => {
      fetchVideos(category);
    });
  }, []);

  const scroll = (categoryId, direction) => {
    const container = document.getElementById(`scroll-${categoryId}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      {selectedVideo && (
        <VideoModal
          videoId={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Educational Videos
          </h2>
          <p className="text-lg text-gray-600">
            Learn from our curated collection of educational videos
          </p>
        </div>

        {CATEGORIES.map(category => (
          <div key={category.id} className="lg:mb-12 mb-20" >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative pl-6">
                <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${category.color} rounded-full`}></div>
                <h2 className="text-2xl font-bold mb-2">
                  <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.name}
                  </span>
                  <span className={`ml-3 px-3 py-1 ${category.lightBg} ${category.textColor} text-sm rounded-full font-medium`}>
                    {videos[category.id]?.length || 0} videos
                  </span>
                </h2>
              </div>
            </div>

            <div className="relative bg-white rounded-xl shadow-md p-6 ">
              <div className="flex items-center justify-between lg:mb-4 mb-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 ${category.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                    <span className="text-white font-bold">{category.name[0]}</span>
                  </div>
                  <p className="text-sm text-gray-500">Scroll to explore more</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll(category.id, 'left')}
                    className={`p-2 rounded-lg hover:${category.lightBg} transition-all duration-300`}
                  >
                    <FaChevronLeft className={category.textColor} />
                  </button>
                  <button
                    onClick={() => scroll(category.id, 'right')}
                    className={`p-2 rounded-lg hover:${category.lightBg} transition-all duration-300`}
                  >
                    <FaChevronRight className={category.textColor} />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div
                  id={`scroll-${category.id}`}
                  className="flex overflow-x-auto scrollbar-hide gap-4 py-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {loading[category.id] ? (
                    <div className="flex justify-center items-center w-full py-12">
                      <div className={`animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 ${category.textColor}`}></div>
                    </div>
                  ) : error[category.id] ? (
                    <div className="text-center text-red-500 py-8 w-full">
                      {error[category.id]}
                    </div>
                  ) : (
                    videos[category.id]?.map(video => (
                      <VideoCard
                        key={video.id.videoId}
                        video={video}
                        onPlay={setSelectedVideo}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseVideos;
