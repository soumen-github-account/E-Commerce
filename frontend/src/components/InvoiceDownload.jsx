import React, { useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo3.jpeg';
import { StoreContext } from '../contexts/StoreContext';

const InvoiceDownload = () => {
  const { rupee } = useContext(StoreContext);
  const location = useLocation();
  const orders = location.state?.order;

  const invoiceRef = useRef();

  const handleDownload = () => {
    const input = invoiceRef.current;

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  };

  // Common cell style for the table
  const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    fontSize: '13px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <button
        onClick={handleDownload}
        style={{
          backgroundColor: '#0d9488',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          marginBottom: '20px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Download Invoice
      </button>

      <div
        ref={invoiceRef}
        style={{
          backgroundColor: 'white',
          padding: '24px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          minHeight: '100vh',
        }}
        className='w-[700px]'
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '120px' }} crossOrigin="anonymous" />
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>INVOICE</p>
        </div>

        {/* Company Info */}
        <div style={{ marginTop: '16px', fontSize: '14px' }}>
          <p><strong>Shopstic Limited India</strong></p>
          <p>123 Business St, Kolkata</p>
          <p>Email: supportshopstic123@gmail.com</p>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }} className='min-w-full'>
          <thead>
            <tr style={{ backgroundColor: '#0d9488', color: 'white' }}>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>Product</th>
              <th style={cellStyle}>Quantity</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.items?.map((item, index) => (
              <tr key={index} className='font-sans'>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{item.name}</td>
                <td style={cellStyle}>{item.quantity}</td>
                <td style={cellStyle}>{rupee} {item.price}</td>
                <td style={cellStyle}>{rupee} {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ marginTop: '24px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Delivery Fee:</span>
            <span style={{ color: 'green' }}>Free</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Platform Fee:</span>
            <span className='font-sans'>{rupee} 5</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Grand Total:</span>
            <span className='font-sans'>{rupee} {orders.amount}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '24px', fontWeight: '500' }}>
          <p>Thank you for your purchase!</p>
          <p>For support, contact supportshopstic123@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDownload;
