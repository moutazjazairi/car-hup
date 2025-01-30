import { Suspense } from "react";
import HomeContent from "./HomeContent"; // Move all the Home component logic here

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}