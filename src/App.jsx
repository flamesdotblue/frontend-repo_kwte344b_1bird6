import { useMemo, useState } from "react";
import Header from "./components/Header";
import GoalSelector from "./components/GoalSelector";
import MealCustomizer from "./components/MealCustomizer";
import OrderSummary from "./components/OrderSummary";

export default function App() {
  const [goal, setGoal] = useState("muscle");
  const [selections, setSelections] = useState({ protein: "chicken", carb: "quinoa", veg: "broc", qty: 1 });
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [ordered, setOrdered] = useState(false);

  const goalLabel = useMemo(() => {
    if (goal === "fatloss") return "Lose Fat";
    if (goal === "maintain") return "Maintain";
    return "Build Muscle";
  }, [goal]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header cartCount={ordered ? selections.qty : 0} />

      <main>
        <Hero />
        <GoalSelector goal={goal} setGoal={setGoal} />
        <MealCustomizer
          selections={selections}
          setSelections={setSelections}
          date={date}
          setDate={setDate}
        />
        <OrderSummary
          goalLabel={goalLabel}
          selections={selections}
          date={date}
          onPlace={() => setOrdered(true)}
        />
      </main>

      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 pt-10">
      <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Eat for your goal. We prep, you thrive.
            </h1>
            <p className="mt-3 text-slate-600">
              A famous nutritionist curates your plan. Choose your goal, customize your meals today, and get them
              delivered tomorrow to your doorstep or office.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#goals" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">
                Get started
              </a>
              <a href="#customize" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50">
                Customize meals
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">Change or cancel up to 6 PM today.</p>
          </div>
          <div className="relative min-h-[260px] md:min-h-[360px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} NutriPrep. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-emerald-600">Privacy</a>
          <a href="#" className="hover:text-emerald-600">Terms</a>
          <a href="#" className="hover:text-emerald-600">Support</a>
        </div>
      </div>
    </footer>
  );
}
