import { useState } from "react";
import Pagination from "../Pagination";

const InviteList = () => {
  const [invitelog, setInvitelog] = useState([
    // 나중에 api 데이터로 변경
    { email: "codeit1@codeit.com" },
    { email: "codeit2@codeit.com" },
    { email: "codeit3@codeit.com" },
    { email: "codeit4@codeit.com" },
    { email: "codeit5@codeit.com" },
    { email: "codeit6@codeit.com" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(invitelog.length / itemsPerPage);

  const paginatedMembers = invitelog.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /*버튼(삭제, 이전, 다음)*/
  const handleDelete = (email: string) => {
    setInvitelog(invitelog.filter((invitelog) => invitelog.email !== email));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return <div></div>;
};
