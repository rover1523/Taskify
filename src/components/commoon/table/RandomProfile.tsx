interface RandomProfileProps {
  size: number;
  name: string;
}

// 색상 배열을 섞는 함수 > Fisher-Yates 알고리즘
const shuffleColors = (colors: string[]) => {
  let shuffled = [...colors]; // 원본 배열 복사
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const shuffledColors = shuffleColors([
  "bg-[#C4B1A2]",
  "bg-[#9DD7ED]",
  "bg-[#FDD446]",
  "bg-[#FFC85A]",
  "bg-[#A3C4A2]",
]);

export default function RandomProfile({ name }: RandomProfileProps) {
  // 프로필 개수에 따라 색상 다르게 설정
  const bgColor =
    shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
  const letter = name[0];

  return (
    <div
      className={`flex items-center justify-center text-white font-bold rounded-full ${bgColor} w-[38px] h-[38px] border-2`}
    >
      {letter}
    </div>
  );
}
