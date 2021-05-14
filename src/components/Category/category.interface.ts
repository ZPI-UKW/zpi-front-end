import { iconName } from './icon.types';

export interface category {
  name: string;
  icon: iconName;
}
export interface categoryData {
  categories: category[];
}
