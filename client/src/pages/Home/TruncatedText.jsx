import React, { useState } from "react";

const TruncatedText = ({ text, maxLength = 100 }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const shouldTruncate = text.length > maxLength;
  const displayedText =
    isTruncated && shouldTruncate ? text.slice(0, maxLength) + "...." : text;

  return (
    <div>
      <p>{displayedText}</p>
      {shouldTruncate && (
        <button onClick={toggleTruncation} className="underline text-sm">
          {isTruncated ? "more" : "less"}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
