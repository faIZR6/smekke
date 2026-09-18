"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// All 5 from the same Pexels inclusive dining photoshoots, pre-processed
// (public/hero/*.jpg) with a baked-in bottom-darkening gradient for text contrast.
const SLIDES = [
  // 1 — original hero photo (pre-slideshow): two women toasting, one wheelchair user
  {
    src: "/hero/slide-1.jpg",
    alt: "Two women toasting with drinks at a bar, one using a wheelchair",
  },
  // 2 — group of friends at bar, one wheelchair user, laughing
  {
    src: "/hero/slide-2.jpg",
    alt: "Group of friends with drinks at a bar, one using a wheelchair",
  },
  // 3 — close two-shot, drinks, animated conversation
  {
    src: "/hero/slide-3.jpg",
    alt: "Two women sharing drinks at a bar, one using a wheelchair",
  },
  // 4 — couple at café table, warm and intimate
  {
    src: "/hero/slide-4.jpg",
    alt: "Couple sharing drinks at a café table, one using a wheelchair",
  },
  // 5 — keeper: woman in sparkling dress celebrating
  {
    src: "/hero/slide-5.jpg",
    alt: "Woman in a sparkling sequined dress celebrating at a dinner party",
  },
];

const INTERVAL = 3000;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(4);
  const [prev, setPrev] = useState<number | null>(null);
  const currentRef = useRef(current);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(currentRef.current);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 1600);
    return () => clearTimeout(t);
  }, [prev]);

  return (
    <>
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 4}
            sizes="100vw"
            className="object-cover object-center"
            style={{
              opacity: isActive ? 1 : 0,
              transition: isActive || isPrev ? "opacity 1.6s ease-in-out" : "none",
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
            }}
          />
        );
      })}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === current ? "white" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}
