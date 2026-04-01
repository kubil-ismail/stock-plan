/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "./ui/utils";

export function SelectInput({
  id,
  name,
  value,
  label,
  onChange,
  onBlur,
  error,
  errorMsg,
  className,
  list,
}: {
  id: string;
  name: string;
  value: string | number;
  onChange: any;
  onBlur: any;
  label?: string;
  error?: boolean;
  errorMsg?: string;
  className?: string;
  list: {
    id: number;
    label: string;
  }[];
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[14px] font-medium text-foreground">
          {label}
        </label>
      )}

      <Select
        onValueChange={(value) => {
          onChange(value);
        }}
      >
        <SelectTrigger
          className={cn(
            "w-full rounded-[10px] border border-border bg-input-background px-4 py-5",
            "text-[14px] text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "transition-all duration-200",
            error && "border-destructive focus:ring-destructive",
            className
          )}
        >
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {list.map((item) => (
              <SelectItem value={String(item.id)} key={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-[12px] text-destructive">{errorMsg}</p>}
    </div>
  );
}
