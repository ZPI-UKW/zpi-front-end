export interface NavigationProps {
  type: 'desktop' | 'mobile';
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  logoutFun: () => void;
}
