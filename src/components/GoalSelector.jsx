import { useMemo } from "react";
import { CheckCircle2, Flame, Star } from "lucide-react";

const GOALS = [
  {
    id: "fatloss",
    name: "Lose Fat",
    desc: "Lean, satisfying meals with moderate carbs and higher protein.",
    color: "from-rose-500 to-orange-500",
    macros: { protein: 35, carbs: 35, fats: 30 },
  },
  {
    id: "muscle",
    name: "Build Muscle",
    desc: "Hearty portions, high-protein and balanced carbs.",
    color: "from-emerald-500 to-lime-500",
    macros: { protein: 40, carbs: 40, fats: 20 },
  },
  {
    id: "maintain",
    name: "Maintain",
    desc: "Everyday fuel with well-rounded nutrition.",
    color: "from-sky-500 to-cyan-500",
    macros: { protein: 30, carbs: 45, fats: 25 },
  },
];

export default function GoalSelector({ goal, setGoal }) {
  const selected = useMemo(() => GOALS.find((g) => g.id === goal) || GOALS[1], [goal]);

  return (
    <section id="goals" className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Choose your fitness goal</h2>
          <p className="text-slate-600 mt-1">Our nutritionist will tailor meals to match your targets.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {GOALS.map((g) => {
              const active = g.id === selected.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`relative rounded-xl border p-4 text-left transition bg-white hover:shadow-sm ${
                    active
                      ? "border-emerald-500 ring-2 ring-emerald-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className={`h-9 w-9 rounded-lg bg-gradient-to-tr ${g.color} text-white grid place-items-center mb-3`}>
                    <Flame className="h-5 w-5" />
                  </div>
                  <p className="font-medium text-slate-900">{g.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{g.desc}</p>
                  {active && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 absolute top-3 right-3" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium text-slate-900">Nutritionist suggestion</h3>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Based on your goal, we recommend this macro split for tomorrow's meals.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <MacroPill label="Protein" value={selected.macros.protein} color="bg-emerald-100 text-emerald-700" />
            <MacroPill label="Carbs" value={selected.macros.carbs} color="bg-sky-100 text-sky-700" />
            <MacroPill label="Fats" value={selected.macros.fats} color="bg-amber-100 text-amber-700" />
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-800">Sample menu</p>
            <ul className="mt-2 text-sm text-slate-600 list-disc list-inside space-y-1">
              {selected.id === "muscle" && (
                <>
                  <li>Grilled chicken, herbed quinoa, roasted broccoli</li>
                  <li>Steak and sweet potato mash, green beans</li>
                  <li>Greek yogurt bowl with berries and granola</li>
                </>
              )}
              {selected.id === "fatloss" && (
                <>
                  <li>Turkey meatballs, zucchini noodles, tomato basil sauce</li>
                  <li>Salmon, citrus slaw, cauliflower rice</li>
                  <li>Cottage cheese with cucumber and dill</li>
                </>
              )}
              {selected.id === "maintain" && (
                <>
                  <li>Chicken pesto pasta, cherry tomatoes, arugula</li>
                  <li>Teriyaki tofu, brown rice, stir-fry veggies</li>
                  <li>Overnight oats with chia and almond butter</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MacroPill({ label, value, color }) {
  return (
    <div className={`rounded-xl ${color} px-4 py-3`}>
      <p className="text-xs uppercase tracking-wide">{label}</p>
      <p className="text-xl font-semibold">{value}%</p>
    </div>
  );
}
