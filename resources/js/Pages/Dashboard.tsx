import ShortLink from '@/Components/ShortLink';
import ShortLinkCreateForm from '@/Components/ShortLinkCreateForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps, ShortLinkType } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({
    generatedURL,
    shortLinks,
}: PageProps<{ generatedURL: string; shortLinks: ShortLinkType[] | null }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
                    <ShortLinkCreateForm result={generatedURL} titleEnabled />
                    <div className="mt-6 divide-y rounded-lg bg-white shadow-sm">
                        {shortLinks &&
                            shortLinks.map((link) => (
                                <ShortLink key={link.id} link={link} />
                            ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
