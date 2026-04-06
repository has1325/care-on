import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListPlans } from "@workspace/api-client-react";
import { Link } from "wouter";

export default function PricingPage() {
  const { data: plans } = useListPlans();

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">구독 플랜</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            정기 구독으로 더 저렴하고 안정적인 돌봄을 받으세요
          </p>
        </div>

        {plans ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-card rounded-2xl border-2 p-7 flex flex-col transition-all ${
                  plan.isPopular
                    ? "border-primary shadow-lg scale-105"
                    : "border-card-border hover:border-primary/40"
                }`}
                data-testid={`card-plan-${plan.slug}`}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4">
                    인기
                  </Badge>
                )}
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">주 {plan.weeklyVisits}회 방문</p>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="text-4xl font-bold text-primary">
                      {plan.monthlyPrice.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground pb-1">원/월</span>
                  </div>
                  {plan.includesEducation && (
                    <Badge variant="secondary" className="mt-2">교육 프로그램 포함</Badge>
                  )}
                </div>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/consultation" className="mt-7">
                  <Button
                    className="w-full"
                    variant={plan.isPopular ? "default" : "outline"}
                    data-testid={`btn-plan-select-${plan.slug}`}
                  >
                    시작하기
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            맞춤형 상담이 필요하신가요?{" "}
            <Link href="/consultation" className="text-primary font-medium hover:underline">
              전문 상담사에게 문의
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
