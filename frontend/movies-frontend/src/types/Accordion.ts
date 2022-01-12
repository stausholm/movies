export interface AccordionType {
  count: number; // amount of accordion-items in this accordion
  active: null | number | number[]; // the accordion-item index that is currently active, or array of indexes if allowMultiple is true
  allowMultiple: boolean;
  baseId: string;
  headingLevel: string;
}
