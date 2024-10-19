export type InputProps = {
    label?: string;
    type?: "text" | "password" | "email" | "number";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    error?: string;
    inputType?: "primary" | "secondary";
}