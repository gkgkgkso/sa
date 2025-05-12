const PORTONE_API_URL = 'https://api.iamport.kr';

interface PortoneTokenResponse {
  access_token: string;
}

interface PortonePaymentResponse {
  amount: number;
  status: string;
  success: boolean;
}

async function getPortoneToken(): Promise<string> {
  const response = await fetch(`${PORTONE_API_URL}/users/getToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imp_key: process.env.IAMPORT_API_KEY,
      imp_secret: process.env.IAMPORT_API_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get PortOne access token');
  }

  const data: PortoneTokenResponse = await response.json();
  return data.access_token;
}

export async function verifyPayment(paymentId: string): Promise<PortonePaymentResponse> {
  const token = await getPortoneToken();
  
  const response = await fetch(`${PORTONE_API_URL}/payments/${paymentId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to verify payment');
  }

  const data = await response.json();
  return {
    amount: data.response.amount,
    status: data.response.status,
    success: data.response.status === 'paid',
  };
}
