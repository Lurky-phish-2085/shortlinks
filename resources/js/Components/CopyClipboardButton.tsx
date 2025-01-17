import { ButtonHTMLAttributes, useState } from 'react';
import { BsFillClipboardCheckFill, BsFillClipboardFill } from 'react-icons/bs';
import IconButton from './IconButton';

const CLIPBOARD_CHECKED_STATE_DURATION = 2 * 1000;

interface CopyClipboardButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueToCopy: string;
}

export default function CopyClipboardButton({
    valueToCopy,
    className = '',
    disabled,
    ...props
}: CopyClipboardButtonProps) {
    const [clipboardChecked, setClipboardChecked] = useState(false);

    const checkClipboard = () => {
        setClipboardChecked(true);

        setTimeout(() => {
            setClipboardChecked(false);
        }, CLIPBOARD_CHECKED_STATE_DURATION);
    };

    const copyToClipboard = () => {
        if (!valueToCopy) {
            return;
        }

        navigator.clipboard.writeText(valueToCopy).then(
            () => {
                checkClipboard();
            },
            () => {
                alert('Failed to copy to clipboard... Please try again.');
            },
        );
    };

    return (
        <IconButton
            {...props}
            className={className}
            disabled={disabled}
            onClick={copyToClipboard}
        >
            {clipboardChecked ? (
                <BsFillClipboardCheckFill className="text-slate-400 dark:text-slate-200" />
            ) : (
                <BsFillClipboardFill />
            )}
        </IconButton>
    );
}
