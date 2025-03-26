import { useRouter } from "next/router";
import HeaderBebridge from "@/components/Gnb/HeaderBebridge";

export default function Dashboard() {
  const router = useRouter();
  const { dashboardId } = router.query;

  return (
    <div>
      <HeaderBebridge dashboardId={dashboardId} />
      <h1>대시보드 페이지</h1>
      <br />
      <h1>dashboardId : {dashboardId}</h1>
    </div>
  );
}
