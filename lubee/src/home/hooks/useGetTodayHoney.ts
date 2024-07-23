import { useQuery } from "react-query";
import { getTodayHoney } from "../api/getTodayHoney";

export function useGetTodayHoney(Date: Date) {
  const { data, error, isLoading } = useQuery(["getTodayHoney", Date], () => getTodayHoney({ Date }), {
    onError: (error) => {
      // 서버에서 반환한 에러 메시지를 출력
      if (error && (error as any).message) {
        console.log("오류 발생:", (error as any).message);
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    },
  });

  return { data, error, isLoading };
}
