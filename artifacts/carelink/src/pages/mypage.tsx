import { Calendar, Heart, Star, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListBookings } from "@workspace/api-client-react";
import { Link } from "wouter";

const statusLabel: Record<string, string> = {
  pending: "대기 중",
  confirmed: "확정",
  completed: "완료",
  cancelled: "취소",
};

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-blue-100 text-blue-700",
  cancelled: "bg-gray-100 text-gray-500",
};

export default function MypagePage() {
  const bookings = useListBookings();

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">마이페이지</h1>
          <p className="mt-2 text-muted-foreground">예약 내역과 찜한 돌봄 인력을 확인하세요</p>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="mb-6">
            <TabsTrigger value="bookings" data-testid="tab-bookings">예약 내역</TabsTrigger>
            <TabsTrigger value="favorites" data-testid="tab-favorites">찜한 인력</TabsTrigger>
            <TabsTrigger value="reviews" data-testid="tab-write-reviews">후기 작성</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            {bookings ? (
              bookings.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="font-medium">예약 내역이 없습니다</p>
                  <Link href="/caregivers" className="block mt-4">
                    <Button variant="outline">돌봄 인력 찾기</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-card border border-card-border rounded-2xl p-5"
                      data-testid={`card-booking-${booking.id}`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">{booking.caregiverName}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[booking.status]}`}>
                              {statusLabel[booking.status]}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{booking.careType} · {booking.region}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {booking.startDate} {booking.endDate ? `~ ${booking.endDate}` : ""}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{booking.totalAmount.toLocaleString()}원</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites">
            <div className="text-center py-16 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">찜한 돌봄 인력이 없습니다</p>
              <p className="text-sm mt-1">마음에 드는 인력 프로필에서 찜하기를 눌러보세요</p>
              <Link href="/caregivers" className="block mt-4">
                <Button variant="outline">돌봄 인력 둘러보기</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="text-center py-16 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium">작성 가능한 후기가 없습니다</p>
              <p className="text-sm mt-1">돌봄 서비스를 이용 완료 후 후기를 작성할 수 있습니다</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
