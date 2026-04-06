import { Star, MessageSquare } from "lucide-react";
import { useListReviews } from "@workspace/api-client-react";

const careTypeLabel: Record<string, string> = {
  child: "아이 돌봄",
  elderly: "노인 돌봄",
  education: "교육 돌봄",
  living: "생활 케어",
};

export default function ReviewsPage() {
  const { data: reviews } = useListReviews({ limit: 20 });

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">이용 후기</h1>
          <p className="mt-3 text-muted-foreground text-lg">실제 이용 가족분들의 생생한 후기를 확인하세요</p>
        </div>

        {reviews ? (
          reviews.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>아직 등록된 후기가 없습니다</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card border border-card-border rounded-2xl p-6"
                  data-testid={`card-review-${review.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-semibold text-primary text-sm">
                          {review.authorName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{review.authorName}</p>
                          <p className="text-xs text-muted-foreground">
                            {careTypeLabel[review.careType]} · {review.caregiverName} 선생님
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-foreground/80 text-sm leading-relaxed">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-36 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
