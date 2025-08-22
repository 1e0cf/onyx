"use client";

import { LoadingAnimation } from "@/components/Loading";
import { NotebookIcon } from "@/components/icons/icons";
import { CCPairIndexingStatusTable } from "./CCPairIndexingStatusTable";
import { AdminPageTitle } from "@/components/admin/Title";
import Link from "next/link";
import Text from "@/components/ui/text";
import {
  useConnectorCredentialIndexingStatus,
  useFederatedConnectors,
} from "@/lib/hooks";
import { usePopupFromQuery } from "@/components/popup/PopupFromQuery";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

function Main() {
  const {
    data: indexAttemptData,
    isLoading: indexAttemptIsLoading,
    error: indexAttemptError,
  } = useConnectorCredentialIndexingStatus();

  const {
    data: editableIndexAttemptData,
    isLoading: editableIndexAttemptIsLoading,
    error: editableIndexAttemptError,
  } = useConnectorCredentialIndexingStatus(undefined, true);

  const {
    data: federatedConnectorsData,
    isLoading: federatedConnectorsIsLoading,
    error: federatedConnectorsError,
  } = useFederatedConnectors();

  // Debug logging
  console.log("Federated connectors data:", federatedConnectorsData);
  console.log("Federated connectors error:", federatedConnectorsError);
  console.log("Federated connectors loading:", federatedConnectorsIsLoading);

  if (
    indexAttemptIsLoading ||
    editableIndexAttemptIsLoading ||
    federatedConnectorsIsLoading
  ) {
    return <LoadingAnimation text="" />;
  }

  if (
    indexAttemptError ||
    !indexAttemptData ||
    editableIndexAttemptError ||
    !editableIndexAttemptData
  ) {
    return (
      <div className="text-error">
        {indexAttemptError?.info?.detail ||
          editableIndexAttemptError?.info?.detail ||
          t("errorLoadingIndexingHistory")}
      </div>
    );
  }

  if (
    indexAttemptData.length === 0 &&
    (!federatedConnectorsData || federatedConnectorsData.length === 0)
  ) {
    return (
      <Text>
        {t("noConnectorsSetup")}{" "}
        <Link className="text-link" href="/admin/add-connector">
          {t("addConnectorPage")}
        </Link>{" "}
        {t("pageToGetStarted")}
      </Text>
    );
  }

  // sort by source name
  indexAttemptData.sort((a, b) => {
    if (a.connector.source < b.connector.source) {
      return -1;
    } else if (a.connector.source > b.connector.source) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <CCPairIndexingStatusTable
      ccPairsIndexingStatuses={indexAttemptData}
      editableCcPairsIndexingStatuses={editableIndexAttemptData}
      federatedConnectors={federatedConnectorsData || []}
    />
  );
}

export default function Status() {
  const t = useTranslations("Status");
  const { popup } = usePopupFromQuery({
    "connector-created": {
      message: t("connectorCreatedSuccessfully"),
      type: "success",
    },
    "connector-deleted": {
      message: t("connectorDeletedSuccessfully"),
      type: "success",
    },
  });

  return (
    <div className="mx-auto container">
      {popup}
      <AdminPageTitle
        icon={<NotebookIcon size={32} />}
        title={t("existingConnectors")}
        farRightElement={
          <Link href="/admin/add-connector">
            <Button variant="success-reverse">{t("addConnector")}</Button>
          </Link>
        }
      />

      <Main />
    </div>
  );
}
