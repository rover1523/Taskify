import { useState } from "react";
import TaskModal from "@/components/ModalInput/ToDoModal";

export default function TaskModalTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: any) => {
    setSubmittedData(data);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <button
        onClick={handleOpenModal}
        className="rounded-md bg-[var(--primary)] px-6 py-3 text-white"
      >
        할 일 추가
      </button>

      {isModalOpen && (
        <TaskModal onClose={handleCloseModal} onSubmit={handleSubmit} />
      )}

      {/* 제출된 데이터 확인용 */}
      {submittedData && (
        <div className="mt-6 w-[500px] rounded-lg border border-gray-300 p-4">
          <h3 className="mb-3 text-lg font-bold">제출된 데이터:</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
