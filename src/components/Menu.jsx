import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MenuItem = ({ id, name, image, price, category, addToCart }) => {
  const [quantity, setQuantity] = React.useState(0);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(0, prev - 1));

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ id, name, price, quantity });
      setQuantity(0); // Reset quantity after adding to cart
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
        <p className="text-lg font-semibold">Rp {price.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground mb-4">{category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={decrement}>-</Button>
            <span className="text-lg font-semibold">{quantity}</span>
            <Button variant="outline" size="icon" onClick={increment}>+</Button>
          </div>
          <Button variant="default" disabled={quantity === 0} onClick={handleAddToCart}>
            Tambah ke Keranjang
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Menu({ addToCart }) {
  const navigate = useNavigate();
  const menuItems = [
    { id: 1, name: "Kue Cokelat", image: "https://rknrfaylgopbmsntqidn.supabase.co/storage/v1/object/sign/hero-image/cokelat.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoZXJvLWltYWdlL2Nva2VsYXQuanBnIiwiaWF0IjoxNzI1MTEyOTM4LCJleHAiOjE3NTY2NDg5Mzh9.JWVmEcDKkgoplD6HTcIAoDiNx6-aS4IyeANbI9ILUE8&t=2024-08-31T14%3A02%3A19.448Z", price: 50000, category: "Kue" },
    { id: 2, name: "Kue Vanilla", image: "https://rknrfaylgopbmsntqidn.supabase.co/storage/v1/object/sign/hero-image/kue_vanila.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoZXJvLWltYWdlL2t1ZV92YW5pbGEuanBnIiwiaWF0IjoxNzI1MTEzMDAwLCJleHAiOjE3NTY2NDkwMDB9.dkgLtVB3t5qOZQrt3C2L5DXLVYWPbpxBvPIF7Q9YceQ&t=2024-08-31T14%3A03%3A21.497Z", price: 45000, category: "Kue" },
    { id: 3, name: "Kue Red Velvet", image: "https://rknrfaylgopbmsntqidn.supabase.co/storage/v1/object/sign/hero-image/red-velvet.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoZXJvLWltYWdlL3JlZC12ZWx2ZXQuanBnIiwiaWF0IjoxNzI1MTEzNTQ5LCJleHAiOjE3NTY2NDk1NDl9.KKqKQcZlVf9eFoBqW0Tlk1KoS_G9lp7CYKT6mDQCZRY&t=2024-08-31T14%3A12%3A30.367Z", price: 55000, category: "Kue" },
    { id: 4, name: "Kue Keju", image: "https://rknrfaylgopbmsntqidn.supabase.co/storage/v1/object/sign/hero-image/keju.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoZXJvLWltYWdlL2tlanUuanBnIiwiaWF0IjoxNzI1MTEzNTY5LCJleHAiOjE3NTY2NDk1Njl9.9qZLn_6pdwFaLL1Xm_6pLuGJVbR14ntLRlKP0KYL22Y&t=2024-08-31T14%3A12%3A50.404Z", price: 52000, category: "Kue" },
    { id: 5, name: "Roti Gandum", image: "https://rknrfaylgopbmsntqidn.supabase.co/storage/v1/object/sign/hero-image/rotigandum.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoZXJvLWltYWdlL3JvdGlnYW5kdW0uanBnIiwiaWF0IjoxNzI1MTEzNTg0LCJleHAiOjE3NTY2NDk1ODR9.xZVME2AtVvAxK5GJuxOKQQV8GoyqrlhK2iIZMsvAcQ4&t=2024-08-31T14%3A13%3A05.805Z", price: 25000, category: "Roti" },
    { id: 6, name: "Croissant", image: "https://rknrfaylgopbmsntqidn.supabase.co/storage/v1/object/sign/hero-image/croisant.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJoZXJvLWltYWdlL2Nyb2lzYW50LmpmaWYiLCJpYXQiOjE3MjUxMTM2MTAsImV4cCI6MTc1NjY0OTYxMH0.aFz3pE97QMtW5w3PPhZRiMPq8T2YV1lK2mc9l0Hzg24&t=2024-08-31T14%3A13%3A31.286Z", price: 15000, category: "Pastry" },
  ];

  const handleViewFullMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Menu Kami</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Pilih dari berbagai macam kue lezat kami. Setiap kue dibuat dengan bahan-bahan berkualitas tinggi dan cinta.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {menuItems.map((item) => (
            <MenuItem key={item.id} {...item} addToCart={addToCart} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button onClick={handleViewFullMenu} size="lg">
            Lihat Menu Lengkap
          </Button>
        </div>
      </div>
    </section>
  );
}