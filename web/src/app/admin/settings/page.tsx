import { AdminPageTitle } from "@/components/admin/Title";

import { SettingsForm } from "./SettingsForm";
import Text from "@/components/ui/text";
import { SettingsIcon } from "@/components/icons/icons";
import { useTranslations } from "next-intl";

export default async function Page() {
  const t = useTranslations("AdminSettingsPage");
  return (
    <div className="mx-auto container">
      <AdminPageTitle
        title={t("title")}
        icon={<SettingsIcon size={32} className="my-auto" />}
      />

      <Text className="mb-8">
        {t("description")}
      </Text>

      <SettingsForm />
    </div>
  );
}
