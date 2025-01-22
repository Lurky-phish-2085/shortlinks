import ShortLinkCreateForm from '@/Components/ShortLinkCreateForm';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { RiGitRepositoryFill } from 'react-icons/ri';

export default function Welcome({
    generatedURL,
    auth,
}: PageProps<{
    generatedURL: string;
}>) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white">
                <div className="relative flex min-h-screen flex-col items-center">
                    <div className="flex h-full w-full flex-col">
                        <div className="bg-[#1F2937] px-8 text-lg text-[#E5E7EB]">
                            <header className="flex py-4">
                                <a href={route('home')}>
                                    <h1 className="text-2xl font-black text-[#F9FAF8]">
                                        ShortLinks
                                    </h1>
                                </a>
                                <nav className="-mx-3 flex flex-1 justify-end">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-3 py-2 text-[#E5E7EB] ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-3 py-2 text-[#E5E7EB] ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-3 py-2 text-[#E5E7EB] ring-1 ring-transparent transition hover:text-white focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </header>
                        </div>
                        <main className="flex-grow">
                            <div className="flex bg-[#1F2937] px-8 text-lg text-[#E5E7EB]">
                                <hgroup className="flex flex-col py-20 text-center sm:items-center sm:justify-center lg:items-start lg:justify-normal">
                                    <h1 className="pb-4 text-5xl font-black">
                                        SHORT LINKS MADE EASY
                                    </h1>
                                    <p className="text-center md:w-2/4 lg:text-start">
                                        ShortLinks is a tool to shorten a long
                                        link and create a short URL easy to
                                        share on sites, chat and emails. Track
                                        short links traffic and manage your
                                        links.
                                    </p>
                                </hgroup>
                                <svg
                                    className="my-auto mr-36 hidden lg:block"
                                    width="256px"
                                    height="256px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="stroke-slate-500"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M10.975 14.51a1.05 1.05 0 0 0 0-1.485 2.95 2.95 0 0 1 0-4.172l3.536-3.535a2.95 2.95 0 1 1 4.172 4.172l-1.093 1.092a1.05 1.05 0 0 0 1.485 1.485l1.093-1.092a5.05 5.05 0 0 0-7.142-7.142L9.49 7.368a5.05 5.05 0 0 0 0 7.142c.41.41 1.075.41 1.485 0zm2.05-5.02a1.05 1.05 0 0 0 0 1.485 2.95 2.95 0 0 1 0 4.172l-3.5 3.5a2.95 2.95 0 1 1-4.171-4.172l1.025-1.025a1.05 1.05 0 0 0-1.485-1.485L3.87 12.99a5.05 5.05 0 0 0 7.142 7.142l3.5-3.5a5.05 5.05 0 0 0 0-7.142 1.05 1.05 0 0 0-1.485 0z"
                                        fill="#000000"
                                    />
                                </svg>
                            </div>
                            <div className="-my-16 mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                                <ShortLinkCreateForm result={generatedURL} />
                            </div>
                        </main>
                    </div>
                    <footer className="mt-auto flex min-w-full flex-col items-center justify-center overflow-hidden p-4">
                        <p>
                            Made with ❤️ by{' '}
                            <a
                                className="underline"
                                href="https://github.com/Lurky-phish-2085"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Lurky-Phish-2085
                            </a>
                        </p>
                        <div className="flex items-center">
                            <RiGitRepositoryFill />
                            <p>
                                <a
                                    className="underline"
                                    href="https://github.com/Lurky-phish-2085/shortlinks"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    See Source Code
                                </a>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
