import { ShoppingBag, User, Flame, Clock, Truck } from "lucide-react";

export default function Header({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 grid place-items-center text-white">
            <Flame className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-slate-900">NutriPrep</p>
            <p className="text-xs text-slate-500">Chef-crafted fitness meals</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-700">
          <a href="#goals" className="hover:text-emerald-600 transition">Goals</a>
          <a href="#customize" className="hover:text-emerald-600 transition">Customize</a>
          <a href="#summary" className="hover:text-emerald-600 transition">Summary</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-slate-600">
            <Clock className="h-5 w-5" />
            <span className="text-sm">Order for tomorrow</span>
          </div>
          <button className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700">
            <ShoppingBag className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-emerald-500 text-white text-xs grid place-items-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Account</span>
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 via-lime-500 to-emerald-600 text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-2">
          <Truck className="h-4 w-4" />
          <p>Free delivery to home or office on all plans</p>
        </div>
      </div>
    </header>
  );
}
