import { Text, View } from "@react-pdf/renderer";
import type { LineItem } from "../template/invoice";
import { formatAmount } from "../utils/format";

type Props = {
  lineItems: LineItem[];
  currency: string;
};

export function LineItems({ lineItems, currency }: Props) {
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 0.5,
          borderBottomColor: "#000",
          paddingBottom: 5,
          marginBottom: 5,
        }}
      >
        <Text style={{ flex: 2, fontSize: 9, fontWeight: 500 }}>
          Description
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 9,
            fontWeight: 500,
            textAlign: "right",
          }}
        >
          Quantity
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 9,
            fontWeight: 500,
            textAlign: "right",
          }}
        >
          Price
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 9,
            fontWeight: 500,
            textAlign: "right",
          }}
        >
          Total
        </Text>
      </View>
      {lineItems.map((item, index) => (
        <View
          key={`line-item-${index.toString()}`}
          style={{ flexDirection: "row", paddingVertical: 5 }}
        >
          <Text style={{ flex: 2, fontSize: 9 }}>{item.name}</Text>
          <Text style={{ flex: 1, fontSize: 9, textAlign: "right" }}>
            {item.quantity}
          </Text>
          <Text style={{ flex: 1, fontSize: 9, textAlign: "right" }}>
            {formatAmount({ currency, amount: item.price })}
          </Text>
          <Text style={{ flex: 1, fontSize: 9, textAlign: "right" }}>
            {formatAmount({ currency, amount: item.quantity * item.price })}
          </Text>
        </View>
      ))}
    </View>
  );
}
