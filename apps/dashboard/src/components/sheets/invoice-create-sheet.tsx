"use client";

import type { InvoiceTemplate } from "@/actions/invoice/schema";
import { Form } from "@/components/invoice/form";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { Icons } from "@midday/ui/icons";
import { Sheet, SheetContent, SheetHeader } from "@midday/ui/sheet";
import React from "react";

type Props = {
  teamId: string;
  template: InvoiceTemplate;
};

export function InvoiceCreateSheet({ teamId, template }: Props) {
  const { setParams, createInvoice } = useInvoiceParams();

  const isOpen = Boolean(createInvoice);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={() => setParams({ createInvoice: null })}
    >
      <SheetContent style={{ maxWidth: 610 }} className="!bg-[#0C0C0C]">
        <SheetHeader className="mb-6 flex justify-between items-center flex-row">
          <h2 className="text-xl">Invoice</h2>
          <Icons.MoreVertical className="size-5" />
        </SheetHeader>

        <Form teamId={teamId} template={template} />
      </SheetContent>
    </Sheet>
  );
}
