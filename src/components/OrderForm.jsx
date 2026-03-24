import { useState } from "react";
import imageCompression from "browser-image-compression";

const OrderForm = ({ onAddOrder }) => {
  const [formData, setFormData] = useState({
    phone: "",
    price: "",
    details: "",
    image: null,
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // إعدادات الضغط (عنيفة جداً عشان نضمن الشغل)
        const options = {
          maxSizeMB: 0.1, // الحجم الأقصى 100 كيلوبايت بس!
          maxWidthOrHeight: 800, // أقصى طول أو عرض 800 بكسل
          useWebWorker: true, // تشغيل الضغط في الخلفية عشان الموبايل ميهنجش
          fileType: "image/jpeg",
        };

        const compressedFile = await imageCompression(file, options);

        // تحويل الملف المضغوط جداً لـ Base64 خفيف
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, image: reader.result }));
        };
      } catch (error) {
        console.error("Compression Error:", error);
      }
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
        placeholder="تفاصيل إضافية"
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
