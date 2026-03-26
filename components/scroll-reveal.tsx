"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  once?: boolean
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-40px 0px" })
  const prefersReducedMotion = useReducedMotion()

  // Define initial and animate states based on direction
  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0 }
    
    switch (direction) {
      case "up":
        return { opacity: 0, y: 24 }
      case "down":
        return { opacity: 0, y: -24 }
      case "left":
        return { opacity: 0, x: 24 }
      case "right":
        return { opacity: 0, x: -24 }
      case "none":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: 24 }
    }
  }

  const getAnimateState = () => {
    return { opacity: 1, x: 0, y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for grouped animations
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger item to be used inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function StaggerItem({ 
  children, 
  className,
  direction = "up",
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  const getInitial = () => {
    if (prefersReducedMotion) return { opacity: 1, x: 0, y: 0 }
    
    switch (direction) {
      case "up":
        return { opacity: 0, y: 20 }
      case "down":
        return { opacity: 0, y: -20 }
      case "left":
        return { opacity: 0, x: 20 }
      case "right":
        return { opacity: 0, x: -20 }
      case "none":
        return { opacity: 0 }
      default:
        return { opacity: 0, y: 20 }
    }
  }

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: getInitial(),
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Fade in animation component
interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0,
  duration = 0.6,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}

// Scale in animation
interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScaleIn({ 
  children, 
  className, 
  delay = 0,
}: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ 
        opacity: prefersReducedMotion ? 1 : 0, 
        scale: prefersReducedMotion ? 1 : 0.95 
      }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        scale: isInView ? 1 : 0.95 
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
