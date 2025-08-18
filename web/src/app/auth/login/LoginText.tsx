"use client";

import React, { useContext } from "react";
import { SettingsContext } from "@/components/settings/SettingsProvider";
import { useTranslations } from "next-intl";

export const LoginText = () => {
  const t = useTranslations("LoginText");
  const settings = useContext(SettingsContext);
  return (
    <>
      {t("logInTo")}{" "}
      {(settings && settings?.enterpriseSettings?.application_name) || t("appName")}
    </>
  );
};
