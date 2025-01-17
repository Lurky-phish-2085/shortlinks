import { ButtonHTMLAttributes } from 'react';

export default function IconButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `hover:text-slate-400 dark:hover:text-slate-200 ${disabled && 'opacity-25'}` +
                ' ' +
                className
            }
            disabled={disabled}
        >
            <i>{children}</i>
        </button>
    );
}
