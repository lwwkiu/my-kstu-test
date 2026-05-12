import { motion } from "motion/react";
import { ChevronRight, Building2, Quote, Clock, CheckCircle2, Users, BookOpen } from "lucide-react";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const BACKGROUND_IMAGE = "url('background-image.jpg')"; 
  const LOGO_IMAGE = "logo.svg"; 
  const RAZZAKOV_IMAGE = "razzakov.jpg"; 

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-900 text-slate-50 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: BACKGROUND_IMAGE }}
    >
      {/* Dark overlay to ensure text remains readable */}
      <div className="absolute inset-0 bg-slate-900/60 z-0 pointer-events-none" />

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-8 mt-4 sm:mt-0">
            <img 
              src="/logo.svg"
              alt="Логотип КГТУ" 
              className="w-12 h-12 object-contain shrink-0" 
            />
            <h2 className="text-2xl sm:text-2xl font-bold tracking-tight text-white leading-none">
              КГТУ <span className="text-white font-medium whitespace-nowrap">им. И. Раззакова</span>
            </h2>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Тест на профориентацию: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 pb-1 inline-block">
              какая профессия вам подходит?
            </span>
          </h1>

          <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
            За 8 минут вы узнаете больше о себе, поймете, какие профессии вам подходят и в каких направлениях вас ждёт успех.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-full border border-slate-700/80 shadow-md shadow-slate-900/50">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-300">~8 минут</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-full border border-slate-700/80 shadow-md shadow-slate-900/50">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-300">8 факультетов</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-full border border-slate-700/80 shadow-md shadow-slate-900/50">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium text-slate-300">Точный результат</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] self-start"
          >
            <span className="text-lg">Начать тест</span>
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Right Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center relative mt-12 lg:mt-0"
        >
          <div className="relative group p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-indigo-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col">
              <div className="flex flex-col items-center justify-center w-full mb-8 relative">
                <Quote className="absolute top-0 right-0 w-10 h-10 text-blue-500/20" />
                <div className="w-24 h-24 rounded-full border-2 border-slate-700/50 shadow-md bg-slate-800 overflow-hidden shrink-0 mt-4 mx-auto block">
                  <img 
                    src="/razzakov.jpg"
                    alt="Исхак Раззаков" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="relative z-10 text-center">
                <p className="text-lg text-slate-200 leading-relaxed italic mb-8 font-medium">
                  «Мы должны воспитывать молодежь так, <br className="hidden sm:block" />
                  чтобы она любила свою Родину, <br className="hidden sm:block" />
                  была честной, трудолюбивой и образованной.»
                </p>
                <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-800">
                  <div className="h-[2px] w-8 bg-blue-500/40 rounded-full mb-3"></div>
                  <div>
                    <h3 className="text-lg font-bold text-white text-center">Исхак Раззаков</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
