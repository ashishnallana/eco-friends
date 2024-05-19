import React, { useState } from "react";
import { formatDate } from "../Home/Post";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ProofBox from "./ProofBox";

function ChallengeCard({ e }) {
  const [proofBlock, setproofBlock] = useState(false);

  return (
    <div className="flex space-x-3 bg-white my-3 p-3 rounded-md">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6213/6213347.png"
        alt="challenge-icon"
        className="h-[100px]"
      />
      <div className="flex-1 flex justify-between flex-wrap">
        <div>
          <div className="flex space-x-2 items-end flex-wrap">
            <h1 className="text-2xl font-semibold">{e.title}</h1>
            <p className="text-[12px]">({formatDate(e.createdAt)})</p>
          </div>
          <p className="text-md">{e.description}</p>
          <div className="flex items-center space-x-2 text-[12px] mt-3">
            <CardGiftcardIcon />
            <p>
              Win <strong>{e.points}</strong> points by completing this
              challenege.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-end ml-2">
          <button
            onClick={() => setproofBlock(true)}
            className="bg-green-800 transition-all hover:bg-green-500 text-white font-bold py-2 px-3 rounded-md my-2"
          >
            Complete
          </button>
          <p className="text-[12px]">
            {e.count == 0
              ? "Be the first to complete this challenge!"
              : e.count == 1
              ? `Be the 2nd person to complete this challenge!`
              : `${e.count} people have completed this challenge!`}
          </p>
        </div>
      </div>

      {proofBlock && <ProofBox setproofBlock={setproofBlock} id={e._id} />}
    </div>
  );
}

export default ChallengeCard;
