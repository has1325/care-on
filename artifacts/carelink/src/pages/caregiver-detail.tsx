import { Link } from "wouter";
import { ArrowLeft, Star, MapPin, ShieldCheck, Heart, Clock, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetCaregiver, getGetCaregiverQueryKey, useCreateBooking } from "@workspace/api-client-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const careTypeLabel: Record<string, string> = {
  child: "아이 돌봄",
  elderly: "노인 돌봄",
  education: "교육 돌봄",
  living: "생활 케어",
};

interface Props {
  id: string;
}

export default function CaregiverDetailPage({ id }: Props) {
  const numId = parseInt(id, 10);
  const { data: caregiver } = useGetCaregiver(numId, { query: { enabled: !!numId, queryKey: getGetCaregiverQueryKey(numId) } });
  const createBooking = useCreateBooking();
  const { toast } = useToast();
  const [showBookForm, setShowBookForm] = useState(false);

  const handleBook = () => {
    if (!caregiver) return;
    createBooking.mutate(
      {
        data: {
          caregiverId: caregiver.id,
          careType: caregiver.careType,
          region: caregiver.region,
          startDate: new Date().toISOString().split("T")[0],
          hoursPerDay: 4,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "예약이 신청되었습니다", description: "확인 후 연락드리겠습니다." });
          setShowBookForm(false);
        },
      }
    );
  };

  if (!caregiver) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-muted animate-pulse mx-auto mb-4" />
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/caregivers" data-testid="btn-back">
          <Button variant="ghost" className="gap-2 mb-6 -ml-2">
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-card-border rounded-2xl p-6">
              <div className="flex items-start gap-5">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-4xl font-bold text-primary flex-shrink-0">
                  {caregiver.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-foreground">{caregiver.name}</h1>
                    {caregiver.isVerified && (
                      <div className="flex items-center gap-1 text-primary text-sm font-medium">
                        <ShieldCheck className="w-4 h-4" />
                        인증 완료
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{caregiver.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({caregiver.reviewCount}개 후기)</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    {caregiver.region}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary">{careTypeLabel[caregiver.careType]}</Badge>
                    <Badge variant="outline">경력 {caregiver.experienceYears}년</Badge>
                    {caregiver.isAvailable ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">매칭 가능</Badge>
                    ) : (
                      <Badge variant="secondary">현재 불가</Badge>
                    )}
                    {caregiver.isInsured && (
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                        <Heart className="w-3 h-3 mr-1" />
                        보험 가입
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-card border border-card-border rounded-2xl p-6">
              <h2 className="font-bold text-lg mb-3">자기소개</h2>
              <p className="text-muted-foreground leading-relaxed">
                {(caregiver as any).fullBio || caregiver.shortBio}
              </p>
            </div>

            {/* Certificates */}
            {(caregiver as any).certificates?.length > 0 && (
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  자격증 & 수료
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(caregiver as any).certificates.map((cert: string) => (
                    <span key={cert} className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule */}
            {(caregiver as any).availableSchedule?.length > 0 && (
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  가능한 시간
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(caregiver as any).availableSchedule.map((s: string) => (
                    <span key={s} className="px-3 py-1.5 bg-secondary/10 text-secondary-foreground text-sm rounded-lg font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-4">
            <div className="bg-card border border-card-border rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-5">
                <div className="text-3xl font-bold text-primary">{caregiver.hourlyRate.toLocaleString()}원</div>
                <div className="text-sm text-muted-foreground">/시간</div>
              </div>
              <Button
                className="w-full mb-3"
                size="lg"
                onClick={handleBook}
                disabled={createBooking.isPending || !caregiver.isAvailable}
                data-testid="btn-book-now"
              >
                {createBooking.isPending ? "예약 중..." : "바로 예약"}
              </Button>
              <Link href="/consultation" data-testid="btn-consult-caregiver">
                <Button variant="outline" className="w-full" size="lg">
                  상담 요청
                </Button>
              </Link>
              {!caregiver.isAvailable && (
                <p className="text-center text-sm text-muted-foreground mt-3">현재 매칭이 불가능합니다</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
