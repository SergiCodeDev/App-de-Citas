"use client";

import { useState, useRef, useEffect } from "react";

export default function LeerMasBio({ children }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [needsExpansion, setNeedsExpansion] = useState(false);

    useEffect(() => {
        if (contentRef.current) {
            const scrollHeight = contentRef.current.scrollHeight;
            const maxHeightValue = isExpanded ? scrollHeight : 96; // 24 * 4px (rem value for max-h-24)
            setMaxHeight(`${maxHeightValue}px`);
            setNeedsExpansion(scrollHeight > 96); // Check if content is taller than 24 rem
        }
    }, [isExpanded, children]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='py-5 px-5 w-full relative'>
            <div
                ref={contentRef}
                style={{ maxHeight }}
                className={`transition-max-height duration-300 ease-in-out overflow-hidden relative ${needsExpansion ? 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-6 after:bg-gradient-to-t after:from-white after:transition-opacity after:duration-300 after:ease-in-out' : ''} ${isExpanded ? 'after:opacity-0' : ''}`}
            >
                {children}
            </div>
            {needsExpansion && (
                <button
                    onClick={toggleReadMore}
                    className="text-pink-500 hover:underline focus:outline-none mt-2"
                >
                    {isExpanded ? 'Leer menos' : 'Leer más...'}
                </button>
            )}
        </div>
    )
}
