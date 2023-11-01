"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const OneTapLogin = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const showPopup = useCallback(() => {
    const { google } = window as any;
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: any) => {
          await signIn("googleonetap", {
            credential: response.credential,
            redirect: false,
          });
        },
        prompt_parent_id: "one-tap-popup",
        itp_support: true,
      });

      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.log(
            "getNotDisplayedReason ::",
            notification.getNotDisplayedReason()
          );
        } else if (notification.isSkippedMoment()) {
          console.log("getSkippedReason  ::", notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.log(
            "getDismissedReason ::",
            notification.getDismissedReason()
          );
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!session) {
      showPopup();
    } else {
      router.replace("/dashboard");
    }
  }, [router, session, showPopup]);

  console.log(session);

  return (
    <div
      id="one-tap-popup"
      style={{ position: "fixed", top: 0, right: 0, zIndex: 999 }}
    />
  );
};

export default OneTapLogin;
