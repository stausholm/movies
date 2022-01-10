export interface AccordionType {
  count: number; // amount of accordion-items in this accordion
  active: null | number; // the accordion-item index that is currently active
  allowMultiple: boolean;
  baseId: string;
  headingLevel: string;
}
