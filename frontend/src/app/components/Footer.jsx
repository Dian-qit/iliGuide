import React, { useState } from "react";
import { Compass, Send, Star, Phone, Mail } from "lucide-react";

export const Footer = ({ onSubscribe, setActiveTab }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    onSubscribe(email.trim());
    setEmail("");
  };

  return (
    <footer className="bg-[#141A17] text-[#FAF9F6] py-16 border-t border-[#1C2421] mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.3em] text-[#C39E7C] font-display uppercase font-bold block">
            Address
          </span>
          <div className="text-sm font-sans text-gray-400 font-light leading-relaxed">
            Iligan City
              <br />
              Lanao del Norte, Philippines
          </div>
        </div>


        <div className="text-center space-y-6 flex flex-col items-center">
          <div>
            <h3 className="font-serif text-3xl font-light tracking-wide">
              IlIGuide
            </h3>
              
          </div>

          <div className="flex justify-center gap-4 text-gray-400 text-xs">
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest font-sans"
            >
              [ Twitter ]
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest font-sans"
            >
              [ Instagram ]
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors uppercase tracking-widest font-sans"
            >
              [ YouTube ]
            </a>
          </div>
        </div>


        <div className="space-y-4 md:text-right">
          <span className="text-[10px] tracking-[0.3em] text-[#C39E7C] font-display uppercase font-bold block">
            Contact Us
          </span>
          <div className="text-sm text-gray-400 font-sans font-light space-y-1">
            <div className="flex items-center md:justify-end gap-2 text-nowrap">
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
              T. +929 333 9296
            </div>
            <div className="flex items-center md:justify-end gap-2 text-nowrap">
              <Mail className="w-3.5 h-3.5 text-[#16A34A]" />
              M. contact@iliguide.com
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#1C2421] text-center text-[10px] uppercase tracking-widest text-gray-500 font-sans">
        Copyright All Rights Reserved - IliGuide by PrettyDuck Studios
      </div>
    </footer>
  );
};
