import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import UserSettingsLayout from '@/components/layout/user-settings-layout';

const SettingsProfile = () => {
  return (
    <UserSettingsLayout>
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              First Name
            </label>
            <input
              type="text"
              defaultValue="Sarah"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Last Name
            </label>
            <input
              type="text"
              defaultValue="Johnson"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">
              Email
            </label>
            <input
              type="email"
              defaultValue="sarah.johnson@example.com"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground mb-2 block">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            />
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground">
          Save Changes
        </Button>
      </Card>
    </UserSettingsLayout>
  );
}

export default SettingsProfile;