import { useState } from "react";

export default function ProfileCard() {
  const [image, setImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="w-[672px] h-[366px] bg-white rounded-[16px] shadow-md p-[24px] flex flex-col">
      {/* 프로필 제목 */}
      <h2 className="font-24b mb-4">프로필</h2>

      {/* 프로필 이미지 + 입력 폼 */}
      <div className="flex">
        {/* 프로필 이미지 업로드 영역 */}
        <div className="w-[120px] flex-shrink-0">
          <div className=" w-[182px] h-[182px] border border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
            <label className="cursor-pointer w-full h-full flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span className="text-gray-400 text-2xl">+</span>
              )}
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* 입력 폼 */}
        <div className="flex flex-col ml-26 w-[400px] h-[262]">
          <label className="mb-2 text-sm text-[var(--color-black3)]">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[44px] px-[16px] py-[10px] border border-gray-300 rounded-[8px]  "
          />

          <label className="mb-2 text-sm text-[var(--color-black3)] mt-3">
            닉네임
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full h-[44px] px-[16px] py-[10px] border border-gray-300 rounded-[8px]"
          />

          {/* 저장 버튼 */}
          <button className="p-[14px_46px_14px_46px] cursor-pointer w-[400px] h-[54px] bg-[#5A3FFF] text-white rounded-[8px] text-lg font-medium mt-4">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
