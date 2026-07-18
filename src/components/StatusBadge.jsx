export function StatusBadge({ rtcStatus }) {
  const isConnected = rtcStatus === 'CONNECTED';
  const color = isConnected ? 'bg-emerald-400' : 'bg-med-lemon dark:bg-yellow-400';
  const textColor = isConnected ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300';
  const bgColor = isConnected ? 'bg-emerald-50 dark:bg-emerald-900/30' : 'bg-amber-50 dark:bg-amber-900/30';
  const borderColor = isConnected ? 'border-emerald-100 dark:border-emerald-800' : 'border-amber-100 dark:border-amber-800';
  
  return (
    <div className={`flex items-center space-x-2 px-3 py-1 ${bgColor} border ${borderColor} rounded-full transition-colors duration-700`}>
      <div className={`w-2 h-2 rounded-full ${color} ${!isConnected && 'animate-pulse'}`} />
      <span className={`text-xs font-semibold tracking-wide ${textColor}`}>{rtcStatus || 'CONNECTING'}</span>
    </div>
  );
}
