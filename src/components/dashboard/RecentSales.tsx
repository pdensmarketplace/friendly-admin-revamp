import { Avatar } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <img
            alt="Avatar"
            src="/lovable-uploads/7e1509c1-c710-4ccc-8e1c-daf79ceff2e2.png"
            className="rounded-full"
          />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">New Customer Sign-up</p>
          <p className="text-sm text-muted-foreground">
            Premium Plan Subscription
          </p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <img
            alt="Avatar"
            src="/lovable-uploads/7e1509c1-c710-4ccc-8e1c-daf79ceff2e2.png"
            className="rounded-full"
          />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Plan Upgrade</p>
          <p className="text-sm text-muted-foreground">Basic to Premium</p>
        </div>
        <div className="ml-auto font-medium">+$49.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <img
            alt="Avatar"
            src="/lovable-uploads/7e1509c1-c710-4ccc-8e1c-daf79ceff2e2.png"
            className="rounded-full"
          />
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Device Purchase</p>
          <p className="text-sm text-muted-foreground">iPhone 15 Pro</p>
        </div>
        <div className="ml-auto font-medium">+$999.00</div>
      </div>
    </div>
  );
}