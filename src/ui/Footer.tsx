import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent mt-auto w-full bg-gray-100 py-4 text-center uppercase">
      <div className="bg-[#034b57] rounded-full py-3 mx-3 font-bold text-[0.9rem] flex justify-center gap-6 mb-4">
        <Link to="/a-propos">a propos</Link>
        <Link to ="/mentions-legales">mentions legales</Link>
        <Link to="/contact">contact</Link>
      </div>  
      <p className="text-white font-bold text-xs">
        2025 - gamerschallenges
      </p>
    </footer>
  );
};