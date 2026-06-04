import { useState, useEffect } from "react";
import { useParams } from "react-router"; 
import { LoaderIcon, NotebookPen, MapPin, ChevronDown, ChevronUp, Ticket, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../lib/axios.js";
import ActivityCard from "../components/ActivityCard.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import ReviewFormCard from "../components/ReviewFormCard.jsx";
import { Footer } from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

const REVIEWS_PREVIEW = 3;

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
    transition: { staggerChildren: 0.12 },
  },
};

const TouristSpotDetails = () => {
  const [touristSpot, setTouristSpot]       = useState(null);
  const [activities, setActivities]         = useState([]);
  const [reviews, setReviews]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false); 

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    let timeoutId;

    const fetchAll = async () => {
      const startTime = Date.now();
      try {
        const [spotRes, activitiesRes, reviewsRes] = await Promise.all([
          api.get(`/spots/${id}`),
          api.get(`/activities/spot/${id}`),
          api.get(`/reviews/spot/${id}`),
        ]);
        setTouristSpot(spotRes.data);
        setActivities(activitiesRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Error fetching tourist spot details:", error);
      } finally {
        const remaining = Math.max(0, 500 - (Date.now() - startTime));
        timeoutId = window.setTimeout(() => setLoading(false), remaining);
      }
    };

    fetchAll();
    return () => clearTimeout(timeoutId);
  }, [id]);

  const handleReviewSubmitted = async () => {
    try {
      const res = await api.get(`/reviews/spot/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error refreshing reviews:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <span className="loading loading-dots loading-xl text-success"></span>
      </div>
    );
  }

  if (!touristSpot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Tourist spot not found.</p>
      </div>
    );
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, REVIEWS_PREVIEW);
  const hasMoreReviews   = reviews.length > REVIEWS_PREVIEW;
  const isFree           = parseFloat(touristSpot.EntranceFee) === 0;

  // ── Calculate Average Rating Live ──
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + parseFloat(r.Rating || r.rating || 0), 0) / totalReviews).toFixed(1)
    : null;

  return (
    <div className="overflow-x-hidden min-h-screen text-gray-800">
      <Navbar />

      <div className="h-20 w-full bg-black" />

      <div className="max-w-7xl mx-auto px-4 py-5">

        {/* ── Hero ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-8"
        >
          <motion.figure variants={fadeInUp}>
            <img
              src={touristSpot.ImageURL}
              alt={touristSpot.Name}
              className="w-300 h-100 object-cover rounded-2xl shadow-md"
            />
          </motion.figure>

          <div className="flex flex-col justify-center gap-4 lg:w-1/2">
            <motion.div variants={fadeInUp}>
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="text-5xl font-bold tracking-tight">{touristSpot.Name}</h1>
                
                {/* Live Rating Indicator Badge */}
                {averageRating && (
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-md text-sm font-semibold shadow-sm">
                    <Star className="size-4 fill-amber-500 text-amber-500" />
                    <span>{averageRating}</span>
                    <span className="text-gray-400 font-normal text-xs">({totalReviews})</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                <MapPin className="size-4 text-[#16A34A]" />
                <span>{touristSpot.Address}</span>
              </div>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-gray-600 text-sm leading-relaxed">
              {touristSpot.Description}
            </motion.p>

            {/* ── Entrance Fee Badge ── */}
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
                isFree
                  ? "bg-[#006c46]/10 border-[#006c46]/30 text-[#006c46]"
                  : "bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]"
              }`}>
                <Ticket className="size-4" />
                {isFree
                  ? "Free Admission"
                  : `Entrance Fee: ₱${parseFloat(touristSpot.EntranceFee).toFixed(2)}`
                }
              </div>
            </motion.div>

            {/* ── Destination Actions ── */}
            <motion.div variants={fadeInUp} className="border border-gray-200 rounded-xl p-5 shadow-sm h-50 flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-3">Destination Actions</h2>
              <button
                className="font-medium text-[#006c46] border-[#006c46] border-2 w-full flex items-center gap-2 justify-center rounded-lg py-2 my-2 hover:bg-[#006c46] hover:text-white transition-colors cursor-pointer"
                onClick={() => setShowReviewForm(true)}
              >
                <NotebookPen className="size-4" />
                Review Now
              </button>
              <p className="text-gray-500 text-xs mt-3">
                Share your journey with the TerraVibe community. Your reviews
                help fellow explorers discover {touristSpot.Name}!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Experience + Activities + Map ── */}
        <div className="mt-15 flex flex-col lg:flex-row gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex-1"
          >
            <motion.section variants={fadeInUp} className="mt-5">
              <h2 className="text-3xl font-light mb-4">About the Experience</h2>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed w-full">
                {touristSpot.Experience}
              </p>
            </motion.section>

            {activities.length > 0 && (
              <motion.section variants={fadeInUp} className="mt-10">
                <h2 className="text-3xl font-light mb-4">Destination Activities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
                  {activities.map((activity) => (
                    <ActivityCard key={activity.ActivityID} activity={activity} />
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-5 self-start"
          >
            <iframe
              src={touristSpot.EmbedMapURL}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full lg:w-130 h-150 border border-gray-200 shadow-sm rounded-xl"
              title={`Map of ${touristSpot.Name}`}
            />
          </motion.section>
        </div>

        {/* ── Reviews ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mt-20"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-1">
            <h2 className="text-3xl font-semibold">Traveler Reviews</h2>
            <p className="text-gray-600 text-md">
              See what our community has to say about this experience.
            </p>
          </motion.div>

          {reviews.length > 0 && (
            <div className="mt-6">
              {/* Review Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                  {displayedReviews.map((review, idx) => (
                    <motion.div 
                      key={review.ReviewID} 
                      variants={fadeInUp} 
                      custom={idx}
                      initial="hidden"
                      animate="visible"
                    >
                      <ReviewCard review={review} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Show More / Show Less Button Container */}
              {hasMoreReviews && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="flex items-center gap-2 px-6 py-2 border-2 border-[#006c46] text-[#006c46] font-medium rounded-full hover:bg-[#006c46] hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    {showAllReviews ? (
                      <>
                        Show Less <ChevronUp className="size-4" />
                      </>
                    ) : (
                      <>
                        Show More ({reviews.length - REVIEWS_PREVIEW} more){" "}
                        <ChevronDown className="size-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>

      </div>

      <Footer />

      <AnimatePresence>
        {showReviewForm && (
          <ReviewFormCard
            spotId={id}
            spotName={touristSpot.Name}
            onClose={() => setShowReviewForm(false)}
            onReviewSubmitted={handleReviewSubmitted}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TouristSpotDetails;