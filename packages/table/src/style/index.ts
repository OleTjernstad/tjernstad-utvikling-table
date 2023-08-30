export interface OverrideColors {
  disabled?: string;
  completed?: string;
  cut?: string;
  error?: string;
  warning?: string;
}

export const baseColors: OverrideColors = {
  completed: "bg-lime-600/50 hover:bg-lime-800/50",
  cut: "bg-yellow-300/50 hover:bg-yellow-500/50",
  disabled: "bg-grey-600/50 hover:bg-grey-800/50",
  error: "bg-rose-600/50 hover:bg-rose-800/50",
  warning: "bg-amber-600/50 hover:bg-amber-800/50",
};
export enum ColorStyleOptions {
  completed = "completed",
  disabled = "disabled",
  cut = "cut",
  error = "error",
  warning = "warning",
}
