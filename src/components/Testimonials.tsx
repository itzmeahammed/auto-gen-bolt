import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Content Creator',
      avatar: '👩‍💻',
      rating: 5,
      content: 'VoiceCast transformed my blog into engaging podcasts effortlessly. The AI voices are incredibly lifelike!',
      tags: ['Perfect for Bloggers', 'High Quality'],
      color: 'from-pink-500 to-violet-500'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Marketing Director',
      avatar: '👨‍💼',
      rating: 5,
      content: 'Our content reach increased by 300% after converting blogs to podcasts. Game-changing tool!',
      tags: ['SEO-Boosted Podcasts', 'Business Growth'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Educational Blogger',
      avatar: '👩‍🏫',
      rating: 5,
      content: 'Students love the podcast versions of my educational content. The voice quality is phenomenal.',
      tags: ['Educational Content', 'Student Favorite'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Tech Entrepreneur',
      avatar: '👨‍💻',
      rating: 5,
      content: 'Simple, fast, and professional results. VoiceCast is now essential in our content strategy.',
      tags: ['Tech Industry', 'Professional Results'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'Aria Thompson',
      role: 'Wellness Coach',
      avatar: '👩‍⚕️',
      rating: 5,
      content: 'My wellness tips reach more people through podcasts. The natural voice flow is incredible.',
      tags: ['Wellness Content', 'Natural Voice'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
            <Quote className="w-7 h-7 text-violet-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Loved by Content Creators
          </h2>
          <p className="text-xl text-slate-400">
            Join thousands who've transformed their content strategy
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 max-w-4xl mx-auto"
            >
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r ${testimonials[currentIndex].color} rounded-2xl text-3xl shadow-2xl`}
                  animate={{ 
                    boxShadow: ["0 0 20px rgba(124, 58, 237, 0.3)", "0 0 40px rgba(124, 58, 237, 0.6)", "0 0 20px rgba(124, 58, 237, 0.3)"]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {testimonials[currentIndex].avatar}
                </motion.div>

                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mx-1" />
                    </motion.div>
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-slate-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-3">
                  {testimonials[currentIndex].tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 border border-violet-500/30 rounded-full text-sm font-medium text-violet-300 backdrop-blur-xl"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full backdrop-blur-xl transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full backdrop-blur-xl transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-violet-500 to-emerald-500' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>

        {/* Mini Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              whileHover={{ y: -5 }}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer bg-white/5 backdrop-blur-xl rounded-2xl p-4 border transition-all duration-300 ${
                index === currentIndex 
                  ? 'border-violet-500/50 bg-white/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-xl flex items-center justify-center text-xl mb-3 mx-auto`}>
                {testimonial.avatar}
              </div>
              <div className="text-center">
                <h5 className="text-sm font-semibold text-white mb-1">
                  {testimonial.name}
                </h5>
                <p className="text-xs text-slate-400">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;