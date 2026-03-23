const Header = () => {
  return (
    <div className="w-full bg-black text-white p-6 flex flex-col items-center shadow-2xl rounded-b-[40px] mb-6">
      <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center mb-3 overflow-hidden border-4 border-[#e6007e] shadow-xl">
        <img
          src="../../public/logo.jpeg"
          alt="2B Stylish"
          className="w-full h-full object-contain "
        />
      </div>
      <h1 className="text-2xl font-black tracking-[3px] uppercase">
        2B Stylish
      </h1>
      <div className="w-12 h-1 bg-[#e6007e] mt-2 rounded-full"></div>
    </div>
  );
};

export default Header;