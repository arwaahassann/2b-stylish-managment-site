import { useState } from "react";

const OrderCard = ({ order, onDelete, onUpdateStatus }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const statusConfig = {
    pending: {
      label: "قيد الانتظار",
      color: "bg-gray-100 text-gray-500",
      border: "border-gray-100 bg-white",
    },
    completed: {
      label: "تمت التسوية",
      color: "bg-green-500 text-white",
      border: "border-green-300 bg-green-50/40 shadow-green-100/50",
    },
    returned: {
      label: "مرتجع",
      color: "bg-orange-400 text-white",
      border: "border-orange-300 bg-orange-50/40 shadow-orange-100/50",
    },
  };

  const currentStatus = statusConfig[order.status] || statusConfig.pending;

  return (
    <>
      <div
        className={`relative p-5 rounded-[30px] border-2 mb-6 flex gap-4 transition-all duration-500 shadow-sm ${currentStatus.border}`}
      >
        {/* ملصق الحالة Toggle Badge */}
        <div
          className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-bold shadow-sm transition-all duration-300 z-10 ${currentStatus.color}`}
        >
          {currentStatus.label}
        </div>

        {/* الصورة والزووم */}
        <div
          className="relative shrink-0 cursor-zoom-in"
          onClick={() => order.image && setIsZoomed(true)}
        >
          <div className="w-24 h-28 bg-white rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
            {order.image ? (
              <img
                src={order.image}
                alt="Order"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="opacity-20 text-3xl">🛍️</span>
            )}
          </div>
        </div>

        {/* محتوى الكارد */}
        <div className="flex-1 flex flex-col justify-between py-1 text-right">
          <div>
            <span className="text-[10px] text-gray-400 block mb-1">
              {order.time}
            </span>
            <h3
              className={`text-xl font-black ${order.status === "completed" ? "text-green-700" : "text-gray-800"}`}
            >
              {order.price || "0"}{" "}
              <span className="text-xs font-normal">ج.م</span>
            </h3>
            <p className="text-sm font-bold text-gray-600 mt-2">
              📞 {order.phone || "بدون رقم"}
            </p>
          </div>
          {order.details && (
            <p className="text-[10px] text-gray-400 italic mt-2 line-clamp-1">
              "{order.details}"
            </p>
          )}
        </div>

        {/* أزرار الأكشن (Toggle) */}
        <div className="flex flex-col justify-between items-center gap-2 border-r pr-3 border-gray-100">
          <button
            onClick={() => onUpdateStatus(order.id, "completed")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${order.status === "completed" ? "bg-green-500 text-white scale-110 shadow-lg" : "bg-gray-50 text-green-600 opacity-40 hover:opacity-100"}`}
          >
            ✓
          </button>

          <button
            onClick={() => onUpdateStatus(order.id, "returned")}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${order.status === "returned" ? "bg-orange-400 text-white scale-110 shadow-lg" : "bg-gray-50 text-orange-400 opacity-40 hover:opacity-100"}`}
          >
            ↺
          </button>

          <button
            onClick={() => onDelete(order.id)}
            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-300 rounded-xl hover:bg-red-500 hover:text-white mt-1"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* مودال الشاشة الكاملة (LightBox) */}
      {isZoomed && order.image && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={() => setIsZoomed(false)}
        >
          {/* زر إغلاق إضافي للراحة */}
          <button className="absolute top-10 right-10 text-white text-3xl font-light">
            &times;
          </button>

          <img
            src={order.image}
            alt="Zoomed"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border-2 border-white/10 transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط على الصورة
          />
        </div>
      )}
    </>
  );
};

export default OrderCard;
