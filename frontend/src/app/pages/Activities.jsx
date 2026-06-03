import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoaderIcon } from "lucide-react";
import { Footer } from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import UserReviewCard from "../components/UserReviewCard.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";
import api from "../lib/axios.js";

// Page Load Animation Blueprints
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
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

const Activities = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    let timeoutId;

    const fetchReviews = async () => {
      if (!user) return;
      const startTime = Date.now();
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/reviews");
        const json = response.data;

        if (response.status === 200) {
          // Filter reviews for the logged-in user
          const userReviews = json.filter(
            (review) => review.TouristID === user.TouristID,
          );
          setReviews(userReviews);
        }
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error("Error fetching reviews:", err);
      } finally {
        const remaining = Math.max(0, 500 - (Date.now() - startTime));
        timeoutId = window.setTimeout(() => setLoading(false), remaining);
      }
    };

    fetchReviews();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [user]);

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter((review) => review.ReviewID !== reviewId));
  };

  const handleEdit = (review) => {
    // TODO: Open edit modal or navigate to edit page
    console.log("Edit review:", review);
    alert("Edit functionality coming soon");
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <span className="loading loading-dots loading-xl text-success"></span>{" "}
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen text-gray-800">
      <Navbar />

      {/* ── Hero Section ── */}
      <section id="hero">
        <div className="relative w-full h-[70vh] min-h-95 flex flex-col justify-center items-center overflow-hidden bg-black">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1462557881996-79ed8f9ca4c5?q=80&w=1170&auto=format&fit=crop"
            alt="Tourist Spots Banner"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          <div className="absolute inset-0 bg-black/50 z-10" />

          {/* Staggered Heading Elements */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-20 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center text-white"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-wide drop-shadow-md"
            >
              Activities
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="w-100 h-px bg-[#16A34A]/60 my-5 md:my-6"
            />

            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-sm md:text-base font-light tracking-wide max-w-2xl leading-relaxed"
            >
              Track and manage your feedback. Here you can view, edit, or delete
              reviews from your past activities and trips.
            </motion.p>

            {/* Breadcrumb Navigation */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-2 text-xs md:text-sm font-sans tracking-widest uppercase text-gray-300 mt-10"
            >
              <a
                href="/"
                className="hover:text-white transition-colors duration-200 tracking-widest"
              >
                Home
              </a>
              <span className="text-gray-500 font-light text-xs">&gt;</span>
              <span className="text-white font-medium tracking-widest">
                Activities
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content Body ── */}
      <div className="min-h-[50vh] bg-[#FAF9F6] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#1C2421] mb-2">
              My Reviews
            </h1>
            <p className="text-gray-600">All reviews you've submitted</p>
          </div>

          {/* Dynamic Content Transitions */}
          {!user ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Please log in to view your reviews
              </p>
            </div>
          ) : loading ? (
            <div className="min-h-50 flex flex-col items-center justify-center gap-3">
              <span className="text-gray-500 tracking-wide">
                Loading your reviews...
              </span>
              <LoaderIcon className="animate-spin size-6 text-[#16A34A]" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                You haven't submitted any reviews yet
              </p>
            </div>
          ) : (
            /* Staggered User Review Cards Layout */
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {reviews.map((review) => (
                <motion.div key={review.ReviewID} variants={fadeInUp}>
                  <UserReviewCard
                    review={review}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Activities;
