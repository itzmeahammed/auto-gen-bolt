import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Zap, Wand2, Download, Play, Pause, RotateCcw } from 'lucide-react';

const GenerateSection = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(272); // 4:32 in seconds
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Create audio element for the generated podcast
  React.useEffect(() => {
    // For demo purposes, we'll create a synthetic audio or use a sample
    const audio = new Audio();
    // In production, this would be the generated podcast URL
    audio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'; // Demo audio
    audio.preload = 'metadata';
    
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    
    setAudioElement(audio);
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [isComplete]);
  const handleGenerate = () => {
    setIsGenerating(true);
    setIsComplete(false);
    setProgress(0);
    setCurrentTime(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const togglePlayback = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
        setIsPlaying(false);
      } else {
        audioElement.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      audioElement.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 px-6 bg-slate-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
            <Wand2 className="w-7 h-7 text-violet-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Generate Your Podcast
          </h2>
          <p className="text-xl text-slate-400">
            Transform your blog into an engaging audio experience
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isGenerating && !isComplete && (
            <motion.div
              key="generate-button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.button
                onClick={handleGenerate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-violet-600 via-violet-700 to-emerald-600 rounded-3xl shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 backdrop-blur-xl border border-violet-500/30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-400 to-emerald-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                />
                <Headphones className="w-6 h-6 mr-4" />
                Generate Podcast
                <Zap className="w-6 h-6 ml-4" />
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-emerald-500 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"
                />
              </motion.button>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-violet-600/30 to-emerald-500/30 rounded-2xl backdrop-blur-xl border border-white/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Wand2 className="w-8 h-8 text-violet-400" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  Creating Your Podcast
                </h3>
                <p className="text-slate-400">
                  AI is processing your content and generating lifelike speech...
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Animated Soundwaves */}
              <div className="flex justify-center items-end space-x-1 mb-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-t from-violet-500 to-emerald-400 rounded-full"
                    style={{
                      width: 3,
                    }}
                    animate={{
                      height: [4, Math.random() * 40 + 10, 4],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: Math.random() * 1 + 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 0.5,
                    }}
                  />
                ))}
              </div>

              <div className="text-center text-sm text-slate-500">
                {progress < 30 && "Analyzing content structure..."}
                {progress >= 30 && progress < 60 && "Converting text to speech..."}
                {progress >= 60 && progress < 90 && "Adding natural pauses and intonation..."}
                {progress >= 90 && "Finalizing your podcast..."}
              </div>
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Success Message */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-emerald-500/20 to-violet-500/20 rounded-2xl backdrop-blur-xl border border-emerald-400/30"
                >
                  <Headphones className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Podcast Generated Successfully! 🎉
                </h3>
                <p className="text-slate-400">
                  Your blog has been transformed into a professional podcast
                </p>
              </div>

              {/* Audio Player */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Your Generated Podcast
                    </h4>
                    <p className="text-sm text-slate-400">
                      Duration: 4:32 • Voice: Sophia
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => handleGenerate()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300"
                      title="Regenerate"
                    >
                      <RotateCcw className="w-5 h-5 text-slate-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl transition-all duration-300"
                      title="Download MP3"
                    >
                      <Download className="w-5 h-5 text-emerald-400" />
                    </motion.button>
                  </div>
                </div>

                {/* Custom Audio Player */}
                <div className="space-y-6">
                  {/* Waveform Visualization */}
                  <div className="flex justify-center items-end space-x-1 h-24 px-4">
                    {[...Array(60)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-violet-500 to-emerald-400 rounded-full opacity-60"
                        style={{
                          width: 3,
                          height: Math.random() * 80 + 10,
                        }}
                        animate={isPlaying ? {
                          opacity: [0.3, 1, 0.3],
                          scaleY: [1, Math.random() * 0.5 + 0.5, 1],
                        } : {}}
                        transition={{
                          duration: Math.random() * 2 + 1,
                          repeat: isPlaying ? Infinity : 0,
                          ease: "easeInOut",
                          delay: Math.random() * 1,
                        }}
                      />
                    ))}
                  </div>

                  {/* Player Controls */}
                  <div className="flex items-center justify-center space-x-6">
                    <motion.button
                      onClick={togglePlayback}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="group relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-violet-600 to-emerald-600 rounded-full shadow-2xl shadow-violet-500/25"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-violet-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                      />
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-1" />
                      )}
                    </motion.button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div 
                      className="h-2 bg-slate-700/50 rounded-full overflow-hidden cursor-pointer"
                      onClick={handleSeek}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // In production, this would trigger actual download
                    const link = document.createElement('a');
                    link.href = audioElement?.src || '';
                    link.download = 'voicecast-podcast.mp3';
                    link.click();
                  }}
                  className="group relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 backdrop-blur-xl border border-emerald-500/30"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-violet-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  />
                  <Download className="w-5 h-5 mr-3" />
                  Download MP3
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-violet-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GenerateSection;