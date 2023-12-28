"use client";

import { AssignedUser } from "@/components/assigned-user";
import { Category } from "@/components/category";
import { FormatAmount } from "@/components/format-amount";
import { TransactionMethod } from "@/components/transaction-method";
import { Icons } from "@midday/ui/icons";
import { cn } from "@midday/ui/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";

export function DataTableCell({ children, className }) {
  return (
    <div
      className={cn(
        className,
        "h-[45px] px-4 py-2 border-r last:border-none truncate overflow-hidden text-sm flex items-center"
      )}
    >
      {children}
    </div>
  );
}

export function Row({ children, onSelect, selected }) {
  return (
    <div
      className={cn(
        "flex items-center h-[45px] hover:bg-secondary border-t",
        selected && "bg-secondary"
      )}
      onClick={onSelect}
    >
      {children}
    </div>
  );
}

export function DataTableRow({ collapsed, onSelect, data, selected }) {
  const fullfilled = data.attachments.length > 0;

  return (
    <Row onSelect={() => onSelect(data.id)} selected={selected}>
      <DataTableCell className="w-[100px]">
        {data.date && format(new Date(data.date), "MMM d")}
      </DataTableCell>

      <DataTableCell
        className={cn(
          "w-[430px] space-x-2",
          data.category === "income" && "text-[#00C969]"
        )}
      >
        {data.name}
      </DataTableCell>

      <DataTableCell className="w-[200px]">
        <span
          className={cn(
            "text-sm",
            data.category === "income" && "text-[#00C969]"
          )}
        >
          <FormatAmount amount={data.amount} currency={data.currency} />
        </span>
      </DataTableCell>

      <motion.div
        className="border-r"
        initial={false}
        animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 200 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
      >
        <DataTableCell className="w-[200px]">
          <Category name={data.category} />
        </DataTableCell>
      </motion.div>

      <motion.div
        className="border-r"
        initial={false}
        animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 150 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
      >
        <DataTableCell>
          <TransactionMethod method={data.method} />
        </DataTableCell>
      </motion.div>

      <motion.div
        className="border-r"
        initial={false}
        animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 200 }}
        transition={{
          duration: 0.25,
          ease: "easeInOut",
        }}
      >
        <DataTableCell className="w-[120px]">
          <AssignedUser user={data.assigned} />
        </DataTableCell>
      </motion.div>

      <DataTableCell className="w-[100px]">
        {fullfilled ? <Icons.Check /> : <Icons.AlertCircle />}
      </DataTableCell>
    </Row>
  );
}
