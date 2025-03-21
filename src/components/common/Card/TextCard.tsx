export function TextCard() {
  return (
    <div className="mt-4 space-y-2.5">
      {" "}
      {/* gap 10px 적용 */}
      <div className="w-[314px] h-[128px] border border-gray-200 shadow-sm rounded-lg p-4 bg-white flex flex-col">
        {/* 제목 */}
        <h3 className="font-medium text-lg text-gray-900">
          새로운 일정 관리 Taskify
        </h3>

        {/* 태그 */}
        <div className="flex items-center gap-2.5 mt-2.5">
          {" "}
          {/* gap 10px 적용 */}
          <span className="bg-orange-200 text-orange-700 px-3 py-1 rounded-md text-sm">
            프로젝트
          </span>
          <span className="bg-pink-200 text-pink-700 px-3 py-1 rounded-md text-sm">
            백엔드
          </span>
          <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm">
            상
          </span>
        </div>

        {/* 날짜 & 아이콘 */}
        <div className="flex items-center justify-between mt-2.5">
          {" "}
          {/* gap 10px 적용 */}
          <div className="flex items-center gap-2.5 text-gray-500 text-sm">
            {" "}
            {/* gap 10px 적용 */}
            <img
              src="/svgs/calendar.svg"
              alt="calendar icon"
              className="w-4 h-4"
            />
            <p>2022.12.31</p>
          </div>
          {/* 오른쪽 원형 아이콘 */}
          <div className="w-7 h-7 flex items-center justify-center bg-green-200 text-green-700 font-bold rounded-full text-sm">
            B
          </div>
        </div>
      </div>
    </div>
  );
}
