import type { IconName } from "../ui/icon-names";

export interface Action {
  label: string;
  href: string;
}

export interface SectionImage {
  src: string;
  alt: string;
  caption?: string;
  meta?: string;
}

export interface FeaturedImage extends SectionImage {
  label?: string;
  note?: string;
}

export interface FactStat {
  k: string;
  v: string;
}

export interface FeatureItem {
  icon?: IconName;
  title: string;
  body: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PricingCard {
  unit: string;
  title: string;
  value: string;
  note: string;
}

export interface TrustItem {
  icon?: IconName;
  label: string;
  sub?: string;
}

export interface JumpLink {
  id: string;
  label: string;
}
