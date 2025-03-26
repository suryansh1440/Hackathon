import React, { useState, useEffect } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaRocket } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { BsPencilSquare, BsLightning } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedContainer, AnimatedFade, AnimatedScale } from '../components/animations/AnimatedContainer';
import { use } from 'react';

const Pratice = () => {
  const [topic, setTopic] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [lastSpeechTime, setLastSpeechTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // Topic suggestions by category
  const topicCategories = {
    technology: [
      "Artificial Intelligence",
      "Future of Mobile Devices",
      "Cybersecurity",
      "Smart Home Technology"
    ],
    society: [
      "Social Media Impact",
      "Modern Education",
      "Cultural Changes",
      "Work-Life Balance"
    ],
    environment: [
      "Climate Solutions",
      "Renewable Energy",
      "Sustainable Living",
      "Wildlife Conservation"
    ],
    business: [
      "Digital Transformation",
      "Startup Culture",
      "Future of Work",
      "E-commerce Trends"
    ]
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setTopic(transcript);
        setLastSpeechTime(Date.now());
      };

      recognition.onend = () => {
        const timeSinceLastSpeech = Date.now() - lastSpeechTime;
        if (timeSinceLastSpeech > 2000 || !lastSpeechTime) {
          setIsListening(false);
        } else if (isListening) {
          recognition.start();
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onspeechend = () => {
        setTimeout(() => {
          if (isListening) {
            setIsListening(false);
            recognition.stop();
          }
        }, 1500);
      };

      setRecognition(recognition);
    }
  }, [isListening, lastSpeechTime]);

  const handleMicClick = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
      setLastSpeechTime(null);
    } else {
      setTopic('');
      setLastSpeechTime(null);
      recognition?.start();
      setIsListening(true);
    }
  };

  const handleCreate = () => {
    if (topic.trim()) {
      navigate(`/test?topic=${encodeURIComponent(topic)}&id=${user?._id}`);
    }
  };

  const clearInput = (e) => {
    e.stopPropagation();
    setTopic('');
    if (isListening) {
      recognition?.stop();
      recognition?.start();
    }
  };

  const getRandomTopic = (category = selectedCategory) => {
    const topics = category === 'all' 
      ? Object.values(topicCategories).flat()
      : topicCategories[category];
    const randomIndex = Math.floor(Math.random() * topics.length);
    setTopic(topics[randomIndex]);
  };

  useEffect(() => {
    if(!user._id){
      navigate('/');
    }
  }, []);


  return (
    <AnimatedContainer className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedFade className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Topic
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Select or speak your topic to get AI-generated question suggestions
          </motion.p>
        </AnimatedFade>

        <AnimatedScale className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100">
          {/* Topic Categories */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Topic Categories
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(topicCategories).map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    getRandomTopic(category);
                  }}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2
                    ${selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 shadow-inner'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <BsLightning className={selectedCategory === category ? 'text-blue-500' : 'text-gray-400'} />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Topic Input */}
          <div className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                Your Topic
              </label>
              <div className="relative flex items-center gap-4">
                <motion.div 
                  className="flex-1 relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsPencilSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Type or speak your topic..."
                    className="block w-full pl-10 pr-12 py-3.5 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <AnimatePresence>
                    {topic && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={clearInput}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                        title="Clear text"
                      >
                        <IoMdClose className="w-5 h-5" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.button
                  onClick={handleMicClick}
                  className={`p-3.5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30' 
                      : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/30'
                  }`}
                  title={isListening ? 'Stop recording' : 'Start recording'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {isListening ? (
                    <FaMicrophoneSlash className="w-6 h-6 text-white" />
                  ) : (
                    <FaMicrophone className="w-6 h-6 text-white" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Random Topic Button */}
            <motion.button
              onClick={() => getRandomTopic()}
              className="w-full p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <BsLightning />
              Generate Random Topic
            </motion.button>

            {/* Generate Content Button */}
            <motion.button
              onClick={handleCreate}
              disabled={!topic.trim()}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                topic.trim() 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/30' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              whileHover={topic.trim() ? { scale: 1.02, y: -2 } : {}}
              whileTap={topic.trim() ? { scale: 0.98 } : {}}
            >
              <FaRocket className={topic.trim() ? 'animate-bounce' : ''} />
              Generate Questions
            </motion.button>
          </div>

          {/* Browser Support Warning */}
          <AnimatePresence>
            {!('webkitSpeechRecognition' in window) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200"
              >
                <p className="text-yellow-800 text-sm text-center">
                  Voice input is not available in your browser.
                  Please use Chrome for the full experience.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimatedScale>
      </div>
    </AnimatedContainer>
  );
};

export default Pratice;
