import type { ReactNode } from "react";

export interface SpotlightItem {
  id?: string;
  number?: string;
  icon?: ReactNode;
  logo?: string | null;
  name?: string;
  title: string;
  description: string;
  backgroundColor: string;
  url?: string;
}

export const spotlightData: SpotlightItem[] = [];
