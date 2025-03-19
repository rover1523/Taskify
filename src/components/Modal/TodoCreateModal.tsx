"use client";

import { Modal } from "./Modal"; // 공통 모달 컴포넌트

interface TodoCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TodoCreateModal({ isOpen, onClose }: TodoCreateModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="할 일 생성"
      buttons={[
        { label: "취소", onClick: onClose, variant: "outline" },
        {
          label: "생성",
          onClick: () => console.log("할 일 생성"),
          variant: "primary",
        },
      ]}
    >
      <div>
        <label>담당자</label>
        <input type="text" placeholder="이름을 입력해 주세요" />
      </div>

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
        <label>이미지</label>
        <div>+</div>
      </div>
    </Modal>
  );
}
