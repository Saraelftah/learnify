import React from 'react'
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <div 
            className="px-6 md:px-20 py-40"
            style={{ 
                backgroundColor: "var(--background-color)", 
                color: "var(--main-text-color)" 
            }}
        >
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-bold mb-8 text-center"
                style={{ color: "var(--dark-color)", fontSize: "var(--title-font-size)" }}
            >
                About Learnify
            </motion.h1>

            {/* Main Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg md:text-xl text-center max-w-5xl mx-auto leading-relaxed mb-16"
                style={{ color: "var(--text-color)" }}
            >
                Learnify is an online learning platform that connects students with
                qualified teachers for personalized lessons. Whether one-on-one or in
                groups, students can easily book online sessions, manage schedules, and
                pay securely — all in one place. Our goal is to make learning accessible,
                flexible, and engaging for everyone.
            </motion.p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {[
                    {
                        title: "Easy Booking",
                        desc: "Students can browse teachers, check availability, and book lessons instantly.",
                        icon: "fa-calendar-check",
                    },
                    {
                        title: "Seamless Communication",
                        desc: "Integrated chat and video calls to make learning smooth and interactive.",
                        icon: "fa-comments",
                    },
                    {
                        title: "Smart Tools",
                        desc: "Teachers can manage schedules, track student progress, and grow their business.",
                        icon: "fa-chalkboard-teacher",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * i, duration: 0.6 }}
                        className="bg-gray-50 shadow-lg rounded-2xl p-8 transition-transform transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
                        style={{ 
                            backgroundColor: "var(--light-background)", 
                            boxShadow: "var(--box-shadow)" 
                        }}
                    >
                        <div className="flex justify-center mb-4">
                            <i
                                className={`fas ${item.icon} text-4xl ransition-colors duration-300 hover:text-[var(--primary-color)]`}
                                style={{ color: "var(--secondary-color)" }}
                            ></i>
                        </div>
                        <h3 
                            className="text-xl font-bold text-center mb-2" 
                            style={{ color: "var(--dark-color)" }}
                        >
                            {item.title}
                        </h3>
                        <p 
                            className="text-center"
                            style={{ color: "var(--text-color)" }}
                        >
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Vision */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="max-w-4xl mx-auto mt-20 text-center"
            >
                <h2 
                    className="text-3xl font-extrabold mb-6" 
                    // style={{ color: "var(--main-text-color)" }}
                    style={{ color: "var(--dark-color)", fontSize: "var(--title-font-size)" }}
                >
                    Our Vision
                </h2>
                <p 
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-color)" }}
                >
                    At Learnify, we believe that education should be flexible, affordable,
                    and accessible. Our mission is to empower students to achieve their
                    goals while providing teachers with the tools they need to succeed in
                    the digital era.
                </p>
            </motion.div>
        </div>
    );
}
