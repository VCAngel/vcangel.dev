import { Terminal } from "../islands/Terminal.tsx";

export default function Home() {
    return (
        <main className="border rounded-sm border-slate-300 flex-grow flex flex-col overflow-hidden max-h-full">
            {/* TODO Add Spline space model or something :D */}
            <Terminal />
        </main>
    );
}
