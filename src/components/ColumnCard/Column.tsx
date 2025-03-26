// Column.tsx
import TodoButton from "@/components/button/TodoButton";
import { useState } from "react";
import { CardType } from "@/types/task";
import Card from "./Card";
import Image from "next/image";
import { Modal } from "../common/Modal/Modal";
import Input from "../input/Input";
import { CustomBtn } from "../button/CustomBtn";

type ColumnCardProps = {
  title?: string;
  tasks?: CardType[];
};

export default function Column({
  title = "new Task",
  tasks = [],
}: ColumnCardProps) {
  const [showCard, setShowCard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

      <div onClick={() => setShowCard(true)}>
        <TodoButton />
      </div>
      {showCard &&
        tasks.map((task) => (
          <Card
            key={task.id}
            {...task}
            imageUrl={task.imageUrl}
            assignee={task.assignee}
          />
        ))}
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

      {/* 칼럼 삭제 확인 모달 */}
      {isDeleteOpen && (
        <Modal
          // className="w-[568px] h-[174px]"
          width="w-[568px"
          height="h-[174px]"
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        >
          <div className=" flex flex-col gap-10 text-center">
            <p className="text-lg font-medium">
              칼럼의 모든 카드가 삭제됩니다.
            </p>
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
