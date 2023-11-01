import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { LogoutButton } from "@/components";
import { authOptions } from "../api/auth/[...nextauth]/route";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      Logged in as: {session.user?.name}
      <br />
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
