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
          // --- عملية تصغير الصورة ---
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 600; // هنصغر عرض الصورة لـ 600 بكسل بس عشان تكون خفيفة
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // تحويل الصورة لـ String مضغوط جداً
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6); // جودة 60% كافية جداً
          setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
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

    // إرسال البيانات (حتى لو فاضية)
    onAddOrder({
      phone: formData.phone || "بدون رقم",
      price: formData.price || "0",
      details: formData.details || "بدون تفاصيل",
      image: formData.image,
      id: Date.now(),
      time: formattedTime,
      status: "pending",
    });

    // مسح الفورم
    setFormData({ phone: "", price: "", details: "", image: null });
    alert("✅ تم إضافة الطلب بنجاح!");
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
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-2 focus:ring-[#e6007e]/20"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        placeholder="السعر (اختياري)"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-2 focus:ring-[#e6007e]/20"
      />

      <textarea
        name="details"
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        placeholder="تفاصيل إضافية (اختياري)"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right h-24 outline-none focus:ring-2 focus:ring-[#e6007e]/20 resize-none"
      />

      <label className="cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 hover:border-[#e6007e] transition-all bg-gray-50/50">
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
            className="w-16 h-16 object-cover rounded-xl"
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
        className="w-full bg-[#e6007e] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all"
      >
        تسجيل الطلب
      </button>
    </form>
  );
};

export default OrderForm;
