import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";

type Screen = "start" | "quiz" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStart = () => {
    setScreen("quiz");
  };

  const handleSelectAnswer = (type: string) => {
    const newAnswers = [...answers];
    newAnswers[current] = type;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < 19) { // 20 questions total
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const handleFinish = () => {
    setScreen("result");
  };

  const handleReset = () => {
    setScreen("start");
    setCurrent(0);
    setAnswers([]);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-50 font-sans antialiased selection:bg-blue-500/30 overflow-x-hidden">
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "quiz" && (
        <QuizScreen
          current={current}
          answers={answers}
          onSelectAnswer={handleSelectAnswer}
          onNext={handleNext}
          onPrev={handlePrev}
          onFinish={handleFinish}
          onExit={handleReset}
        />
      )}
      {screen === "result" && (
        <ResultScreen answers={answers} onReset={handleReset} />
      )}
    </div>
  );
}

