import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[80vh] gap-12 px-6 md:px-12 py-10">
            {/* Text Section */}
            <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    🎲 Welcome to <span className="text-indigo-600">Dicey Duels</span>
                </motion.h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 lg:mb-12 leading-relaxed max-w-xl lg:max-w-lg">
                    Gather your friends and put your luck and strategy to the test in this thrilling multiplayer dice game.
                    Roll the dice, outsmart your opponents, and race to the top of the scoreboard in <span className="font-semibold text-indigo-600">Dicey Duels</span>!
                </p>



                {/* Buttons Group */}
                <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                    {/* Play Now Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/names")}
                        className="flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 cursor-pointer"
                    >
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        >
                            🎲
                        </motion.span>
                        Play Now
                    </motion.button>

                    {/* How to Play Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/instructions")}
                        className="px-7 py-3 border-2 border-indigo-500 text-indigo-600 font-medium text-lg rounded-full shadow-md hover:bg-indigo-50 transition duration-300 cursor-pointer"
                    >
                        📘 How to Play
                    </motion.button>
                </div>
            </motion.div>

            {/* Illustration Section */}
            <motion.div
                className="flex-1 flex justify-center relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                {/* Soft glow background */}
                <div className="absolute w-64 h-64 bg-purple-400 opacity-30 blur-3xl rounded-full z-0 top-10 right-10"></div>
                <img
                    src="/dicey-hero.png"
                    alt="Dice Illustration"
                    className="h-[28rem] md:h-[34rem] lg:h-[42rem] object-contain drop-shadow-2xl rounded-2xl relative z-10"
                />
            </motion.div>
        </div>
    );
};

export default Home;
