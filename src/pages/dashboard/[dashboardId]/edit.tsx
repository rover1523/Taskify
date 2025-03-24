import { useRouter } from "next/router";
import ChangeBebridge from "@/components/modal/ChangeBebridge";

export default function EditDashboard() {
  const router = useRouter();
  const { dashboardId } = router.query; // 동적 파라미터 가져오기

  return (
    <div>
      <h1>대시보드 수정 페이지 {dashboardId}</h1>
      <br />
      <h1>dashboardId : {dashboardId}</h1>
      <ChangeBebridge />
    </div>
  );
}
