import { useForm } from '@inertiajs/react';
import { FormEvent, KeyboardEvent } from 'react';
import CopyClipboardButton from './CopyClipboardButton';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';

type ShortLinkCreateFormProps = {
    result: string | null;
    titleEnabled?: boolean;
};

function ShortLinkCreateForm({
    result,
    titleEnabled = false,
}: ShortLinkCreateFormProps) {
    const resultURL = route('short-link-redirect', {
        retrievalID: result ?? '',
    });

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
        post(route('short-links.store'), {
            preserveScroll: true,
            preserveState: true,
        });
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
                            className="ml-8"
                            href={resultURL}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <textarea
                                className="block w-full cursor-pointer resize-none rounded-md border-gray-300 text-center shadow-sm hover:bg-slate-100 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700"
                                value={resultURL}
                                rows={1}
                                readOnly
                            ></textarea>
                        </a>
                        <CopyClipboardButton
                            className="ml-4"
                            valueToCopy={resultURL}
                        />
                    </div>
                    <p>Your short link is now ready!</p>
                </div>
            )}
        </>
    );
}

export default ShortLinkCreateForm;
