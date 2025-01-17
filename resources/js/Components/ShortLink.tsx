import { ShortLinkType } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FormEvent, useRef, useState } from 'react';
import { AiOutlineLink } from 'react-icons/ai';
import { BsFillClipboardFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import Dropdown from './Dropdown';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';

dayjs.extend(relativeTime);

type ShortLinkProps = {
    link: ShortLinkType;
};

export default function ShortLink({ link }: ShortLinkProps) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const resultURL = route('short-link-redirect', {
        retrievalID: link.retrieval_id ?? '',
    });

    const { data, setData, patch, clearErrors, reset, errors, processing } =
        useForm({
            title: link.title ?? link.retrieval_id,
            disabled: link.disabled,
            deleted: link.deleted,
        });

    const toggleLink = () => {
        patch(route('short-links.update', link.id), {
            onBefore: () => {
                data.disabled = !data.disabled;
            },
        });
    };
    const submit = (e: FormEvent) => {
        e.preventDefault();
        patch(route('short-links.update', link.id), {
            onSuccess: () => setEditing(false),
        });
    };

    const shortLinkAnchorRef = useRef<HTMLAnchorElement | null>(null);
    const copyToClipboard = () => {
        const link = shortLinkAnchorRef.current?.href;
        if (!link) {
            return;
        }

        navigator.clipboard.writeText(link).then(
            () => {
                alert('Copied to clipboard!');
            },
            () => {
                alert('Failed to copy to clipboard... Please try again.');
            },
        );
    };

    return (
        <div className="flex space-x-2 p-6">
            <AiOutlineLink />
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div>
                        <small className="text-sm text-gray-600">
                            {link.retrieval_id}
                        </small>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(link.created_at).fromNow()}
                        </small>
                        {link.created_at !== link.updated_at && (
                            <small className="text-sm text-gray-600">
                                <span>&nbsp;</span>
                                &middot; edited
                            </small>
                        )}
                    </div>
                    {link.user_id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                                    onClick={toggleLink}
                                >
                                    {link.disabled ? 'Enable' : 'Disable'}
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route('short-links.destroy', link.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit}>
                        <input
                            className="mt-4 w-full rounded-md border-gray-300 text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Edit title"
                            value={data.title}
                            readOnly={processing}
                            onChange={(e) => setData('title', e.target.value)}
                        ></input>
                        <InputError message={errors.title} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton
                                className="mt-4"
                                disabled={processing}
                            >
                                Save
                            </PrimaryButton>
                            <button
                                className="mt-4"
                                disabled={processing}
                                onClick={() => {
                                    setEditing(false);
                                    reset();
                                    clearErrors();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="mt-4 flex">
                            <div className="text-lg text-gray-900">
                                {link.disabled ? (
                                    <p className="text-slate-400">
                                        {link.title
                                            ? link.title
                                            : link.retrieval_id}
                                    </p>
                                ) : (
                                    <a
                                        ref={shortLinkAnchorRef}
                                        className="underline-offset-2 hover:text-blue-600 hover:underline"
                                        href={resultURL}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {link.title
                                            ? link.title
                                            : link.retrieval_id}
                                    </a>
                                )}
                            </div>
                            {!link.disabled && (
                                <button
                                    className="ml-2"
                                    onClick={copyToClipboard}
                                >
                                    <i>
                                        <BsFillClipboardFill />
                                    </i>
                                </button>
                            )}
                            <button
                                className="ml-2"
                                onClick={() => setEditing(true)}
                            >
                                <i>
                                    <MdModeEditOutline />
                                </i>
                            </button>
                        </div>
                        <small className="text-sm text-gray-600">
                            {link.target_url}
                        </small>
                    </>
                )}
            </div>
        </div>
    );
}
