import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  AlertTriangle, 
  Clock, 
  Handshake,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  Heart,
  Briefcase,
  Users,
  Maximize2,
  Minimize2,
  Gavel,
  Landmark,
  Scroll,
  Wifi,
  Ban,
  Network,
  BookOpen,
  ShieldAlert,
  ExternalLink
} from 'lucide-react';
import { Mermaid } from './components/Mermaid';
import { ArticleAccordion, GlossaryTerm, FloatingGlossary } from './components/Interactive';
import { Particles } from './components/Particles';
import Aurora from './components/Aurora';
import { GavelEffect } from './components/GavelEffect';

// --- Types ---
type SlideId = 'overview' | 'hero' | 'constitutional' | 'balance' | 'civil-code' | 'monitoring' | 'smart-working' | 'safety' | 'disciplinary' | 'whistleblowing' | 'social-media' | 'conclusion';

interface Slide {
  id: SlideId;
  title: string;
  x: number;
  y: number;
  scale: number;
}

const SLIDES: Slide[] = [
  { id: 'hero', title: 'Doveri del Lavoratore', x: 0, y: 0, scale: 1 },
  { id: 'constitutional', title: 'Quadro Costituzionale', x: 140, y: -40, scale: 1 },
  { id: 'balance', title: 'Bilancio Diritti/Doveri', x: 140, y: 80, scale: 1 },
  { id: 'civil-code', title: 'Codice Civile', x: 0, y: 120, scale: 1 },
  { id: 'monitoring', title: 'Potere di Controllo', x: -140, y: 120, scale: 1 },
  { id: 'smart-working', title: 'Lavoro Agile', x: -140, y: 80, scale: 1 },
  { id: 'safety', title: 'Sicurezza sul Lavoro', x: -140, y: 40, scale: 1 },
  { id: 'disciplinary', title: 'Potere Disciplinare', x: -140, y: -40, scale: 1 },
  { id: 'whistleblowing', title: 'Whistleblowing', x: -140, y: -120, scale: 1 },
  { id: 'social-media', title: 'Social Media', x: 140, y: -120, scale: 1 },
  { id: 'conclusion', title: 'Vincolo Fiduciario', x: 0, y: -80, scale: 1 },
];

export default function App() {
  const [activeSlide, setActiveSlide] = useState<SlideId>('overview');

  const disciplinaryChart = `
    graph LR
      A(Contestazione addebito) --> B(Difesa Lavoratore - 5gg)
      B --> C(Erogazione Sanzione)
      style A fill:#0A192F,stroke:#C5A059,color:#F8F9FA
      style B fill:#C5A059,stroke:#0A192F,color:#0A192F
      style C fill:#0A192F,stroke:#C5A059,color:#F8F9FA
  `;

  const currentSlideIndex = SLIDES.findIndex(s => s.id === activeSlide);
  
  const nextSlide = () => {
    if (activeSlide === 'overview') {
      setActiveSlide(SLIDES[0].id);
    } else if (currentSlideIndex < SLIDES.length - 1) {
      setActiveSlide(SLIDES[currentSlideIndex + 1].id);
    } else {
      setActiveSlide('overview');
    }
  };

  const prevSlide = () => {
    if (activeSlide === 'overview') {
      setActiveSlide(SLIDES[SLIDES.length - 1].id);
    } else if (currentSlideIndex > 0) {
      setActiveSlide(SLIDES[currentSlideIndex - 1].id);
    } else {
      setActiveSlide('overview');
    }
  };

  const goToSlide = (id: SlideId) => {
    setActiveSlide(id);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setActiveSlide('overview');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const getTransform = () => {
    if (activeSlide === 'overview') return { x: 0, y: 0, scale: 0.15 };
    const slide = SLIDES.find(s => s.id === activeSlide);
    if (!slide) return { x: 0, y: 0, scale: 1 };
    return {
      x: -slide.x * 10,
      y: -slide.y * 10,
      scale: 1
    };
  };

  const transform = getTransform();

  return (
    <div className="h-screen w-screen bg-[#050505] overflow-hidden relative font-sans selection:bg-gold/30">
      <GavelEffect trigger={activeSlide} />
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#0A192F", "#C5A059", "#0A192F"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <Particles />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-navy/40 blur-[120px] rounded-full" />
      </div>

      {/* macOS Dock-style Navigation */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-white/5 backdrop-blur-2xl px-4 py-3 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button 
          onClick={prevSlide}
          className="p-3 hover:bg-white/10 rounded-2xl text-white/80 transition-all active:scale-95"
          title="Precedente"
        >
          <ChevronLeft size={22} />
        </button>
        
        <div className="w-px h-8 bg-white/10 mx-2" />

        <div className="flex items-center gap-2">
          <button 
            onClick={() => goToSlide('overview')}
            className={`p-3 rounded-2xl transition-all active:scale-95 group relative ${activeSlide === 'overview' ? 'bg-gold text-navy shadow-lg shadow-gold/20' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
            title="Panoramica"
          >
            <Landmark size={22} />
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy/90 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap tracking-widest uppercase font-bold">Panoramica</span>
          </button>
          
          <div className="flex gap-1 items-center bg-white/5 rounded-2xl px-2 py-1 border border-white/5">
            {[
              { id: 'hero', icon: <Home size={18} />, title: 'Inizio' },
              { id: 'constitutional', icon: <Scroll size={18} />, title: 'Costituzione' },
              { id: 'balance', icon: <Scale size={18} />, title: 'Bilancio' },
              { id: 'civil-code', icon: <BookOpen size={18} />, title: 'Codice Civile' },
              { id: 'monitoring', icon: <Maximize2 size={18} />, title: 'Controllo' },
              { id: 'smart-working', icon: <Wifi size={18} />, title: 'Agile' },
              { id: 'safety', icon: <ShieldAlert size={18} />, title: 'Sicurezza' },
              { id: 'disciplinary', icon: <Gavel size={18} />, title: 'Disciplinare' },
              { id: 'whistleblowing', icon: <AlertTriangle size={18} />, title: 'Etica' },
              { id: 'social-media', icon: <Network size={18} />, title: 'Social' },
              { id: 'conclusion', icon: <CheckCircle2 size={18} />, title: 'Conclusione' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => goToSlide(s.id as SlideId)}
                className={`p-2.5 rounded-xl transition-all active:scale-95 group relative ${activeSlide === s.id ? 'bg-white/10 text-gold shadow-inner' : 'text-white/40 hover:bg-white/5 hover:text-white/80'}`}
                title={s.title}
              >
                {s.icon}
                <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy/90 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap tracking-widest uppercase font-bold">{s.title}</span>
                {activeSlide === s.id && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <button 
          onClick={nextSlide}
          className="p-3 hover:bg-white/10 rounded-2xl text-white/80 transition-all active:scale-95"
          title="Successivo"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Main Presentation Canvas */}
      {activeSlide === 'overview' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
          <div className="absolute left-10 top-0 bottom-0 w-24 bg-gradient-to-b from-white/20 via-white/5 to-white/20 border-x border-white/10" />
          <div className="absolute left-40 top-0 bottom-0 w-24 bg-gradient-to-b from-white/20 via-white/5 to-white/20 border-x border-white/10" />
          <div className="absolute right-10 top-0 bottom-0 w-24 bg-gradient-to-b from-white/20 via-white/5 to-white/20 border-x border-white/10" />
          <div className="absolute right-40 top-0 bottom-0 w-24 bg-gradient-to-b from-white/20 via-white/5 to-white/20 border-x border-white/10" />
        </div>
      )}
      <motion.div 
        className="h-full w-full flex items-center justify-center"
        animate={{ 
          x: transform.x,
          y: transform.y,
          scale: transform.scale
        }}
        transition={{ 
          type: 'spring', 
          damping: 30, 
          stiffness: 100,
          mass: 1
        }}
      >
        <div className="relative w-[1200px] h-[800px]">
          
          {/* Slide 1: Hero */}
          <SlideWrapper slide={SLIDES[0]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full flex flex-col items-center justify-center text-center p-12 bg-white/5 backdrop-blur-[60px] text-off-white rounded-[3rem] border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <MacControls />
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-navy/30 pointer-events-none" />
              <motion.div className="relative z-10">
                <span className="inline-block text-gold font-medium tracking-[0.4em] uppercase mb-8 text-[10px] bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
                  Diritto del Lavoro
                </span>
                <h1 className="font-serif text-6xl md:text-9xl mb-12 leading-tight tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  I Doveri del <br/>
                  <span className="text-gold italic">Lavoratore</span>
                </h1>
                <div className="h-px w-48 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12" />
                <p className="text-2xl font-light italic opacity-80 leading-relaxed max-w-2xl mx-auto text-white/90 mb-8">
                  Dalla Costituzione al Codice Civile: scopriamo insieme i pilastri del mondo del lavoro.
                </p>
                <LegalLink url="https://www.cliclavoro.gov.it/Cittadini/Rapporto-di-lavoro/Pagine/Obblighi-del-lavoratore.aspx" label="Guida agli Obblighi" />
              </motion.div>
            </div>
          </SlideWrapper>

          {/* Slide 2: Constitutional Framework */}
          <SlideWrapper slide={SLIDES[1]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <h2 className="font-serif text-6xl mb-4 tracking-tight text-white">Il Quadro Costituzionale</h2>
                <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">
                  Il lavoro è il motore della nostra democrazia e il valore su cui si basa l'Italia.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 overflow-y-auto max-h-[450px] shadow-2xl custom-scrollbar">
                  <div className="space-y-8">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-gold font-mono text-sm block mb-2">Articolo 1</span>
                      <p className="text-white/90 italic text-xl">"L'Italia è una Repubblica democratica, fondata sul lavoro."</p>
                      <p className="text-sm text-white/40 mt-4">Lavorare dà dignità a ogni persona e ci rende cittadini attivi.</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                      <span className="text-gold font-mono text-sm block mb-2">Articolo 4</span>
                      <p className="text-white/90 italic text-xl">Diritto e Dovere Civico.</p>
                      <p className="text-sm text-white/40 mt-4">
                        Tutti abbiamo il dovere di aiutare la società a crescere, sia economicamente che culturalmente. Lavorare bene è un impegno verso tutti gli altri.
                      </p>
                      <LegalLink url="https://www.senato.it/istituzione/la-costituzione/principi-fondamentali/articolo-4" label="Leggi Art. 4 Cost." />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl text-off-white rounded-[2.5rem] p-12 border border-white/10 flex flex-col shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                      <BookOpen className="text-gold w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-serif">Articolo 35</h3>
                  </div>
                  <div className="flex-grow flex flex-col justify-center relative z-10">
                    <p className="text-white/90 leading-relaxed italic text-2xl font-light">
                      "Lo Stato aiuta i lavoratori a crescere professionalmente e protegge il lavoro in ogni sua forma."
                    </p>
                    <div className="mt-12 p-6 bg-gold/10 rounded-2xl border border-gold/20 text-sm text-gold/80 backdrop-blur-md">
                      Lo Stato investe nelle competenze dei cittadini.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 3: Balance */}
          <SlideWrapper slide={SLIDES[2]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <h2 className="font-serif text-6xl mb-4 tracking-tight text-white">Il "Bilancio" tra Diritti e Doveri</h2>
                <p className="text-white/50 max-w-2xl mx-auto text-lg font-light">
                  A ogni tuo diritto corrisponde sempre un dovere di responsabilità.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 overflow-y-auto max-h-[450px] shadow-2xl custom-scrollbar">
                  <div className="space-y-6">
                    <ArticleAccordion article="Art. 36" title="Retribuzione">
                      <p className="text-white/80">Uno stipendio giusto in base a quanto e come lavori.</p>
                      <p className="text-sm italic text-gold/60 mt-2">Per avere lo stipendio intero, bisogna lavorare con impegno.</p>
                    </ArticleAccordion>
                    <ArticleAccordion article="Art. 37" title="Parità di Genere">
                      <p className="text-white/80">Stessi diritti e stesse retribuzioni per la donna lavoratrice.</p>
                    </ArticleAccordion>
                    <ArticleAccordion article="Art. 38" title="Previdenza">
                      <p className="text-white/80">Aiuto garantito se ti fai male o se ti ammali.</p>
                      <p className="text-sm italic text-gold/60 mt-2">Questo è possibile grazie ai contributi versati in busta paga.</p>
                    </ArticleAccordion>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-3xl text-off-white rounded-[2.5rem] p-12 border border-white/10 flex flex-col shadow-2xl relative overflow-hidden">
                  <div className="flex items-center gap-4 mb-10 relative z-10">
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                      <Scale className="text-gold w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-serif">L'Equilibrio</h3>
                  </div>
                  <div className="flex-grow flex flex-col justify-center relative z-10">
                    <p className="text-white/90 leading-relaxed text-2xl font-light">
                      Per la Costituzione, i diritti del lavoratore (come le ferie) vanno a braccetto con i suoi doveri. Se lo Stato ti protegge, tu devi lavorare con onestà e impegno.
                    </p>
                    <LegalLink url="https://www.senato.it/istituzione/la-costituzione/parte-i/titolo-iii" label="Rapporti Economici" />
                  </div>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 4: Civil Code */}
          <SlideWrapper slide={SLIDES[3]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">Codice Civile</span>
                <h2 className="font-serif text-6xl mb-4 text-white tracking-tight">Doveri Specifici</h2>
                <p className="text-white/40 text-lg font-light">Artt. 2104 e 2105: le regole pratiche del quotidiano.</p>
              </div>

              <div className="grid grid-cols-2 gap-8 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
                  <h3 className="text-2xl font-serif text-gold mb-6">Art. 2104: Diligenza e Obbedienza</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-bold">Diligenza (Perizia)</h4>
                      <p className="text-white/60 text-sm mb-2">Significa lavorare bene, in base al tuo ruolo e alle necessità dell'azienda.</p>
                      <ul className="text-[10px] text-white/40 space-y-1 ml-4 list-disc">
                        <li><strong>Competenza:</strong> Devi avere le conoscenze giuste per fare il tuo lavoro, non basta fare il minimo.</li>
                        <li><strong>Utilità:</strong> Il tuo lavoro deve servire all'azienda e deve essere fatto insieme ai colleghi.</li>
                      </ul>
                      <LegalLink url="https://www.normattiva.it/uri-res/ulex-italiana:codice.civile:1942-03-16;2104" label="Leggi Art. 2104" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Obbedienza</h4>
                      <div className="text-white/60 text-sm">Bisogna seguire le istruzioni del capo. Dire di no senza motivo è <GlossaryTerm term="Insubordinazione" />. Ma puoi rifiutarti se l'ordine è illegale o pericoloso.</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
                  <h3 className="text-2xl font-serif text-gold mb-6">Art. 2105: Obbligo di Fedeltà</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-white font-bold">Divieto di Concorrenza</h4>
                      <div className="text-white/60 text-sm">Non puoi lavorare per la concorrenza o metterti in proprio nello stesso settore mentre sei assunto. A volte questo divieto continua anche dopo il contratto, se pagato.</div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Segretezza (Riservatezza)</h4>
                      <div className="text-white/60 text-sm">Non puoi raccontare i segreti aziendali. Questo obbligo vale anche quando smetti di lavorare lì, per non danneggiare l'azienda.</div>
                      <LegalLink url="https://www.normattiva.it/uri-res/ulex-italiana:codice.civile:1942-03-16;2105" label="Leggi Art. 2105" />
                    </div>
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest text-gold/80">Clausole Generali</h4>
                      <div className="text-white/40 text-[10px] mt-2">
                        <strong>Artt. 1175 e 1375 c.c.:</strong> Bisogna sempre agire con <GlossaryTerm term="Buona Fede" />. Significa essere leali e aiutare l'azienda anche nelle piccole cose non scritte nel contratto.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 5: Monitoring */}
          <SlideWrapper slide={SLIDES[4]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">Statuto dei Lavoratori</span>
                <h2 className="font-serif text-6xl mb-4 text-white tracking-tight">Potere di Controllo</h2>
                <p className="text-white/40 text-lg font-light">Art. 4 Legge 300/1970: i limiti alla vigilanza del datore.</p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Controlli a Distanza</h3>
                  <p className="text-white/70 text-lg mb-6">Gli impianti audiovisivi possono essere impiegati esclusivamente per esigenze:</p>
                  <ul className="space-y-4 text-white/60">
                    <li className="flex items-center gap-4"><CheckCircle2 className="text-gold w-5 h-5" /> Organizzative e produttive</li>
                    <li className="flex items-center gap-4"><CheckCircle2 className="text-gold w-5 h-5" /> Sicurezza del lavoro</li>
                    <li className="flex items-center gap-4"><CheckCircle2 className="text-gold w-5 h-5" /> Tutela del patrimonio aziendale</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Condizioni di Legittimità</h3>
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-white font-bold text-sm">Accordo Sindacale</h4>
                      <p className="text-white/40 text-xs">Serve un accordo con i sindacati o il permesso dell'Ispettorato del Lavoro.</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-white font-bold text-sm">Informativa Privacy</h4>
                      <p className="text-white/40 text-xs">Devi sapere come e perché l'azienda controlla i dati.</p>
                    </div>
                    <LegalLink url="https://www.normattiva.it/uri-res/ulex-italiana:legge:1970-05-20;300" label="Statuto Lavoratori" />
                  </div>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 6: Smart Working */}
          <SlideWrapper slide={SLIDES[5]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">Lavoro Agile</span>
                <h2 className="font-serif text-6xl mb-4 text-white tracking-tight">Smart Working & Digital</h2>
                <p className="text-white/40 text-lg font-light">Legge 81/2017: flessibilità e nuovi doveri digitali.</p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Diritto alla Disconnessione</h3>
                  <div className="text-white/70 text-lg mb-6 leading-relaxed">
                    Devi essere disponibile solo negli orari concordati. Dopo, hai il <GlossaryTerm term="Diritto alla Disconnessione" />: puoi spegnere tutto e riposarti.
                  </div>
                  <div className="p-4 bg-gold/5 rounded-xl border border-gold/10 text-gold/60 text-xs italic">
                    "La prestazione lavorativa viene eseguita senza precisi vincoli di orario o di luogo di lavoro."
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Doveri di Sicurezza Digitale</h3>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-gold w-4 h-4 mt-1 shrink-0" />
                      <span>Trattare con cura il computer e il telefono che ti dà l'azienda.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-gold w-4 h-4 mt-1 shrink-0" />
                      <span>Seguire le regole per evitare virus e furti di dati.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-gold w-4 h-4 mt-1 shrink-0" />
                      <span>Non mostrare dati riservati quando lavori in luoghi pubblici (come un bar).</span>
                    </li>
                  </ul>
                  <LegalLink url="https://www.normattiva.it/uri-res/ulex-italiana:legge:2017-05-22;81" label="Leggi Legge 81/2017" />
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 7: Safety */}
          <SlideWrapper slide={SLIDES[6]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] text-off-white rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/20 relative overflow-hidden flex items-center">
              <MacControls />
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <ShieldAlert size={500} className="text-gold" />
              </div>
              
              <div className="relative z-10 grid grid-cols-2 gap-20 items-center w-full">
                <div className="space-y-10">
                  <div className="flex items-center gap-8">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-gold flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.3)]">
                      <ShieldCheck className="text-navy w-12 h-12" />
                    </div>
                    <h2 className="text-6xl font-serif tracking-tight text-white">Sicurezza sul Lavoro</h2>
                  </div>
                  <div className="space-y-6">
                    <span className="legal-article text-gold text-2xl font-mono tracking-widest">D.Lgs. 81/08</span>
                    <ul className="text-white/70 text-xl leading-relaxed font-light space-y-4">
                      <li>• Prenditi cura della tua salute e di quella dei colleghi.</li>
                      <li>• Usa bene i guanti, i caschi (<GlossaryTerm term="DPI" />) e i macchinari.</li>
                      <li>• Non togliere mai le protezioni dalle macchine.</li>
                      <li>• Segnala subito se vedi qualcosa di pericoloso.</li>
                      <li>• Non fare di testa tua se non sei stato addestrato.</li>
                      <li>• Partecipa sempre ai corsi sulla sicurezza.</li>
                    </ul>
                    <LegalLink url="https://www.normattiva.it/uri-res/ulex-italiana:decreto.legislativo:2008-04-09;81" label="Testo Unico Sicurezza" />
                  </div>
                </div>
                
                <div className="border-l border-white/10 pl-20 space-y-8">
                  <span className="text-gold font-serif text-9xl block opacity-80 leading-none">Art. 32</span>
                  <p className="text-4xl font-light italic opacity-90 leading-relaxed text-white">
                    "La salute è un diritto fondamentale di ogni persona e lo Stato la protegge."
                  </p>
                  <span className="legal-article block text-gold/60 font-bold uppercase tracking-[0.3em] text-sm">— Costituzione Italiana</span>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 8: Disciplinary */}
          <SlideWrapper slide={SLIDES[7]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-12 relative z-10">
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">Statuto dei Lavoratori</span>
                <h2 className="font-serif text-6xl mb-4 text-white tracking-tight">Potere Disciplinare</h2>
                <p className="text-white/40 text-lg font-light">Legge 300/1970 (Art. 7): garanzie contro l'arbitrio.</p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Scala delle Sanzioni</h3>
                  <p className="text-[10px] text-white/40 mb-4 italic">La punizione deve essere giusta rispetto all'errore commesso.</p>
                  <div className="space-y-3">
                    {[
                      { s: 'Rimprovero a voce', d: 'Per errori leggeri.' },
                      { s: 'Rimprovero scritto', d: 'Una lettera ufficiale.' },
                      { s: 'Multa', d: 'Ti tolgono fino a 4 ore dallo stipendio.' },
                      { s: 'Sospensione', d: 'Non lavori e non vieni pagato fino a 10 giorni.' },
                      { s: 'Licenziamento', d: 'Per errori molto gravi che rompono la fiducia.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-gold/5 transition-colors group">
                        <span className="text-white font-medium text-sm group-hover:text-gold">{item.s}</span>
                        <span className="text-[10px] text-white/30 italic">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Requisiti di Validità</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold text-xs shrink-0">1</div>
                      <p className="text-white/60 text-xs"><strong>Trasparenza:</strong> Le regole devono essere scritte e visibili a tutti (in bacheca).</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold text-xs shrink-0">2</div>
                      <p className="text-white/60 text-xs"><strong>Velocità:</strong> Il capo deve avvisarti subito se vede che hai sbagliato.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold font-bold text-xs shrink-0">3</div>
                      <p className="text-white/60 text-xs"><strong>Difesa:</strong> Hai 5 giorni per spiegare le tue ragioni prima di essere punito.</p>
                    </div>
                    <LegalLink url="https://www.normattiva.it/uri-res/ulex-italiana:legge:1970-05-20;300" label="Statuto Lavoratori" />
                  </div>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 9: Whistleblowing */}
          <SlideWrapper slide={SLIDES[8]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">Etica & Trasparenza</span>
                <h2 className="font-serif text-6xl mb-4 text-white tracking-tight">Whistleblowing</h2>
                <p className="text-white/40 text-lg font-light">D.Lgs. 24/2023: segnalare per proteggere l'interesse pubblico.</p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Dovere di Segnalazione</h3>
                  <div className="text-white/70 text-lg mb-6 leading-relaxed">
                    Se vedi qualcosa di illegale al lavoro, devi segnalarlo. Farlo non è un tradimento, ma un atto di onestà verso tutti.
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Tutela del Segnalante</h3>
                  <ul className="space-y-4 text-white/60 text-sm">
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="text-gold w-4 h-4 mt-1 shrink-0" />
                      <span><strong>Segretezza:</strong> Nessuno saprà che sei stato tu a fare la segnalazione.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Ban className="text-gold w-4 h-4 mt-1 shrink-0" />
                      <span><strong>Protezione:</strong> L'azienda non può punirti o licenziarti perché hai segnalato un problema.</span>
                    </li>
                  </ul>
                  <LegalLink url="https://www.anticorruzione.it/-/whistleblowing" label="Linee Guida ANAC" />
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 10: Social Media */}
          <SlideWrapper slide={SLIDES[9]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[60px] rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col relative overflow-hidden">
              <MacControls />
              <div className="text-center mb-16 relative z-10">
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block bg-white/5 px-6 py-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">Reputazione Aziendale</span>
                <h2 className="font-serif text-6xl mb-4 text-white tracking-tight">Social Media & Fedeltà</h2>
                <p className="text-white/40 text-lg font-light">Il dovere di fedeltà nell'era dei social network.</p>
              </div>

              <div className="grid grid-cols-2 gap-12 flex-grow relative z-10">
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Critica vs. Diffamazione</h3>
                  <div className="text-white/70 text-lg mb-6 leading-relaxed">
                    Puoi criticare l'azienda, ma devi farlo bene:
                  </div>
                  <ul className="space-y-3 text-white/50 text-sm italic">
                    <li>• <strong>Dire la verità:</strong> basati su fatti reali.</li>
                    <li>• <strong>Usare buone maniere:</strong> niente insulti.</li>
                    <li>• <strong>Utilità:</strong> parla di cose che riguardano tutti, non solo te.</li>
                  </ul>
                </div>
                <div className="bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl flex flex-col justify-center">
                  <h3 className="text-2xl font-serif text-gold mb-6">Danno all'Immagine</h3>
                  <div className="text-white/60 text-sm mb-6">
                    Scrivere insulti o bugie sull'azienda sui social è grave. Può far scattare il licenziamento immediato perché rompe la fiducia.
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-[10px] text-white/40">
                    <strong>Cassazione:</strong> "La diffusione di messaggi denigratori su Facebook integra gli estremi della diffamazione aggravata."
                  </div>
                </div>
              </div>
            </div>
          </SlideWrapper>

          {/* Slide 11: Conclusion */}
          <SlideWrapper slide={SLIDES[10]} activeSlide={activeSlide} onSelect={goToSlide}>
            <div className="h-full w-full bg-white/5 backdrop-blur-[80px] text-off-white rounded-[3rem] p-16 shadow-[0_30px_100px_rgba(0,0,0,0.6)] border border-white/20 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <MacControls />
              <div className="absolute inset-0 opacity-20">
                 <div className="absolute bottom-[-20%] right-[-20%] w-[800px] h-[800px] bg-gold rounded-full blur-[200px]" />
                 <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[180px]" />
              </div>
              
              <div className="relative z-10 max-w-4xl">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.5 }}
                  className="p-8 bg-white/5 rounded-[3rem] w-fit mx-auto mb-16 border border-white/10 backdrop-blur-xl shadow-2xl"
                >
                  <Handshake className="text-gold w-20 h-20" />
                </motion.div>
                <h2 className="font-serif text-8xl mb-12 tracking-tighter text-white drop-shadow-2xl">Il <span className="text-gold italic">Vincolo Fiduciario</span></h2>
                <div className="text-4xl font-light leading-relaxed opacity-90 mb-20 italic text-white/90">
                  Il lavoro si basa sulla fiducia reciproca. Rispettare i propri doveri significa essere parte di una comunità che cresce insieme.
                </div>
                <div className="flex flex-col items-center gap-8">
                  <div className="h-px w-64 bg-gradient-to-r from-transparent via-gold to-transparent" />
                  <LegalLink url="https://www.cliclavoro.gov.it/" label="Approfondisci su ClicLavoro" />
                </div>
                <p className="text-xs uppercase tracking-[1em] text-gold/60 font-bold bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-md w-fit mx-auto mt-16">
                  High-Fidelity Legal Education &copy; 2024
                </p>
              </div>
            </div>
          </SlideWrapper>

        </div>
      </motion.div>

      <FloatingGlossary />
    </div>
  );
}

function LegalLink({ url, label }: { url: string; label: string }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/10 mt-4 group"
    >
      <span>{label}</span>
      <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </a>
  );
}

function MacControls({ dark }: { dark?: boolean }) {
  return (
    <div className="absolute top-6 left-8 flex items-center gap-6 z-50 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-xl">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.4)]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.4)]" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.4)]" />
      </div>
      <div className="h-4 w-px bg-white/20" />
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">
        <Gavel size={12} className="text-gold" />
        <span>Corte di Giustizia</span>
      </div>
    </div>
  );
}

function SlideWrapper({ 
  slide, 
  activeSlide, 
  onSelect, 
  children 
}: { 
  slide: Slide, 
  activeSlide: SlideId, 
  onSelect: (id: SlideId) => void,
  children: React.ReactNode 
}) {
  const isOverview = activeSlide === 'overview';
  const isActive = activeSlide === slide.id;

  return (
    <motion.div
      className="absolute"
      style={{
        width: 1200,
        height: 800,
        left: '50%',
        top: '50%',
        marginLeft: -600,
        marginTop: -400,
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
      animate={{
        x: slide.x * 10,
        y: slide.y * 10,
        z: isActive ? 0 : (isOverview ? -400 : -1000),
        opacity: isOverview || isActive ? 1 : 0,
        scale: isOverview ? 0.8 : 1,
        zIndex: isActive ? 50 : 10,
        rotateX: isActive ? 0 : (isOverview ? 15 : 0),
        rotateY: isActive ? 0 : (isOverview ? -15 : 0),
        rotateZ: isActive ? 0 : (isOverview ? (slide.x > 0 ? 3 : -3) : 0),
      }}
      transition={{ 
        type: 'spring', 
        damping: 22, 
        stiffness: 70,
        mass: 1.4
      }}
      onClick={() => isOverview && onSelect(slide.id)}
    >
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            initial={{ opacity: 0, rotateY: 45, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -45, x: -100, scale: 0.9 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        )}
        {isOverview && (
          <motion.div 
            whileHover={{ scale: 1.05, z: 50, rotateY: 0, rotateX: 0 }}
            className={`h-full w-full transition-all duration-700 cursor-pointer ring-1 ring-white/10 hover:ring-gold/50 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden bg-white/5 backdrop-blur-sm`}
          >
            <div className="pointer-events-none opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              {children}
            </div>
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all rounded-[3rem] flex items-center justify-center group">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-3 rounded-2xl text-lg font-medium opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl">
                {slide.title}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
