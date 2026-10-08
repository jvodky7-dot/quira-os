"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import { ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SurveyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { leads } = useStore();
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const utms = {
    utm_source: searchParams.get('utm_source') || undefined,
    utm_campaign: searchParams.get('utm_campaign') || undefined,
    utm_content: searchParams.get('utm_content') || undefined,
    campaign_id: searchParams.get('campaign_id') || undefined,
    ad_id: searchParams.get('ad_id') || undefined,
  };

  const steps = [
    {
      id: 'purpose',
      question: '¿Para qué buscas apartamento?',
      options: ['Para vivir', 'Para invertir', 'Estoy explorando']
    },
    {
      id: 'timeframe',
      question: '¿Cuándo te gustaría comprar?',
      options: ['0–3 meses', '3–6 meses', '6–12 meses', 'Más adelante', 'Aún no lo sé']
    },
    {
      id: 'priorities',
      question: '¿Qué valoras más al elegir vivienda?',
      multi: true,
      options: ['Mayor espacio', 'Precio', 'Flexibilidad de pago', 'Ubicación', 'Parqueadero']
    },
    {
      id: 'budget',
      question: '¿En qué rango de presupuesto estás buscando?',
      options: ['Menos de 300M', '300M - 450M', 'Más de 450M', 'Prefiero hablar con una asesora']
    },
    {
      id: 'contact',
      question: 'Tus datos de contacto',
      type: 'form'
    }
  ];

  const handleSelect = (id: string, value: string, isMulti?: boolean) => {
    if (isMulti) {
      const current = answers[id] || [];
      const updated = current.includes(value) 
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [id]: updated });
    } else {
      setAnswers({ ...answers, [id]: value });
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const utmParams = {
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_content: searchParams.get('utm_content') || ''
      };

      await useStore.getState().submitSurvey({
        answers,
        utmParams,
        campaignId: searchParams.get('campaign_id') || undefined
      });

      router.push('/e/quira/gracias');
    } catch (err) {
      console.error('Failed to submit survey:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen bg-[#F1EEE7] text-[#343B34] flex flex-col items-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-xl flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-xl font-semibold tracking-tight text-[#7F927B]">Quirá</div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="text-[#B7AC99] hover:text-[#343B34] flex items-center text-sm transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Volver
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="h-1.5 w-full bg-[#E4DED2] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#7F927B] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-[#B7AC99] text-right">
            Paso {step + 1} de {steps.length}
          </div>
        </div>

        {/* Question Area */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl shadow-[#B7AC99]/10 border border-[#E4DED2]/50 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-medium mb-6 leading-tight">{currentStep.question}</h2>

              {currentStep.type === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#7F927B] mb-1">Nombre completo *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-3 bg-[#F1EEE7] border border-[#E4DED2] rounded-xl focus:ring-2 focus:ring-[#7F927B] focus:border-transparent outline-none transition-all"
                      value={answers.name || ''}
                      onChange={e => setAnswers({...answers, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7F927B] mb-1">Celular *</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full p-3 bg-[#F1EEE7] border border-[#E4DED2] rounded-xl focus:ring-2 focus:ring-[#7F927B] focus:border-transparent outline-none transition-all"
                      value={answers.phone || ''}
                      onChange={e => setAnswers({...answers, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7F927B] mb-1">Email (Opcional)</label>
                    <input 
                      type="email" 
                      className="w-full p-3 bg-[#F1EEE7] border border-[#E4DED2] rounded-xl focus:ring-2 focus:ring-[#7F927B] focus:border-transparent outline-none transition-all"
                      value={answers.email || ''}
                      onChange={e => setAnswers({...answers, email: e.target.value})}
                    />
                  </div>
                  <div className="flex items-start mt-6">
                    <input 
                      required
                      type="checkbox" 
                      id="consent"
                      className="mt-1 mr-3 w-4 h-4 rounded text-[#7F927B] focus:ring-[#7F927B]"
                      checked={answers.consent || false}
                      onChange={e => setAnswers({...answers, consent: e.target.checked})}
                    />
                    <label htmlFor="consent" className="text-xs text-[#B7AC99] leading-relaxed">
                      Autorizo el tratamiento de mis datos personales para fines comerciales y de contacto, conforme a la <a href="/privacidad" className="underline hover:text-[#7F927B]">política de privacidad</a>.
                    </label>
                  </div>
                  
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full mt-8 bg-[#343B34] hover:bg-[#111411] text-white p-4 rounded-xl font-medium flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Conocer mis opciones'}
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  {currentStep.options?.map(opt => {
                    const isSelected = currentStep.multi 
                      ? (answers[currentStep.id] || []).includes(opt)
                      : answers[currentStep.id] === opt;
                      
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelect(currentStep.id, opt, currentStep.multi)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected 
                            ? 'border-[#7F927B] bg-[#7F927B]/5' 
                            : 'border-[#E4DED2] hover:border-[#B7AC99] hover:bg-[#F1EEE7]'
                        }`}
                      >
                        <span className={`font-medium ${isSelected ? 'text-[#7F927B]' : 'text-[#343B34]'}`}>
                          {opt}
                        </span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#7F927B]" />}
                      </button>
                    )
                  })}
                  
                  {currentStep.multi && (
                    <button 
                      onClick={() => setStep(step + 1)}
                      className="w-full mt-4 bg-[#7F927B] hover:bg-[#96a992] text-white p-4 rounded-xl font-medium transition-colors"
                    >
                      Continuar
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1EEE7] flex items-center justify-center">Cargando...</div>}>
      <SurveyForm />
    </Suspense>
  );
}
