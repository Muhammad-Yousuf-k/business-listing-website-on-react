import React from 'react'
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ListingCard = ({ listingData = {
    _id: "scevrwevrerbwerebrwerr",
    img: "/public/aboutimg1.png",
    name: "Flame & Fork",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo a nisi odit facilis quidem eum maxime consequuntur, dolor, expedita,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo a nisi odit facilis quidem eum maxime consequuntur, dolor, expedita, fugiat quibusdam. Fuga ratione suscipit est doloremque culpa consectetur quam aspernatur.",
    mainCategory: "Restaurant",
    feautures: ["Feature 1", "Feature 2", "Feature 3"],
    listingLink: "https://www.example.com"
}, isDashboard = false }) => {
    const IconComponent = ArrowRight;

    return (
        <div
            className="bg-white border border-gray-300 shadow-2xl showCase-FadeIn-Up w-full sm:w-70 h-85 rounded-xl"
        >
            {/* Card top */}
            <div className=" relative w-full h-[40%] border border-gray-300 rounded-xl overflow-hidden">
                <Link to={isDashboard ? `/listing/detailed/${listingData._id}` : listingData.listingLink} target="_blank" rel="noopener noreferrer">
                    <img
                        className="object-cover w-full h-full rounded-xl"
                        src={listingData.img}
                        alt={listingData.name}
                    />
                </Link>

                {isDashboard && (
                    <h2 className=" absolute top-2 left-2 z-30 bg-[var(--primary-color)] text-[var(--secondary-color)] px-3 py-1 rounded-xl flex items-center text-[13px]">
                        status
                    </h2>
                )}
            </div>
            {/* Card bottom */}
            <div className="w-full h-[60%] p-1">
                <div className="w-full h-[25%] flex items-center justify-between px-5 ">
                    <h2 className="bg-[var(--accent-color)] text-[var(--secondary-color)] px-3 py-1 rounded-xl flex  items-center text-[13px]">
                        {listingData.mainCategory}
                    </h2>
                    <h2 className=" text-[var(--black-color)] text-[10px] flex items-center">
                        <IconComponent className="w-5 h-11 text-[var(--textprimary)] hover:text-[var(--secondary-color)] p-1 transition-all hover:-rotate-45 hover:bg-[var(--accent-color)] rounded-full cursor-pointer" strokeWidth={2} />
                        <span>2</span>
                        <IconComponent className="w-5 h-11 text-[var(--textprimary)] hover:text-[var(--secondary-color)] p-1 transition-all hover:-rotate-45 hover:bg-[var(--accent-color)] rounded-full cursor-pointer" strokeWidth={2} />
                        <span>2</span>
                    </h2>
                </div>
                <div className="w-full h-[75%] flex flex-col gap-2 justify-center px-5">
                    <h2 className="flex items-center justify-between font-bold text-[15px] exo2 line-clamp-2">
                        {listingData.name}
                        <Link to={isDashboard ? `/listing/detailed/${listingData._id}` : listingData.listingLink} target="_blank" rel="noopener noreferrer">
                            <IconComponent className="w-11 h-11 text-[var(--textprimary)] hover:text-[var(--secondary-color)] p-1 transition-all hover:-rotate-45 hover:bg-[var(--accent-color)] rounded-full cursor-pointer" strokeWidth={2} />
                        </Link>
                    </h2>
                    <p className="text-[10px] line-clamp-5 ">{listingData.description}</p>
                </div>

            </div>
        </div>
    )
}

export default ListingCard