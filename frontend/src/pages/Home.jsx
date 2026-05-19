import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import ButtonOne from "../components/ButtonOne"
import ButtonTwo from "../components/ButtonTwo"
import RestaurantCard from "../components/RestaurantCard"
import StepCard from "../components/StepCard"
import ReviewCard from "../components/ReviewCard"
import CommonCta from "../components/CommonCta"
import Icon from "../components/Icon"
import { useRestaurant } from "../hooks/useRestaurant"


/* ─── Section Heading ────────────────────────────────────────── */
const SectionHeading = ({ label, title }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "var(--accent-color)" }}>
      {label}
    </span>
    <h2 className="exo-2 text-3xl sm:text-5xl font-bold text-(--black-color)">{title}</h2>
  </div>
)


/* ─── Main Home Page ─────────────────────────────────────────── */
const HomePage = () => {
  const { listing: fetch_restaurants, reviews } = useRestaurant()
  const navigate = useNavigate()

  const [searchEat, setSearchEat] = useState("")
  const [searchState, setSearchState] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const restaurants = useMemo(() => fetch_restaurants?.restaurants ?? [], [fetch_restaurants?.restaurants]);

  const handleSearch = async () => {
    setIsSubmitted(true)
    const queryString = `eat/q=${encodeURIComponent(searchEat)}&q1=${encodeURIComponent(searchState)}&source=eat`;
    navigate(`/search/?${queryString}`)
    setIsSubmitted(false)

  }


  // const reviews = [
  //   { author: "Sarah M.", restaurant: "The Flame House", rating: 5, text: "Absolutely incredible ribs. Found this gem through Rank Eats and it's now my go-to spot every weekend. The ranking system really works!", avatar: "SM" },
  //   { author: "James K.", restaurant: "Sakura Garden", rating: 5, text: "Rank Eats helped me discover restaurants I never would have found otherwise. The reviews are genuine and the ranking is trustworthy.", avatar: "JK" },
  //   { author: "Priya N.", restaurant: "Spice Route", rating: 4, text: "Love that I can vote for my favorite places. The community here really knows their food. Found three new favorites this month alone.", avatar: "PN" },
  //   { author: "Sarah M.", restaurant: "The Flame House", rating: 5, text: "Absolutely incredible ribs. Found this gem through Rank Eats and it's now my go-to spot every weekend. The ranking system really works!", avatar: "SM" },
  //   { author: "James K.", restaurant: "Sakura Garden", rating: 5, text: "Rank Eats helped me discover restaurants I never would have found otherwise. The reviews are genuine and the ranking is trustworthy.", avatar: "JK" },
  //   { author: "Priya N.", restaurant: "Spice Route", rating: 4, text: "Love that I can vote for my favorite places. The community here really knows their food. Found three new favorites this month alone.", avatar: "PN" },
  // ]

  return (
    <main className="bg-(--secondary-color) min-h-full">
      <style>{`
        
        .search-input { background: rgba(255,255,255,0.06); border: 1.5px solid rgba(255,255,255,0.1); color: #f0f0f0; border-radius: 10px; padding: 12px 16px; font-size: 15px; outline: none; transition: border-color 0.15s, background 0.15s; font-family: inherit; }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .search-input:focus { border-color: var(--accent-color); background: rgba(255,255,255,0.09); }
        
        
        .check-icon { background: rgba(241,89,42,0.15); flex-shrink: 0; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="  relative flex  flex-col items-center justify-center text-center px-4 pt-24 pb-20 gap-8 overflow-hidden"
        style={{ minHeight: "90vh", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(241,89,42,0.25) 0%, transparent 65%), #0d0d0d" }}
      >
        {/* subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", zIndex: 0 }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">


          <h1 className="exo-2 font-bold leading-tight" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#f0f0f0" }}>
            <span style={{ color: "var(--accent-color)" }}>Rank Eats</span> Where Every{" "}
            <span style={{ color: "#f0f0f0" }}>Bite</span> Gets{" "}
            <span style={{ color: "#f0f0f0" }}>Noticed</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "var(--text-muted)" }}>
            Discover, vote, and review the best restaurants in your city. Powered by the community — not ad budgets.
          </p>

          {/* Search Bar */}
          <div
            className="w-full max-w-3xl rounded-2xl p-3 flex flex-col sm:flex-row gap-2"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-2 flex-1" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "0 14px" }}>
              <Icon name="search" size={16} />
              <input
                className="search-input flex-1"
                style={{ background: "transparent", border: "none", padding: "12px 4px" }}
                value={searchEat}
                onChange={e => setSearchEat(e.target.value)}
                placeholder="Pizza, steaks, ramen..."
              />
            </div>
            <div className="flex items-center gap-2 flex-1" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "0 14px" }}>
              <Icon name="mapPin" size={16} />
              <input
                className="search-input flex-1"
                style={{ background: "transparent", border: "none", padding: "12px 4px" }}
                value={searchState}
                onChange={e => setSearchState(e.target.value)}
                placeholder="City or state..."
              />
            </div>
            <ButtonTwo onClick={handleSearch} title={"Search"} icon={"left"} iconName={"search"} iconSize={15} isSubmitted={isSubmitted} isSubmittedText={"Searching..."} />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <ButtonOne path="/search/?q=all-restaurants&source=all-restaurants" title={"Browse Restaurants"} isInverted={true} />
            <ButtonTwo path="/search/?q=top-eats&source=top-eats" title={"Top Ranked Eats"} icon={"left"} iconName={"trophy"} iconSize={15} />
          </div>
        </div>


      </section>

      {/* ── WELCOME BANNER ────────────────────────────────────── */}
      <section
        className="px-4 py-16"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
          <h2 className="exo-2 font-bold text-3xl sm:text-5xl text-white w-full sm:w-[44%] leading-tight">
            Find The Best.<br />Eat The Best.
          </h2>
          <div className="w-full sm:w-[52%] flex flex-col items-start gap-4">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
              Rank Eats puts real community votes at the center of every restaurant ranking. No pay-to-win listings — just honest reviews from people who actually ate there.
            </p>
            <ButtonTwo path="/#process" title={"Learn how it works"} icon={"right"} iconName={"arrowRight"} iconSize={15} />
          </div>
        </div>
      </section>

      {/* ── ABOUT / FEATURES ──────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col sm:flex-row gap-12 sm:gap-16 items-center">
        {/* Visual side */}
        <div className="feauture_restaurants_left relative w-full  sm:w-1/2">
          <img className=" w-[100%] h-[300px] sm:w-[500px] sm:h-[500px] rounded" src="/login-banner.png" alt="" />
          <img className=" w-[70%] h-[150px] md:w-[400px] md:h-[300px]  rounded absolute bottom-[-30px] right-0" src="/aboutimg1.png" alt="" />
        </div>

        {/* Text side */}
        <div className="w-full sm:w-1/2 flex flex-col items-start gap-6">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full self-start" style={{ backgroundColor: "rgba(241,89,42,0.1)", color: "var(--accent-color)" }}>
            About Rank Eats
          </span>
          <h2 className="exo-2 font-bold text-3xl sm:text-4xl leading-snug text-(--black-color)">
            Visibility Earned, Not Bought
          </h2>
          <p className="text-sm leading-relaxed text-(--gray-color)" >
            Rank Eats is built on a simple belief: the best restaurants should rise to the top because of what's on the plate — not what's in the marketing budget. Our community of food lovers votes, reviews, and ranks every listing.
          </p>

          <div className="flex flex-col gap-3">
            {[
              "Community-driven rankings, updated in real time",
              "Verified restaurant listings with honest reviews",
              "Vote for your favorites and shape what gets discovered",
              "Completely free basic listings for every restaurant",
            ].map((item, i) => (
              <div key={i} className="flex items-start gaps-[10px]">
                <span className="check-icon w-[20px] h-[20px] rounded-[50%] flex items-center justify-center shrink-0 text-(--accent-color) mt-[1px]"><Icon name="check" size={11} /></span>
                <span className="text-sm leading-relaxed text-(--gray-color)">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="process" className="px-4 py-20 bg-(--secondary-color)" >
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <SectionHeading label="The Process" title="How It Works" />
          <div className="flex flex-wrap gap-4 justify-center">
            <StepCard step={1} icon="search" title="Search Eats" desc="Type any food, cuisine, or restaurant name and narrow it down by city or state." />
            <StepCard step={2} icon="star" title="Read Reviews" desc="Browse real community reviews with verified ratings from actual diners." />
            <StepCard step={3} icon="vote" title="Cast Your Vote" desc="Vote for your favorite spots and help push the best restaurants to the top of the list." />
            <StepCard step={4} icon="cooking" title="Enjoy the Best" desc="Discover new places with confidence — ranked by people who genuinely love food." />
          </div>
        </div>
      </section>

      {/* ── TOP RANKED RESTAURANTS ────────────────────────────── */}
      <section className="px-4 py-20 bg-(--secondary-color)">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading label="Community Favorites" title="Best Restaurants" />
            <ButtonOne path="/search/?q=all-restaurants&source=all-restaurants" title={"View All"} icon={true} />
          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {restaurants?.map((e, idx) => (
              <RestaurantCard key={idx} data={e} />

            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST REVIEWS ────────────────────────────────────── */}
      <section className="px-4 py-20 bg-(--secondary-color)">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeading label="What People Are Saying" title="Latest Reviews" />
            <ButtonOne path="/search/?q=all-reviews&source=all-reviews" title={"All Reviews"} icon={true} />

          </div>
          <div className="flex flex-wrap gap-5 justify-center">
            {reviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER BANNER ─────────────────────────────────── */}
      <CommonCta />

    </main>
  )
}

export default HomePage