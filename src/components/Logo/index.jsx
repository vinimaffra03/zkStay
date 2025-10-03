import house from "../Login/house.jpg";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={house} alt="logo" className="w-16 h-auto" />
      <span className="text-2xl font-semibold text-dark-900">
        <strong>zk</strong>
        <span className="text-gray-600">Stay</span>
      </span>
    </div>
  );
};
