import React, { useState } from "react";
import Head from "next/head";
import { CustomButton } from "../components/Button/Button";

export default function Document() {
  return (
    <div>
      <CustomButton variant="primary" size="medium">
        버튼
      </CustomButton>
      <CustomButton variant="primary" size="extraLarge">
        버튼
      </CustomButton>
    </div>
  );
}
