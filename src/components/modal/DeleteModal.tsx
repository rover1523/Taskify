import React from "react";
import { Modal } from "@/components/modal/Modal";
import { CustomBtn } from "../button/CustomButton";
import { toast } from "react-toastify";

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  isConfirmDeleteModalOpen: boolean;
  setIsConfirmDeleteModalOpen: (open: boolean) => void;
  selectedTitle: string | null;
  selectedCreatedByMe: boolean | null;
  handleDelete: () => void;
  handleLeave: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  isConfirmDeleteModalOpen,
  setIsConfirmDeleteModalOpen,
  selectedTitle,
  selectedCreatedByMe,
  handleDelete,
  handleLeave,
}) => {
  return (
    <>
      <Modal
        width="w-[260px]"
        height="h-[150px]"
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="flex items-center justify-center text-center"
      >
        <div className="flex flex-col items-center gap-1 text-center min-h-[60px]">
          <div className="text-[var(--primary)] font-16m">{selectedTitle}</div>
          <div className="text-black3 font-16m">
            {selectedCreatedByMe
              ? "대시보드를 삭제하시겠습니까?"
              : "대시보드에서 나가시겠습니까?"}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <CustomBtn
            onClick={() => setIsDeleteModalOpen(false)}
            className="cursor-pointer border px-3 py-1 rounded-md w-[84px] h-[32px] text-[var(--primary)] border-[var(--color-gray3)]"
          >
            취소
          </CustomBtn>
          <CustomBtn
            onClick={() => {
              if (selectedCreatedByMe) {
                setIsDeleteModalOpen(false);
                setIsConfirmDeleteModalOpen(true); // 재확인 모달 오픈
              } else {
                handleLeave(); // 탈퇴일 때는 바로 닫힘
                toast.error("현재 탈퇴 기능이 준비 중입니다.");
              }
            }}
            className="cursor-pointer bg-[var(--primary)] text-white px-3 py-1 rounded-md w-[84px] h-[32px]"
          >
            확인
          </CustomBtn>
        </div>
      </Modal>

      <Modal
        width="w-[260px]"
        height="h-[150px]"
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        className="flex items-center justify-center text-center"
      >
        <div className="flex flex-col items-center gap-1 text-center min-h-[60px]">
          <div className="text-red-400 font-16m">
            삭제 시 복구할 수 없습니다.
          </div>
          <div>정말 삭제하시겠습니까?</div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <CustomBtn
            onClick={() => setIsConfirmDeleteModalOpen(false)}
            className="cursor-pointer border px-3 py-1 rounded-md w-[84px] h-[32px] text-[var(--primary)] border-[var(--color-gray3)]"
          >
            취소
          </CustomBtn>
          <CustomBtn
            onClick={() => {
              setIsConfirmDeleteModalOpen(false);
              handleDelete(); // 진짜 삭제 실행
              toast.success("대시보드가 삭제되었습니다.");
            }}
            className="cursor-pointer bg-[var(--primary)] text-white px-3 py-1 rounded-md w-[84px] h-[32px]"
          >
            확인
          </CustomBtn>
        </div>
      </Modal>
    </>
  );
};
