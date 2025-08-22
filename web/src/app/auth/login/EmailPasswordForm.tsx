"use client";

import { TextFormField } from "@/components/Field";
import { usePopup } from "@/components/admin/connectors/Popup";
import { basicLogin, basicSignup } from "@/lib/user";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { requestEmailVerification } from "../lib";
import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import Link from "next/link";
import { useUser } from "@/components/user/UserProvider";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export function EmailPasswordForm({
  isSignup = false,
  shouldVerify,
  referralSource,
  nextUrl,
  defaultEmail,
  isJoin = false,
}: {
  isSignup?: boolean;
  shouldVerify?: boolean;
  referralSource?: string;
  nextUrl?: string | null;
  defaultEmail?: string | null;
  isJoin?: boolean;
}) {
  const { user } = useUser();
  const { popup, setPopup } = usePopup();
  const router = useRouter();
  const [isWorking, setIsWorking] = useState(false);
  const t = useTranslations("EmailPasswordForm");
  return (
    <>
      {isWorking && <Spinner />}
      {popup}
      <Formik
        initialValues={{
          email: defaultEmail ? defaultEmail.toLowerCase() : "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required()
            .transform((value) => value.toLowerCase()),
          password: Yup.string().required(),
        })}
        onSubmit={async (values) => {
          // Ensure email is lowercase
          const email = values.email.toLowerCase();

          if (isSignup) {
            // login is fast, no need to show a spinner
            setIsWorking(true);
            const response = await basicSignup(
              email,
              values.password,
              referralSource
            );

            if (!response.ok) {
              setIsWorking(false);

              const errorDetail = (await response.json()).detail;
              let errorMsg = t("errors.unknownError");
              if (typeof errorDetail === "object" && errorDetail.reason) {
                errorMsg = errorDetail.reason;
              } else if (errorDetail === "REGISTER_USER_ALREADY_EXISTS") {
                errorMsg = t("errors.accountAlreadyExists");
              }
              if (response.status === 429) {
                errorMsg = t("errors.tooManyRequests");
              }
              setPopup({
                type: "error",
                message: t("errors.failedToSignUp", { errorMsg }),
              });
              setIsWorking(false);
              return;
            } else {
              setPopup({
                type: "success",
                message: t("errors.accountCreatedSuccessfully"),
              });
            }
          }

          const loginResponse = await basicLogin(email, values.password);
          if (loginResponse.ok) {
            if (isSignup && shouldVerify) {
              await requestEmailVerification(email);
              // Use window.location.href to force a full page reload,
              // ensuring app re-initializes with the new state (including
              // server-side provider values)
              window.location.href = "/auth/waiting-on-verification";
            } else {
              // The searchparam is purely for multi tenant developement purposes.
              // It replicates the behavior of the case where a user
              // has signed up with email / password as the only user to an instance
              // and has just completed verification
              window.location.href = nextUrl
                ? encodeURI(nextUrl)
                : `/chat${isSignup && !isJoin ? "?new_team=true" : ""}`;
            }
          } else {
            setIsWorking(false);
            const errorDetail = (await loginResponse.json()).detail;
            let errorMsg = t("errors.unknownError");
            if (errorDetail === "LOGIN_BAD_CREDENTIALS") {
              errorMsg = t("errors.invalidCredentials");
            } else if (errorDetail === "NO_WEB_LOGIN_AND_HAS_NO_PASSWORD") {
              errorMsg = t("errors.createAccountToSetPassword");
            } else if (typeof errorDetail === "string") {
              errorMsg = errorDetail;
            }
            if (loginResponse.status === 429) {
              errorMsg = t("errors.tooManyRequests");
            }
            setPopup({
              type: "error",
              message: t("errors.failedToLogin", { errorMsg }),
            });
          }
        }}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <TextFormField
              name="email"
              label="Email"
              type="email"
              placeholder="email@yourcompany.com"
            />

            <TextFormField
              name="password"
              label="Password"
              type="password"
              placeholder="**************"
            />

            <Button
              variant="agent"
              type="submit"
              disabled={isSubmitting}
              className="mx-auto  !py-4 w-full"
            >
              {isJoin ? t("join") : isSignup ? t("signUp") : t("logIn")}
            </Button>
            {user?.is_anonymous_user && (
              <Link
                href="/chat"
                className="text-xs text-blue-500  cursor-pointer text-center w-full text-link font-medium mx-auto"
              >
                <span className="hover:border-b hover:border-dotted hover:border-blue-500">
                  {t("continueAsGuest")}
                </span>
              </Link>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
