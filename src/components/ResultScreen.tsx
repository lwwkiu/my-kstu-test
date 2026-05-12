import { motion } from "motion/react";
import { Home, Award, Briefcase, GraduationCap } from "lucide-react";
import { professions } from "../data/professions";

interface ResultType {
  key: string;
  title: string;
  description: string;
  jobs: string[];
  departments: string[];
  percent: number;
}

interface ResultScreenProps {
  answers: string[];
  onReset: () => void;
}

export default function ResultScreen({ answers, onReset }: ResultScreenProps) {
  const calculateResult = (): ResultType[] => {
    const scores: Record<string, number> = {};

    answers.forEach((a) => {
      if (!a || a === "skip" || !professions[a]) return;
      scores[a] = (scores[a] || 0) + 1;
    });

    const total = Object.values(scores).reduce((a, b) => a + b, 0);

    if (total === 0) return [];

    const results = Object.keys(scores).map((key) => ({
      key,
      ...professions[key],
      percent: Math.round((scores[key] / total) * 100),
    }));

    return results.sort((a, b) => b.percent - a.percent).slice(0, 2);
  };

  const results = calculateResult();

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-900 text-center">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
          <Award className="w-10 h-10 text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Недостаточно данных</h2>
        <p className="text-slate-400 max-w-md mb-8">
          Вы пропустили слишком много вопросов, чтобы мы могли составить точный профиль. Попробуйте еще раз!
        </p>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>На главную</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 bg-slate-900 text-slate-50 relative overflow-x-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Ваш идеальный путь
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Основываясь на ваших ответах, мы подобрали направления в КГТУ, которые лучше всего раскроют ваш потенциал.
          </p>
        </motion.div>

        <div className="grid gap-8 mb-16">
          {results.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 sm:p-10 overflow-hidden"
            >
              {index === 0 && (
                <div className="absolute top-0 right-0 p-8 pt-10 pointer-events-none opacity-5 sm:opacity-10">
                  <span className="text-[120px] font-black leading-none">1</span>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8 relative z-10">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4 border border-blue-500/20">
                    Матч: {item.percent}%
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {item.title}
                  </h2>
                  <p className="text-slate-300 leading-relaxed max-w-2xl text-lg">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-emerald-400">
                    <Briefcase className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Кем работать?</h3>
                  </div>
                  <ul className="space-y-3">
                    {item.jobs.map((job, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0" />
                        <span>{job}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center gap-3 mb-4 text-blue-400">
                    <GraduationCap className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">Кафедры</h3>
                  </div>
                  <ul className="space-y-3">
                    {item.departments.map((dep, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-2 flex-shrink-0" />
                        <span>{dep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center pb-8 border-t border-slate-800 pt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Вернуться на главную</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
