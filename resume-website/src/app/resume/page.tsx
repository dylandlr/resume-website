import { Resume } from "@/components/resume";
import Chat from "@/components/Chat";
//import Recommendations from "@/components/Recommendations"; add at a later date once recommendations is fleshed out

export default function Home() {
  return (
    <div className="App">
      <Resume />
      {/* AI Chatbot Integration */}
      <section>
        <Chat />
      </section>
      {/* Personalized Portfolio Recommendations
        <section>
          <h2>Looking for specific projects?</h2>
          <Recommendations />
        </section> */}
    </div>
  );
}
