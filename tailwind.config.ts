import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard"],
      },
      fontSize: {
        "3xl-Bold": ["32px", { lineHeight: "42px", fontWeight: "700" }],
        "3xl-Semibold": ["32px", { lineHeight: "42px", fontWeight: "600" }],
        "2xl-Bold": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "2xl-Semibold": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "2xl-Medium": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "2xl-Regular": ["24px", { lineHeight: "32px", fontWeight: "400" }],
        "xl-Bold": ["20px", { lineHeight: "32px", fontWeight: "700" }],
        "xl-Semibold": ["20px", { lineHeight: "32px", fontWeight: "600" }],
        "xl-Medium": ["20px", { lineHeight: "32px", fontWeight: "500" }],
        "xl-Regular": ["20px", { lineHeight: "32px", fontWeight: "400" }],
        "2lg-Bold": ["18px", { lineHeight: "26px", fontWeight: "700" }],
        "2lg-Semibold": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "2lg-Medium": ["18px", { lineHeight: "26px", fontWeight: "500" }],
        "2lg-Regular": ["18px", { lineHeight: "26px", fontWeight: "400" }],
        "lg-Bold": ["16px", { lineHeight: "26px", fontWeight: "700" }],
        "lg-Semibold": ["16px", { lineHeight: "26px", fontWeight: "600" }],
        "lg-Medium": ["16px", { lineHeight: "26px", fontWeight: "500" }],
        "lg-Regular": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "md-Bold": ["14px", { lineHeight: "24px", fontWeight: "700" }],
        "md-Semibold": ["14px", { lineHeight: "24px", fontWeight: "600" }],
        "md-Medium": ["14px", { lineHeight: "24px", fontWeight: "500" }],
        "md-Regular": ["14px", { lineHeight: "24px", fontWeight: "400" }],
        "sm-Semibold": ["13px", { lineHeight: "22px", fontWeight: "600" }],
        "sm-Medium": ["13px", { lineHeight: "22px", fontWeight: "500" }],
        "xs-Semibold": ["12px", { lineHeight: "20px", fontWeight: "600" }],
        "xs-Medium": ["12px", { lineHeight: "18px", fontWeight: "500" }],
        "xs-Regular": ["12px", { lineHeight: "18px", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
