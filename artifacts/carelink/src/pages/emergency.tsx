import { AlertTriangle, Phone, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateEmergencyRequest } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  region: z.string().min(1, "지역을 입력해주세요"),
  careType: z.enum(["child", "elderly"]),
  requestTime: z.string().min(1, "필요 시간을 입력해주세요"),
  isUrgent: z.boolean().default(true),
  description: z.string().optional(),
  contactPhone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
});

type FormData = z.infer<typeof schema>;

export default function EmergencyPage() {
  const createEmergency = useCreateEmergencyRequest();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      region: "",
      careType: "child",
      requestTime: "",
      isUrgent: true,
      description: "",
      contactPhone: "",
    },
  });

  const onSubmit = (data: FormData) => {
    createEmergency.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "긴급 요청이 접수되었습니다",
            description: "담당자가 곧 연락드리겠습니다. 평균 10분 내 매칭됩니다.",
          });
          form.reset();
        },
      }
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-24 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">긴급 돌봄 요청</h1>
          <p className="mt-2 text-muted-foreground">급하게 돌봄이 필요하신가요? 평균 10분 내 매칭해드립니다.</p>
        </div>

        <div className="flex gap-4 mb-8">
          {[
            { icon: <Clock className="w-4 h-4" />, text: "평균 10분 매칭" },
            { icon: <Phone className="w-4 h-4" />, text: "24시간 접수" },
            { icon: <MapPin className="w-4 h-4" />, text: "전국 지역 가능" },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex items-center gap-2 text-sm text-primary font-medium bg-primary/5 rounded-xl p-3">
              {item.icon}
              {item.text}
            </div>
          ))}
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>위치 / 지역</FormLabel>
                      <FormControl>
                        <Input placeholder="예: 서울 강남구" data-testid="input-emergency-region" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="careType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>돌봄 대상</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-emergency-care-type">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="child">아이</SelectItem>
                          <SelectItem value="elderly">노인/어르신</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="requestTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>필요 시간</FormLabel>
                    <FormControl>
                      <Input placeholder="예: 오늘 오후 3시~6시" data-testid="input-emergency-time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input placeholder="010-0000-0000" data-testid="input-emergency-phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상황 설명 (선택)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="돌봄이 필요한 상황을 간략히 설명해주세요"
                        data-testid="textarea-emergency-desc"
                        rows={3}
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
                variant="destructive"
                disabled={createEmergency.isPending}
                data-testid="btn-submit-emergency"
              >
                {createEmergency.isPending ? "접수 중..." : "긴급 매칭 시작"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
