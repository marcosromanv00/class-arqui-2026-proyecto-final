/**
 * Validador Oficial de Transacciones y Comprobantes SINPE Móvil
 * Proyecto: Cámara de Comercio de Alajuela (CCA) - EIF-511 UNA
 * 
 * Normativa: Banco Central de Costa Rica (BCCR) & Factura Electrónica v4.3 (Ministerio de Hacienda)
 */

export class SinpeMovilValidator {
  constructor() {
    this.officialPhone = '50684923925'; // Teléfono oficial CCA para SINPE
    this.validPlanAmounts = new Set([15000, 35000]); // Plan Pyme ₡15.000, Plan Corporativo ₡35.000
    this.processedReceipts = new Set(); // Caché anti-replay de comprobantes bancarios
  }

  /**
   * Valida un comprobante bancario de SINPE Móvil.
   * @param {Object} paymentData
   * @param {string} paymentData.sourcePhone - Teléfono emisor (+506...)
   * @param {number} paymentData.amount - Monto transferido en colones
   * @param {string} paymentData.receiptNumber - Número de comprobante del banco (6-14 dígitos)
   * @param {string} paymentData.bankName - Banco emisor (BAC, BCR, BNCR, Promerica, etc.)
   */
  validateTransaction(paymentData) {
    const { sourcePhone, amount, receiptNumber, bankName } = paymentData;

    const errors = [];

    // 1. Validación de Formato Telefónico Costa Rica (+506, 8 dígitos válidos)
    const cleanPhone = (sourcePhone || '').replace(/\D/g, '');
    const localPhone = cleanPhone.startsWith('506') ? cleanPhone.slice(3) : cleanPhone;
    if (!/^[678]\d{7}$/.test(localPhone)) {
      errors.push('El número telefónico emisor debe ser un número celular costarricense válido de 8 dígitos (iniciando en 6, 7 u 8).');
    }

    // 2. Validación de Monto de Membresía Oficial
    const numAmount = Number(amount);
    if (!this.validPlanAmounts.has(numAmount)) {
      errors.push(`El monto transferido (₡${numAmount.toLocaleString('es-CR')}) no coincide con los planes oficiales de la CCA (₡15.000 Pyme o ₡35.000 Corporativo).`);
    }

    // 3. Validación de Número de Comprobante Bancario
    const cleanReceipt = (receiptNumber || '').trim();
    if (!/^\d{6,14}$/.test(cleanReceipt)) {
      errors.push('El número de comprobante bancario debe ser numérico y contener entre 6 y 14 dígitos emitidos por su entidad bancaria.');
    }

    // 4. Prevención de Reutilización (Anti-Replay Attack)
    const receiptKey = `${bankName || 'GENERIC'}:${cleanReceipt}`;
    if (this.processedReceipts.has(receiptKey)) {
      errors.push(`El comprobante bancario N° ${cleanReceipt} ya fue registrado previamente para otra membresía. No se permiten comprobantes duplicados.`);
    }

    if (errors.length > 0) {
      return {
        isValid: false,
        errors
      };
    }

    // Registrar comprobante como utilizado
    this.processedReceipts.add(receiptKey);

    return {
      isValid: true,
      receiptNumber: cleanReceipt,
      sourcePhone: `+506 ${localPhone.slice(0, 4)}-${localPhone.slice(4)}`,
      amountCRC: numAmount,
      currency: 'CRC',
      destinationAccount: 'Cámara de Comercio de Alajuela (8492-3925)',
      status: 'VERIFICADO_EXITOSO',
      timestamp: new Date().toISOString(),
      haciendaTaxDeductible: true,
      notaFiscal: 'Gasto deducible conforme al Art. 8 Ley del Impuesto sobre la Renta N° 7092.'
    };
  }
}
