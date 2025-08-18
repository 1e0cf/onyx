"use client";

import { AdminSidebar } from "@/components/admin/connectors/AdminSidebar";
import {
  ClipboardIcon,
  NotebookIconSkeleton,
  ConnectorIconSkeleton,
  ThumbsUpIconSkeleton,
  ToolIconSkeleton,
  CpuIconSkeleton,
  UsersIconSkeleton,
  GroupsIconSkeleton,
  KeyIconSkeleton,
  ShieldIconSkeleton,
  DatabaseIconSkeleton,
  SettingsIconSkeleton,
  PaintingIconSkeleton,
  ZoomInIconSkeleton,
  SlackIconSkeleton,
  DocumentSetIconSkeleton,
  AssistantsIconSkeleton,
  SearchIcon,
  DocumentIcon2,
  BrainIcon,
} from "@/components/icons/icons";
import { UserRole } from "@/lib/types";
import { FiActivity, FiBarChart2 } from "react-icons/fi";
import { UserDropdown } from "../UserDropdown";
import { User } from "@/lib/types";
import { usePathname } from "next/navigation";
import { SettingsContext } from "../settings/SettingsProvider";
import { useContext, useState } from "react";
import { MdOutlineCreditCard } from "react-icons/md";
import { UserSettingsModal } from "@/app/chat/modal/UserSettingsModal";
import { usePopup } from "./connectors/Popup";
import { useChatContext } from "../context/ChatContext";
import {
  ApplicationStatus,
  CombinedSettings,
} from "@/app/admin/settings/interfaces";
import Link from "next/link";
import { Button } from "../ui/button";
import { useIsKGExposed } from "@/app/admin/kg/utils";
import { useFederatedOAuthStatus } from "@/lib/hooks/useFederatedOAuthStatus";
import { useTranslations } from "next-intl";

export function ClientLayout({
  user,
  children,
  enableEnterprise,
  enableCloud,
}: {
  user: User | null;
  children: React.ReactNode;
  enableEnterprise: boolean;
  enableCloud: boolean;
}) {
  const t = useTranslations("ClientLayout");
  const { kgExposed, isLoading } = useIsKGExposed();

  const isCurator =
    user?.role === UserRole.CURATOR || user?.role === UserRole.GLOBAL_CURATOR;

  const pathname = usePathname();
  const settings = useContext(SettingsContext);
  const [userSettingsOpen, setUserSettingsOpen] = useState(false);
  const toggleUserSettings = () => {
    setUserSettingsOpen(!userSettingsOpen);
  };
  const { llmProviders, ccPairs } = useChatContext();
  const { popup, setPopup } = usePopup();

  const connectors_items = () => [
    {
      name: (
        <div className="flex">
          <NotebookIconSkeleton className="text-text-700" size={18} />
          <div className="ml-1">{t("existingConnectors")}</div>
        </div>
      ),
      link: "/admin/indexing/status",
    },
    {
      name: (
        <div className="flex">
          <ConnectorIconSkeleton className="text-text-700" size={18} />
          <div className="ml-1.5">{t("addConnector")}</div>
        </div>
      ),
      link: "/admin/add-connector",
    },
  ];
  
  const document_management_items = () => [
    {
      name: (
        <div className="flex">
          <DocumentSetIconSkeleton className="text-text-700" size={18} />
          <div className="ml-1">{t("documentSets")}</div>
        </div>
      ),
      link: "/admin/documents/sets",
    },
    {
      name: (
        <div className="flex">
          <ZoomInIconSkeleton className="text-text-700" size={18} />
          <div className="ml-1">{t("explorer")}</div>
        </div>
      ),
      link: "/admin/documents/explorer",
    },
    {
      name: (
        <div className="flex">
          <ThumbsUpIconSkeleton className="text-text-700" size={18} />
          <div className="ml-1">{t("feedback")}</div>
        </div>
      ),
      link: "/admin/documents/feedback",
    },
  ];
  
  const custom_assistants_items = (
    isCurator: boolean,
    enableEnterprise: boolean
  ) => {
    const items = [
      {
        name: (
          <div className="flex">
            <AssistantsIconSkeleton className="text-text-700" size={18} />
            <div className="ml-1">{t("assistants")}</div>
          </div>
        ),
        link: "/admin/assistants",
      },
    ];
  
    if (!isCurator) {
      items.push(
        {
          name: (
            <div className="flex">
              <SlackIconSkeleton className="text-text-700" />
              <div className="ml-1">{t("slackBots")}</div>
            </div>
          ),
          link: "/admin/bots",
        },
        {
          name: (
            <div className="flex">
              <ToolIconSkeleton className="text-text-700" size={18} />
              <div className="ml-1">{t("actions")}</div>
            </div>
          ),
          link: "/admin/actions",
        }
      );
    }
  
    if (enableEnterprise) {
      items.push({
        name: (
          <div className="flex">
            <ClipboardIcon className="text-text-700" size={18} />
            <div className="ml-1">{t("standardAnswers")}</div>
          </div>
        ),
        link: "/admin/standard-answer",
      });
    }
  
    return items;
  };
  
  const collections = (
    isCurator: boolean,
    enableCloud: boolean,
    enableEnterprise: boolean,
    settings: CombinedSettings | null,
    kgExposed: boolean
  ) => [
    {
      name: "Connectors",
      items: connectors_items(),
    },
    {
      name: "Document Management",
      items: document_management_items(),
    },
    {
      name: "Custom Assistants",
      items: custom_assistants_items(isCurator, enableEnterprise),
    },
    ...(isCurator
      ? [
          {
            name: "User Management",
            items: [
              {
                name: (
                  <div className="flex">
                    <GroupsIconSkeleton className="text-text-700" size={18} />
                    <div className="ml-1">{t("groups")}</div>
                  </div>
                ),
                link: "/admin/groups",
              },
            ],
          },
        ]
      : []),
    ...(!isCurator
      ? [
          {
            name: "Configuration",
            items: [
              {
                name: (
                  <div className="flex">
                    <CpuIconSkeleton className="text-text-700" size={18} />
                    <div className="ml-1">{t("llm")}</div>
                  </div>
                ),
                link: "/admin/configuration/llm",
              },
              {
                error: settings?.settings.needs_reindexing,
                name: (
                  <div className="flex">
                    <SearchIcon className="text-text-700" />
                    <div className="ml-1">{t("searchSettings")}</div>
                  </div>
                ),
                link: "/admin/configuration/search",
              },
              {
                name: (
                  <div className="flex">
                    <DocumentIcon2 className="text-text-700" />
                    <div className="ml-1">{t("documentProcessing")}</div>
                  </div>
                ),
                link: "/admin/configuration/document-processing",
              },
              ...(kgExposed
                ? [
                    {
                      name: (
                        <div className="flex">
                          <BrainIcon className="text-text-700" />
                          <div className="ml-1">{t("knowledgeGraph")}</div>
                        </div>
                      ),
                      link: "/admin/kg",
                    },
                  ]
                : []),
            ],
          },
          {
            name: "User Management",
            items: [
              {
                name: (
                  <div className="flex">
                    <UsersIconSkeleton className="text-text-700" size={18} />
                    <div className="ml-1">{t("users")}</div>
                  </div>
                ),
                link: "/admin/users",
              },
              ...(enableEnterprise
                ? [
                    {
                      name: (
                        <div className="flex">
                          <GroupsIconSkeleton
                            className="text-text-700"
                            size={18}
                          />
                          <div className="ml-1">{t("groups")}</div>
                        </div>
                      ),
                      link: "/admin/groups",
                    },
                  ]
                : []),
              {
                name: (
                  <div className="flex">
                    <KeyIconSkeleton className="text-text-700" size={18} />
                    <div className="ml-1">{t("apiKeys")}</div>
                  </div>
                ),
                link: "/admin/api-key",
              },
              {
                name: (
                  <div className="flex">
                    <ShieldIconSkeleton className="text-text-700" size={18} />
                    <div className="ml-1">{t("tokenRateLimits")}</div>
                  </div>
                ),
                link: "/admin/token-rate-limits",
              },
            ],
          },
          ...(enableEnterprise
            ? [
                {
                  name: "Performance",
                  items: [
                    {
                      name: (
                        <div className="flex">
                          <FiActivity className="text-text-700" size={18} />
                          <div className="ml-1">{t("usageStatistics")}</div>
                        </div>
                      ),
                      link: "/admin/performance/usage",
                    },
                    ...(settings?.settings.query_history_type !== "disabled"
                      ? [
                          {
                            name: (
                              <div className="flex">
                                <DatabaseIconSkeleton
                                  className="text-text-700"
                                  size={18}
                                />
                                <div className="ml-1">{t("queryHistory")}</div>
                              </div>
                            ),
                            link: "/admin/performance/query-history",
                          },
                        ]
                      : []),
                    ...(!enableCloud
                      ? [
                          {
                            name: (
                              <div className="flex">
                                <FiBarChart2
                                  className="text-text-700"
                                  size={18}
                                />
                                <div className="ml-1">{t("customAnalytics")}</div>
                              </div>
                            ),
                            link: "/admin/performance/custom-analytics",
                          },
                        ]
                      : []),
                  ],
                },
              ]
            : []),
          {
            name: "Settings",
            items: [
              {
                name: (
                  <div className="flex">
                    <SettingsIconSkeleton className="text-text-700" size={18} />
                    <div className="ml-1">{t("workspaceSettings")}</div>
                  </div>
                ),
                link: "/admin/settings",
              },
              ...(enableEnterprise
                ? [
                    {
                      name: (
                        <div className="flex">
                          <PaintingIconSkeleton
                            className="text-text-700"
                            size={18}
                          />
                          <div className="ml-1">{t("whitelabeling")}</div>
                        </div>
                      ),
                      link: "/admin/whitelabeling",
                    },
                  ]
                : []),
              ...(enableCloud
                ? [
                    {
                      name: (
                        <div className="flex">
                          <MdOutlineCreditCard
                            className="text-text-700"
                            size={18}
                          />
                          <div className="ml-1">{t("billing")}</div>
                        </div>
                      ),
                      link: "/admin/billing",
                    },
                  ]
                : []),
            ],
          },
        ]
      : []),
  ];
  
  // Fetch federated-connector info so the modal can list/refresh them
  const {
    connectors: federatedConnectors,
    refetch: refetchFederatedConnectors,
  } = useFederatedOAuthStatus();

  if (isLoading) {
    return <></>;
  }

  if (
    (pathname && pathname.startsWith("/admin/connectors")) ||
    (pathname && pathname.startsWith("/admin/embeddings"))
  ) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-screen flex overflow-y-hidden">
      {popup}

      {userSettingsOpen && (
        <UserSettingsModal
          llmProviders={llmProviders}
          setPopup={setPopup}
          onClose={() => setUserSettingsOpen(false)}
          defaultModel={user?.preferences?.default_model!}
          ccPairs={ccPairs}
          federatedConnectors={federatedConnectors}
          refetchFederatedConnectors={refetchFederatedConnectors}
        />
      )}

      {settings?.settings.application_status ===
        ApplicationStatus.PAYMENT_REMINDER && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 bg-amber-400 dark:bg-amber-500 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-lg z-50 max-w-md text-center">
          <strong className="font-bold">{t("warning")}</strong> {t("trialEnding")}
          <div className="mt-2">
            <Link href="/admin/billing">
              <Button
                variant="default"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {t("updateBilling")}
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="default-scrollbar flex-none text-text-settings-sidebar bg-background-sidebar dark:bg-[#000] w-[250px] overflow-x-hidden z-20 pt-2 pb-8 h-full border-r border-border dark:border-none miniscroll overflow-auto">
        <AdminSidebar
          collections={collections(
            isCurator,
            enableCloud,
            enableEnterprise,
            settings,
            kgExposed
          )}
        />
      </div>
      <div className="overflow-y-scroll w-full">
        <div className="fixed left-0 gap-x-4 px-4 top-4 h-8 mb-auto w-full items-start flex justify-end">
          <UserDropdown toggleUserSettings={toggleUserSettings} />
        </div>
        <div className="flex pt-10 pb-4 px-4 md:px-12">{children}</div>
      </div>
    </div>
  );
  // Is there a clean way to add this to some piece of text where we need to enbale for copy-paste in a react app?
}
