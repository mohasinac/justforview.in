/**
 * Firebase React Hooks
 * Custom hooks for real-time data fetching with fallbacks
 */

import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/database/config";
import { Product, Auction, User } from "@/lib/database/services";

// Products Hook
export function useProducts(
  filters: {
    category?: string;
    featured?: boolean;
    limit?: number;
  } = {},
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let q = query(collection(db, "products"));

        // Apply filters
        if (filters.category) {
          q = query(q, where("category", "==", filters.category));
        }
        if (filters.featured !== undefined) {
          q = query(q, where("isFeatured", "==", filters.featured));
        }

        q = query(
          q,
          where("status", "==", "active"),
          orderBy("createdAt", "desc"),
        );

        if (filters.limit) {
          q = query(q, limit(filters.limit));
        }

        // Set up real-time listener
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const productsData = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
              } as Product;
            });
            setProducts(productsData);
            setLoading(false);
          },
          (err) => {
            console.error("Firebase products error:", err);
            setError("Failed to load products from database");
            setProducts([]);
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        console.error("Products hook error:", err);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    const unsubscribe = fetchProducts();
    return () => {
      if (unsubscribe instanceof Function) {
        unsubscribe();
      }
    };
  }, [filters.category, filters.featured, filters.limit]);

  return { products, loading, error };
}

// Single Product Hook
export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const productRef = doc(db, "products", productId);
        const unsubscribe = onSnapshot(
          productRef,
          (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              setProduct({
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
              } as Product);
            } else {
              setProduct(null);
            }
            setLoading(false);
          },
          (err) => {
            console.error("Firebase product error:", err);
            setError("Failed to load product from database");
            setProduct(null);
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        console.error("Product hook error:", err);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    const unsubscribe = fetchProduct();
    return () => {
      if (unsubscribe instanceof Function) {
        unsubscribe();
      }
    };
  }, [productId]);

  return { product, loading, error };
}

// Auctions Hook
export function useAuctions(
  filters: {
    status?: string;
    category?: string;
    limit?: number;
  } = {},
) {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        setError(null);

        let q = query(collection(db, "auctions"));

        // Apply filters
        if (filters.status && filters.status !== "all") {
          q = query(q, where("status", "==", filters.status));
        }
        if (filters.category) {
          q = query(q, where("category", "==", filters.category));
        }

        q = query(q, orderBy("endTime", "desc"));

        if (filters.limit) {
          q = query(q, limit(filters.limit));
        }

        // Set up real-time listener
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const auctionsData = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                endTime: data.endTime?.toDate() || new Date(),
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
              } as Auction;
            });
            setAuctions(auctionsData);
            setLoading(false);
          },
          (err) => {
            console.error("Firebase auctions error:", err);
            setError("Failed to load auctions from database");
            setAuctions([]);
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        console.error("Auctions hook error:", err);
        setError("Failed to load auctions");
        setLoading(false);
      }
    };

    const unsubscribe = fetchAuctions();
    return () => {
      if (unsubscribe instanceof Function) {
        unsubscribe();
      }
    };
  }, [filters.status, filters.category, filters.limit]);

  return { auctions, loading, error };
}

// Single Auction Hook
export function useAuction(auctionId: string) {
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!auctionId) {
      setLoading(false);
      return;
    }

    const fetchAuction = async () => {
      try {
        setLoading(true);
        setError(null);

        const auctionRef = doc(db, "auctions", auctionId);
        const unsubscribe = onSnapshot(
          auctionRef,
          (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              setAuction({
                id: doc.id,
                ...data,
                endTime: data.endTime?.toDate() || new Date(),
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
              } as Auction);
            } else {
              setAuction(null);
            }
            setLoading(false);
          },
          (err) => {
            console.error("Firebase auction error:", err);
            setError("Failed to load auction");
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        console.error("Auction hook error:", err);
        setError("Failed to load auction");
        setLoading(false);
      }
    };

    const unsubscribe = fetchAuction();
    return () => {
      if (unsubscribe instanceof Function) {
        unsubscribe();
      }
    };
  }, [auctionId]);

  return { auction, loading, error };
}

// Cart Hook
export function useCart(userId: string) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        const q = query(collection(db, "cart"), where("userId", "==", userId));
        const unsubscribe = onSnapshot(
          q,
          async (snapshot) => {
            const cartData = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                userId: data.userId,
                productId: data.productId,
                quantity: data.quantity,
                addedAt: data.addedAt?.toDate() || new Date(),
              };
            });

            // Get product details for each cart item
            const cartWithProducts = await Promise.all(
              cartData.map(async (item) => {
                try {
                  const productDoc = await getDoc(
                    doc(db, "products", item.productId),
                  );
                  if (productDoc.exists()) {
                    const productData = productDoc.data();
                    return {
                      ...item,
                      product: {
                        id: productDoc.id,
                        ...productData,
                        createdAt:
                          productData.createdAt?.toDate() || new Date(),
                        updatedAt:
                          productData.updatedAt?.toDate() || new Date(),
                      },
                    };
                  }
                  return item;
                } catch (err) {
                  console.error("Error fetching product for cart item:", err);
                  return item;
                }
              }),
            );

            setCartItems(cartWithProducts);
            setLoading(false);
          },
          (err) => {
            console.error("Firebase cart error:", err);
            setError("Failed to load cart");
            setCartItems([]);
            setLoading(false);
          },
        );

        return unsubscribe;
      } catch (err) {
        console.error("Cart hook error:", err);
        setError("Failed to load cart");
        setLoading(false);
      }
    };

    const unsubscribe = fetchCart();
    return () => {
      if (unsubscribe instanceof Function) {
        unsubscribe();
      }
    };
  }, [userId]);

  return { cartItems, loading, error };
}
