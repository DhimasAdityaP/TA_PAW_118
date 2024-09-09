import React, { useState, useEffect } from 'react';
import { supabase } from '@/createclient';
import toast from 'react-hot-toast';

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '', price: '' });
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from('menu_items').select('*');
            if (error) throw error;
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setError('Failed to load menu items.');
            toast.error('Failed to load menu items.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async () => {
        try {
            const { data, error } = await supabase.from('menu_items').insert([newItem]);
            if (error) throw error;
            setMenuItems([...menuItems, ...data]);
            setNewItem({ title: '', description: '', price: '' });
            toast.success('Menu item added successfully.');
        } catch (error) {
            console.error('Error adding menu item:', error);
            toast.error('Failed to add menu item.');
        }
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
    };

    const handleUpdateItem = async () => {
        try {
            const { data, error } = await supabase.from('menu_items').update(editingItem).match({ id: editingItem.id });
            if (error) throw error;
            setMenuItems(menuItems.map(item => (item.id === editingItem.id ? data[0] : item)));
            setEditingItem(null);
            toast.success('Menu item updated successfully.');
        } catch (error) {
            console.error('Error updating menu item:', error);
            toast.error('Failed to update menu item.');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            const { error } = await supabase.from('menu_items').delete().match({ id });
            if (error) throw error;
            setMenuItems(menuItems.filter(item => item.id !== id));
            toast.success('Menu item deleted successfully.');
        } catch (error) {
            console.error('Error deleting menu item:', error);
            toast.error('Failed to delete menu item.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Add New Menu Item */}
            <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <button onClick={handleAddItem} className="bg-blue-500 text-white p-2 rounded">Add Item</button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-card p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Menu Items</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Title</th>
                            <th className="text-left">Description</th>
                            <th className="text-left">Price</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td className="text-right">
                                    <button onClick={() => handleEditItem(item)} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                                    <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 text-white p-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Menu Item */}
            {editingItem && (
                <div className="bg-card p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <button onClick={handleUpdateItem} className="bg-blue-500 text-white p-2 rounded">Update Item</button>
                    <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button>
                </div>
            )}
        </div>
    );
};



export default MenuManagement;
