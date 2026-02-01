import { Suspense } from 'react';
import ListPageClient from './ListPageClient';

export const dynamic = 'force-static';

export default function ListPage() {
    return (
        <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
            <ListPageClient />
        </Suspense>
    );
}
