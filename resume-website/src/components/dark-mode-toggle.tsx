import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="fixed top-6 right-6 p-2 rounded-full 
                 bg-opacity-20 backdrop-blur-lg
                 border border-white/10
                 transition-all duration-500 ease-out
                 hover:bg-opacity-30 hover:scale-110 
                 group"
      style={{
        background: isDark
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(0, 0, 0, 0.03)",
      }}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-5 h-5 absolute transform transition-all duration-500 ease-out
                     ${
                       isDark
                         ? "opacity-0 rotate-90 scale-50"
                         : "opacity-100 rotate-0 scale-100"
                     }
                     text-yellow-500 group-hover:text-yellow-400`}
        />

        {/* Moon Icon */}
        <Moon
          className={`w-5 h-5 absolute transform transition-all duration-500 ease-out
                     ${
                       isDark
                         ? "opacity-100 rotate-0 scale-100"
                         : "opacity-0 -rotate-90 scale-50"
                     }
                     text-blue-400 group-hover:text-blue-300`}
        />
      </div>

      {/* Button Glow Effect */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500
                    ${
                      isDark ? "bg-blue-500" : "bg-yellow-500"
                    } blur-lg -z-10 opacity-20
                    group-hover:opacity-30`}
      />
    </button>
  );
};

export default DarkModeToggle;
