import { Suspense } from 'react';
import GamePageClient from './GamePageClient';

export const dynamic = 'force-static';

export default function GamePage() {
    return (
        <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
            <GamePageClient />
        </Suspense>
    );
}
