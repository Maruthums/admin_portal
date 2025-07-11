import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
}

const animations = [
  {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  {
    initial: { opacity: 0, scale: 1.4 },
    animate: { opacity: 1, scale: 1 },
  },
];


const messages = [
  "Welcome back, boss 😎",
  "Vanakkam Panangulam! 🔥",
  "Access granted. Let's build 💻",
  "Ready to launch your next idea? 🚀"
];

const colors = [
  '#1e3a8a', // blue
  '#8fa4df', // green
  '#3b82f6', // amber
  '#5f6f84', // violet
];


const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [animIndex, setAnimIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
      setAnimIndex(Math.floor(Math.random() * animations.length)); // Pick random animation
    }, 10000);

    return () => clearInterval(interval);
  }, []);



  return (
    <motion.div
      key={index}
      initial={animations[animIndex].initial}
      animate={animations[animIndex].animate}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Typography
        sx={{
          fontSize: '26px',
          fontWeight: 700,
          color: colors[index % colors.length],
          fontFamily: `'Segoe UI Emoji', 'Apple Color Emoji', 'Roboto', sans-serif`,
        }}
      >
        {messages[index]}
      </Typography>
    </motion.div>

  );
};

export default AnimatedText;
