import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [theme, setTheme] = useState('romantic');
  const [isMessageVisible, setIsMessageVisible] = useState(true); // Heart message visible by default

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      const storedPhotos = localStorage.getItem("photos");
      const storedTimeline = localStorage.getItem("timeline");
      const storedTheme = localStorage.getItem("theme");

      if (storedNotes) setNotes(JSON.parse(storedNotes));
      if (storedPhotos) setPhotos(JSON.parse(storedPhotos));
      if (storedTimeline) setTimeline(JSON.parse(storedTimeline));
      if (storedTheme) setTheme(storedTheme);
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  useEffect(() => { localStorage.setItem("notes", JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem("photos", JSON.stringify(photos)); }, [photos]);
  useEffect(() => { localStorage.setItem("timeline", JSON.stringify(timeline)); }, [timeline]);
  useEffect(() => { localStorage.setItem("theme", theme); }, [theme]);

  const deleteItem = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));
  const toggleHeartAnimation = () => setIsMessageVisible(prev => !prev);

  const themes = {
    romantic: 'bg-gradient-to-br from-[#ffdde1] to-[#ee9ca7] text-gray-800',
  };
  const sectionThemes = { romantic: 'bg-white bg-opacity-80 text-gray-800' };
  const cardThemes = { romantic: 'bg-white text-gray-800' };
  const headerThemes = { romantic: 'bg-white bg-opacity-80 text-[#e91e63]' };
  const buttonThemes = { romantic: 'bg-[#e91e63] hover:bg-[#d81b60] text-white' };

  const ScrapbookSection = ({ children, title }) => (
    <section className={`max-w-4xl mx-auto my-8 p-6 rounded-2xl shadow-xl ${sectionThemes.romantic}`}>
      <h2 className={`text-3xl font-bold mb-4 ${headerThemes.romantic}`}>{title}</h2>
      {children}
    </section>
  );

  // Preload your Postimg images
  const defaultPhotos = [
    { src: "https://i.postimg.cc/DJdGr5RP/photo1.jpg", caption: "Sweet memory 1" },
    { src: "https://i.postimg.cc/Q9s9d1V9/photo2.jpg", caption: "Sweet memory 2" },
    { src: "https://i.postimg.cc/Zv5Wrm8J/photo3.jpg", caption: "Sweet memory 3" },
    { src: "https://i.postimg.cc/hXkQNHB0/photo4.jpg", caption: "Sweet memory 4" },
    { src: "https://i.postimg.cc/PCp83dBx/photo5.jpg", caption: "Sweet memory 5" },
    { src: "https://i.postimg.cc/rKp441j5/photo6.jpg", caption: "Sweet memory 6" },
    { src: "https://i.postimg.cc/Rqdfqs7M/photo7.jpg", caption: "Sweet memory 7" },
    { src: "https://i.postimg.cc/14mVxGLb/photo8.jpg", caption: "Sweet memory 8" },
    { src: "https://i.postimg.cc/6y1vf8bg/photo9.jpg", caption: "Sweet memory 9" },
    { src: "https://i.postimg.cc/R3wJmXCx/photo10.jpg", caption: "Sweet memory 10" },
    { src: "https://i.postimg.cc/gXDwXj6M/photo11.jpg", caption: "Sweet memory 11" },
  ];

  useEffect(() => {
    if (photos.length === 0) setPhotos(defaultPhotos);
  }, []);

  return (
    <div className={`min-h-screen font-sans ${themes.romantic}`}>
      <header className={`sticky top-0 z-10 p-4 text-center ${headerThemes.romantic}`}>
        <h1 className="text-4xl font-bold mb-2">💖 Our Love Scrapbook 💖</h1>
      </header>

      <ScrapbookSection title="Click My Heart!">
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-8xl p-4"
            onClick={toggleHeartAnimation}
          >
            ❤️
          </motion.button>
          <AnimatePresence>
            {isMessageVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 p-6 rounded-2xl shadow-lg text-center"
              >
                <p className="text-2xl font-semibold text-pink-600">
                  I love you! You make my heart flutter every day. ❤️
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrapbookSection>

      <ScrapbookSection title="📸 Memories Gallery">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.src + index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-xl shadow-md ${cardThemes.romantic}`}
            >
              <img src={photo.src} alt={photo.caption} className="w-full h-48 object-cover rounded-lg mb-2" />
              <p className="text-center italic">{photo.caption}</p>
            </motion.div>
          ))}
        </div>
      </ScrapbookSection>

      <ScrapbookSection title="🎶 Background Music">
        <audio src="https://li.sten.to/k0mpywpq" controls className="mt-4 w-full"></audio>
      </ScrapbookSection>
    </div>
  );
};

export default App;
