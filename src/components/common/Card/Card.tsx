import Image from "next/image";
import UserBadge from "../Badge/UserBadge";

export default function Card({ task }) {
  return (
    <div>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div>
          <Image />
          <p>{task.dueDate}</p>
        </div>
        <UserBadge />
      </div>
    </div>
  );
}
