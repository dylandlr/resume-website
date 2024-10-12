import { Resume } from "@/components/resume";
export default function Home() {
  return (
    <>
      <title>Dylan M. De La Rosa</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <div className="App">
        <Resume />
      </div>
    </>
  );
}
