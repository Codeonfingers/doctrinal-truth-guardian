"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Reusable animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Motion wrapper components
interface MotionDivProps extends HTMLMotionProps<"div"> {
  className?: string;
  children: React.ReactNode;
}

export function MotionDiv({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

export function FadeInUp({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={scaleIn}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const hoverLift = {
  whileHover: { y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};
