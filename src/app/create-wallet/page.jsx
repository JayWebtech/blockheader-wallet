import CreateWallet from "./createWallet";

export default async function Page() {
    try {
        const res = await fetch(`http://localhost:3000/api/wallet`);
        if (!res.ok) {
            throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return <CreateWallet data={data} />;
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        return <div>Error loading wallet data. Please try again later.</div>;
    }
}
