import { Resume } from "@/components/resume";
export default function Home() {
  return (
    <>
      <meta charSet="utf-8" />
      <title>Dylan M. De La Rosa</title>
      <meta name="author" content="Dylan M. De La Rosa" />
      <meta name="robots" content="index, follow" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content="Resume website by Dylan De La Rosa"></meta>
      <link rel="icon" href="/favicon.ico" />

      <div className="App">
        <Resume />
      </div>
    </>
  );
}
