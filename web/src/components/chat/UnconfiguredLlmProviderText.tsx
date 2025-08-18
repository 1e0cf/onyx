import { useProviderStatus } from "./ProviderContext";
import { useTranslations } from 'next-intl';

export function UnconfiguredLlmProviderText({
  showConfigureAPIKey,
  noSources,
}: {
  showConfigureAPIKey: () => void;
  noSources?: boolean;
}) {
  const { shouldShowConfigurationNeeded } = useProviderStatus();
  const t = useTranslations('UnconfiguredLlmProviderText');
  return (
    <>
      {noSources ? (
        <p className="text-base text-center w-full text-subtle">
          {t("noSources")}
          <a
            href="/admin/add-connector"
            className="text-link hover:underline cursor-pointer"
          >
            {t("aSource")}
          </a>{" "}
          {t("toContinue")}
        </p>
      ) : (
        shouldShowConfigurationNeeded && (
          <p className="text-base text-center w-full text-subtle">
            {t("noLlmProvider")}
            <button
              onClick={showConfigureAPIKey}
              className="text-link hover:underline cursor-pointer"
            > 
              {t("here")}
            </button>
            .
          </p>
        )
      )}
    </>
  );
}
