import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useListCaregivers } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CaregiverCard from "@/components/CaregiverCard";
import type { ListCaregiversParams } from "@workspace/api-client-react";

const regions = ["서울 강남구", "서울 송파구", "서울 노원구", "서울 마포구", "경기 성남시", "인천 연수구"];
const careTypes = [
  { value: "child", label: "아이 돌봄" },
  { value: "elderly", label: "노인 돌봄" },
  { value: "education", label: "교육 돌봄" },
  { value: "living", label: "생활 케어" },
];

export default function CaregiversPage() {
  const [filters, setFilters] = useState<ListCaregiversParams>({});
  const [showFilters, setShowFilters] = useState(false);

  const { data: caregiverList } = useListCaregivers(filters);

  const clearFilters = () => setFilters({});
  const hasFilters = Object.keys(filters).some((k) => filters[k as keyof ListCaregiversParams] != null);

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">돌봄 인력 찾기</h1>
          <p className="mt-2 text-muted-foreground">검증된 전문가를 필터로 빠르게 찾아보세요</p>
        </div>

        {/* Filter Section */}
        <div className="bg-card border border-card-border rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              필터 검색
            </div>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5 text-muted-foreground">
                  <X className="w-3.5 h-3.5" />
                  초기화
                </Button>
              )}
              <button
                className="md:hidden text-sm text-primary font-medium"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="btn-toggle-filters"
              >
                {showFilters ? "접기" : "펼치기"}
              </button>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters || "hidden md:grid"}`}>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">지역</label>
              <Select
                value={filters.region ?? ""}
                onValueChange={(v) => setFilters((f) => ({ ...f, region: v || undefined }))}
              >
                <SelectTrigger data-testid="select-region">
                  <SelectValue placeholder="전체 지역" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">전체 지역</SelectItem>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">돌봄 유형</label>
              <Select
                value={filters.careType ?? ""}
                onValueChange={(v) => setFilters((f) => ({ ...f, careType: (v || undefined) as typeof f.careType }))}
              >
                <SelectTrigger data-testid="select-care-type">
                  <SelectValue placeholder="전체 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">전체 유형</SelectItem>
                  {careTypes.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">성별</label>
              <Select
                value={filters.gender ?? ""}
                onValueChange={(v) => setFilters((f) => ({ ...f, gender: (v || undefined) as typeof f.gender }))}
              >
                <SelectTrigger data-testid="select-gender">
                  <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">전체</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                  <SelectItem value="male">남성</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">최소 경력 (년)</label>
              <Select
                value={filters.minExperience?.toString() ?? ""}
                onValueChange={(v) => setFilters((f) => ({ ...f, minExperience: v ? parseInt(v) : undefined }))}
              >
                <SelectTrigger data-testid="select-experience">
                  <SelectValue placeholder="전체" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">전체</SelectItem>
                  <SelectItem value="1">1년 이상</SelectItem>
                  <SelectItem value="3">3년 이상</SelectItem>
                  <SelectItem value="5">5년 이상</SelectItem>
                  <SelectItem value="10">10년 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {caregiverList ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                총 <span className="font-semibold text-foreground">{caregiverList.total}명</span>의 돌봄 인력
              </p>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                  필터 초기화
                </Button>
              )}
            </div>
            {caregiverList.caregivers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">검색 결과가 없습니다</p>
                <p className="text-sm mt-1">필터를 바꿔 다시 시도해보세요</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {caregiverList.caregivers.map((cg) => (
                  <CaregiverCard key={cg.id} caregiver={cg} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
