import { useState } from 'react';
import { GlassCard } from '../components/glass-card';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Badge } from '../components/badge';
import { ConfirmationModal } from '../components/confirmation-modal';
import { 
  User, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Award, 
  X, 
  Plus, 
  Edit2, 
  Trash2,
  Building2,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import { mockBrokers, availableBrokers } from '../lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { useSearchParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/auth-context';

export function Profile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
  });

  // Broker management state
  const [brokers, setBrokers] = useState(mockBrokers);
  const [isAddBrokerOpen, setIsAddBrokerOpen] = useState(searchParams.get('section') === 'brokers');
  const [brokerForm, setBrokerForm] = useState({
    name: '',
    accountNumber: '',
    notes: '',
  });
  
  // Delete confirmation state
  const [deleteBrokerId, setDeleteBrokerId] = useState<string | null>(null);
  const [isDeleteBrokerModalOpen, setIsDeleteBrokerModalOpen] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Mock save action
  };

  const handleAddBroker = () => {
    if (!brokerForm.name) {
      toast.error('Please select a broker');
      return;
    }

    const newBroker = {
      id: Date.now().toString(),
      ...brokerForm,
    };

    setBrokers([...brokers, newBroker]);
    setIsAddBrokerOpen(false);
    setBrokerForm({ name: '', accountNumber: '', notes: '' });
    toast.success('Broker added successfully!');
  };

  const handleDeleteBrokerClick = (id: string) => {
    setDeleteBrokerId(id);
    setIsDeleteBrokerModalOpen(true);
  };

  const handleConfirmDeleteBroker = () => {
    if (deleteBrokerId) {
      setBrokers(brokers.filter(b => b.id !== deleteBrokerId));
      toast.success('Broker removed successfully');
      setDeleteBrokerId(null);
    }
  };

  const stats = [
    { label: 'Total Trades', value: '45', icon: TrendingUp },
    { label: 'Win Rate', value: '68%', icon: Award },
    { label: 'Member Since', value: 'Jan 2025', icon: Calendar },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">Profile</h1>
        <p className="text-[14px] text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-[48px] font-bold text-white">
                {formData.fullname.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {!isEditing ? (
              <div className="space-y-5">
                <div>
                  <p className="text-[12px] text-muted-foreground mb-1">Full Name</p>
                  <p className="text-[18px] font-semibold text-foreground">{formData.fullname}</p>
                </div>

                <div>
                  <p className="text-[12px] text-muted-foreground mb-1">Username</p>
                  <p className="text-[16px] text-foreground">@{formData.username}</p>
                </div>

                <div>
                  <p className="text-[12px] text-muted-foreground mb-1">Email</p>
                  <p className="text-[16px] text-foreground">{formData.email}</p>
                </div>

                <div className="pt-4">
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                />

                <Input
                  label="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <div className="flex gap-3 pt-2">
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Broker Management Section */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-[20px] font-semibold text-foreground">My Brokers / Sekuritas Saya</h2>
        </div>

        {brokers.length === 0 ? (
          <div className="text-center py-12 mb-4">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-[14px] text-muted-foreground">
              No brokers added yet
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {brokers.map((broker) => (
              <div
                key={broker.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] font-bold text-primary">
                      {broker.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-foreground">
                      {broker.name}
                    </p>
                    {broker.accountNumber && (
                      <p className="text-[13px] text-muted-foreground">
                        {broker.accountNumber}
                      </p>
                    )}
                    {broker.notes && (
                      <p className="text-[12px] text-muted-foreground mt-1">
                        {broker.notes}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors self-end sm:self-center"
                  aria-label="Delete broker"
                  onClick={() => handleDeleteBrokerClick(broker.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Broker Button - Inside Card */}
        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={() => setIsAddBrokerOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Broker
        </Button>
      </GlassCard>

      {/* Account Summary */}
      <GlassCard className="p-6">
        <h2 className="text-[20px] font-semibold text-foreground mb-6">Account Summary</h2>
        <div className="grid grid-cols-1 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="p-5 rounded-lg bg-accent/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-[24px] font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Security */}
      <GlassCard className="p-6">
        <h2 className="text-[20px] font-semibold text-foreground mb-6">Security</h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
        </div>
      </GlassCard>

      {/* Logout Button */}
      <div className="pb-6">
        <Button
          variant="outline"
          className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/5 flex items-center gap-2"
          onClick={() => {
            logout();
            navigate('/market');
            toast.success('Logged out successfully');
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>

      {/* Add Broker Dialog */}
      <Dialog open={isAddBrokerOpen} onOpenChange={setIsAddBrokerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Broker</DialogTitle>
            <DialogDescription>
              Add your securities broker to start creating orders
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-[14px] font-medium text-foreground mb-2">
                Broker Name *
              </label>
              <select
                value={brokerForm.name}
                onChange={(e) => setBrokerForm({ ...brokerForm, name: e.target.value })}
                className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a broker</option>
                {availableBrokers.map((broker) => (
                  <option key={broker} value={broker}>
                    {broker}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-foreground mb-2">
                Account Number (Optional)
              </label>
              <input
                type="text"
                value={brokerForm.accountNumber}
                onChange={(e) => setBrokerForm({ ...brokerForm, accountNumber: e.target.value })}
                placeholder="Enter account number"
                className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium text-foreground mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={brokerForm.notes}
                onChange={(e) => setBrokerForm({ ...brokerForm, notes: e.target.value })}
                placeholder="Add notes about this account"
                rows={3}
                className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="primary"
                onClick={handleAddBroker}
                className="flex-1"
                disabled={!brokerForm.name}
              >
                Save Broker
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddBrokerOpen(false);
                  setBrokerForm({ name: '', accountNumber: '', notes: '' });
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Broker Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteBrokerModalOpen}
        onClose={() => setIsDeleteBrokerModalOpen(false)}
        onConfirm={handleConfirmDeleteBroker}
        title="Delete Broker"
        description="Are you sure you want to delete this broker? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      >
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-destructive">
            <strong>Warning:</strong> Deleting this broker will not affect your existing orders, but you won't be able to create new orders with this broker.
          </p>
        </div>
      </ConfirmationModal>
    </div>
  );
}