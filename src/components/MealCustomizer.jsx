import { useMemo } from "react";
import { Plus, Minus, Edit3, Clock } from "lucide-react";

const PROTEINS = [
  { id: "chicken", name: "Chicken", cals: 220 },
  { id: "salmon", name: "Salmon", cals: 250 },
  { id: "tofu", name: "Tofu", cals: 180 },
];
const CARBS = [
  { id: "quinoa", name: "Quinoa", cals: 160 },
  { id: "rice", name: "Brown Rice", cals: 170 },
  { id: "sweet", name: "Sweet Potato", cals: 150 },
];
const VEGGIES = [
  { id: "broc", name: "Broccoli", cals: 60 },
  { id: "greens", name: "Greens", cals: 40 },
  { id: "medley", name: "Veggie Medley", cals: 70 },
];

export default function MealCustomizer({ selections, setSelections, date, setDate }) {
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
  }, []);

  const totalCals = useMemo(() => {
    const { protein, carb, veg, qty } = selections;
    const p = PROTEINS.find((x) => x.id === protein);
    const c = CARBS.find((x) => x.id === carb);
    const v = VEGGIES.find((x) => x.id === veg);
    const base = (p?.cals || 0) + (c?.cals || 0) + (v?.cals || 0);
    return base * qty;
  }, [selections]);

  const update = (field, value) => setSelections((prev) => ({ ...prev, [field]: value }));
  const changeQty = (delta) => setSelections((prev) => ({ ...prev, qty: Math.max(1, prev.qty + delta) }));

  return (
    <section id="customize" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-4">
        <Edit3 className="h-5 w-5 text-emerald-600" />
        <h2 className="text-2xl font-semibold text-slate-900">Customize tomorrow's meals</h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <PickerCard title="Protein" options={PROTEINS} value={selections.protein} onChange={(v) => update("protein", v)} />
        <PickerCard title="Carbs" options={CARBS} value={selections.carb} onChange={(v) => update("carb", v)} />
        <PickerCard title="Veggies" options={VEGGIES} value={selections.veg} onChange={(v) => update("veg", v)} />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-800">Quantity</p>
          <div className="mt-3 flex items-center gap-3">
            <button onClick={() => changeQty(-1)} className="h-10 w-10 grid place-items-center rounded-lg border border-slate-200 hover:bg-slate-50">
              <Minus className="h-5 w-5" />
            </button>
            <div className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-semibold min-w-[3rem] text-center">
              {selections.qty}
            </div>
            <button onClick={() => changeQty(1)} className="h-10 w-10 grid place-items-center rounded-lg border border-slate-200 hover:bg-slate-50">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-600" />
            <p className="text-sm font-medium text-slate-800">Delivery date</p>
          </div>
          <p className="text-sm text-slate-600 mt-1">Orders can be scheduled a day in advance.</p>
          <input
            type="date"
            className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
            value={date}
            min={tomorrow}
            max={tomorrow}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-slate-50 p-5">
        <p className="text-sm text-slate-700">Estimated calories</p>
        <p className="text-3xl font-semibold text-slate-900">{totalCals} kcal</p>
        <p className="text-xs text-slate-600 mt-1">Calculated from your selections and quantity</p>
      </div>
    </section>
  );
}

function PickerCard({ title, options, value, onChange }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-medium text-slate-800">{title}</p>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={`rounded-xl border p-3 text-left hover:shadow-sm transition ${
              value === o.id ? "border-emerald-500 ring-2 ring-emerald-200" : "border-slate-200"
            }`}
          >
            <p className="font-medium text-slate-900">{o.name}</p>
            <p className="text-xs text-slate-600">~{o.cals} kcal</p>
          </button>
        ))}
      </div>
    </div>
  );
}
