import { TextCard } from "@/components/common/Card/TextCard";
import CardColumn from "../components/common/Card/CardColumn";
import ImageCard from "@/components/common/Card/ImageCard";

export default function Document() {
  return (
    <div>
      <CardColumn />
      <TextCard
        title="테스트 카드"
        dueDate="2025.03.30"
        tags={["프론트엔드", "디자인"]}
        assignee="혜진"
      />
      <ImageCard
        title="테스트 카드"
        dueDate="2025.03.30"
        tags={["프론트엔드", "디자인"]}
        assignee="혜진"
        imageUrl="/svgs/img.svg"
      />
    </div>
  );
}
