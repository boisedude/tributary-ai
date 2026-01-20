import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, FileText } from "lucide-react";
import { ROUTES } from "@/lib/constants";

/**
 * Custom 404 page with navigation to help users find their way back.
 * Includes links to key pages and maintains site branding.
 */
export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 text-8xl font-bold text-muted-foreground/20">404</div>

      <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>

      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no longer exists.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg">
          <Link href={ROUTES.HOME}>
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={ROUTES.ASSESSMENT}>
            <FileText className="mr-2 h-5 w-5" />
            The Assessment
          </Link>
        </Button>
      </div>

      <div className="mt-12 border-t pt-8">
        <p className="mb-4 text-sm text-muted-foreground">
          Looking for something specific? Try these popular pages:
        </p>
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href={ROUTES.ASSESSMENT}
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            The Assessment
          </Link>
          <Link
            href={ROUTES.BLOG}
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            Blog
          </Link>
          <Link
            href={ROUTES.ABOUT}
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            About
          </Link>
          <Link
            href={ROUTES.CONTACT}
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </main>
  );
}
