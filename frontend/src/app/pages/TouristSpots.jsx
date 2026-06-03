import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { motion } from "framer-motion";

import TouristSpotCard from "../components/TouristSpotCard";
import { Footer } from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.7, ease: [0.16, 1, 0.3, 1] } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const TouristSpots = () => {
  const [touristSpots, setTouristSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    const fetchTouristSpots = async () => {
      const startTime = Date.now();
      try {
        const res = await axios.get("http://localhost:8080/api/spots/");
        console.log(res.data);
        setTouristSpots(res.data);
      } catch (error) {
        console.error("Error fetching tourist spots data:", error);
      } finally {
        const remaining = Math.max(0, 500 - (Date.now() - startTime));
        timeoutId = window.setTimeout(() => setLoading(false), remaining);
      }
    };

    fetchTouristSpots();
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <span className="loading loading-dots loading-xl text-success"></span>{" "}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      <div>
        <Navbar />

        {/* ── Hero Section ── */}
        <section id="hero">
          <div className="relative w-full h-[70vh] min-h-95 flex flex-col justify-center items-center overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src="https://images.unsplash.com/photo-1565340076637-825894a74ca6?q=80&w=764&auto=format&fit=crop"
              alt="Tourist Spots Banner"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Hero Text Animations */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-20 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center text-white"
            >
              <motion.h1 variants={fadeInUp} className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-wide drop-shadow-md">
                Tourist Spots
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="w-100 h-px bg-[#16A34A]/60 my-5 md:my-6" />

              <motion.p variants={fadeInUp} className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-2xl leading-relaxed">
                Indulge in the ultimate blend of adventure and culture across
                our meticulously curated destinations. Choose your next journey
                today.
              </motion.p>

              {/* Breadcrumb Navigation */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2 text-xs md:text-sm font-sans tracking-widest uppercase text-gray-300 mt-10">
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200 tracking-widest"
                >
                  Home
                </a>
                <span className="text-gray-500 font-light text-xs">&gt;</span>
                <span className="text-white font-medium tracking-widest">Destinations</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Tourist Spots Grid ── */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6 place-items-center max-w-7xl mx-auto px-6 mt-32 mb-16"
        >
          {touristSpots.map((spot) => (
            <motion.div 
              key={spot.id || spot._id || spot.DestinationID} 
              variants={fadeInUp}
              className="w-full flex justify-center"
            >
              <TouristSpotCard spot={spot} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TouristSpots;