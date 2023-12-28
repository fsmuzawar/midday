import { capitalCase } from "change-case";

export const mapTransactionMethod = (method: string) => {
  switch (method) {
    case "Payment":
    case "Bankgiro payment":
    case "Incoming foreign payment":
      return "payment";
    case "Card purchase":
    case "Card foreign purchase":
      return "card_purchase";
    case "Card ATM":
      return "card_atm";
    case "Transfer":
      return "transfer";
    default:
      return "other";
  }
};

export async function processPromisesBatch(
  items: Array<any>,
  limit: number,
  fn: (item: any) => Promise<any>
): Promise<any> {
  let results = [];
  for (let start = 0; start < items.length; start += limit) {
    const end = start + limit > items.length ? items.length : start + limit;

    const slicedResults = await Promise.all(items.slice(start, end).map(fn));

    results = [...results, ...slicedResults];
  }

  return results;
}

export const transformTransactions = (transactions, { teamId, accountId }) => {
  // We want to insert transactions in reversed order so the incremental id in supabase is correct
  return transactions?.reverse().map((data) => {
    const method = mapTransactionMethod(data.proprietaryBankTransactionCode);

    return {
      transaction_id: data.transactionId,
      reference: data.entryReference,
      booking_date: data.bookingDate,
      date: data.valueDate,
      name: capitalCase(data.additionalInformation),
      original: data.additionalInformation,
      method,
      internal_id: `${teamId}_${data.internalTransactionId}`,
      amount: data.transactionAmount.amount,
      currency: data.transactionAmount.currency,
      bank_account_id: accountId,
      category: data.transactionAmount.amount > 0 ? "income" : null,
      team_id: teamId,
    };
  });
};
