export function Linkedin({ size = 21 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4zm2 6h3v10H6V9zm1.5-4A1.5 1.5 0 1 1 7.5 8a1.5 1.5 0 0 1 0-3zM11 9h3v1c1-1.7 5-2 5 2.8V19h-3v-5.3c0-2-2-2-2 0V19h-3V9z" />
    </svg>
  );
}
export function Github({ size = 21 }: { size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/icons/github.svg`}
      width={size}
      height={size}
      alt=""
    />
  );
}
