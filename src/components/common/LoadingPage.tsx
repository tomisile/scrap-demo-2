"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Camera } from "lucide-react"
import { useNavigate } from "react-router-dom"
// import Image from "../../../public/avzdax-logo-text-crop.jpeg"

const LoadingPage: React.FC = () => {
    const [progress, setProgress] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to dashboard after 3 seconds
            //   navigate('/dashboard'); // Uncomment when using with router
        }, 3000)

        // Animate progress bar
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer)
                    return 100
                }
                return prev + 100 / 30 // 30 steps over 3 seconds
            })
        }, 100)

        return () => {
            clearTimeout(timer)
            clearInterval(progressTimer)
        }
    }, [])

    return (
        <div className="relative min-h-screen bg-[#121212] overflow-hidden flex items-center justify-center">
            {/* Background Topology - Geometric Patterns */}
            <div className="absolute inset-0 opacity-20">
                <svg className="absolute w-full h-full" viewBox="0 0 1440 1024">
                    {/* Concentric geometric shapes */}
                    <g stroke="#3B5700" strokeWidth="1" fill="none">
                        {/* <ellipse cx="720" cy="512" rx="898" ry="877" />
                        <ellipse cx="720" cy="512" rx="769" ry="748" />
                        <ellipse cx="720" cy="512" rx="640" ry="619" />
                        <ellipse cx="720" cy="512" rx="511" ry="490" />
                        <ellipse cx="720" cy="512" rx="382" ry="361" />
                        <ellipse cx="720" cy="512" rx="253" ry="232" /> */}
                    </g>
                </svg>
            </div>

            {/* Blur Effects */}
            <div className="absolute w-[483px] h-[483px] bg-[#3D3D3D] rounded-full blur-[213px] opacity-80 -bottom-80 -left-60" />
            <div className="absolute w-[1613px] h-[248px] bg-[#3D3D3D] rounded-full blur-[150px] opacity-80 -top-40 -left-28" />

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center gap-6 pb-32">
                {/* Brand Name */}
                <h1 className="text-[39.5px] leading-[58px] font-mono text-[#E4E7EC] text-center tracking-wider">TELETRAAN</h1>

                {/* Progress Bar Container */}
                <div className="w-[474px] h-[8px] relative">
                    {/* Background Bar */}
                    <div className="absolute inset-0 bg-[#1F1F1F] rounded-sm">
                        {/* Progress Fill */}
                        <div
                            className="h-full bg-[#3D3D3D] rounded-sm transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Animated Camera Icon */}
                    <div
                        className="absolute top-0 transition-all duration-100 ease-out"
                        style={{
                            left: `${(progress / 100) * 474}px`,
                            transform: "translateX(-50%)",
                        }}
                    >
                        <div className="bg-[#A3A3A3] p-0 rounded-sm">
                            <Camera className="w-2 h-2 text-[#121212]" />
                        </div>
                    </div>
                </div>

                {/* Loading States */}
                <div className="w-[189px] text-center space-y-4">
                    <div className="text-[14px] leading-[17px] font-normal text-[#E4E7EC]">Smart Monitoring...</div>
                </div>
            </div>

            {/* Footer with AVZDAX Logo */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                <span className="text-[16px] font-normal text-white">by</span>
                <img src="/avzdax-text-logo.png" alt="AVZDAX logo" className="object-contain w-[120px] h-[120px]" />
            </div>
        </div>
    )
}

export default LoadingPage
