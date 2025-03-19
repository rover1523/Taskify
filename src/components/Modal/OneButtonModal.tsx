import { Modal } from "./Modal";

interface oneButtonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OneButtonModal({ isOpen, onClose }: oneButtonModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[368px] h-[192px] p-[40px] flex flex-col items-center gap[20px] rounded-xl "
      contentClassName="text-[20px] text-[#333236] "
      buttonContainerClassName="flex justify-center gap-[10px] "
      buttons={[
        {
          label: "확인",
          onClick: onClose,
          variant: "primary",
          className:
            "w-[240px] h-[48px] px-[46px] py-[14px] bg-[#5534DA] text-white rounded-lg ",
        },
      ]}
    >
      <p>비밀번호가 일치하지 않습니다.</p>
    </Modal>
  );
}
