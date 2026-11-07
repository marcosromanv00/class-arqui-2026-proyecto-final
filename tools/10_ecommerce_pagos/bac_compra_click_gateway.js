/**
 * Integrador Oficial Pasarela de Pagos BAC Credomatic (Compra-Click) & Stripe
 * Cámara de Comercio de Alajuela (CCA)
 */

import crypto from 'node:crypto';

export class BacCompraClickGateway {
  constructor(secretKey = 'cca_bac_secret_key_prod') {
    this.secretKey = secretKey;
    this.merchantId = 'CCA_ALAJUELA_BAC_001';
  }

  /**
   * Genera el payload cifrado con firma HMAC-SHA256 para redirección a pasarela bancaria.
   */
  createCheckoutSession({ orderId, amount, customerEmail, customerName }) {
    const timestamp = Date.now().toString();
    const rawSignature = `${this.merchantId}|${orderId}|${amount}|CRC|${timestamp}`;
    const signature = crypto.createHmac('sha256', this.secretKey).update(rawSignature).digest('hex');

    return {
      gatewayUrl: 'https://checkout.baccredomatic.com/compra-click/v2/pay',
      merchantId: this.merchantId,
      orderId,
      amount,
      currency: 'CRC',
      customer: {
        name: customerName,
        email: customerEmail
      },
      signature,
      timestamp,
      callbackSuccess: 'https://camaraalajuela.com/afiliaciones/exito',
      callbackFailure: 'https://camaraalajuela.com/afiliaciones/error'
    };
  }

  /**
   * Verifica la autenticidad del Webhook de notificación de pago del banco.
   */
  verifyWebhookSignature(payloadString, receivedSignature) {
    const expectedSignature = crypto.createHmac('sha256', this.secretKey).update(payloadString).digest('hex');
    return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(receivedSignature));
  }
}
