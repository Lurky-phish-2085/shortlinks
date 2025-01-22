import ApplicationLogo from '@/Components/ApplicationLogo';
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
                                <ApplicationLogo className="my-auto mr-36 hidden lg:block" />
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
