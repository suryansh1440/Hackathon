'use client'
import { useState, useEffect } from 'react'
import { motion, useAnimation, useReducedMotion } from 'framer-motion'
import { ChevronUpCircleIcon } from 'lucide-react'

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const controls = useAnimation()
    const shouldReduceMotion = useReducedMotion()

    const toggleVisibility = () => {
        // Adjust threshold for mobile
        const threshold = isMobile ? 300 : 500
        setIsVisible(window.scrollY > threshold)
    }

    const checkMobile = () => {
        setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    }

    const scrollToTop = async () => {
        await controls.start({ scale: 0.9 })
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        await controls.start({ scale: 1 })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        window.addEventListener('resize', checkMobile)
        window.addEventListener('orientationchange', checkMobile)
        checkMobile() // Initial check
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
            window.removeEventListener('resize', checkMobile)
            window.removeEventListener('orientationchange', checkMobile)
        }
    }, [])

    useEffect(() => {
        controls.set({ scale: 1 })
    }, [isMobile])

    const hoverAnimation = !isMobile && !shouldReduceMotion ? {
        y: [0, -5, 0],
        transition: {
            duration: 0.6,
            ease: "easeInOut",
            repeat: Infinity
        }
    } : {}

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
                opacity: isVisible ? 1 : 0, 
                scale: isVisible ? 1 : 0.8,
                y: isVisible ? 0 : 100
            }}
            transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20
            }}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50"
        >
            <motion.button
                animate={controls}
                whileHover={!isMobile ? "hover" : undefined}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                aria-label="Back to top"
                className="group relative p-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transition-shadow
                           active:scale-95 md:active:scale-100" // Different tap feedback for mobile
                style={{
                    touchAction: 'manipulation', // Disables double-tap zoom
                }}
            >
                {/* Mobile-optimized background effect */}
                {!shouldReduceMotion && (
                    <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-500/30"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [1, isMobile ? 1.1 : 1.2, 1],
                            opacity: [0, 0.4, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
                
                {/* Responsive icon size */}
                <motion.div
                    variants={!isMobile ? {
                        hover: { y: -2 }
                    } : {}}
                    className="relative"
                >
                    <ChevronUpCircleIcon
                        size={isMobile ? 40 : 48}
                        className="text-white group-hover:text-blue-100 transition-colors"
                        strokeWidth={isMobile ? 2 : 1.5}
                    />
                    
                    {/* Conditional hover effect */}
                    {!isMobile && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-white/10"
                            variants={{
                                hover: { scale: 1.2, opacity: 0 }
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </motion.div>

                {/* Mobile-friendly floating dots */}
                {!isMobile && !shouldReduceMotion && (
                    <motion.div
                        className="absolute -top-2 -right-2 flex space-x-1"
                        variants={hoverAnimation}
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 h-1 bg-white rounded-full"
                                animate={{
                                    y: [0, -3, 0],
                                    opacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </motion.button>
        </motion.div>
    )
}

export default BackToTopButton