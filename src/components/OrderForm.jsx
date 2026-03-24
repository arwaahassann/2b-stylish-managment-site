import { useState, useRef } from "react";

const OrderForm = ({ onAddOrder }) => {
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [fileSelected, setFileSelected] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const file = fileInputRef.current?.files[0];

    const submitOrder = (finalImage) => {
      onAddOrder({
        phone: phone || "بدون رقم",
        price: price || "0",
        details: details || "بدون تفاصيل",
        image: finalImage,
        id: Date.now(),
        time: new Date().toLocaleString("ar-EG"),
        status: "pending",
      });

      setPhone("");
      setPrice("");
      setDetails("");
      setFileSelected(false);
      if (fileInputRef.current) fileInputRef.current.value = "";

      alert("✅ تم تسجيل الطلب بنجاح!");
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => submitOrder(reader.result);
      reader.readAsDataURL(file);
    } else {
      submitOrder(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded-[35px] shadow-sm border border-gray-100 space-y-4 font-sans text-right"
    >
      <input
        type="text"
        placeholder="رقم الهاتف"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-1 focus:ring-pink-200"
      />
      <input
        type="number"
        placeholder="السعر"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-1 focus:ring-pink-200"
      />
      <textarea
        placeholder="تفاصيل إضافية"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right h-24 outline-none resize-none focus:ring-1 focus:ring-pink-200"
      />
      <label
        className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all ${
          fileSelected
            ? "border-green-400 bg-green-50"
            : "border-gray-200 bg-gray-50"
        }`}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={() => setFileSelected(true)}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <span className="text-3xl">{fileSelected ? "✅" : "📸"}</span>
          <p className="text-xs font-bold text-gray-500">
            {fileSelected ? "تم التقاط الصورة" : "اضغط لتصوير المنتج"}
          </p>
        </div>
      </label>
      <button
        type="submit"
        className="w-full bg-[#e6007e] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 shadow-lg shadow-pink-100 transition-all"
      >
        تسجيل الطلب
      </button>
    </form>
  );
};

export default OrderForm;
