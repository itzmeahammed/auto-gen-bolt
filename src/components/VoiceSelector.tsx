import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Play, Pause, Users } from 'lucide-react';

const VoiceSelector = () => {
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [playingVoice, setPlayingVoice] = useState<number | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: number]: HTMLAudioElement }>({});

  const voices = [
    {
      id: 0,
      name: 'Sophia',
      gender: 'Female',
      language: 'English (US)',
      accent: 'Professional',
      avatar: '👩‍💼',
      color: 'from-pink-500 to-violet-500',
      description: 'Warm and professional voice perfect for business content',
      sampleText: 'Hello, I\'m Sophia. I specialize in professional business content with a warm, engaging tone.',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Demo audio
    },
    {
      id: 1,
      name: 'Marcus',
      gender: 'Male',
      language: 'English (UK)',
      accent: 'British',
      avatar: '👨‍🎤',
      color: 'from-blue-500 to-cyan-500',
      description: 'Authoritative British accent ideal for educational content',
      sampleText: 'Good day, I\'m Marcus. My British accent brings authority and clarity to educational content.',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Demo audio
    },
    {
      id: 2,
      name: 'Elena',
      gender: 'Female',
      language: 'English (US)',
      accent: 'Storyteller',
      avatar: '👩‍🏫',
      color: 'from-emerald-500 to-teal-500',
      description: 'Engaging storyteller voice great for narratives',
      sampleText: 'Hi there, I\'m Elena. I love bringing stories to life with engaging narration and emotion.',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Demo audio
    },
    {
      id: 3,
      name: 'David',
      gender: 'Male',
      language: 'English (US)',
      accent: 'Conversational',
      avatar: '👨‍💻',
      color: 'from-orange-500 to-red-500',
      description: 'Friendly conversational tone perfect for casual podcasts',
      sampleText: 'Hey, I\'m David. I keep things casual and friendly, perfect for conversational podcasts.',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Demo audio
    },
    {
      id: 4,
      name: 'Aria',
      gender: 'Female',
      language: 'English (AU)',
      accent: 'Australian',
      avatar: '👩‍🔬',
      color: 'from-purple-500 to-pink-500',
      description: 'Clear Australian accent with scientific precision',
      sampleText: 'G\'day, I\'m Aria. My Australian accent brings clarity and precision to scientific content.',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Demo audio
    }
  ];

  // Create audio elements for each voice
  React.useEffect(() => {
    const newAudioElements: { [key: number]: HTMLAudioElement } = {};
    voices.forEach(voice => {
      const audio = new Audio();
      // For demo purposes, we'll use text-to-speech API or create synthetic audio
      // In production, you would use actual voice samples
      audio.src = voice.audioUrl;
      audio.preload = 'metadata';
      newAudioElements[voice.id] = audio;
    });
    setAudioElements(newAudioElements);

    // Cleanup function
    return () => {
      Object.values(newAudioElements).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Create synthetic speech for demo
  const createSyntheticSpeech = (text: string, voiceIndex: number) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      
      // Try to match voice characteristics
      if (voices.length > 0) {
        switch (voiceIndex) {
          case 0: // Sophia - Female US
            utterance.voice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha')) || voices[0];
            utterance.pitch = 1.1;
            utterance.rate = 0.9;
            break;
          case 1: // Marcus - Male UK
            utterance.voice = voices.find(v => v.lang.includes('en-GB') || v.name.includes('Daniel')) || voices[1];
            utterance.pitch = 0.8;
            utterance.rate = 0.85;
            break;
          case 2: // Elena - Female US Storyteller
            utterance.voice = voices.find(v => v.name.includes('Female') || v.name.includes('Victoria')) || voices[0];
            utterance.pitch = 1.2;
            utterance.rate = 0.8;
            break;
          case 3: // David - Male US Casual
            utterance.voice = voices.find(v => v.name.includes('Male') || v.name.includes('Alex')) || voices[1];
            utterance.pitch = 0.9;
            utterance.rate = 1.0;
            break;
          case 4: // Aria - Female AU
            utterance.voice = voices.find(v => v.lang.includes('en-AU') || v.name.includes('Karen')) || voices[0];
            utterance.pitch = 1.0;
            utterance.rate = 0.95;
            break;
          default:
            utterance.voice = voices[0];
        }
      }
      
      return utterance;
    }
    return null;
  };
  const handlePlayPreview = (voiceId: number) => {
    if (playingVoice === voiceId) {
      // Stop current playback
      speechSynthesis.cancel();
      setPlayingVoice(null);
    } else {
      // Stop any current playback
      speechSynthesis.cancel();
      setPlayingVoice(voiceId);
      
      // Create and play synthetic speech
      const voice = voices.find(v => v.id === voiceId);
      if (voice) {
        const utterance = createSyntheticSpeech(voice.sampleText, voiceId);
        if (utterance) {
          utterance.onend = () => setPlayingVoice(null);
          utterance.onerror = () => setPlayingVoice(null);
          speechSynthesis.speak(utterance);
        }
      }
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
            <Users className="w-7 h-7 text-violet-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Choose Your AI Voice
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Select from our collection of lifelike AI voices, each with unique personalities and accents
          </p>
        </motion.div>

        {/* Voice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {voices.map((voice, index) => (
            <motion.div
              key={voice.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedVoice(voice.id)}
              className={`relative cursor-pointer group ${
                selectedVoice === voice.id ? 'z-20' : 'z-10'
              }`}
            >
              {/* Card Container */}
              <div className={`relative bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border transition-all duration-300 ${
                selectedVoice === voice.id 
                  ? 'border-violet-500/50 shadow-2xl shadow-violet-500/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}>
                
                {/* Selection Glow */}
                {selectedVoice === voice.id && (
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-violet-500/30 to-emerald-500/30 rounded-2xl blur"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="relative">
                  {/* Avatar */}
                  <div className="flex justify-center mb-4">
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-r ${voice.color} rounded-2xl flex items-center justify-center text-3xl relative overflow-hidden`}
                      whileHover={{ scale: 1.1 }}
                      animate={selectedVoice === voice.id ? { 
                        boxShadow: ["0 0 20px rgba(124, 58, 237, 0.3)", "0 0 40px rgba(124, 58, 237, 0.6)", "0 0 20px rgba(124, 58, 237, 0.3)"]
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {voice.avatar}
                      
                      {/* Sound Wave Animation */}
                      {playingVoice === voice.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-white/80 rounded-full mx-0.5"
                              animate={{
                                height: [4, 16, 4],
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
                    </motion.div>
                  </div>

                  {/* Voice Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {voice.name}
                    </h3>
                    <div className="text-sm text-slate-400 space-y-1">
                      <div>{voice.gender} • {voice.accent}</div>
                      <div>{voice.language}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 text-center mb-4 leading-relaxed">
                    {voice.description}
                  </p>

                  {/* Preview Button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPreview(voice.id);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center justify-center py-2 px-4 border rounded-xl transition-all duration-300 text-sm font-medium ${
                      playingVoice === voice.id 
                        ? 'bg-violet-600/30 border-violet-500/50 text-violet-200' 
                        : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30 text-white'
                    }`}
                  >
                    {playingVoice === voice.id ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Stop Preview
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play Sample
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Voice Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${voices[selectedVoice].color} rounded-xl flex items-center justify-center text-xl`}>
              {voices[selectedVoice].avatar}
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-1">
                Selected: {voices[selectedVoice].name}
              </h4>
              <p className="text-sm text-slate-400">
                {voices[selectedVoice].description}
              </p>
            </div>
            <Volume2 className="w-6 h-6 text-emerald-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceSelector;