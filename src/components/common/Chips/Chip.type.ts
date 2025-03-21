import { ReactNode } from "react";

export type TColorKey =
  | "green"
  | "purple"
  | "orange"
  | "blue"
  | "pink"
  | "gray";

export type TChipSize = "large" | "small" | "tiny";

export type TChipProps = {
  children: ReactNode;
  size: TChipSize;
  color: TColorKey;
};
