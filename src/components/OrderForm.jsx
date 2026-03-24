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
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          // --- خلاصة الحل: ضغط وتصغير أقصى ---
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 400; // تصغير العرض لـ 400 بكسل فقط (خفيف جداً)
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // تحويل لجودة منخفضة جداً (0.1) لضمان عدم حدوث Crash
          const lowResImage = canvas.toDataURL("image/jpeg", 0.1);
          setFormData((prev) => ({ ...prev, image: lowResImage }));
        };
      };
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
    alert("✅ مبروك! الطلب اتسجل");
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
        placeholder="رقم الهاتف"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="السعر"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none"
      />
      <textarea
        name="details"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        placeholder="التفاصيل"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right h-24 outline-none resize-none"
      />

      <label className="cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 hover:border-[#e6007e]/30 transition-all">
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
            <p className="text-[10px] font-bold">ارفع صورة (أي مساحة)</p>
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
