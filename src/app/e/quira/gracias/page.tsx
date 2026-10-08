import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-[#F1EEE7] text-[#343B34] flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl shadow-[#B7AC99]/10 border border-[#E4DED2]/50 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-[#7F927B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#7F927B]" />
        </div>
        <h1 className="text-2xl font-semibold mb-4 text-[#343B34]">¡Gracias por tu interés!</h1>
        <p className="text-[#B7AC99] mb-8 leading-relaxed">
          Hemos recibido tus respuestas. Una asesora de Quirá revisará tus preferencias y te contactará pronto con las opciones que mejor se ajustan a ti.
        </p>
        
        <a 
          href="https://wa.me/573000000000?text=Hola,%20acabo%20de%20completar%20la%20encuesta%20de%20Quir%C3%A1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-xl font-medium flex items-center justify-center transition-colors mb-4"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Hablar por WhatsApp
        </a>
        
        <Link href="/" className="text-sm font-medium text-[#7F927B] hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
