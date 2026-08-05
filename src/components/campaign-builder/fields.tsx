import { Chip } from "@/components/ui/Chip";

const inputBase =
  "w-full box-border text-sm px-[14px] py-3 rounded-xl bg-ivory text-charcoal focus-visible:outline-2 focus-visible:outline-gold";

export function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 block text-xs font-bold">
      {children} {required && <span className="text-gold">*</span>}
    </label>
  );
}

export function TextField({
  id,
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      aria-invalid={error || undefined}
      className={inputBase}
      style={{ border: error ? "1.5px solid #B8862E" : "1px solid #C9B48C" }}
    />
  );
}

export function TextAreaField({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`${inputBase} resize-none font-body`}
      style={{ border: "1px solid #C9B48C" }}
    />
  );
}

export function SelectField({
  id,
  value,
  onChange,
  options,
  error,
  required,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: boolean;
  required?: boolean;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      aria-invalid={error || undefined}
      className={inputBase}
      style={{ border: error ? "1.5px solid #B8862E" : "1px solid #C9B48C" }}
    >
      <option value="">Select...</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function ChipGroup({
  options,
  value,
  onSelect,
}: {
  options: readonly string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="group">
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          selected={value === opt}
          onClick={() => onSelect(value === opt ? "" : opt)}
        />
      ))}
    </div>
  );
}

export function ChipMultiGroup({
  options,
  values,
  onToggle,
}: {
  options: readonly string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="group">
      {options.map((opt) => (
        <Chip key={opt} label={opt} selected={values.includes(opt)} onClick={() => onToggle(opt)} />
      ))}
    </div>
  );
}
