import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="mx-auto h-24 w-24 text-red-500">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="h-full w-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-8">
            Sorry, you don't have permission to access this resource. Please
            contact an administrator if you believe this is an error.
          </p>

          <div className="space-y-4">
            <Link href="/" className="btn btn-primary w-full">
              Go to Homepage
            </Link>

            <Link href="/contact" className="btn btn-outline w-full">
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
