// Column.tsx
import { useState } from "react";
import Image from "next/image";
import { CardType } from "@/types/task";
import Card from "./Card";
import { Modal } from "../common/Modal/Modal";
import ToDoModal from "@/components/ModalInput/ToDoModal";
import Input from "../input/Input";
import TodoButton from "@/components/button/TodoButton";
import { CustomBtn } from "../button/CustomBtn";

type ColumnCardProps = {
  title?: string;
  tasks?: CardType[];
};

export default function Column({
  title = "new Task",
  tasks = [],
}: ColumnCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);

  return (
    <div className="w-[354px] h-[1010px] border-[var(--color-gray4)] flex flex-col rounded-md border border-solid bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">
            <span className="text-[var(--primary)]">•</span> {title}
          </h2>
          <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
            {tasks.length}
          </span>
        </div>
        <Image
          src="/svgs/settings.svg"
          alt="setting icon"
          width={24}
          height={24}
          priority
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* ✅ 버튼 누르면 모달 열기 */}
      <div>
        <TodoButton onClick={() => setIsTodoModalOpen(true)} />
      </div>

      {/* ✅ 카드 항상 표시 */}
      {tasks.map((task) => (
        <Card
          key={task.id}
          {...task}
          imageUrl={task.imageUrl}
          assignee={task.assignee}
        />
      ))}
      {isTodoModalOpen && <ToDoModal />}

      {/* 칼럼 관리 모달 */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold">칼럼 관리</h2>

            <label className="font-medium flex flex-col gap-2">
              이름
              <Input
                type="text"
                // value={columnName} // todo
              />
            </label>
            <div className="flex justify-between mt-1.5">
              <CustomBtn
                variant="outlineDisabled"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsDeleteOpen(true);
                }}
              >
                삭제
              </CustomBtn>
              <CustomBtn>변경</CustomBtn>
            </div>
          </div>
        </Modal>
      )}

      {/* 삭제 모달은 그대로 유지 */}
      {isDeleteOpen && (
        <Modal
          width="w-[568px]"
          height="h-[174px]"
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        >
          <div className=" flex flex-col gap-10 text-center">
            <p className="text-xl mt-1.5">칼럼의 모든 카드가 삭제됩니다.</p>
            <div className="flex justify-between gap-3">
              <CustomBtn
                variant="outlineDisabled"
                onClick={() => setIsDeleteOpen(false)}
              >
                취소
              </CustomBtn>
              <CustomBtn variant="primary">삭제</CustomBtn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
