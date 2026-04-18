import { Link } from "wouter";
import { Star, MapPin, ShieldCheck, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GetFeaturedCaregiversResponseItem } from "@workspace/api-client-react";

const careTypeLabel: Record<string, string> = {
  child: "아이 돌봄",
  elderly: "노인 돌봄",
  education: "교육 돌봄",
  living: "생활 케어",
};

const careTypeColor: Record<string, string> = {
  child: "bg-blue-100 text-blue-700",
  elderly: "bg-green-100 text-green-700",
  education: "bg-purple-100 text-purple-700",
  living: "bg-orange-100 text-orange-700",
};

interface Props {
  caregiver: GetFeaturedCaregiversResponseItem;
}

export default function CaregiverCard({ caregiver }: Props) {
  if (!caregiver) return null;

  return (
    <div
      className="bg-card rounded-2xl border border-card-border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
      data-testid={`card-caregiver-${caregiver.id}`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
            {caregiver.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground text-lg">{caregiver.name}</h3>
              {caregiver.isVerified && (
                <ShieldCheck className="w-4 h-4 text-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{caregiver.rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({caregiver.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {caregiver.region}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${careTypeColor[caregiver.careType]}`}>
            {careTypeLabel[caregiver.careType]}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
            경력 {caregiver.experienceYears}년
          </span>
          {caregiver.isAvailable ? (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              매칭 가능
            </span>
          ) : (
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              현재 불가
            </span>
          )}
        </div>

        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{caregiver.shortBio}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="font-semibold text-foreground">{caregiver.hourlyRate.toLocaleString()}원</span>
            <span className="text-muted-foreground">/시간</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/caregivers/${caregiver.id}`} className="flex-1" data-testid={`btn-profile-${caregiver.id}`}>
            <Button variant="outline" size="sm" className="w-full">
              프로필 보기
            </Button>
          </Link>
          <Link href={`/caregivers/${caregiver.id}?book=true`} className="flex-1" data-testid={`btn-book-${caregiver.id}`}>
            <Button size="sm" className="w-full">
              예약하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
