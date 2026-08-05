"use client";

type ChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="rounded-pill border-[1.5px] px-[18px] py-[10px] text-[13px] font-semibold transition-all duration-[250ms]"
      style={{
        background: selected ? "#23201C" : "#FFFFFF",
        color: selected ? "#FAF6EF" : "#23201C",
        borderColor: selected ? "#23201C" : "#C9B48C",
      }}
    >
      {label}
    </button>
  );
}
