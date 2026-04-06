import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateConsultation } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요").optional().or(z.literal("")),
  careType: z.string().min(1, "돌봄 유형을 선택해주세요"),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
  consultationType: z.enum(["phone", "kakao", "visit"]),
});

type FormData = z.infer<typeof schema>;

export default function ConsultationPage() {
  const createConsultation = useCreateConsultation();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      careType: "",
      preferredTime: "",
      message: "",
      consultationType: "phone",
    },
  });

  const onSubmit = (data: FormData) => {
    createConsultation.mutate(
      { data: { ...data, email: data.email || undefined } },
      {
        onSuccess: () => {
          toast({
            title: "상담 신청이 완료되었습니다",
            description: "1영업일 내 담당자가 연락드리겠습니다.",
          });
          form.reset();
        },
      }
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-foreground">상담 신청</h1>
          <p className="mt-3 text-muted-foreground">궁금한 점을 전문 상담사에게 직접 문의하세요</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <a href="tel:1588-0000" data-testid="btn-phone-consult">
            <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 cursor-pointer hover:bg-primary/10 transition-colors">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">전화 상담</p>
                <p className="text-xs text-muted-foreground">1588-0000</p>
              </div>
            </div>
          </a>
          <a href="https://open.kakao.com" target="_blank" rel="noopener noreferrer" data-testid="btn-kakao-consult">
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 cursor-pointer hover:bg-yellow-100 transition-colors">
              <MessageCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">카카오톡 상담</p>
                <p className="text-xs text-muted-foreground">바로 채팅하기</p>
              </div>
            </div>
          </a>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-5">온라인 상담 신청</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" data-testid="input-name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="010-0000-0000" data-testid="input-phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일 (선택)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@email.com" data-testid="input-email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="careType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>돌봄 유형</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-consult-care-type">
                            <SelectValue placeholder="선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="child">아이 돌봄</SelectItem>
                          <SelectItem value="elderly">노인 돌봄</SelectItem>
                          <SelectItem value="education">교육 돌봄</SelectItem>
                          <SelectItem value="living">생활 케어</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consultationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>상담 방법</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-consult-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="phone">전화 상담</SelectItem>
                          <SelectItem value="kakao">카카오톡</SelectItem>
                          <SelectItem value="visit">방문 상담</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>희망 상담 시간 (선택)</FormLabel>
                    <FormControl>
                      <Input placeholder="예: 평일 오후 2~4시" data-testid="input-preferred-time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>문의 내용 (선택)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="궁금한 점이나 특별한 요구 사항을 적어주세요"
                        rows={4}
                        data-testid="textarea-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={createConsultation.isPending}
                data-testid="btn-submit-consultation"
              >
                {createConsultation.isPending ? "신청 중..." : "상담 신청하기"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
