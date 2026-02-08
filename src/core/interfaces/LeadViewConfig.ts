// Common field type
export interface ViewField {
    key: string;
    label: string;
    colSpan: number;
    type?: 'badge' | string;
}

// View section types
export interface FieldsViewSection {
    title: string;
    type: 'fields';
    fields: ViewField[];
}

export interface ArrayViewSection {
    title: string;
    type: 'array';
    key: string;
}

// Union for any view section
export type ViewSection = FieldsViewSection | ArrayViewSection;

// Root config
export interface ViewConfig {
    view: ViewSection[];
}
