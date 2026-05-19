import ButtonOne from "./ButtonOne"
import ButtonTwo from "./ButtonTwo"

const CommonCta = ({ title = "Own a Restaurant?", para = "Get your restaurant listed on Rank Eats for free. Gain visibility, collect reviews, and let the community discover you." }) => {
    return (
        <section
            className="px-4 py-20 text-center flex flex-col items-center gap-6"
            style={{ background: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(241,89,42,0.2) 0%, transparent 70%), #0d0d0d" }}
        >
            <h2 className="exo-2 font-bold text-3xl sm:text-5xl" style={{ color: "#f0f0f0" }}>
                {title}
            </h2>
            <p className="text-base max-w-md leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {para}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
                <ButtonTwo path="/owner/listing/create" title={"Add Your Restaurant"} icon={"left"} iconName={"users"} iconSize={15} />
                <ButtonOne path="/for-business/#hero" title={"Learn More"} isInverted={true} />
            </div>
        </section>
    )
}

export default CommonCta