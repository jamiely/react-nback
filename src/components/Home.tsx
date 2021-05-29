import { Link } from "react-router-dom";
import Instructions from "./Instructions";

function Home() {
    return <div>
        <h2>What is NBack?</h2>

        <blockquote>
            The n-back task is a continuous performance task that is commonly used
            as an assessment in psychology and cognitive neuroscience to measure a
            part of working memory and working memory capacity. The n-back was
            introduced by Wayne Kirchner in 1958. Some researchers have argued
            that n-back training may increase IQ, but evidence is mixed.

            - https://en.wikipedia.org/wiki/N-back
        </blockquote>

        <h2>Play</h2>
        <Link to="/game">Let's play</Link>

        <h2>Instructions</h2>
        <Instructions />
    </div>
}

export default Home;
