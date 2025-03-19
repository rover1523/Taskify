"use client";

import { Modal } from "./Modal"; // 공통 모달 컴포넌트

interface TodoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TodoEditModal({ isOpen, onClose }: TodoEditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 수정"
      className="w-[584px] h-[986px] p-8 rounded-2xl gap-8"
      buttons={[
        { label: "취소", onClick: onClose, variant: "outline" },
        {
          label: "수정",
          onClick: () => console.log("할 일 수정"),
          variant: "primary",
        },
      ]}
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <label>상태</label>
          <input type="text" placeholder="상태 선택" />
        </div>
        <div className="flex-1">
          <label>담당자</label>
          <input type="text" placeholder="이름을 입력해 주세요" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <label>제목 *</label>
          <input type="text" placeholder="제목을 입력해 주세요" />
        </div>

        <div>
          <label>설명 *</label>
          <textarea placeholder="설명을 입력해 주세요"></textarea>
        </div>

        <div>
          <label>마감일</label>
          <input type="date" />
        </div>

        <div>
          <label>태그</label>
          <input type="text" placeholder="입력 후 Enter" />
        </div>

        <div>
          <label>이미지</label>
          <div>+</div>
        </div>
      </div>
    </Modal>
  );
}
