import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {/* Outer Rotating Gradient Ring */}
      <motion.div
        className="absolute w-32 h-32 rounded-full border-4 border-t-4 border-t-transparent border-r-emerald-500 border-b-teal-400 border-l-green-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle Pulsing Ring */}
      <motion.div
        className="absolute w-24 h-24 rounded-full border-4 border-t-4 border-t-transparent border-r-teal-400 border-b-green-500 border-l-emerald-500"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Glowing Circle */}
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/50"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particle Effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-emerald-400 rounded-full"
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [
              0,
              Math.cos((i / 20) * 2 * Math.PI) * 100,
              Math.cos((i / 20) * 2 * Math.PI) * 200,
            ],
            y: [
              0,
              Math.sin((i / 20) * 2 * Math.PI) * 100,
              Math.sin((i / 20) * 2 * Math.PI) * 200,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
