import { Users, BookOpen, MessageSquare, AlertTriangle, Star, BarChart3 } from "lucide-react";
import { useGetDashboardStats, useListConsultations, useListEmergencyRequests } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

const statusLabel: Record<string, string> = {
  pending: "대기 중",
  matching: "매칭 중",
  matched: "매칭 완료",
  completed: "완료",
  scheduled: "예약됨",
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  matching: "bg-blue-100 text-blue-700",
  matched: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  scheduled: "bg-purple-100 text-purple-700",
};

const careTypeLabel: Record<string, string> = {
  child: "아이 돌봄",
  elderly: "노인 돌봄",
  education: "교육 돌봄",
  living: "생활 케어",
};

export default function AdminPage() {
  const { data: stats } = useGetDashboardStats();
  const { data: consultations } = useListConsultations();
  const { data: emergencyRequests } = useListEmergencyRequests();

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">관리자 대시보드</h1>
          </div>
          <p className="mt-2 text-muted-foreground">케어링크 플랫폼 현황을 한눈에 확인하세요</p>
        </div>

        {/* Stats */}
        {stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { label: "전체 돌봄 인력", value: stats.totalCaregivers, icon: <Users className="w-5 h-5 text-primary" />, color: "bg-primary/5" },
              { label: "전체 예약", value: stats.totalBookings, icon: <BookOpen className="w-5 h-5 text-secondary" />, color: "bg-secondary/5" },
              { label: "전체 후기", value: stats.totalReviews, icon: <Star className="w-5 h-5 text-yellow-500" />, color: "bg-yellow-50" },
              { label: "평균 평점", value: stats.averageRating.toFixed(1), icon: <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />, color: "bg-yellow-50" },
              { label: "전체 상담", value: stats.totalConsultations, icon: <MessageSquare className="w-5 h-5 text-blue-500" />, color: "bg-blue-50" },
              { label: "오늘 긴급 요청", value: stats.emergencyRequestsToday, icon: <AlertTriangle className="w-5 h-5 text-red-500" />, color: "bg-red-50" },
            ].map((item, i) => (
              <div key={i} className={`${item.color} rounded-2xl p-5 border border-border`} data-testid={`stat-${i}`}>
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="text-sm text-muted-foreground font-medium">{item.label}</span>
                </div>
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        )}

        {/* Care Type Breakdown */}
        {stats && (
          <div className="bg-card border border-card-border rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-lg mb-4">돌봄 유형별 인력 현황</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.careTypeBreakdown.map((item) => (
                <div key={item.type} className="text-center p-4 bg-muted/30 rounded-xl" data-testid={`breakdown-${item.type}`}>
                  <p className="text-2xl font-bold text-primary">{item.count}</p>
                  <p className="text-sm text-muted-foreground mt-1">{careTypeLabel[item.type] || item.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Emergency Requests */}
          <div className="bg-card border border-card-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              긴급 요청 현황
            </h2>
            {emergencyRequests ? (
              emergencyRequests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">긴급 요청이 없습니다</p>
              ) : (
                <div className="space-y-3">
                  {emergencyRequests.slice(0, 5).map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl" data-testid={`row-emergency-${req.id}`}>
                      <div>
                        <p className="text-sm font-medium">{req.region} · {careTypeLabel[req.careType]}</p>
                        <p className="text-xs text-muted-foreground">{req.contactPhone}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[req.status]}`}>
                        {statusLabel[req.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            )}
          </div>

          {/* Consultations */}
          <div className="bg-card border border-card-border rounded-2xl p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              상담 신청 현황
            </h2>
            {consultations ? (
              consultations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8 text-sm">상담 신청이 없습니다</p>
              ) : (
                <div className="space-y-3">
                  {consultations.slice(0, 5).map((c) => (
                    <div key={c.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl" data-testid={`row-consultation-${c.id}`}>
                      <div>
                        <p className="text-sm font-medium">{c.name} · {careTypeLabel[c.careType] || c.careType}</p>
                        <p className="text-xs text-muted-foreground">{c.phone}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.status]}`}>
                        {statusLabel[c.status]}
                      </span>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
