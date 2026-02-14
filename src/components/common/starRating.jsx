export default function StarRating({ rating }) {
  const full = Math.floor(rating);
  return (
    <span style={{ fontSize: "0.8rem", color: "var(--amber)" }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
      <span style={{ color: "var(--amber)", marginLeft: 4 }}>{rating}</span>
    </span>
  );
}