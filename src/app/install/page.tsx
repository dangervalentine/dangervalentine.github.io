import { Suspense } from 'react';
import InstallPageClient from './InstallPageClient';

export const dynamic = 'force-static';

export default function InstallPage() {
    return (
        <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
            <InstallPageClient />
        </Suspense>
    );
}
