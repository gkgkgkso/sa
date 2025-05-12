import { loadPaymentWidget, PaymentWidgetInstance } from "@portone/browser-sdk";

let paymentWidget: PaymentWidgetInstance | null = null;

export async function getPaymentWidget(userCode: string) {
  if (!paymentWidget) {
    paymentWidget = await loadPaymentWidget(userCode, PaymentWidget => {
      return new PaymentWidget();
    });
  }
  return paymentWidget;
}

export async function initiatePayment({
  orderId,
  customerName,
  amount,
  productName,
}: {
  orderId: string;
  customerName: string;
  amount: number;
  productName: string;
}) {
  const userCode = process.env.NEXT_PUBLIC_PORTONE_USER_CODE;
  if (!userCode) {
    throw new Error('포트원 USER_CODE가 설정되지 않았습니다.');
  }

  const widget = await getPaymentWidget(userCode);
  
  await widget.renderPaymentMethods("#payment-method", {
    value: amount,
    currency: "KRW",
    country: "KR",
  });

  await widget.requestPayment({
    orderId,
    orderName: productName,
    customer: {
      name: customerName,
    },
    amount: {
      value: amount,
      currency: "KRW",
    },
    successUrl: `${window.location.origin}/api/payments/success`,
    failUrl: `${window.location.origin}/api/payments/fail`,
  });
}
