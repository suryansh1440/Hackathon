import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const socialLinks = [
    {
      icon: <FiInstagram />,
      url: 'https://instagram.com',
      color: 'hover:text-pink-500',
    },
    {
      icon: <FiFacebook />,
      url: 'https://facebook.com',
      color: 'hover:text-blue-500',
    },
    {
      icon: <FiLinkedin />,
      url: 'https://linkedin.com',
      color: 'hover:text-blue-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-4 border-t border-indigo-800 z-60">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div
            variants={containerVariants}
            className="flex space-x-5 mb-2"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xl transition-all duration-300 ${link.color} cursor-pointer hover:drop-shadow-lg`}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center text-sm text-indigo-100"
          >
            <p className="mb-1">
              © {new Date().getFullYear()} Suryaa. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-2">
              <span className="h-px w-8 bg-indigo-400"></span>
              <span>Made with ❤️</span>
              <span className="h-px w-8 bg-indigo-400"></span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;