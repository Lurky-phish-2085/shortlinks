import { useForm } from '@inertiajs/react';
import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { BsFillClipboardCheckFill, BsFillClipboardFill } from 'react-icons/bs';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';

const CLIPBOARD_CHECKED_STATE_DURATION = 2 * 1000;

type ShortLinkCreateFormProps = {
    result: string | null;
    titleEnabled?: boolean;
};

function ShortLinkCreateForm({
    result,
    titleEnabled = false,
}: ShortLinkCreateFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        targetURL: '',
        title: '',
    });

    const preventNewLines = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('short-links.store'));
    };

    const [clipboardChecked, setClipboardChecked] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const checkClipboard = () => {
        setClipboardChecked(true);
        buttonRef.current?.classList.toggle('text-slate-400');

        setTimeout(() => {
            setClipboardChecked(false);
            buttonRef.current?.classList.toggle('text-slate-400');
        }, CLIPBOARD_CHECKED_STATE_DURATION);
    };

    const resultAnchorRef = useRef<HTMLAnchorElement | null>(null);

    const copyToClipboard = () => {
        const link = resultAnchorRef.current?.href;
        if (!link) {
            return;
        }

        navigator.clipboard.writeText(link).then(
            () => {
                checkClipboard();
            },
            () => {
                alert('Failed to copy to clipboard... Please try again.');
            },
        );
    };

    return (
        <>
            <form onSubmit={submit}>
                {titleEnabled && (
                    <>
                        <input
                            className="mb-2 block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-50"
                            type="text"
                            placeholder="Title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mb-4" />
                    </>
                )}
                <textarea
                    className="block w-full resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:text-gray-50"
                    placeholder="Type your URL here!"
                    value={data.targetURL}
                    rows={3}
                    onKeyDown={preventNewLines}
                    onChange={(e) => setData('targetURL', e.target.value)}
                    readOnly={processing}
                ></textarea>
                <InputError message={errors.targetURL} className="mt-2" />
                <div className="flex items-center justify-center">
                    <PrimaryButton className="my-4" disabled={processing}>
                        {processing ? 'GENERATING...' : 'SHORTEN'}
                    </PrimaryButton>
                </div>
            </form>
            {result && (
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                        <a
                            ref={resultAnchorRef}
                            className="ml-8"
                            href={result}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <textarea
                                className="block w-full cursor-pointer resize-none rounded-md border-gray-300 text-center shadow-sm hover:bg-slate-100 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                                value={`${import.meta.env.BASE_URL}${result}`}
                                rows={1}
                                readOnly
                            ></textarea>
                        </a>
                        <button
                            ref={buttonRef}
                            className="ml-4 hover:text-slate-400"
                            onClick={copyToClipboard}
                        >
                            <i>
                                {clipboardChecked ? (
                                    <BsFillClipboardCheckFill />
                                ) : (
                                    <BsFillClipboardFill />
                                )}
                            </i>
                        </button>
                    </div>
                    <p>Your short link is now ready!</p>
                </div>
            )}
        </>
    );
}

export default ShortLinkCreateForm;
