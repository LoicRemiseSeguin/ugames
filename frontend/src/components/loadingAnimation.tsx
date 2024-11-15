export default function Loading() {
    return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
            <div className="relative w-20 h-20">
                <div className="w-full h-full rounded-full border-4 border-[#ff00ff]/30 animate-spin border-t-[#ff00ff]" />
            </div>
            <p className="text-cyan-400 text-lg animate-pulse">Loading...</p>
        </div>
    );
}