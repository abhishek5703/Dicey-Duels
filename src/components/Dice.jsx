import "./Dice.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import diceRollSound from "../assets/sound/DiceRoll.mp3";

const Dice = ({ value, isRolling }) => {
  const getPips = (val) => {
    const pipMap = {
      1: [{ top: "50%", left: "50%" }],
      2: [
        { top: "25%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
      3: [
        { top: "25%", left: "25%" },
        { top: "50%", left: "50%" },
        { top: "75%", left: "75%" },
      ],
      4: [
        { top: "25%", left: "25%" },
        { top: "25%", left: "75%" },
        { top: "75%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
      5: [
        { top: "25%", left: "25%" },
        { top: "25%", left: "75%" },
        { top: "50%", left: "50%" },
        { top: "75%", left: "25%" },
        { top: "75%", left: "75%" },
      ],
      6: [
        { top: "25%", left: "25%" },
        { top: "50%", left: "25%" },
        { top: "75%", left: "25%" },
        { top: "25%", left: "75%" },
        { top: "50%", left: "75%" },
        { top: "75%", left: "75%" },
      ],
    };
    return pipMap[val] || [];
  };

  // Play dice sound when rolling starts
  useEffect(() => {
    if (isRolling) {
      const audio = new Audio(diceRollSound);
      audio.play();
    }
  }, [isRolling]);

  return (
    <motion.div
      className="dice-container"
      animate={
        isRolling
          ? { rotate: [0, 180, 360], scale: [1, 1.2, 1] }
          : { rotate: 0 }
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="dice-face">
        {getPips(value).map((pip, i) => (
          <span
            key={i}
            className="pip"
            style={{
              top: pip.top,
              left: pip.left,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Dice;
