import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Adjust according to your UI components
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { supabase } from '@/createclient'; // Import your Supabase client

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve cart data from state
    const { cartItems = [], total = 0 } = location.state || {};
    
    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        orderDate: new Date().toISOString().slice(0, 10), // Default to today's date
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Insert payment details into Supabase
            const { data, error } = await supabase
                .from('payments')
                .insert([
                    {
                        name: paymentDetails.name,
                        order_date: paymentDetails.orderDate,
                        card_number: paymentDetails.cardNumber,
                        expiry_date: paymentDetails.expiryDate,
                        cvv: paymentDetails.cvv,
                        amount: total, // Assuming you want to store the total amount
                        // Add other fields as needed
                    }
                ]);

            if (error) throw error;

            // Redirect to success page or another page
            navigate('/payment-success');
        } catch (error) {
            console.error('Payment error:', error);
            // Show error message to user
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
            
            {/* Display cart details */}
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="mb-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-2">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {item.quantity} x Rp {item.price.toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
                <p className="font-semibold text-right">Total: Rp {total.toLocaleString()}</p>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Customer Name"
                        value={paymentDetails.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="orderDate">Order Date</Label>
                    <Input
                        id="orderDate"
                        name="orderDate"
                        type="date"
                        value={paymentDetails.orderDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9123 4567"
                        value={paymentDetails.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        name="cvv"
                        type="text"
                        placeholder="123"
                        value={paymentDetails.cvv}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Processing...' : 'Pay Now'}
                </Button>
            </form>
        </div>
    );
};

export default PaymentPage;
