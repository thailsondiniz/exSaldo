import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function DashboardCard({ icon, title, value, percent, lottieUrl }) {
  const isPositive = percent >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full hover:shadow-lg transition-shadow relative overflow-hidden">
      {lottieUrl && (
        <div className="absolute top-[-12px] right-0 w-32 h-32">
          <DotLottieReact
            src={lottieUrl}
            loop
            autoplay
          />
        </div>
      )}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <span className="text-4xl bg-[#EFF2F7] rounded-full p-2">{icon}</span>
        <h3 className="text-gray-600 font-normal text-sm">{title}</h3>
      </div>
      <div className="flex items-end justify-between relative z-10">
        <strong className="text-2xl text-gray-800">{value}</strong>
        <span className={`text-sm font-medium ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(percent)}%
        </span>
      </div>
    </div>
  );
}

export default DashboardCard