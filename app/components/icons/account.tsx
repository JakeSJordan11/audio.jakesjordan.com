interface AccountIconProps {
  height?: number;
  width?: number;
}
export default function AccountIcon({ width, height }: AccountIconProps) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fillRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="2"
        clipRule="evenodd"
        viewBox="0 0 550 550"
        width={width}
        height={height}
      >
        <circle cx="175" cy="175" r="175" fill="hsl(332deg 70% 43%)" />
        <circle cx="275" cy="275" r="175" fill="hsl(240deg 75% 25%)" />
      </svg>
    </>
  );
}
