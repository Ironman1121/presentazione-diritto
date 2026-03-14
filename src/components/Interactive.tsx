import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info, X, Book } from 'lucide-react';

// --- Glossary Data ---

const glossaryData: Record<string, string> = {
  'Diligenza': 'Grado di attenzione e cura richiesto nell\'adempimento della prestazione lavorativa (Art. 2104 c.c.).',
  'Perizia': 'Complesso di cognizioni tecniche e abilità pratiche necessarie per svolgere correttamente una specifica mansione.',
  'Vincolo Fiduciario': 'Elemento soggettivo del rapporto di lavoro che implica la reciproca fiducia tra le parti; la sua rottura può giustificare il licenziamento.',
  'Buona Fede': 'Dovere di correttezza e lealtà nell\'esecuzione del contratto, agendo per salvaguardare l\'interesse altrui nei limiti del proprio.',
  'Subordinazione': 'Vincolo di soggezione del lavoratore al potere direttivo, organizzativo e disciplinare del datore di lavoro.',
  'DPI': 'Dispositivi di Protezione Individuale (es. caschi, guanti) necessari per la sicurezza sul lavoro.',
  'Giusta Causa': 'Grave inadempimento o fatto esterno che non consente la prosecuzione, neppure provvisoria, del rapporto di lavoro.',
  'Giustificato Motivo': 'Inadempimento degli obblighi contrattuali (soggettivo) o ragioni inerenti all\'attività produttiva (oggettivo).',
  'Statuto dei Lavoratori': 'Legge 300/1970, fondamentale per la tutela della dignità, libertà e attività sindacale nei luoghi di lavoro.',
  'Codice Disciplinare': 'Documento aziendale che deve essere affisso e che elenca le infrazioni e le sanzioni applicabili.',
  'Insubordinazione': 'Rifiuto ingiustificato di ottemperare agli ordini legittimi impartiti dai superiori gerarchici.',
  'Danno all\'Immagine': 'Pregiudizio arrecato alla reputazione dell\'azienda a causa di comportamenti scorretti del lavoratore.',
  'Patto di Non Concorrenza': 'Accordo scritto che limita l\'attività del lavoratore dopo la fine del rapporto, in cambio di un corrispettivo (Art. 2125 c.c.).',
  'Obbligo di Riservatezza': 'Dovere di non divulgare informazioni aziendali protette, segreti commerciali o dati sensibili dei clienti.',
  'Jus Resistendi': 'Diritto del lavoratore di rifiutare un ordine palesemente illegittimo, illecito o pericoloso per la propria incolumità.',
};

// --- Components ---

export const GlossaryTerm: React.FC<{ term: string; children?: React.ReactNode }> = ({ term, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const definition = glossaryData[term] || "Definizione non disponibile.";

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b border-gold/40 group-hover:border-gold transition-colors">
        {children || term}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-navy/90 backdrop-blur-xl text-off-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/10 z-[200] text-xs leading-relaxed pointer-events-none block"
          >
            <span className="font-bold text-gold mb-2 uppercase tracking-tighter block">{term}</span>
            {definition}
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy/90 rotate-45 border-r border-b border-white/10 block" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export const FloatingGlossary: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-8 right-8 z-[150]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-3 rounded-2xl shadow-2xl hover:bg-white/20 transition-all"
      >
        <Book size={20} className="text-gold" />
        <span className="text-sm font-medium">Glossario Legale</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="absolute top-16 right-0 w-80 max-h-[70vh] bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-navy/5 flex items-center justify-between bg-navy/5">
                <h3 className="font-serif text-xl text-navy">Glossario</h3>
                <button onClick={() => setIsOpen(false)} className="text-navy/40 hover:text-navy">
                  <X size={20} />
                </button>
              </div>
              <div className="overflow-y-auto p-6 space-y-6">
                {Object.entries(glossaryData).map(([term, def]) => (
                  <div key={term} className="group">
                    <h4 className="font-bold text-navy mb-1 group-hover:text-gold transition-colors">{term}</h4>
                    <p className="text-xs text-navy/60 leading-relaxed font-light">{def}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AccordionProps {
  title: string;
  article: string;
  children: React.ReactNode;
}

export const ArticleAccordion: React.FC<AccordionProps> = ({ title, article, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-navy/5 bg-white/40 backdrop-blur-sm transition-all hover:bg-white/60">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">{article}</span>
          <span className="font-serif text-lg text-navy">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="text-navy/30"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-navy/70 text-sm leading-relaxed border-t border-navy/5 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
