import { useState } from "react";

const OrderForm = ({ onAddOrder }) => {
  const [formData, setFormData] = useState({
    phone: "",
    price: "",
    details: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, image: reader.result });
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
    });
    setFormData({ phone: "", price: "", details: "", image: null });
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
        onChange={handleChange}
        placeholder="رقم الهاتف"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-2 focus:ring-[#e6007e]/20"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="السعر (ج.م)"
        className="w-full p-4 bg-gray-50 border-none rounded-2xl text-right outline-none focus:ring-2 focus:ring-[#e6007e]/20"
      />
      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="تفاصيل إضافية..."
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
            className="w-16 h-16 object-cover rounded-xl"
          />
        ) : (
          <>
            <span className="text-2xl">📸</span>
            <span className="text-[10px] mt-1 font-bold">إرفاق صورة</span>
          </>
        )}
      </label>

      <button
        type="submit"
        className="w-full bg-[#e6007e] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-100 active:scale-[0.98] transition-all"
      >
        تسجيل الطلب
      </button>
    </form>
  );
};

export default OrderForm;
