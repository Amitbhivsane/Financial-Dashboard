import { Card, CardContent } from "@/components/ui/card";

export default function DashboardSummary({ totalBudget, totalActual, recent }) {
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
          <p className="text-sm text-muted-foreground">Recent Transaction</p>
          {recent.length > 0 ? (
            <>
              <h2 className="font-medium">{recent[0].description}</h2>
              <p className="text-xs text-gray-500">
                {new Date(recent[0].date).toDateString()}
              </p>
              <p className="text-sm text-gray-700">₹{recent[0].amount}</p>
              <p className="text-sm text-gray-600">
                Category: {recent[0].category}
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
