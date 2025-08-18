"use client";

import { ApiKeyForm } from "./ApiKeyForm";
import { Modal } from "../Modal";
import { useRouter } from "next/navigation";
import { useProviderStatus } from "../chat/ProviderContext";
import { PopupSpec } from "../admin/connectors/Popup";
import { useTranslations } from "next-intl";

export const ApiKeyModal = ({
  hide,
  setPopup,
}: {
  hide?: () => void;
  setPopup: (popup: PopupSpec) => void;
}) => {
  const t = useTranslations("ApiKeyModal");
  const router = useRouter();

  const {
    shouldShowConfigurationNeeded,
    providerOptions,
    refreshProviderInfo,
  } = useProviderStatus();

  if (!shouldShowConfigurationNeeded) {
    return null;
  }
  return (
    <Modal
      title={t("title")}
      width="max-w-3xl w-full"
      onOutsideClick={hide ? () => hide() : undefined}
    >
      <>
        <div className="mb-5 text-sm text-neutral-700 dark:text-neutral-200">
          {t("description")}
          <br />
          {hide && (
            <>
              {t("skipStepMessage")}{" "}
              <strong
                onClick={() => hide()}
                className="text-link cursor-pointer"
              >
                {t("skipStepAction")}
              </strong>
              .
            </>
          )}
        </div>

        <ApiKeyForm
          setPopup={setPopup}
          onSuccess={() => {
            router.refresh();
            refreshProviderInfo();
            hide?.();
          }}
          providerOptions={providerOptions}
        />
      </>
    </Modal>
  );
};
