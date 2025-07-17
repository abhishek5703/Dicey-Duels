import "./Dice.css";

const Dice = ({ face }) => {
  
  const getPips = (value) => {
  const pipPositions = {
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

  const positions = pipPositions[value] || []; // fallback to empty array
  return positions.map((pos, i) => (
    <span
      key={i}
      className="pip"
      style={{
        top: pos.top,
        left: pos.left,
        transform: "translate(-50%, -50%)",
      }}
    />
  ));
};


  return (
    <div className="dice-container">
      <div className="dice-face">{getPips(face)}</div>
    </div>
  );
};

export default Dice;
