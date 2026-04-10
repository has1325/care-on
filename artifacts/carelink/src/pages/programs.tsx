import { Users, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const programs = [
  {
    id: "basic",
    title: "기본 학습",
    description: "국어 · 영어 · 수학 통합 맞춤 학습",
    category: "child_education",
    level: "beginner",
    duration: "주 3회 / 60분",
    enrolledCount: 128,
    price: 150000,
  },
  {
    id: "art",
    title: "미술 교육",
    description: "드로잉과 만들기를 통한 창의력 향상",
    category: "emotional_care",
    level: "beginner",
    duration: "주 2회 / 60분",
    enrolledCount: 86,
    price: 120000,
  },
  {
    id: "ai",
    title: "AI 교육",
    description: "코딩과 AI 기초를 배우는 미래 교육",
    category: "child_education",
    level: "intermediate",
    duration: "주 2회 / 90분",
    enrolledCount: 64,
    price: 180000,
  },
  {
    id: "care-study",
    title: "생활·학습 케어 ⭐",
    description: "습관 관리 + 과제 지도 통합 프로그램",
    category: "life_care",
    level: "beginner",
    duration: "주 5회 / 60분",
    enrolledCount: 152,
    price: 200000,
  },
];

const categoryLabel: Record<string, string> = {
  child_education: "교육",
  elderly_cognitive: "인지 케어",
  emotional_care: "정서 케어",
  life_care: "생활 케어",
};

const categoryColor: Record<string, string> = {
  child_education: "bg-blue-100 text-blue-700",
  elderly_cognitive: "bg-green-100 text-green-700",
  emotional_care: "bg-pink-100 text-pink-700",
  life_care: "bg-orange-100 text-orange-700",
};

const levelLabel: Record<string, string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "고급",
};

export default function ProgramsPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">교육 프로그램</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            돌봄과 교육을 함께 - 전문 케어 프로그램
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-md transition-all"
            >
              <div className="h-36 bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColor[prog.category]}`}
                  >
                    {categoryLabel[prog.category]}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {levelLabel[prog.level]}
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-2">
                  {prog.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {prog.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {prog.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {prog.enrolledCount}명
                    </div>
                  </div>
                  <span className="font-bold text-primary">
                    {prog.price.toLocaleString()}원
                  </span>
                </div>

                <Link href="/consultation" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    수강 신청
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
