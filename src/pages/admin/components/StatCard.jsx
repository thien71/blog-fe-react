const StatCard = ({ icon, title, value }) => (
  <div className="bg-white shadow-md rounded-lg px-4 py-2 flex items-center space-x-4">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

export default StatCard;
