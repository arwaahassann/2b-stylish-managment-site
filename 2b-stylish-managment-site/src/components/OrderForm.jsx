import { useState } from "react";

const OrderForm = ({ onAddOrder }) => {
  const [formData, setFormData] = useState({
    phone: "",
    price: "",
    details: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");

          // --- إجبار تصغير الأبعاد ---
          const MAX_WIDTH = 800; // أقصى عرض 800 بكسل (كافي جداً وواضح)
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // --- تقليل الجودة لـ 50% وتحويلها لـ Base64 خفيف ---
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5);
          setFormData((prev) => ({ ...prev, image: compressedBase64 }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedTime =
      now.toLocaleDateString("ar-EG", { day: "numeric", month: "long" }) +
      " ، " +
      now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    onAddOrder({
      ...formData,
      id: Date.now(),
      time: formattedTime,
      status: "pending",
      phone: formData.phone || "بدون رقم",
      price: formData.price || "0",
    });

    setFormData({ phone: "", price: "", details: "", image: null });
    alert("✅ تم تسجيل الطلب بنجاح!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 space-y-4"
    >
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="رقم الهاتف (اختياري)"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-2 focus:ring-[#e6007e]/10"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="السعر (اختياري)"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-2 focus:ring-[#e6007e]/10"
      />

      <textarea
        name="details"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        placeholder="تفاصيل إضافية (اختياري)"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right h-24 outline-none resize-none"
      />

      <label className="cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {formData.image ? (
          <img
            src={formData.image}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-xl border border-pink-100"
          />
        ) : (
          <div className="text-center">
            <span className="text-2xl">📸</span>
            <p className="text-[10px] font-bold">إرفاق صورة</p>
          </div>
        )}
      </label>

      <button
        type="submit"
        className="w-full bg-[#e6007e] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all shadow-lg shadow-pink-100"
      >
        تسجيل الطلب
      </button>
    </form>
  );
};

export default OrderForm;
