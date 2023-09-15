export interface IFormField {
    label: string,
    value: string,
    onChange: ({ e, name }: { e: React.ChangeEvent<HTMLInputElement>, name: string }) => void;
    error: boolean,
    customErrorMessage?: string,
    name: string,
}