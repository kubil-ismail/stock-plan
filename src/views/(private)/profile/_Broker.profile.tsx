"use client";
import * as yup from "yup";
import { toast } from "sonner";
import { useFormik } from "formik";
import { Brokers } from "@/types/general";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { MyBrokerResponse } from "@/types/auth";
import { useSearchParams } from "next/navigation";
import { GlassCard } from "@/components/glass-card";
import { add_auth_brokers, delete_auth_brokers } from "@/services/auth";
import { ConfirmationModal } from "@/components/confirmation-modal";
import { get_general_brokers } from "@/services/general";
import {
  Plus,
  Trash2,
  Building2,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/input";
import { TextArea } from "@/components/Textarea";
import { SelectInput } from "@/components/Select";

interface Props {
  brokers: MyBrokerResponse;
}

const validationSchema = yup.object({
  broker_id: yup
    .string()
    .min(1, "Broker is required")
    .required("Broker is required"),
  account_number: yup.string().optional(),
  notes: yup.string().optional(),
});

function Broker_profile(props: Props) {
  const { brokers } = props;
  const searchParams = useSearchParams();

  const [list, setList] = useState(brokers.data);
  const [brokerOptions, setBrokerOptions] = useState<Brokers[]>([]);
  const [isAddBrokerOpen, setIsAddBrokerOpen] = useState(
    searchParams.get("section") === "brokers"
  );

  // Delete confirmation state
  const [deleteBrokerId, setDeleteBrokerId] = useState<number | null>(null);
  const [isDeleteBrokerModalOpen, setIsDeleteBrokerModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      broker_id: "",
      account_number: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsAddBrokerOpen(false);

      return add_auth_brokers(values)
        .then(() => {
          toast.success("Broker added successfully!", {
            icon: <CheckCircle size="14px" className="text-green-600" />,
          });

          setList([
            {
              id: new Date().getTime(),
              account_number: parseInt(values.account_number),
              notes: values?.notes,
              broker: brokerOptions.find(
                (item) => item.id == parseInt(values.broker_id)
              )!,
            },
            ...list,
          ]);

          formik.resetForm();
        })
        .catch(() => {
          toast.error("Failed to add broker", {
            description: "Something went wrong. Please try again.",
            icon: <XCircle size="14px" className="text-red-600" />,
          });
        });
    },
  });

  const handleDeleteBrokerClick = (id: number) => {
    setDeleteBrokerId(id);
    setIsDeleteBrokerModalOpen(true);
  };

  const handleConfirmDeleteBroker = async () => {
    if (deleteBrokerId) {
      await delete_auth_brokers(deleteBrokerId);

      toast.success("Broker removed successfully", {
        icon: <CheckCircle size="14px" className="text-green-600" />,
      });
      setDeleteBrokerId(null);

      setList((prev) => prev.filter((item) => item.id !== deleteBrokerId));
    }
  };

  useEffect(() => {
    if (isAddBrokerOpen) {
      get_general_brokers().then((response) => setBrokerOptions(response.data));
    }
  }, [isAddBrokerOpen]);

  return (
    <>
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-[20px] font-semibold text-foreground">
            My Brokers / Sekuritas Saya
          </h2>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-12 mb-4">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-[14px] text-muted-foreground">
              No brokers added yet
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {list.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] font-bold text-primary">
                      {item.broker.name.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-foreground">
                      {item.broker.name}
                    </p>
                    {item.account_number && (
                      <p className="text-[13px] text-muted-foreground">
                        {item.account_number}
                      </p>
                    )}
                    {item.notes && (
                      <p className="text-[12px] text-muted-foreground mt-1">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors self-end sm:self-center cursor-pointer"
                  aria-label="Delete broker"
                  onClick={() => handleDeleteBrokerClick(item.id)}
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
          className="w-full flex items-center justify-center"
          onClick={() => setIsAddBrokerOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Broker
        </Button>
      </GlassCard>

      {/* Add Broker Dialog */}
      <Dialog open={isAddBrokerOpen} onOpenChange={setIsAddBrokerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Broker</DialogTitle>
            <DialogDescription>
              Add your securities broker to start creating orders
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
            <SelectInput
              id="broker_id"
              name="broker_id"
              label="Broker"
              value={formik.values.broker_id}
              onChange={(value: string) => {
                formik.setFieldTouched("broker_id", false);
                formik.setFieldValue("broker_id", value);
                formik.setFieldError("broker_id", "");
              }}
              onBlur={() => formik.setFieldTouched("broker_id", true)}
              error={
                formik.touched.broker_id && Boolean(formik.errors.broker_id)
              }
              errorMsg={formik.errors.broker_id}
              list={brokerOptions?.map((item) => ({
                id: item.id,
                label: `(${item.ticker}) ${item.name}`,
              }))}
            />

            <Input
              id="account_number"
              name="account_number"
              label="Account Number (Optional)"
              type="number"
              value={formik.values.account_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.account_number &&
                Boolean(formik.errors.account_number)
              }
              errorMsg={formik.errors.account_number}
            />

            <TextArea
              id="notes"
              name="notes"
              label="Notes (Optional)"
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              errorMsg={formik.errors.notes}
            />

            <div className="flex gap-3 pt-2">
              <Button variant="primary" type="submit" className="flex-1">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddBrokerOpen(false);
                  formik.resetForm();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
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
            <strong>Warning:</strong> Deleting this broker will not affect your
            existing orders, but you won&apos;t be able to create new orders
            with this broker.
          </p>
        </div>
      </ConfirmationModal>
    </>
  );
}

export default Broker_profile;
