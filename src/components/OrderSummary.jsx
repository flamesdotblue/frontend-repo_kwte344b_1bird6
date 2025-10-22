import { CheckCircle2, Truck } from "lucide-react";

export default function OrderSummary({ goalLabel, selections, date, onPlace }) {
  const items = [
    { label: "Protein", value: labelFor(selections.protein) },
    { label: "Carbs", value: labelFor(selections.carb) },
    { label: "Veggies", value: labelFor(selections.veg) },
    { label: "Quantity", value: selections.qty },
    { label: "Delivery", value: new Date(date).toLocaleDateString() },
  ];

  return (
    <section id="summary" className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white p-5">
          <h3 className="text-lg font-semibold">Your plan: {goalLabel}</h3>
          <p className="text-sm text-emerald-50">Flexible, chef-crafted meals guided by our nutritionist</p>
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-6">
          <div>
            <ul className="divide-y divide-slate-200">
              {items.map((it) => (
                <li key={it.label} className="py-3 flex items-center justify-between">
                  <span className="text-slate-600">{it.label}</span>
                  <span className="font-medium text-slate-900">{String(it.value)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-start gap-2">
              <Truck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium text-slate-900">Tomorrow delivery window</p>
                <p className="text-sm text-slate-600">10:00 AM - 1:00 PM to your home or office</p>
              </div>
            </div>
            <button
              onClick={onPlace}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <CheckCircle2 className="h-5 w-5" /> Place order
            </button>
            <p className="text-xs text-slate-500 mt-2">You can edit or cancel until 6 PM today.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function labelFor(id) {
  switch (id) {
    case "chicken":
      return "Chicken";
    case "salmon":
      return "Salmon";
    case "tofu":
      return "Tofu";
    case "quinoa":
      return "Quinoa";
    case "rice":
      return "Brown Rice";
    case "sweet":
      return "Sweet Potato";
    case "broc":
      return "Broccoli";
    case "greens":
      return "Greens";
    case "medley":
      return "Veggie Medley";
    default:
      return "-";
  }
}
