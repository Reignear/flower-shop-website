import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UserSettingsLayout from '@/components/layout/user-settings-layout';

const SettingsNotification = () => {
  return (
    <UserSettingsLayout>
 
      <Card className="p-6 my-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Notification Preferences
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">Order Updates</p>
              <p className="text-sm text-muted-foreground">
                Get notified about your order status
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">Promotional Emails</p>
              <p className="text-sm text-muted-foreground">
                Receive special offers and discounts
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">Newsletter</p>
              <p className="text-sm text-muted-foreground">
                Weekly newsletter with new products
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive updates via SMS
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground mt-6">
          Save Preferences
        </Button>
      </Card>
    </UserSettingsLayout>
  );
}

export default SettingsNotification;