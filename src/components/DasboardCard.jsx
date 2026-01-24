// function DashboardCard({ icon, title, value, percent }) {
//   const isPositive = percent >= 0;
  
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow">
//       <div className="flex items-center gap-3 mb-4">
//         <span className="text-4xl">{icon}</span>
//         <h3 className="text-gray-600 font-semibold text-sm">{title}</h3>
//       </div>

//       <div className="flex items-end justify-between">
//         <strong className="text-2xl text-gray-800">{value}</strong>
//         <span className={`text-sm font-medium ${
//           isPositive ? 'text-green-500' : 'text-red-500'
//         }`}>
//           {isPositive ? '↑' : '↓'} {Math.abs(percent)}%
//         </span>
//       </div>
//     </div>
//   );
// }

// export default DashboardCard