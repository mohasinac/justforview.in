import { NextRequest, NextResponse } from "next/server";
import { getFirestoreAdmin } from "@/app/api/lib/firebase/admin";
import { z } from "zod";

const COLLECTION = "blog_posts";

const UpdateBlogPostSchema = z.object({
  title: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featuredImage: z.string().url().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  showOnHomepage: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

// GET /api/blog/[slug] - Get single blog post by slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = getFirestoreAdmin();
    const { slug } = await params;

    const snapshot = await db
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const post = {
      id: doc.id,
      ...doc.data(),
    };

    // Increment view count
    await doc.ref.update({
      views: (doc.data().views || 0) + 1,
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PATCH /api/blog/[slug] - Update blog post (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = getFirestoreAdmin();
    const { slug } = await params;
    const body = await req.json();

    // Validate request body against the schema
    const validation = UpdateBlogPostSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const snapshot = await db
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const updates: any = {
      updatedAt: new Date().toISOString(),
      ...validation.data,
    };

    // Update publishedAt if changing to published
    if (
      validation.data.status === "published" &&
      doc.data().status !== "published"
    ) {
      updates.publishedAt = new Date().toISOString();
    }

    await doc.ref.update(updates);

    return NextResponse.json({
      id: doc.id,
      ...doc.data(),
      ...updates,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete blog post (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const db = getFirestoreAdmin();
    const { slug } = await params;

    const snapshot = await db
      .collection(COLLECTION)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await snapshot.docs[0].ref.delete();

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
