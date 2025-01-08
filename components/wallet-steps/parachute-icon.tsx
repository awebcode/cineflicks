export function Parachute({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 2c-3.314 0-6 2.686-6 6 0 6 6 10 6 10s6-4 6-10c0-3.314-2.686-6-6-6z"
        fill="#fff"
        stroke="#F5A64C"
      />
      <path
        d="M12 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z"
        fill="#F5A64C"
      />
    </svg>
  );
}
