import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateInvoiceSummaryPDF = async (summaryData, filename) => {
  const {
    start,
    end,
    totalTransactions,
    totalAmount,
    transactions,
  } = summaryData;

  const doc = new PDFDocument({ margin: 40 });
  const filePath = path.join(__dirname, '..', 'invoices', filename);
  doc.pipe(fs.createWriteStream(filePath));

  // Title
  doc.fontSize(20).text('Transaction Summary Invoice', { align: 'center' });
  doc.moveDown();

  // Summary Info
  doc.fontSize(12).text(`Date Range: ${new Date(start).toDateString()} - ${new Date(end).toDateString()}`);
  doc.text(`Total Transactions: ${totalTransactions}`);
  doc.text(`Total Amount Sent: ₹${totalAmount.toLocaleString('en-IN')}`);
  doc.moveDown();

  // Table Headers
  doc.fontSize(12).text('Date', 50).text('To', 200).text('Amount (₹)', 400, undefined, { align: 'right' });
  doc.moveDown();

  // Transactions
  transactions.forEach((tx) => {
    doc
      .fontSize(10)
      .text(new Date(tx.timestamp).toLocaleDateString(), 50)
      .text(tx.destinationId?.toString().slice(-4) || 'Unknown', 200)
      .text(tx.amount.toLocaleString(), 400, undefined, { align: 'right' });
  });

  doc.end();
  return filePath;
};


export default generateInvoiceSummaryPDF;
