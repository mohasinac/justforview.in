"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SELLER_ROUTES } from "@/constants/routes";

export default function SellerProducts() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to all products by default
    router.replace(SELLER_ROUTES.PRODUCTS_ALL);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
