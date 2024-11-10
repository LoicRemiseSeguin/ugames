"use client";

import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    router.push("profile/events");
}