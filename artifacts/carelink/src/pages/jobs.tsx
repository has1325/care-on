import { MapPin, Clock, Banknote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const jobs = [
  {
    id: 1,
    title: "아이 돌봄 선생님",
    location: "서울 강남구",
    salary: "시급 15,000원",
    time: "주 5일 / 09:00 ~ 18:00",
    desc: "아이 돌봄 및 간단한 학습 지도",
  },
  {
    id: 2,
    title: "노인 케어 매니저",
    location: "서울 송파구",
    salary: "시급 14,000원",
    time: "주 3일 / 10:00 ~ 16:00",
    desc: "어르신 일상 생활 보조 및 말벗 서비스",
  },
  {
    id: 3,
    title: "교육 돌봄 선생님",
    location: "경기 성남시",
    salary: "시급 16,000원",
    time: "주 4일 / 14:00 ~ 19:00",
    desc: "초등학생 학습 지도 및 돌봄",
  },
  {
    id: 4,
    title: "생활 케어 도우미",
    location: "인천 연수구",
    salary: "시급 13,000원",
    time: "주 5일 / 시간 협의",
    desc: "가사 및 생활 지원 서비스",
  },
];

export default function JobsPage() {
  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">구인 공고</h1>
          <p className="mt-3 text-muted-foreground text-lg">
            케어온과 함께할 돌봄 전문가를 모집합니다
          </p>
        </div>

        {/* 리스트 */}
        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-card-border rounded-2xl p-6 hover:shadow-md transition"
            >
              {/* 제목 */}
              <h3 className="text-lg font-bold text-foreground mb-3">
                {job.title}
              </h3>

              {/* 정보 */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>

                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.time}
                </div>

                <div className="flex items-center gap-1">
                  <Banknote className="w-4 h-4" />
                  {job.salary}
                </div>
              </div>

              {/* 설명 */}
              <p className="text-sm text-foreground/80 mb-5">{job.desc}</p>

              {/* 버튼 */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  채용 중
                </div>

                <Link href="/consultation">
                  <Button>지원하기</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
