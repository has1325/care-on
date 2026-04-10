import { Star, MessageSquare } from "lucide-react";

const careTypeLabel: Record<string, string> = {
  child: "아이 돌봄",
  elderly: "노인 돌봄",
  education: "교육 돌봄",
  living: "생활 케어",
};

const reviews = [
  {
    id: 1,
    authorName: "김지연",
    careType: "child",
    caregiverName: "이수진",
    rating: 5,
    content:
      "아이를 정말 정성껏 봐주셔서 안심하고 맡길 수 있었어요. 다음에도 꼭 다시 이용하고 싶습니다.",
  },
  {
    id: 2,
    authorName: "박성민",
    careType: "elderly",
    caregiverName: "최영희",
    rating: 5,
    content:
      "부모님을 세심하게 케어해주셔서 가족 모두가 만족했습니다. 응대도 친절해서 좋았습니다.",
  },
  {
    id: 3,
    authorName: "이하늘",
    careType: "education",
    caregiverName: "정민우",
    rating: 4,
    content:
      "아이 학습 습관이 많이 좋아졌어요. 숙제도 꼼꼼히 봐주시고 피드백도 좋았습니다.",
  },
  {
    id: 4,
    authorName: "최은지",
    careType: "living",
    caregiverName: "김소라",
    rating: 5,
    content:
      "집안일과 돌봄을 함께 도와주셔서 정말 큰 도움이 되었어요. 믿고 맡길 수 있는 서비스입니다.",
  },
  {
    id: 5,
    authorName: "정우성",
    careType: "child",
    caregiverName: "박지현",
    rating: 4,
    content:
      "시간 약속 잘 지키시고 아이와 잘 놀아주셔서 만족합니다. 다음에 또 이용할 예정입니다.",
  },
  {
    id: 6,
    authorName: "한지민",
    careType: "education",
    caregiverName: "이준호",
    rating: 5,
    content:
      "AI 교육 프로그램 신청했는데 아이가 너무 좋아해요. 흥미를 잘 끌어주셔서 감사해요.",
  },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">이용 후기</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            실제 이용 가족분들의 생생한 후기
          </p>
        </div>

        {reviews.length === 0 ? (
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
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* 사용자 */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-semibold text-primary text-sm">
                        {review.authorName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {review.authorName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {careTypeLabel[review.careType]} ·{" "}
                          {review.caregiverName} 선생님
                        </p>
                      </div>
                    </div>

                    {/* 별점 */}
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>

                    {/* 내용 */}
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
