import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Flag, LogOut } from "lucide-react";
import { questions } from "../data/questions";

interface QuizScreenProps {
  current: number;
  answers: string[];
  onSelectAnswer: (type: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  onExit: () => void;
}

export default function QuizScreen({
  current,
  answers,
  onSelectAnswer,
  onNext,
  onPrev,
  onFinish,
  onExit
}: QuizScreenProps) {
  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const isLastQuestion = current === questions.length - 1;
  const hasAnswered = !!answers[current];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-900 text-slate-50 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: `${(current / questions.length) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="w-full max-w-3xl flex flex-col pt-8 pb-20">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="text-sm font-medium text-slate-400 bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-700/50">
            Вопрос {current + 1} из {questions.length}
          </span>
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={onFinish}
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-400/10 hover:bg-emerald-400/20 px-3 py-1.5 rounded-lg border border-emerald-400/20"
              title="Завершить тест и посмотреть текущий результат"
            >
              <Flag className="w-4 h-4 hidden sm:block" />
              <span className="hidden sm:inline">Завершить досрочно</span>
              <span className="sm:hidden">Завершить</span>
            </button>
            <button 
              onClick={onExit}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              title="Выйти на главную"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Выйти</span>
            </button>
          </div>
        </div>

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 leading-snug">
            {q.text}
          </h2>

          <div className="flex flex-col gap-3 sm:gap-4">
            {q.options.map((opt, i) => {
              const isSelected = answers[current] === opt.type;
              return (
                <button
                  key={i}
                  onClick={() => onSelectAnswer(opt.type)}
                  className={`relative p-5 sm:p-6 text-left rounded-2xl border transition-all duration-200 group overflow-hidden ${
                    isSelected 
                      ? "bg-blue-600/10 border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]" 
                      : "bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  {isSelected && (
                    <motion.div 
                      layoutId="outline"
                      className="absolute inset-0 border-2 border-blue-500 rounded-2xl pointer-events-none"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-[#e2e8f0] sm:text-lg font-medium transition-colors ${isSelected ? "text-white" : ""}`}>
                      {opt.text}
                    </span>
                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 transition-colors flex items-center justify-center ${
                      isSelected ? "border-blue-500 bg-blue-500" : "border-slate-500 group-hover:border-slate-400"
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="fixed sm:static bottom-0 left-0 w-full sm:w-auto p-4 sm:p-0 bg-slate-900/80 sm:bg-transparent backdrop-blur-lg sm:backdrop-blur-none border-t border-slate-800 sm:border-none mt-8 flex justify-between items-center sm:gap-4 z-20">
          <button
            onClick={onPrev}
            disabled={current === 0}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            aria-label="Previous question"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {isLastQuestion ? (
            <button
              onClick={onFinish}
              disabled={!hasAnswered}
              className="flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-900 font-bold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] disabled:shadow-none"
            >
              <span>Показать результат</span>
              <Flag className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={!hasAnswered}
              className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.5)] disabled:shadow-none"
            >
              <span>Далее</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
