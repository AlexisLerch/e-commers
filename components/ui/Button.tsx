"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle =
    "relative w-full h-full bg-black text-white font-bold rounded-lg text-center cursor-pointer overflow-hidden flex items-center justify-center";

  const motionProps = {
    whileHover: { y: -3, scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  const borderVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 },
  };

  const borderSVG = (
    <motion.svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 50"
      preserveAspectRatio="none"
    >
      <motion.rect
        x="1"
        y="1"
        width="98"
        height="48"
        rx="12"
        ry="12"
        fill="transparent"
        stroke="white"
        strokeWidth="2"
        variants={borderVariants}
        animate={isHovered ? "visible" : "hidden"}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.svg>
  );

  const content = (
    <>
      {borderSVG}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.div {...motionProps} className={className}>
        <Link
          href={href}
          className={baseStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </motion.button>
  );
}
