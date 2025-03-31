import { Modal } from "./Modal";
import { CustomBtn } from "../button/CustomButton";
import { useRouter } from "next/router";
import axiosInstance from "@/api/axiosInstance";
import { apiRoutes } from "@/api/apiRoutes";

type DeleteDashboardProps = {
  isOpen: boolean;
  onClose: () => void;
  dashboardid: string;
};

export default function DeleteDashboardModal({
  isOpen,
  onClose,
  dashboardid,
}: DeleteDashboardProps) {
  const router = useRouter();

  /* 대시보드 삭제 */
  const handleDelete = async () => {
    const dashboardIdNumber = Number(dashboardid);
    if (!dashboardid) return;
    try {
      await axiosInstance.delete(apiRoutes.DashboardDetail(dashboardIdNumber));
      router.push(`/mydashboard`);
    } catch (error) {
      alert("대시보드 삭제에 실패하였습니다 .");
      console.error("초대 실패:", error);

      window.location.reload();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="w-[327px] sm:w-[568px]"
      height="h-[160px] sm:h-[174px]"
    >
      <div className="flex flex-col sm:gap-10 gap-6 text-center">
        <p className="text-xl mt-1.5">대시보드를 정말 삭제하시겠습니까?</p>
        <div className="flex justify-between gap-3">
          <CustomBtn variant="outlineDisabled" onClick={onClose}>
            취소
          </CustomBtn>
          <CustomBtn variant="primary" onClick={handleDelete}>
            삭제
          </CustomBtn>
        </div>
      </div>
    </Modal>
  );
}
