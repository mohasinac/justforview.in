"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { CardGrid } from "@/components/cards/CardGrid";
import type { ProductUI } from "@/schemas/ui/product.ui";

interface SimilarProductsProps {
  productId: string;
  categoryId: string;
  currentShopId: string;
}

export function SimilarProducts({
  productId,
  categoryId,
  currentShopId,
}: SimilarProductsProps) {
  const [products, setProducts] = useState<ProductUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSimilarProducts();
  }, [productId, categoryId]);

  const loadSimilarProducts = async () => {
    try {
      setLoading(true);
      // TODO: Implement products API call when service is ready
      // const data = await productsService.list({
      //   categoryId,
      //   status: "published" as any,
      //   limit: 12,
      // });

      // Temporary: empty array until service is implemented
      const data = { data: [] };

      const filtered = (data.data || []).filter(
        (p: ProductUI) => p.id !== productId
      );

      const diversified = diversifyByShop(filtered, currentShopId);
      setProducts(diversified.slice(0, 10));
    } catch (error) {
      console.error("Failed to load similar products:", error);
    } finally {
      setLoading(false);
    }
  };

  const diversifyByShop = (products: ProductUI[], currentShopId: string) => {
    const otherShops: ProductUI[] = [];
    const sameShop: ProductUI[] = [];

    products.forEach((p) => {
      if (p.shopId === currentShopId) {
        sameShop.push(p);
      } else {
        otherShops.push(p);
      }
    });

    return [...otherShops, ...sameShop];
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Similar Products</h2>
      <CardGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showShopName={true} />
        ))}
      </CardGrid>
    </div>
  );
}
