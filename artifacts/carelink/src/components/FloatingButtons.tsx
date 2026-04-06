import { Link } from "wouter";
import { AlertTriangle, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <Link href="/consultation" data-testid="btn-float-consultation">
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-full shadow-xl hover:bg-primary/90 transition-all hover:scale-105 font-medium text-sm">
          <MessageCircle className="w-4 h-4" />
          상담 신청
        </button>
      </Link>
      <Link href="/emergency" data-testid="btn-float-emergency">
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-full shadow-xl hover:bg-red-600 transition-all hover:scale-105 font-medium text-sm">
          <AlertTriangle className="w-4 h-4" />
          긴급 돌봄
        </button>
      </Link>
    </div>
  );
}
