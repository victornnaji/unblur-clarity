import { type ClassValue, clsx as PrimitivesClsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function clsx(...inputs: ClassValue[]) {
  return twMerge(PrimitivesClsx(...inputs));
}
