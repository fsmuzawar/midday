"use client";

import { updateInvoiceSettingsAction } from "@/actions/invoice/update-invoice-settings-action";
import { Editor } from "@/components/editor";
import { useAction } from "next-safe-action/hooks";
import type { JSONContent } from "novel";
import { Controller, useFormContext } from "react-hook-form";
import { LabelInput } from "./label-input";

const defaultContent: JSONContent = {
  type: "paragraph",
  content: [
    { type: "text", text: "Acme inc" },
    { type: "hardBreak" },
    { type: "text", text: "john.doe@acme.com" },
    { type: "hardBreak" },
    { type: "text", text: "36182-4441" },
    { type: "hardBreak" },
    { type: "text", text: "Street 56" },
    { type: "hardBreak" },
    { type: "text", text: "243 21 California, USA" },
    { type: "hardBreak" },
    { type: "text", text: "VAT ID: SE1246767676020" },
  ],
};

export function CustomerContent() {
  const { control } = useFormContext();

  const updateInvoiceSettings = useAction(updateInvoiceSettingsAction);

  return (
    <div>
      <LabelInput
        name="settings.customer_label"
        onSave={(value) => {
          updateInvoiceSettings.execute({
            customer_label: value,
          });
        }}
      />
      <Controller
        name="customerContent"
        control={control}
        defaultValue={defaultContent}
        render={({ field }) => (
          <Editor
            initialContent={field.value}
            onChange={field.onChange}
            className="h-[115px]"
          />
        )}
      />
    </div>
  );
}
