export const MediConnectLogo = ({ size = 40, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 100 100'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      {/* Purple gradient background circle */}
      <defs>
        <linearGradient id='logoGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#667eea' />
          <stop offset='100%' stopColor='#764ba2' />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx='50' cy='50' r='48' fill='url(#logoGradient)' opacity='0.95' />

      {/* Medical cross - main vertical bar */}
      <rect x='43' y='25' width='14' height='50' fill='white' rx='2' />

      {/* Medical cross - horizontal bar */}
      <rect x='25' y='43' width='50' height='14' fill='white' rx='2' />

      {/* Heart pulse line */}
      <path
        d='M 30 65 Q 35 60 40 65 Q 45 70 50 65 Q 55 60 60 65 Q 65 70 70 65'
        stroke='white'
        strokeWidth='2'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      />

      {/* Outer ring for emphasis */}
      <circle
        cx='50'
        cy='50'
        r='48'
        fill='none'
        stroke='white'
        strokeWidth='1.5'
        opacity='0.5'
      />
    </svg>
  );
};

export const MediConnectLogoText = ({ size = "text-2xl", className = "" }) => {
  return (
    <div className={`${size} font-bold flex items-center gap-2 ${className}`}>
      <span className='bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent'>
        Medi
      </span>
      <span className='text-white'>Connect</span>
    </div>
  );
};
