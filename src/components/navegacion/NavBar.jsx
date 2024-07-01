"use client";

import { useState, useEffect } from "react";
import { NavBarLinks } from "./NavBarLinks";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenModal = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-pink-400 shadow-2xl shadow-pink-400/70 text-white p-4 sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/next.svg" alt="Logo" className="h-7" />
        <nav className="hidden md:flex">
          <ul className="flex space-x-4">
            <NavBarLinks />
          </ul>
        </nav>

        <button className="md:hidden scale-150" onClick={handleOpenModal}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div className={`fixed inset-0 z-40 flex justify-end md:hidden transition-color duration-300 ${isMenuOpen ? 'bg-black bg-opacity-50' : 'bg-transparent pointer-events-none'}`}
        onClick={handleOpenModal}
      >
        <div className={`bg-pink-300 w-64 h-full shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="text-black p-4" onClick={handleOpenModal}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="flex flex-col p-4 space-y-4 items-start">
            <NavBarLinks />
          </ul>
        </div>
      </div>
    </header>
  );
}

