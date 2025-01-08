import { WorkWithUsGrid } from "./work-with-us-grid";

export default function WorkWithUsPage() {
  return (
    <div className="min-h-screen bg-[#1C1C1C] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-5xl font-bold mb-12">Work with us</h1>
        <WorkWithUsGrid />
      </div>
    </div>
  );
}
