import { useState, useEffect } from "react";
import Header from "./components/Header";
import OrderForm from "./components/OrderForm";
import OrderCard from "./components/OrderCard";

function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("sb_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sb_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => setOrders([newOrder, ...orders]);

  const deleteOrder = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الأوردر نهائياً؟")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((o) => {
        if (o.id === id) {
          // Toggle Logic: لو نفس الحالة يرجع لـ pending
          return {
            ...o,
            status: o.status === newStatus ? "pending" : newStatus,
          };
        }
        return o;
      }),
    );
  };

  // إحصائية سريعة
  const totalCash = orders
    .filter((o) => o.status === "completed") // بنحسب بس اللي اتسوى
    .reduce((acc, curr) => acc + Number(curr.price || 0), 0);

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center pb-20 font-sans"
      dir="rtl"
    >
      <Header />
      <OrderForm onAddOrder={addOrder} />

      <div className="w-full max-w-md px-4 mt-10">
        <div className="flex justify-between items-end mb-6 px-2">
          <h2 className="text-xl font-black text-gray-800 border-r-4 border-[#e6007e] pr-3">
            قائمة الأوردات
          </h2>
          <div className="text-left bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              المحصلة (تمت التسوية)
            </p>
            <p className="text-lg font-black text-green-600 leading-none mt-1">
              {totalCash} <span className="text-[10px]">ج.م</span>
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 opacity-20 flex flex-col items-center">
            <span className="text-6xl mb-4">📜</span>
            <p className="font-bold tracking-widest uppercase">
              لا توجد بيانات
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onDelete={deleteOrder}
              onUpdateStatus={updateStatus}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
