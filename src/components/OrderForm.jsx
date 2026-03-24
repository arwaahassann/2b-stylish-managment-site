import { useState, useRef } from "react";

const OrderForm = ({ onAddOrder }) => {
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [preview, setPreview] = useState(null);

  // السر هنا: بنخزن الملف في Ref عشان المتصفح ميهنجش وهو بيعمل Render
  const imageFileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      imageFileRef.current = file; // بنشيله في الـ Ref (Memory-safe)
      setPreview(URL.createObjectURL(file)); // بنعرض صورة وهمية خفيفة
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // منع الريفريش

    const now = new Date();
    const formattedTime =
      now.toLocaleDateString("ar-EG", { day: "numeric", month: "long" }) +
      " ، " +
      now.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    // بنبعت البيانات للـ List
    onAddOrder({
      phone: phone || "بدون رقم",
      price: price || "0",
      details: details || "بدون تفاصيل",
      image: preview, // اللينك الخفيف
      id: Date.now(),
      time: formattedTime,
      status: "pending",
    });

    // تصفير كل حاجة
    setPhone("");
    setPrice("");
    setDetails("");
    setPreview(null);
    imageFileRef.current = null;
    alert("✅ أخيراً! تم تسجيل الطلب بنجاح");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 space-y-4"
    >
      <input
        type="text"
        placeholder="رقم الهاتف"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none"
      />

      <input
        type="number"
        placeholder="السعر"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none"
      />

      <textarea
        placeholder="التفاصيل"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right h-24 outline-none resize-none"
      />

      <label className="cursor-pointer border-2 border-dashed border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 hover:border-[#e6007e]/30 transition-all">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-xl border border-pink-100"
          />
        ) : (
          <div className="text-center">
            <span className="text-2xl">📸</span>
            <p className="text-[10px] font-bold">ارفع صورة</p>
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
