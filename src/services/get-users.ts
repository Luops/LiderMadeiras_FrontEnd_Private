"use client";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { User } from "@/models/User";
import * as React from "react";

export async function getUser(): Promise<User | null> {
  const cookies = parseCookies();
  const userId = cookies.userId;
  const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
    next: { revalidate: 100 },
    headers: {
      Authorization: `${userId}`,
    },
  });
  const users = await response.json();
  return users?.data || null;
}
