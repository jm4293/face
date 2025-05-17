import { useState } from "react";

import Landing from "../landing/landing";
import Cam from "../cam/cam";

import "./main.css";

export default function Main() {
  const [isLanding, setIsLanding] = useState(true);

  return (
    <div className="app">
      {isLanding ? (
        <Landing setIsLanding={setIsLanding} />
      ) : (
        <Cam onEndContest={() => setIsLanding(true)} />
      )}
    </div>
  );
}
