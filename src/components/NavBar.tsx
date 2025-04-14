
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User as UserIcon, Menu, X, Bell, Settings, Home, Building, Plus, FileText, Receipt, LayoutDashboard, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Maintenance', path: '/maintenance', icon: Settings },
    { name: 'Rent Collection', path: '/rent-collection', icon: Receipt },
    { name: 'Evictions', path: '/eviction-support', icon: FileText },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'flex items-center gap-1.5 px-1 py-2 text-sm font-medium transition-all duration-200',
                    location.pathname === link.path
                      ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-500'
                      : 'text-gray-600 hover:text-blue-500'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Add Property Button */}
            {user ? (
              <Link
                to="/add-property"
                className="hidden items-center gap-1.5 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg md:flex"
              >
                <Plus className="h-4 w-4" />
                <span>Add Property</span>
              </Link>
            ) : (
              <Link
                to="/sign-up"
                className="hidden items-center gap-1.5 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-600 hover:shadow-lg md:flex"
              >
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            )}

            {/* Notifications - only show if logged in */}
            {user && (
              <button className="relative rounded-full p-2 text-gray-600 transition-all hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500"></span>
              </button>
            )}

            {/* User Menu or Sign In */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm transition-all duration-200 hover:shadow-md">
                    <div className="h-8 w-8 overflow-hidden rounded-full">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                to="/sign-in"
                className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md border border-gray-200"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="rounded-md p-2 text-gray-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 transform bg-white pt-16 transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {user ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'block rounded-md px-3 py-4 text-base font-medium transition-all duration-200',
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="h-5 w-5" />
                    {link.name}
                  </div>
                </Link>
              ))}
              
              <Link
                to="/profile"
                className={cn(
                  'block rounded-md px-3 py-4 text-base font-medium transition-all duration-200',
                  location.pathname === '/profile'
                    ? 'bg-blue-50 text-blue-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
                )}
              >
                <div className="flex items-center gap-3">
                  <UserIcon className="h-5 w-5" />
                  Profile
                </div>
              </Link>
              
              <button
                onClick={signOut}
                className="w-full block rounded-md px-3 py-4 text-base font-medium transition-all duration-200 text-left text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </div>
              </button>
              
              <Link
                to="/add-property"
                className="mt-6 flex items-center justify-center gap-2 rounded-md bg-blue-500 px-3 py-4 text-base font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
                Add Property
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/sign-in"
                className="block rounded-md px-3 py-4 text-base font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              >
                <div className="flex items-center gap-3">
                  <LogIn className="h-5 w-5" />
                  Sign In
                </div>
              </Link>
              
              <Link
                to="/sign-up"
                className="mt-6 flex items-center justify-center gap-2 rounded-md bg-blue-500 px-3 py-4 text-base font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-600"
              >
                <UserPlus className="h-5 w-5" />
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
