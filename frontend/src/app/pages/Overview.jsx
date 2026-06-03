import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { LoaderIcon, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import FeaturedActivityCard, {
  FEATURED_ACTIVITIES,
} from "../components/FeaturedActivityCards";
import TouristSpotCard from "../components/TouristSpotCard";

const heroSlideImages = [
  "https://images.unsplash.com/photo-1632307918787-8cb52566dd35?q=80&w=1025&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1738878791938-5028c9713edc?q=80&w=1170&auto=format&fit=crop",
];

// Animation Variants for Page Load
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const lineExtend = {
  hidden: { height: 0 },
  visible: {
    height: "100%",
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const SpotCard = ({ spot }) => {
  if (!spot) {
    return (
      <div className="aspect-3/4 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
        No data found
      </div>
    );
  }

  return (
    <a
      href={`/tourist-spots/${spot.DestinationID}`}
      className="arch-top shadow-xl relative aspect-3/4 group block overflow-hidden cursor-pointer"
    >
      {spot.ImageURL ? (
        <img
          src={spot.ImageURL}
          alt={spot.Name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
          No image available
        </div>
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 text-white z-20">
        <div className="text-[10px] tracking-widest uppercase text-[#16A34A] font-bold mb-1">
          View Destination
        </div>
        <div className="text-sm md:text-base tracking-wider uppercase font-light truncate">
          {spot.Name}
        </div>
      </div>
    </a>
  );
};

const Overview = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [touristSpots, setTouristSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tourist spots
  useEffect(() => {
    let timeoutId;
    const fetchTouristSpots = async () => {
      const startTime = Date.now();
      try {
        const res = await axios.get("http://localhost:8080/api/spots/");
        setTouristSpots(res.data);
      } catch (error) {
        console.error("Error fetching tourist spots:", error);
      } finally {
        const remaining = Math.max(0, 500 - (Date.now() - startTime));
        timeoutId = window.setTimeout(() => setLoading(false), remaining);
      }
    };
    fetchTouristSpots();
    return () => clearTimeout(timeoutId);
  }, []);

  // Preload hero images
  useEffect(() => {
    heroSlideImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === heroSlideImages.length ? 1 : prev + 1,
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <span className="loading loading-dots loading-xl text-success"></span>{" "}
      </div>
    );
  }

  const spotOne = touristSpots.find((s) => s.DestinationID === 9);
  const spotTwo = touristSpots.find((s) => s.DestinationID === 8);

  // Get first 3 tourist spots to showcase
  const previewSpots = touristSpots.slice(0, 3);

  return (
    <div className="relative min-h-screen text-gray-800 overflow-x-hidden">
      {/* Background Decorative Lines Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-6xl mx-auto px-6 w-full flex justify-between">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={lineExtend}
          className="w-px bg-[#16A34A]/30"
        />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={lineExtend}
          className="w-px bg-[#16A34A]/30"
        />
      </div>

      <Navbar />

      {/* ── Hero Carousel ── */}
      <header
        id="hero"
        className="relative h-[105vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={activeSlide}
              src={heroSlideImages[activeSlide - 1]}
              alt="Majestic landscape backdrop"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Hero Text Reveal Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-light tracking-wide leading-tight md:leading-[1.15] mt-15 mb-6 max-w-6xl"
          >
            Discover the City of{" "}
            <span className="block mt-2 font-semibold text-[#F2EFE9] tracking-widest uppercase text-3xl md:text-6xl">
              Majestic Waterfalls
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base font-light text-[#E5E5E5]/90 max-w-2xl mb-10 leading-relaxed tracking-wider mt-3"
          >
            Uncover the wonders of Iligan City with IliGuide. Navigate hidden
            ravines, icy volcanic spring channels, and dramatic geological
            formations curated by real traveler footprints.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <a
              href="#destinations"
              className="bg-[#FAF9F6] hover:bg-[#006c46] text-black hover:text-white px-10 py-4 tracking-widest text-[11px] uppercase transition-all duration-300 font-medium shadow-lg cursor-pointer block hover:scale-105"
            >
              Explore Now
            </a>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 left-0 w-full z-20 px-12 flex items-center justify-between text-white text-xs tracking-widest">
          <div className="flex items-center gap-4 max-w-xs">
            <button
              onClick={() => setActiveSlide(1)}
              className={`transition-colors cursor-pointer ${activeSlide === 1 ? "text-white font-bold" : "text-white/40"}`}
            >
              01
            </button>
            <div className="w-20 h-px bg-white/20 relative">
              <div
                className="absolute top-0 left-0 h-full bg-white transition-all duration-500"
                style={{ width: activeSlide === 1 ? "10%" : "100%" }}
              />
            </div>
            <button
              onClick={() => setActiveSlide(2)}
              className={`transition-colors cursor-pointer ${activeSlide === 2 ? "text-white font-bold" : "text-white/40"}`}
            >
              02
            </button>
          </div>
          <div className="hidden lg:block text-white/50 text-[10px]">
            SCROLL TO COMMENCE EXPLORATION ↓
          </div>
        </div>
      </header>

      <section className="relative z-10 w-full">
        <div className="bg-[#141A17] h-20">
          <div></div>
        </div>
      </section>

      {/* ── Main Layout Wrapper ── */}
      <main id="destinations" className="relative z-10 mt-15 w-full">
        {/* Section: Welcome & Featured Activities (Bound to center template layout constraints) */}
        <section id="about" className="max-w-7xl mx-auto px-6 mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
          >
            <motion.div variants={fadeInUp} className="space-y-6 lg:ml-20">
              <h5 className="text-[#16A34A] text-xs tracking-[0.3em] font-bold">
                WELCOME TO ILIGUIDE
              </h5>
              <h2 className="text-4xl md:text-5xl font-light leading-snug text-[#1C2421]">
                Unfiltered Perspectives and Unmatched Spots
              </h2>
              <p className="text-gray-600 leading-relaxed font-light text-sm md:text-base tracking-wide pt-2">
                By weaving together raw, community-driven insights with a
                passion for hidden landscapes, IliGuide builds a sanctuary for
                conscious adventurers. We map the path less traveled through
                verified real-world reviews, guiding you directly to the
                authentic soul of majestic valleys, untouchable trails, and
                local wonders.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <SpotCard spot={spotOne} />
              </div>
              <div className="pt-12">
                <SpotCard spot={spotTwo} />
              </div>
            </motion.div>
          </motion.div>

          {/* Featured Activities Grid */}
          <div className="space-y-8 pt-10 border-t border-gray-100">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {FEATURED_ACTIVITIES.map((activity) => (
                <motion.div key={activity.title} variants={fadeInUp}>
                  <FeaturedActivityCard {...activity} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Context-Correct Sub-Hero (Pulled out into 100% full screen width view) ── */}
        <section
          id="sub-hero"
          className="w-full relative left-0 right-0 overflow-hidden"
        >
          <div
            className="relative w-full h-[80vh] min-h-95 flex flex-col justify-center items-center bg-black bg-cover bg-center"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1494676051766-7a7454d53904?q=80&w=1173&auto=format&fit=crop")`,
              backgroundAttachment: "fixed", // <-- Locks the image in place while scrolling
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/55 z-10" />

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="relative z-20 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center text-white"
            >
              <motion.h5
                variants={fadeInUp}
                className="text-[#16A34A] text-xs tracking-[0.4em] font-bold uppercase mb-3"
              >
                Seek Adventure
              </motion.h5>

              <motion.h2
                variants={fadeInUp}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-wide drop-shadow-md leading-tight max-w-3xl"
              >
                Embrace the Great Outdoors
              </motion.h2>

              <motion.div
                variants={fadeInUp}
                className="w-24 h-px bg-[#16A34A]/80 my-6"
              />

              <motion.p
                variants={fadeInUp}
                className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-2xl leading-relaxed"
              >
                From pristine mountain peaks to crashing hidden cascades, read
                unbiased reviews from a global community of travelers. Find your
                path, respect the wild, and make every escape memorable.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section
          id="spots-preview"
          className="max-w-7xl mx-auto px-6 mt-30 pb-24"
        >
          <div className="flex mx-20 flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h5 className="text-[#16A34A] text-xs tracking-[0.3em] font-bold uppercase mb-2">
                Explore Destinations
              </h5>
              <h2 className="text-3xl md:text-4xl font-light text-[#1C2421] tracking-wide">
                Featured Tourist Spots
              </h2>
            </div>

            <a
              href="/tourist-spots"
              className="group flex items-center gap-2 text-sm font-medium text-[#006c46] hover:text-[#16A34A] transition-colors duration-200"
            >
              See More Destinations
              <ArrowRight className="size-4 transform group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-6 place-items-center"
          >
            {previewSpots.map((spot) => (
              <motion.div
                key={spot.id || spot._id || spot.DestinationID}
                variants={fadeInUp}
                className="w-full flex justify-center"
              >
                <TouristSpotCard spot={spot} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Overview;
