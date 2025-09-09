import React, { useState, useEffect } from 'react';
import { LEET_MAP } from '../constants';

const baseTitle = "Text Corruptor";
const ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const Header: React.FC = () => {
    const [title, setTitle] = useState(baseTitle);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const chars = baseTitle.split('');
            const glitchIndex = Math.floor(Math.random() * chars.length);
            const originalChar = chars[glitchIndex];

            if (originalChar !== ' ') {
                const r = Math.random();
                if (r < 0.5) { // 50% chance to apply leet
                    chars[glitchIndex] = LEET_MAP[originalChar] || originalChar;
                } else { // 50% chance to swap
                    chars[glitchIndex] = ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
                }
            }
            
            setTitle(chars.join(''));
        }, 700); // Faster, more frequent glitch

        return () => clearInterval(intervalId);
    }, []);

  return (
    <header className="text-center p-4 md:p-6 mb-6 border-b-2 border-emerald-400/30">
      <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-widest uppercase font-mono h-[60px]">
        {title}
      </h1>
      <p className="text-slate-400 mt-2 text-sm md:text-base">
        Mangle, Mutilate, and Mutate Your Text
      </p>
    </header>
  );
};