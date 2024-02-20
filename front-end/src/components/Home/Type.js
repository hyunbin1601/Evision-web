import React from "react";
import Typewriter from "typewriter-effect";
import './Home.css';

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Web Hacking",
          "Pwnable",
          "Reversing",
          "Forensic",
          "Crypto"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
