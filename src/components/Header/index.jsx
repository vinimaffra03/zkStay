import { Logo } from "../Logo";
import { UserMenu } from "../UserMenu";

export function Header() {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between py-4">
          <Logo />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
