import { Link } from "react-router-dom";
import { Globe, Menu } from "lucide-react";

export function UserMenu() {
  const UserIcon = () => (
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  return (
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="hidden lg:block px-4 py-3 hover:bg-gray-50 rounded-full transition-colors font-medium"
        aria-label="Become a host (login)"
      >
        Become a host
      </Link>
      <button
        className="p-3 hover:bg-gray-50 rounded-full transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>
      <Link
        to="/login"
        className="flex items-center gap-2 p-2 pl-3 border border-gray-300 rounded-full hover:shadow-md transition-shadow"
        aria-label="Go to login"
      >
        <Menu className="w-4 h-4" />
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <UserIcon />
        </div>
      </Link>
    </div>
  );
}
