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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"></link>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"></link>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"></link>
      <link rel="manifest" href="/site.webmanifest"></link>
      <div className="App">
        <Resume />
      </div>
    </>
  );
}
