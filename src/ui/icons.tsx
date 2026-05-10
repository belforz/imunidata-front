export function Icons({LucideIcon, size, color, scaleX, scaleY}: {LucideIcon: React.ElementType; size?: string; color?: string; scaleX?: number; scaleY?: number }) {
  return (
    <>
        <span className="flex items-center justify-center" style={{ width: size || "24px", height: size || "24px", color: color || "currentColor", transform: `scale(${scaleX || 1}, ${scaleY || 1})` }}>
          <LucideIcon />
        </span>
    </>
  );
}
