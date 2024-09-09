// PaymentSuccessPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccessPage = () => {
    return (
    <div className="p-4 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Pembayaran Berhasil!</h1>
        <p>Terima kasih atas pembelian Anda. Pesanan Anda sedang diproses.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
        Kembali ke Beranda
        </Link>
    </div>
    );
};

export default PaymentSuccessPage;
