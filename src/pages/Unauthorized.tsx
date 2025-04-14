
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Unauthorized() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
            <ShieldAlert className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {user ? (
              <>
                Your current role ({user.role}) doesn't have permission to access this page.
                Please contact an administrator if you believe this is an error.
              </>
            ) : (
              <>
                You must be logged in with the appropriate permissions to access this page.
              </>
            )}
          </p>
          <div className="mt-6 flex flex-col space-y-4">
            <Button asChild>
              <Link to="/">
                Back to Home
              </Link>
            </Button>
            {user ? (
              <Button variant="outline" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/sign-in">
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
