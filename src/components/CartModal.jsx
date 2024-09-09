import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CartModal = ({ isOpen, onClose, cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/payment', { state: { cartItems, total } }); // Kirim data pesanan ke halaman pembayaran
    onClose(); // Menutup modal setelah navigasi
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Pesanan</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} x Rp {item.price.toLocaleString()}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                Hapus
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-between items-center">
          <p className="font-semibold">Total: Rp {total.toLocaleString()}</p>
          <Button onClick={handleCheckout}>Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
