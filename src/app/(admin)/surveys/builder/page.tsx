"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Settings2, Save, GripVertical, Trash2 } from "lucide-react";

export default function SurveyBuilderPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([
    { id: '1', title: 'Presupuesto estimado', type: 'select', options: ['< 200M', '200M-300M', '300M-400M', '> 400M'] },
    { id: '2', title: 'Propósito de compra', type: 'select', options: ['Vivienda Principal', 'Inversión'] },
    { id: '3', title: 'Datos Personales', type: 'contact', options: [] },
  ]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-elevated rounded-full transition-colors text-muted-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Constructor de Encuestas (P1)</h2>
            <p className="text-muted-foreground mt-1 text-sm">Editor visual para versionado dinámico y A/B Testing.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 border border-border bg-surface text-foreground rounded-lg font-medium text-sm hover:bg-surface-elevated transition-colors">
            <Settings2 className="w-4 h-4 mr-2" />
            Configurar Versión
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4 mr-2" />
            Guardar como v1.1
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-surface border border-border rounded-xl shadow-sm p-6 flex flex-col md:flex-row gap-8">
        {/* Editor Area */}
        <div className="flex-1 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">Flujo de Preguntas</h3>
          
          {questions.map((q, idx) => (
            <div key={q.id} className="group bg-background border border-border p-4 rounded-xl flex gap-4 hover:border-primary/50 transition-colors cursor-default">
              <div className="cursor-grab text-muted-foreground pt-1"><GripVertical className="w-5 h-5" /></div>
              <div className="flex-1">
                <input 
                  type="text" 
                  value={q.title} 
                  onChange={(e) => {
                    const newQ = [...questions];
                    newQ[idx].title = e.target.value;
                    setQuestions(newQ);
                  }}
                  className="bg-transparent text-sm font-medium text-foreground outline-none w-full mb-3 focus:border-b focus:border-primary"
                />
                
                {q.type === 'select' && (
                  <div className="space-y-2 ml-2">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full border border-primary bg-primary/20"></div>
                        <input 
                          type="text" 
                          value={opt} 
                          onChange={(e) => {
                            const newQ = [...questions];
                            newQ[idx].options[oIdx] = e.target.value;
                            setQuestions(newQ);
                          }}
                          className="text-xs bg-transparent text-muted-foreground outline-none focus:text-foreground"
                        />
                      </div>
                    ))}
                    <button className="text-xs text-primary font-medium mt-2 hover:underline">+ Añadir Opción</button>
                  </div>
                )}
                {q.type === 'contact' && (
                  <div className="text-xs text-muted-foreground bg-surface-elevated p-3 rounded mt-2 border border-border">
                    Formulario base: Nombre, Celular, Correo, Consentimiento. (Fijo)
                  </div>
                )}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                <button onClick={() => setQuestions(questions.filter(x => x.id !== q.id))} className="text-muted-foreground hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setQuestions([...questions, { id: Date.now().toString(), title: 'Nueva Pregunta', type: 'select', options: ['Opción 1'] }])}
            className="w-full py-4 border-2 border-dashed border-border text-muted-foreground rounded-xl flex items-center justify-center font-medium hover:bg-surface-elevated hover:text-foreground transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Bloque
          </button>
        </div>

        {/* Settings Area */}
        <div className="w-full md:w-80 space-y-6">
          <div className="p-4 border border-border rounded-xl bg-background">
            <h4 className="font-semibold text-sm mb-4">A/B Testing</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Distribución de tráfico</span>
                <span className="font-medium">50%</span>
              </label>
              <input type="range" className="w-full accent-primary" defaultValue={50} />
              <p className="text-xs text-muted-foreground mt-2">50% del tráfico verá la <strong>v1.1</strong>, el resto la versión base.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
