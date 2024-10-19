
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}