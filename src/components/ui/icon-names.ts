export const ICON_NAMES = [
  "phone",
  "mail",
  "menu",
  "close",
  "arrow-right",
  "check-circle",
  "chevron-down",
  "wrench",
  "house",
  "map-pin",
  "calendar-check",
  "user",
  "star",
  "shield-check",
  "clock",
  "facebook",
] as const;

export type IconName = (typeof ICON_NAMES)[number];
