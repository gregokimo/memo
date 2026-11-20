import type { Ref } from "react";

// Figma: Input/Field — 제목 입력 칸. 입력 중에는 파란 테두리, 비어 있으면 회색 안내 문구.

type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
};

export function InputField({ label, value, placeholder, onChange, ref }: InputFieldProps) {
  return (
    <label className="flex flex-col gap-4 rounded-lg bg-surface-card px-20 py-16 focus-within:focus-ring">
      <span className="text-caption-sm text-text-muted">{label}</span>
      <input
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-title-md text-text-primary outline-none placeholder:text-text-muted"
      />
    </label>
  );
}
