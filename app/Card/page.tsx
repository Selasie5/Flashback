"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

function Card({ frontCard, frontContent, backContent, drag, index, setIndex }:any) {
    const [exitX, setExitX] = useState(0);
    const [flipped, setFlipped] = useState(false); // New state for flipping

    const x = useMotionValue(0);
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false,
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom: any) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
        }),
    };

    const variantsBackCard = {
        initial: { scale: 0, y: 105, opacity: 0 },
        animate: { scale: 0.75, y: 30, opacity: 0.5 },
    };

    function handleDragEnd(_: any, info: { offset: { x: number; }; }) {
        if (info.offset.x < -100) {
            setExitX(-250);
            setIndex(index + 1);
        }
        if (info.offset.x > 100) {
            setExitX(250);
            setIndex(index + 1);
        }
    }

    function handleFlip() {
        setFlipped(!flipped); // Toggle the flip state
    }

    return (
        <motion.div
            style={{
                width: 500,
                height: 400,
                position: "absolute",
                x,
                rotate,
                cursor: "grab",
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={drag}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={handleDragEnd}
            variants={frontCard ? variantsFrontCard : variantsBackCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                frontCard
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
            className="flex justify-center items-center"
            onClick={handleFlip}
        >
            <motion.div
                style={{
                    width: 500,
                    height: 400,
                    perspective: 1000,
                }}
            >
                {/* Front side of the card */}
                <motion.div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 30,
                        scale,
                        rotateY: flipped ? 180 : 0,
                        backfaceVisibility: "hidden",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                        boxSizing: "border-box",
                    }}
                >
                    {frontContent}
                </motion.div>

                {/* Back side of the card */}
                <motion.div
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#f0f0f0",
                        borderRadius: 30,
                        scale,
                        rotateY: flipped ? 0 : -180,
                        backfaceVisibility: "hidden",
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "20px",
                        boxSizing: "border-box",
                    }}
                >
                    {backContent}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

const Page = () => {
    const [index, setIndex] = useState(0);

    // Array of questions and answers
    const cardsData = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
        // Add more question and answer pairs here
    ];

    const currentCard = cardsData[index % cardsData.length];

    return (
        <motion.div
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <AnimatePresence initial={false}>
                <Card
                    key={index + 1}
                    frontCard={false}
                    backContent={currentCard.answer}
                    frontContent={currentCard.question}
                />
                <Card
                    key={index}
                    frontCard={true}
                    index={index}
                    setIndex={setIndex}
                    drag="x"
                    backContent={currentCard.answer}
                    frontContent={currentCard.question}
                />
            </AnimatePresence>
        </motion.div>
    );
};

export default Page;
