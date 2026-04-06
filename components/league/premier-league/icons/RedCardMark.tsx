/** Icono de tarjeta roja (rectángulo vertical). */
export function RedCardSvg({
  className,
  size = 14,
}: {
  className?: string;
  /** Tamaño en px (ancho y alto). */
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className={`shrink-0 text-red-600 ${className ?? ""}`}
      aria-hidden
    >
      <path fill="currentColor" fillRule="evenodd" d="M3 1h10v14H3z" />
    </svg>
  );
}

/** N tarjetas en fila (misma lógica que en la card de jornada). */
export function RedCardMarkersRow({
  count,
  size = 14,
  className,
}: {
  count: number;
  size?: number;
  className?: string;
}) {
  if (count <= 0) return null;
  return (
    <div
      className={`flex max-w-[5rem] shrink-0 flex-wrap content-center justify-start gap-0.5 sm:max-w-[5.5rem] ${className ?? ""}`}
      aria-label={`${count} tarjetas rojas`}
    >
      {Array.from({ length: count }, (_, i) => (
        <RedCardSvg key={i} size={size} className="drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]" />
      ))}
    </div>
  );
}
