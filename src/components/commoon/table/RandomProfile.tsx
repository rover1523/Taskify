interface RandomProfileProps {
  size: number;
  name: string;
}

// 이름 첫 글자에 따라 배경색 변경
const selectColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-400",
    "bg-green-500",
    "bg-yellow-400",
    "bg-purple-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function RandomProfile({ name }: RandomProfileProps) {
  const letter = name[0];
  const bgColor = selectColor();

  return (
    <div
      className={`flex items-center justify-center text-white font-bold rounded-full ${bgColor} w-[38px] h-[38px] border-2`}
    >
      {letter}
    </div>
  );
}
