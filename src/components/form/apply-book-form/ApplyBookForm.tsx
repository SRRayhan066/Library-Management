import { ApplyBookFormValues, useApplyBook } from "@/hooks/use-apply-book";
import { Button } from "@/components/ui/button";
import InputField from "@/components/input-field/InputField";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Controller } from "react-hook-form";

interface ApplyBookFormProps {
  bookId: string;
  bookTitle: string;
  availableQuantity: number;
  onSuccess?: () => void;
  defaultValues?: Partial<ApplyBookFormValues>;
  mode?: "apply" | "edit";
  applicationId?: string;
}

export default function ApplyBookForm({
  bookId,
  bookTitle,
  availableQuantity,
  onSuccess,
  defaultValues,
  mode = "apply",
  applicationId,
}: ApplyBookFormProps) {
  const { register, handleSubmit, errors, isSubmitting, isValid, control } =
    useApplyBook(
      bookId,
      availableQuantity,
      onSuccess,
      defaultValues,
      mode,
      applicationId,
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
          Applying for:
        </h3>
        <p className="text-lg font-black tracking-tight">{bookTitle}</p>
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          Available Stock:{" "}
          <span className="text-foreground font-bold">
            {availableQuantity} Units
          </span>
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Select Date Archive Window
        </label>
        <Controller
          control={control}
          name="dateRange"
          render={({ field }) => (
            <DateRangePicker
              date={field.value}
              setDate={field.onChange}
              className="w-full"
            />
          )}
        />
        {errors.dateRange && (
          <p className="text-sm text-red-500 font-medium">
            {errors.dateRange.message as string}
          </p>
        )}
      </div>

      <InputField
        label="Quantity"
        type="number"
        required
        {...register("quantity", {
          required: "Please specify the quantity of books you need",
          min: {
            value: 1,
            message: "The requested quantity must be at least 1 unit",
          },
          max: {
            value: availableQuantity,
            message: `The requested quantity exceeds the available stock of ${availableQuantity} units`,
          },
        })}
        error={errors.quantity?.message}
        description={`Enter number of units (1 - ${availableQuantity})`}
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          className="w-full md:w-auto font-bold uppercase tracking-widest text-[11px]"
        >
          Dispatch Request
        </Button>
      </div>
    </form>
  );
}
