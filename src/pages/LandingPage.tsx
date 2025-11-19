import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowRight, Sparkles, Zap, Shield, Rocket, Users, TrendingUp, CheckCircle } from 'lucide-react';

// 3D Animated Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <meshPhongMaterial
        color="#9c8a63"
        emissive="#7a6f4f"
        shininess={100}
        wireframe={false}
      />
    </Sphere>
  );
}

// 3D Rotating Torus Component
function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.z += 0.002;
    }
  });

  return (
    <Torus ref={meshRef} args={[2, 0.4, 32, 100]} position={[0, 0, 0]}>
      <meshPhongMaterial
        color="#b8a896"
        emissive="#9c8a63"
        shininess={80}
      />
    </Torus>
  );
}

// 3D Floating Boxes Component
function FloatingBoxes() {
  const box1Ref = useRef<THREE.Mesh>(null);
  const box2Ref = useRef<THREE.Mesh>(null);
  const box3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (box1Ref.current) {
      box1Ref.current.rotation.x += 0.01;
      box1Ref.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.5;
    }
    if (box2Ref.current) {
      box2Ref.current.rotation.y += 0.015;
      box2Ref.current.position.x = Math.cos(clock.elapsedTime * 0.4) * 1;
    }
    if (box3Ref.current) {
      box3Ref.current.rotation.z += 0.012;
      box3Ref.current.position.z = Math.sin(clock.elapsedTime * 0.35) * 0.8;
    }
  });

  return (
    <>
      <Box ref={box1Ref} args={[0.6, 0.6, 0.6]} position={[-2, 1, 0]}>
        <meshPhongMaterial color="#c9bfb0" emissive="#9c8a63" />
      </Box>
      <Box ref={box2Ref} args={[0.5, 0.5, 0.5]} position={[2, -1, 0]}>
        <meshPhongMaterial color="#d7d3c4" emissive="#b8a896" />
      </Box>
      <Box ref={box3Ref} args={[0.7, 0.4, 0.7]} position={[0, 0, -2]}>
        <meshPhongMaterial color="#b5a07c" emissive="#9c8a63" />
      </Box>
    </>
  );
}

// 3D Scene Component
function Scene3D() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#9c8a63" />
      <pointLight position={[-10, -10, 10]} intensity={0.6} color="#b8a896" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#fafaf7"
      />

      {/* 3D Objects */}
      <AnimatedSphere />
      <AnimatedTorus />
      <FloatingBoxes />

      {/* Background */}
      <color attach="background" args={["#fafaf7"]} />
    </Canvas>
  );
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(156, 138, 99, 0.15)' }}
      className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-amber-200 transition-all duration-300 group"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <div className="text-amber-700">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Pricing Card Component
interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
  delay: number;
}

function PricingCard({ name, price, features, highlighted = false, delay }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-2xl transition-all duration-300 ${
        highlighted
          ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 shadow-lg'
          : 'bg-white border border-gray-200 hover:border-amber-200'
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">${price}</span>
        <span className="text-gray-600 ml-2">/month</span>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
          highlighted
            ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:shadow-lg hover:scale-105'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
}

// Stats Counter Component
function StatsCounter() {
  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50M+', label: 'Tasks Completed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">
            {stat.number}
          </div>
          <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Testimonial Component
interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  delay: number;
}

function Testimonial({ name, role, content, delay }: TestimonialProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="p-8 bg-white border border-gray-200 rounded-2xl hover:border-amber-200 transition-all"
    >
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400">★</span>
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{content}"</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </motion.div>
  );
}

// Main Landing Page Component
interface LandingPageProps {
  onGetStarted?: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TaskFlow Pro</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">
              Testimonials
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 text-gray-900 font-medium hover:text-amber-700 transition">
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-medium hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-700">
                Introducing TaskFlow Pro 2.0
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Tasks with
              <span className="bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
                {' '}AI Power
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the future of task management with intelligent automation, real-time collaboration, and stunning 3D visualization. Boost productivity by 300%.
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold flex items-center space-x-2 hover:shadow-lg transition-all"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex items-center space-x-8 pt-8 border-t border-gray-200"
            >
              <div>
                <p className="text-sm text-gray-600">Trusted by</p>
                <p className="text-lg font-semibold text-gray-900">500+ Companies</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rated</p>
                <p className="text-lg font-semibold text-gray-900">4.9/5 ⭐</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-full min-h-96 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl"
          >
            <Scene3D />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-10 w-20 h-20 bg-amber-100 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-20"
        />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of teams already using TaskFlow Pro
            </p>
          </motion.div>
          <StatsCounter />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage tasks efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Lightning Fast"
              description="Experience blazing-fast performance with our optimized infrastructure and real-time updates."
              delay={0}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Enterprise Security"
              description="Bank-level encryption and compliance with GDPR, SOC 2, and ISO 27001 standards."
              delay={0.1}
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Team Collaboration"
              description="Work together seamlessly with real-time updates, comments, and shared workspaces."
              delay={0.2}
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Advanced Analytics"
              description="Gain insights with comprehensive dashboards and detailed performance metrics."
              delay={0.3}
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="AI-Powered"
              description="Leverage artificial intelligence for smart task prioritization and automation."
              delay={0.4}
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="3D Visualization"
              description="Visualize your tasks in stunning 3D with interactive controls and animations."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              name="Starter"
              price="29"
              features={[
                'Up to 5 team members',
                '1,000 tasks per month',
                'Basic analytics',
                'Email support',
                'Mobile app access',
              ]}
              delay={0}
            />
            <PricingCard
              name="Professional"
              price="79"
              features={[
                'Up to 50 team members',
                'Unlimited tasks',
                'Advanced analytics',
                'Priority support',
                'API access',
                '3D visualization',
              ]}
              highlighted
              delay={0.1}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              features={[
                'Unlimited team members',
                'Unlimited tasks',
                'Custom integrations',
                '24/7 dedicated support',
                'Advanced security',
                'SLA guarantee',
              ]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              name="Sarah Johnson"
              role="CEO, Tech Startup"
              content="TaskFlow Pro has transformed how our team manages projects. The 3D visualization is incredible!"
              delay={0}
            />
            <Testimonial
              name="Mike Chen"
              role="Project Manager, Fortune 500"
              content="The AI-powered features have saved us countless hours. Highly recommended!"
              delay={0.1}
            />
            <Testimonial
              name="Emma Davis"
              role="Founder, Design Agency"
              content="Best task management tool we've used. The UI is beautiful and intuitive."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-amber-50 mb-8">
              Join thousands of teams already using TaskFlow Pro to manage their tasks efficiently.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-amber-700 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start Your Free Trial Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Follow</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 TaskFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
