import { TextCard } from "@/components/common/Card/TextCard";
import CardColumn from "../components/common/Card/CardColumn";
import ImageCard from "@/components/common/Card/ImageCard";

export default function Document() {
  return (
    <div>
      <CardColumn />
      <TextCard />
      <ImageCard />
    </div>
  );
}
