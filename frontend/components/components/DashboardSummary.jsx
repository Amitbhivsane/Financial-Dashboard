import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSummary({
  totalBudget = 0,
  totalActual = 0,
  recent = [],
}) {
  // Sort and get the latest transaction if available
  const latest =
    recent.length > 0
      ? [...recent].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Budget */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Budget</p>
          <h2 className="text-2xl font-bold text-blue-600">₹{totalBudget}</h2>
        </CardContent>
      </Card>

      {/* Total Actual Expense */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total Spent</p>
          <h2 className="text-2xl font-bold text-red-600">₹{totalActual}</h2>
        </CardContent>
      </Card>

      {/* Most Recent Transaction */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Latest Transaction</p>
          {latest ? (
            <>
              <h2 className="font-medium">{latest.description}</h2>
              <p className="text-xs text-gray-500">
                {new Date(latest.date).toLocaleString("en-IN", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </p>
              <p className="text-sm text-gray-700">₹{latest.amount}</p>
              <p className="text-sm text-gray-600">
                Category: {latest.category}
              </p>
            </>
          ) : (
            <p className="text-sm">No transactions yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
