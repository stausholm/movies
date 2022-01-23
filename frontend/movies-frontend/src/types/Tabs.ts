export interface TabsType {
  count: number; // amount of Tab components in this Tabs component
  active: null | number; // the Tab component's index that is currently active
  baseId: string;
  transition: string;
  tabs: {
    title: string;
    icon?: string;
    contentId: string;
    headerId: string;
  }[];
}
