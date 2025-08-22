import { AdminPageTitle } from "@/components/admin/Title";

import { SettingsForm } from "./SettingsForm";
import Text from "@/components/ui/text";
import { SettingsIcon } from "@/components/icons/icons";

export default function Page() {
  return (
    <div className="mx-auto container">
      <AdminPageTitle
        title="Settings"
        icon={<SettingsIcon size={32} className="my-auto" />}
      />

      <Text className="mb-8">
        Configure your application settings and preferences.
      </Text>

      <SettingsForm />
    </div>
  );
}
