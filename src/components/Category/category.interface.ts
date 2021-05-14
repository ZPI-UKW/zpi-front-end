import { iconName } from './icon.types';

export interface category {
  name: string;
  key: iconName;
}
export interface categoryData {
  categories: category[];
}
