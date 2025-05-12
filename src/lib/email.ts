import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_FROM!,
      subject,
      html,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error);
    return { success: false, error };
  }
}

export async function sendOrderConfirmationEmail(order: any) {
  const { customer, items, totalAmount, bankInfo } = order;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container { padding: 20px; max-width: 600px; margin: 0 auto; }
          .header { text-align: center; padding: 20px; }
          .order-details, .payment-info { margin: 20px 0; background: #f9f9f9; padding: 20px; border-radius: 8px; }
          .footer { text-align: center; padding: 20px; color: #666; }
          .bank-info { background: #fff; padding: 15px; border-radius: 4px; margin-top: 15px; border: 1px solid #eee; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>주문이 완료되었습니다</h1>
            <p>주문번호: ${order.id}</p>
          </div>
          
          <div class="payment-info">
            <h2>무통장 입금 안내</h2>
            <div class="bank-info">
              <p><strong>은행:</strong> ${bankInfo.bankName}</p>
              <p><strong>계좌번호:</strong> ${bankInfo.accountNumber}</p>
              <p><strong>예금주:</strong> ${bankInfo.accountHolder}</p>
              <p><strong>입금금액:</strong> ₩${totalAmount}</p>
              <p><strong>입금기한:</strong> ${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR')} 까지</p>
            </div>
          </div>

          <div class="order-details">
            <h2>주문 상세</h2>
            <ul>
              ${items.map((item: any) => `
                <li>${item.name} x ${item.quantity} = ₩${item.price * item.quantity}</li>
              `).join('')}
            </ul>
            <p><strong>총 결제금액: ₩${totalAmount}</strong></p>
          </div>

          <div class="footer">
            <p>입금 확인까지 최대 1시간 정도 소요될 수 있습니다.</p>
            <p>문의사항이 있으시면 언제든 연락주세요.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: customer.email,
    subject: `[${process.env.NEXT_PUBLIC_SITE_NAME}] 주문이 완료되었습니다`,
    html,
  });
}
