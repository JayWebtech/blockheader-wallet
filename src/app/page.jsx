import Hero from '../components/Hero'
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="grid-background py-10 h-screen">
      <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}