import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap } from 'lucide-react';

const BlogInput = () => {
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  
  const sampleBlogs = [
    {
      title: "The Future of AI in Content Creation",
      content: `Artificial Intelligence is revolutionizing how we create and consume content. From automated writing assistants to AI-powered video generation, the landscape of digital content is evolving at an unprecedented pace.

The integration of AI tools like GPT models, image generators, and voice synthesis technologies is enabling creators to produce high-quality content faster than ever before. This transformation isn't just about efficiency – it's about democratizing content creation and making professional-grade tools accessible to everyone.

As we look toward the future, AI will continue to blur the lines between human and machine creativity, opening up new possibilities for storytelling, education, and communication. The key is learning to work alongside these tools rather than being replaced by them.

Content creators who embrace AI today will be the pioneers of tomorrow's digital landscape. The question isn't whether AI will change content creation – it's how quickly we can adapt and leverage these powerful new capabilities.`,
      category: "Technology"
    },
    {
      title: "Building Sustainable Habits for Success",
      content: `Success isn't built overnight – it's the result of consistent, sustainable habits practiced day after day. The most successful people understand that small, incremental changes compound over time to create extraordinary results.

The key to building lasting habits lies in starting small and focusing on consistency rather than intensity. Whether you're trying to exercise more, read daily, or develop a new skill, the secret is to make the habit so easy that you can't say no.

Research shows that it takes an average of 66 days to form a new habit, but the timeline varies greatly depending on the complexity of the behavior and individual circumstances. The important thing is to focus on the process, not the outcome.

Remember, every expert was once a beginner. Every successful person started with a single step. Your future self will thank you for the habits you build today.`,
      category: "Self-Improvement"
    },
    {
      title: "The Art of Mindful Living in a Digital Age",
      content: `In our hyperconnected world, finding moments of peace and presence has become both more challenging and more essential than ever. Mindfulness isn't just a buzzword – it's a practical approach to navigating the complexities of modern life.

The constant stream of notifications, social media updates, and digital distractions can leave us feeling overwhelmed and disconnected from ourselves. Mindful living offers a path back to intentional awareness and genuine connection.

Simple practices like deep breathing, mindful eating, and digital detoxes can help us reclaim our attention and focus on what truly matters. It's not about rejecting technology, but rather using it more consciously and purposefully.

When we practice mindfulness, we create space between stimulus and response, allowing us to choose our reactions rather than being controlled by them. This simple shift can transform our relationships, work, and overall well-being.`,
      category: "Wellness"
    },
    {
      title: "Entrepreneurship in the Creator Economy",
      content: `The creator economy has fundamentally changed what it means to be an entrepreneur. Today's creators are building sustainable businesses around their passions, expertise, and authentic connections with their audiences.

Unlike traditional businesses that require significant upfront capital, creator businesses can start with nothing more than a smartphone and an internet connection. The barriers to entry have never been lower, but the competition has never been fiercer.

Successful creator entrepreneurs understand that building an audience is just the beginning. The real challenge lies in monetizing that audience while maintaining authenticity and providing genuine value. This requires a delicate balance of content creation, community building, and business acumen.

The future belongs to creators who can adapt quickly, embrace new platforms and technologies, and build direct relationships with their audiences. In the creator economy, your personal brand is your most valuable asset.`,
      category: "Business"
    }
  ];

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setContent(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const loadSampleBlog = (blog: typeof sampleBlogs[0]) => {
    setContent(blog.content);
    setWordCount(blog.content.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const clearContent = () => {
    setContent('');
    setWordCount(0);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const maxWords = 2000;
  const progress = (wordCount / maxWords) * 100;

  return (
    <section className="py-20 px-6 bg-slate-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 75% 75%, #10b981 0%, transparent 50%)`
        }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-r from-violet-600/20 to-emerald-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
            <FileText className="w-7 h-7 text-violet-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Paste Your Blog Content
          </h2>
          <p className="text-xl text-slate-400">
            Copy and paste your blog post, article, or any text content
          </p>
        </motion.div>

        {/* Sample Blogs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            Or try one of our sample blogs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleBlogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => loadSampleBlog(blog)}
                className="cursor-pointer bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-violet-500/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-center mb-3">
                  <BookOpen className="w-5 h-5 text-violet-400 mr-2" />
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">
                  {blog.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3">
                  {blog.content.substring(0, 120)}...
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {blog.content.split(' ').length} words
                  </span>
                  <Sparkles className="w-4 h-4 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glassmorphic Container */}
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20">
            {/* Animated Border Glow */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-emerald-500/20 to-violet-500/20 rounded-3xl blur opacity-60"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative">
              <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="Paste your blog content here... Start writing something amazing that will become an engaging podcast!"
                className="w-full h-64 md:h-80 bg-transparent text-white placeholder-slate-400 resize-none focus:outline-none text-lg leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, system-ui, sans-serif',
                  background: 'transparent'
                }}
              />
              
              {/* Word Counter */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ scale: wordCount > 0 ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <span className="text-slate-300 font-medium">
                      {wordCount} / {maxWords} words
                    </span>
                  </motion.div>
                </div>
                
                {/* Progress Bar */}
                <div className="flex-1 max-w-xs mx-8">
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <motion.div
                  animate={{ 
                    color: progress > 90 ? '#ef4444' : progress > 70 ? '#f59e0b' : '#10b981'
                  }}
                  className="text-sm font-medium"
                >
                  {progress > 100 ? 'Too long' : progress > 90 ? 'Almost full' : 'Perfect'}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-3 mt-8 justify-center"
        >
          {[
            { label: 'Clear All', icon: FileText, action: clearContent },
            { label: 'Copy Text', icon: Copy, action: copyToClipboard },
            { label: 'Word Count', icon: Zap, action: () => {} }
          ].map((item, index) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.action}
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl backdrop-blur-xl transition-all duration-300"
            >
              <item.icon className="w-4 h-4 inline mr-2" />
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogInput;