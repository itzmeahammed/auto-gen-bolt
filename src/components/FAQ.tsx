import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Volume2, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [speechUtterances, setSpeechUtterances] = useState<{ [key: number]: SpeechSynthesisUtterance }>({});

  const faqs = [
    {
      question: "How does VoiceCast work?",
      answer: "VoiceCast uses advanced AI technology from ElevenLabs to convert your written content into natural-sounding speech. Simply paste your blog content, select an AI voice, and generate your podcast in seconds.",
      audioText: "VoiceCast uses advanced AI technology to convert your written content into natural speech."
    },
    {
      question: "What types of content can I convert?",
      answer: "You can convert any text content including blog posts, articles, newsletters, stories, educational content, and more. The system works best with content between 100-2000 words.",
      audioText: "You can convert blog posts, articles, newsletters, and any text content up to 2000 words."
    },
    {
      question: "How realistic are the AI voices?",
      answer: "Our AI voices are powered by ElevenLabs' cutting-edge technology, providing incredibly lifelike speech with natural intonation, pauses, and emotional expression that's virtually indistinguishable from human voices.",
      audioText: "Our AI voices sound incredibly lifelike with natural speech patterns and emotional expression."
    },
    {
      question: "Can I customize the voice settings?",
      answer: "Yes! You can choose from various voice personas, adjust speaking speed, add emphasis to certain words, and even customize pauses and pronunciation for specific terms.",
      audioText: "Yes, you can customize voice personas, speaking speed, and pronunciation settings."
    },
    {
      question: "What formats can I download?",
      answer: "Generated podcasts can be downloaded as high-quality MP3 files, perfect for uploading to podcast platforms, embedding on websites, or sharing across social media channels.",
      audioText: "You can download high-quality MP3 files suitable for all podcast platforms and websites."
    },
    {
      question: "Is there a limit to how much I can convert?",
      answer: "Free accounts can convert up to 10,000 words per month. Premium plans offer unlimited conversions, priority processing, and access to premium voice models.",
      audioText: "Free accounts get 10,000 words monthly, while premium plans offer unlimited conversions."
    }
  ];

  // Initialize speech synthesis utterances
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      const utterances: { [key: number]: SpeechSynthesisUtterance } = {};
      faqs.forEach((faq, index) => {
        const utterance = new SpeechSynthesisUtterance(faq.answer);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        
        // Try to get a pleasant voice
        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
          const preferredVoice = voices.find(voice => 
            voice.name.includes('Female') || 
            voice.name.includes('Samantha') ||
            voice.name.includes('Victoria')
          ) || voices[0];
          utterance.voice = preferredVoice;
        }
        
        utterance.onend = () => setPlayingIndex(null);
        utterance.onerror = () => setPlayingIndex(null);
        
        utterances[index] = utterance;
      });
      setSpeechUtterances(utterances);
    }
  }, []);
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const playAudio = (index: number) => {
    if (playingIndex === index) {
      // Stop current speech
      speechSynthesis.cancel();
      setPlayingIndex(null);
    } else {
      // Stop any current speech
      speechSynthesis.cancel();
      setPlayingIndex(index);
      
      // Start new speech
      const utterance = speechUtterances[index];
      if (utterance) {
        speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-10 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-10 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 6,
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
            <HelpCircle className="w-7 h-7 text-violet-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-400">
            Everything you need to know about VoiceCast
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex items-center space-x-3">
                  {/* Voice Narration Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(index);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 border rounded-lg transition-all duration-300 relative ${
                      playingIndex === index 
                        ? 'bg-violet-600/40 border-violet-400/50' 
                        : 'bg-violet-600/20 hover:bg-violet-600/30 border-violet-500/30'
                    }`}
                    title="Listen to answer"
                  >
                    <Volume2 className="w-4 h-4 text-violet-400" />
                    
                    {/* Sound Wave Animation */}
                    {playingIndex === index && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-0.5 bg-violet-400 rounded-full mx-0.5"
                            animate={{
                              height: [2, 8, 2],
                              opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>

                  {/* Expand/Collapse Icon */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10 pt-4"
                      >
                        <p className="text-slate-300 leading-relaxed">
                          <motion.button
                            onClick={() => playAudio(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-violet-600/30 hover:bg-violet-600/40 border border-violet-500/40 rounded-lg"
                          >
                            {playingIndex === index ? (
                              <Pause className="w-4 h-4 text-violet-300" />
                            ) : (
                              <Play className="w-4 h-4 text-violet-300" />
                            )}
                          </motion.button>
                          {faq.answer}
                        </p>

                        {/* Audio Visualization */}
                        {playingIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 p-4 bg-violet-600/10 border border-violet-500/20 rounded-xl"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex space-x-1">
                                {[...Array(20)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-violet-500 to-emerald-400 rounded-full"
                                    animate={{
                                      height: [2, Math.random() * 16 + 4, 2],
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
                              <span className="text-sm text-violet-300">
                                Playing audio narration...
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-4">
            Still have questions? We're here to help!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 border border-violet-500/30 rounded-xl text-violet-300 font-medium backdrop-blur-xl hover:bg-gradient-to-r hover:from-violet-600/30 hover:to-emerald-500/30 transition-all duration-300"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;