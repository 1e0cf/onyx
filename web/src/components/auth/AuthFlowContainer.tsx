import Link from "next/link";
import { Logo } from "../logo/Logo";
import { useTranslations } from "next-intl";

export default function AuthFlowContainer({
  children,
  authState,
}: {
  children: React.ReactNode;
  authState?: "signup" | "login" | "join";
}) {
  const t = useTranslations("AuthFlowContainer");
  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-black pt-8 pb-6 px-8 mx-4 gap-y-4 bg-white flex items-center dark:border-none flex-col rounded-xl shadow-lg border border-bacgkround-100 gap-y-2 ">
        <Logo width={70} height={70} />
        <div className="mt-4  w-full">{children}</div>
      </div>
      {authState === "login" && (
        <div className="text-sm mt-4 text-center w-full text-text-900 font-medium mx-auto">
          {t("dontHaveAccount")}
          <Link
            href="/auth/signup"
            className=" underline transition-colors duration-200"
          >
            {t("createOne")}
          </Link>
        </div>
      )}
      {authState === "signup" && (
        <div className="text-sm mt-4 text-center w-full text-text-800 font-medium mx-auto">
          {t("alreadyHaveAccount")}
          <Link
            href="/auth/login"
            className=" underline transition-colors duration-200"
          >
            {t("logIn")}
          </Link>
        </div>
      )}
    </div>
  );
}
