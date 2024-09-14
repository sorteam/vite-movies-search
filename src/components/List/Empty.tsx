import { Player } from "@lottiefiles/react-lottie-player";
import { memo } from "react";

export const Empty = memo(function Empty() {
  return (
    <Player
      autoplay
      loop
      src="/lottie.json"
      style={{ width: "100%", height: "500px" }}
    ></Player>
  );
});
