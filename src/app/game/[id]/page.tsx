import GamePageClient from './GamePageClient';

// Required for static export with dynamic routes
// Return at least one example param to satisfy static export requirement
// The page will handle any ID dynamically via client-side routing
export function generateStaticParams() {
    return [{ id: 'example' }];
}

export default function GamePage() {
    return <GamePageClient />;
}
