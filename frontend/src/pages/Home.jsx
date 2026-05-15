import Btnone from "../components/small compo/Btn-one"
import Btntwo from "../components/small compo/Btn-two"
import ListingCard from "../components/ListingCard"
import How_it_work_card from "../components/How_it_work_card"
import { useState } from "react"

const home = () => {

    const [searchEat, setSearchEat] = useState("")
    const [searchState, setSearchState] = useState("")



    return (
        <>
            <main className="min-h-250">
                {/* hero Sec */}

                <div style={{ background: 'radial-gradient(circle, #F1592A, #000000)' }} className="hero_sec sm:min-h-[85vh] pb-5 flex justify-center items-center flex-col gap-5">
                    <div className="top_sec w-[90%] min-h-[20vh] flex justify-center items-center flex-col gap-2">
                        <h1 className="exo-2 text-[var(--secondary-color)] text-4xl sm:text-6xl font-bold text-center">
                            <span className="text-[var(--accent-color)]">Rank Eats</span> Where you find visibility
                        </h1>
                        <p className="text-[var(--secondary-color)] text-center w-[95%] sm:w-[75%] text-[13px] sm:text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum cum iure soluta dolores assumenda. Ullam obcaecati cupiditate rem aliquam quam aut placeat recusandae, nemo, quibusdam rerum odio aperiam aliquid ut!
                        </p>
                    </div>

                    <div className="middle_sec w-[95%] min-h-[20vh] flex justify-center items-center flex-col gap-2 sm:gap-2">
                        <h1 className="exo-2 text-[var(--secondary-color)] text-xl sm:text-4xl font-bold">Find The Best, Eat The Best</h1>
                        <div className="listing_search_box flex flex-col gap-2">
                            <div className="listing_search min-h-[15vh] flex justify-center items-center flex-wrap">
                                <h2 className="exo-2 text-[var(--secondary-color)] bg-[var(--primary-color)] flex justify-center items-center h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] text-center text-[13px] sm:text-xl">Find</h2>
                                <input value={searchEat} onChange={(e) => setSearchEat(e.target.value)} className="bg-[var(--secondary-color)] h-[40px] sm:h-[59px] w-[160px] sm:w-fit rounded-none p-[0%] pl-1 text-[4]" type="text" placeholder="pizza, steaks, french Fries" />
                                <h2 className="exo-2 text-[var(--secondary-color)] bg-[var(--primary-color)] flex justify-center items-center h-[40px] w-[40px] sm:h-[60px] sm:w-[60px] text-center text-[13px] sm:text-xl">in</h2>
                                <input value={searchState} onChange={(e) => setSearchState(e.target.value)} className="bg-[var(--secondary-color)] h-[40px] sm:h-[59px] w-[240px] sm:w-fit rounded-none p-[0%] pl-1 text-[4]" type="text" placeholder="City or State" />
                                <button className="exo-2 text-[var(--secondary-color)] bg-[var(--primary-color)] flex justify-center items-center h-[40px] w-[240px] sm:h-[60px] sm:w-[60px] text-center text-[13px] sm:text-xl">icon</button>
                            </div>
                            <div className="flex justify-center items-center gap-5">
                                <Btntwo text={"Restaurant Eats"} path={"/"} />
                                <Btnone text={"Restaurant"} path={"/"} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Wellcome Sec  */}
                <div className="wellcome_banner_box bg-(--primary-color) min-h-[250px] pb-5 flex justify-center items-center flex-col gap-5 pt-[30px] pb-[30px]">
                    <div className="wellcome_banner w-[90%]  flex flex-col sm:flex-row justify-between items-start">
                        <h1 className="exo-2 text-(--secondary-color) text-4xl sm:text-5xl font-bold w-full sm:w-[40%]">Rank Eats Where you find visibility</h1>
                        <p className="text-(--secondary-color) text-[15px] w-full sm:w-[60%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo a nisi odit facilis quidem eum maxime consequuntur, dolor, expedita, fugiat quibusdam. Fuga ratione suscipit est doloremque culpa consectetur quam aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum neque dolore sint pariatur quae, beatae eum, earum numquam ut alias voluptatem. Quis architecto ex saepe neque nesciunt labore optio tempore?</p>
                    </div>
                </div>
                {/* about Sec  */}
                <div className="feauture_restaurants_box min-h-[250px] flex flex-col justify-center items-center gap-5 pt-[50px] pb-[50px]">
                    <div className="feauture_restaurants w-[90%]  flex flex-col sm:flex-row justify-between items-start gap-10 sm:gap-10">

                        <div className="feauture_restaurants_left relative w-full  sm:w-1/2">
                            <img className=" w-[100%] h-[300px] sm:w-[500px] sm:h-[500px] rounded" src="/login-banner.png" alt="" />
                            <img className=" w-[70%] h-[150px] md:w-[400px] md:h-[300px]  rounded absolute bottom-[-30px] right-0" src="/aboutimg1.png" alt="" />
                        </div>
                        <div className="feauture_restaurants_right w-full  sm:w-1/2 flex flex-col gap-5">
                            <h1 className="exo-2 text-(--black-color) text-4xl sm:text-5xl font-bold ">Rank Eats Where you find visibility</h1>
                            <p className="text-gray-600 text-[15px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo a nisi odit facilis quidem eum maxime consequuntur, dolor, expedita, fugiat quibusdam. Fuga ratione suscipit est doloremque culpa consectetur quam aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum neque dolore sint pariatur quae, beatae eum, earum numquam ut alias voluptatem. Quis architecto ex saepe neque nesciunt labore optio tempore?</p>
                            <p className="text-gray-600 text-[15px] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo a nisi odit facilis quidem eum maxime consequuntur, dolor, expedita, fugiat quibusdam. Fuga ratione suscipit est doloremque culpa consectetur quam aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum neque dolore sint pariatur quae, beatae eum, earum numquam ut alias voluptatem. Quis architecto ex saepe neque nesciunt labore optio tempore?</p>

                        </div>
                    </div>
                </div>
                {/* How It Work Sec  */}
                <div className="best_restaurants_box min-h-[100vh] flex justify-center items-start gap-5 pt-[50px] pb-[50px]">
                    <div className="best_restaurantsw-[100%] lg:w-[90%] p-2">
                        <div className="top_sec_heading_box flex justify-center items-center relative">
                            <h1 className="exo-2 absolute text-8xl font-bold text-[#EAEAED] z-0 bottom-0 ">How It Work</h1>
                            <h1 className="exo-2 text-6xl text-(--primary-color) font-bold z-10 bottom-0">How It Work</h1>
                        </div>
                        <div className="middle_sec_card_box w-full flex justify-center items-center flex-wrap gap-3 mt-10">
                            <How_it_work_card data={{
                                logo: "search",
                                name: "Search Eats",
                                para: "Create your account and provide basic information about your restaurant."
                            }} />
                            <How_it_work_card data={{
                                logo: "cooking",
                                name: "Enjoy!",
                                para: "Add detailed information about your restaurant, including menu items and photos."
                            }} />
                            <How_it_work_card data={{
                                logo: "vote",
                                name: "Vote",
                                para: "Complete the verification process to ensure your listing is accurate and trustworthy."
                            }} />
                            <How_it_work_card data={{
                                logo: "star",
                                name: "Review",
                                para: "Complete the verification process to ensure your listing is accurate and trustworthy."
                            }} />
                        </div>

                    </div>
                </div>
                {/* Top Ranked Restaurants Sec  */}
                <div className="best_restaurants_box min-h-[100vh] flex justify-center items-start gap-5 pt-[50px] pb-[50px]">
                    <div className="best_restaurants w-[100%] lg:w-[90%] p-2">
                        <div className="top_sec_heading_box flex justify-center items-center relative">
                            <h1 className="exo-2 absolute text-5xl sm:text-8xl font-bold text-[#EAEAED] z-0 bottom-0 ">Top Ranked Restaurants</h1>
                            <h1 className="exo-2 text-3xl sm:text-6xl text-(--primary-color) font-bold z-10 bottom-0">Best Restaurants</h1>
                        </div>
                        <div>
                            {/*  */}
                        </div>
                        <div className="middle_sec_card_box w-full flex justify-center items-center flex-wrap gap-3 mt-10">
                            {[1, 2, 3, 4, 5, 6].map((item) => {
                                return <ListingCard key={item} />
                            })}
                        </div>

                    </div>
                </div>
                {/* Latest Reviews Sec  */}
                <div className="best_restaurants_box min-h-[100vh] flex justify-center items-start gap-5 pt-[50px] pb-[50px]">
                    <div className="best_restaurants w-[90%] p-2">
                        <div className="top_sec_heading_box flex justify-center items-center relative">
                            <h1 className="exo-2 absolute text-8xl font-bold text-[#EAEAED] z-0 bottom-0 ">Latest Reviews</h1>
                            <h1 className="exo-2 text-6xl text-(--primary-color) font-bold z-10 bottom-0">Latest Reviews</h1>
                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

export default home