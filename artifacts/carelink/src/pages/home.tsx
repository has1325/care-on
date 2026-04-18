import { Link } from "wouter";
import {
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Star,
  Heart,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useGetFeaturedCaregivers,
  useGetMatchingStatus,
} from "@workspace/api-client-react";
import CaregiverCard from "@/components/CaregiverCard";
import heroImage from "@/assets/hero.png";

const serviceTypes = [
  {
    icon: "👶",
    title: "아이 돌봄",
    desc: "신생아부터 초등까지 맞춤 케어",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    href: "/caregivers?careType=child",
  },
  {
    icon: "🧓",
    title: "노인 돌봄",
    desc: "어르신 전문 케어 & 생활 지원",
    color: "bg-green-50 border-green-200 text-green-700",
    href: "/caregivers?careType=elderly",
  },
  {
    icon: "📚",
    title: "교육 돌봄",
    desc: "학습 지도 + 돌봄 통합 서비스",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    href: "/caregivers?careType=education",
  },
  {
    icon: "🏠",
    title: "생활 케어",
    desc: "일상 생활 전반 지원 서비스",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    href: "/caregivers?careType=living",
  },
];

const trustItems = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    text: "신원 인증 완료",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-primary" />,
    text: "교육 수료 확인",
  },
  {
    icon: <Star className="w-5 h-5 text-primary" />,
    text: "후기 기반 평점 시스템",
  },
  { icon: <Heart className="w-5 h-5 text-primary" />, text: "보험 가입 필수" },
];

export default function HomePage() {
  const { data } = useGetFeaturedCaregivers();
  const { data: matchingStatus } = useGetMatchingStatus();

  let caregivers: any[] = [];

  try {
    if (Array.isArray(data)) {
      caregivers = data;
    } else if (data && typeof data === "object" && Array.isArray((data as any).data)) {
      caregivers = (data as any).data;
    } else {
      caregivers = [];
    }
  } catch (e) {
    console.error("데이터 파싱 실패", e);
    caregivers = [];
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        {/* 배경 이미지 */}
        <img
          src={heroImage}
          alt="메인 이미지"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 어두운 오버레이 (텍스트 가독성) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* 기존 배경 효과 유지 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(174,60%,32%,0.08)_0%,_transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full flex items-center">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 border-white/30">
              검증된 전문 돌봄 인력 매칭
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              우리 아이와
              <br />
              <span className="text-primary">부모님을 위한</span>
              <br />
              맞춤 돌봄
            </h1>

            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              검증된 전문가를 직접 선택하세요. 신원 확인, 교육 수료, 보험
              가입까지 모두 갖춘 믿을 수 있는 돌봄 인력을 빠르게 매칭해드립니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/caregivers" data-testid="btn-hero-find">
                <Button size="lg" className="gap-2 px-6">
                  돌봄 인력 찾기
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/emergency" data-testid="btn-hero-emergency">
                <Button size="lg" variant="destructive" className="gap-2 px-6">
                  <AlertTriangle className="w-4 h-4" />
                  긴급 요청
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Matching Status */}
      {matchingStatus && (
        <section className="py-6 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium">실시간 매칭 현황</span>
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 opacity-80" />
                  <span>
                    현재 대기 돌봄 인력:{" "}
                    <strong>{matchingStatus.availableCaregivers}명</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 opacity-80" />
                  <span>
                    지금 매칭:{" "}
                    <strong>
                      {matchingStatus.isMatchingAvailable ? "가능" : "대기 중"}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 opacity-80" />
                  <span>
                    평균 매칭 시간:{" "}
                    <strong>약 {matchingStatus.averageMatchMinutes}분</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Caregivers */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                추천 돌봄 인력
              </h2>
              <p className="mt-2 text-muted-foreground">
                검증되고 평점 높은 전문가를 소개합니다
              </p>
            </div>
            <Link href="/caregivers" data-testid="link-see-all-caregivers">
              <Button variant="outline" className="gap-2">
                전체 보기
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          {featuredCaregivers ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredCaregivers.map((cg) => (
                <CaregiverCard key={cg.id} caregiver={cg} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl bg-muted animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">서비스 유형</h2>
            <p className="mt-2 text-muted-foreground">
              필요에 맞는 돌봄 서비스를 선택하세요
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceTypes.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                data-testid={`card-service-${s.title}`}
              >
                <div
                  className={`p-6 rounded-2xl border-2 cursor-pointer hover:scale-105 transition-transform duration-200 ${s.color}`}
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-base mb-1">{s.title}</h3>
                  <p className="text-xs opacity-80">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">
              왜 케어온인가요?
            </h2>
            <p className="mt-2 text-muted-foreground">
              철저한 검증으로 믿을 수 있는 돌봄을 제공합니다
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-card-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <p className="font-semibold text-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 돌봄 인력을 찾아보세요
          </h2>
          <p className="text-white/80 text-lg mb-8">
            평균 10분 이내 매칭 완료. 지금 바로 시작하세요.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/caregivers" data-testid="btn-cta-find">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 px-8 text-base font-semibold"
              >
                돌봄 인력 찾기
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/consultation" data-testid="btn-cta-consultation">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 text-base font-semibold bg-transparent border-white text-white hover:bg-white/10"
              >
                무료 상담 신청
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
