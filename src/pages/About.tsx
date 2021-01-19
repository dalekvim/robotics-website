import { Layout } from "../components/Layout";
import { Struct } from "../components/Struct";

export const About: React.FC = () => {
  return (
    <Layout>
      <Struct title="About this Website" importance={1}>
        <div className="Intro">
          <div className="text-justify">
            <p>
              This website was made using the MERN stack; that's MongoDB,
              Express, React and Node.js. Just to be clear, I am by no means an
              expert on any of these and am seriously looking for help with the
              backend.
            </p>
            <p>
              So, if you happen to have some free time on your hands and want to
              contribute to the website, you can, but you have to join the
              robotics club.
            </p>
            <Struct
              title="Minimum requirements for a Frontend Developer:"
              importance={4}
            >
              <ul>
                <li>Knows the basics of HTML</li>
                <li>Knows/willing to learn React</li>
              </ul>
            </Struct>
            <Struct
              title="Minimum requirements for a Backend Developer:"
              importance={4}
            >
              <ul>
                <li>Knows basic Javascript, preferrably ES6</li>
                <li>Knows/willing to learn Node.js</li>
              </ul>
            </Struct>
          </div>
        </div>
        <Struct title="Details" importance={2}>
          <div className="text-justify">
            <Struct title="Typescript" importance={3}>
              <p>
                Typescript is an extension of Javascript that allows for types.
                Any valid Javascript code is also Typescript code.
              </p>
              <p>
                If you have only programmed in Python so far, or if you have not
                programmed at all, you may wonder why I used Typescript.
              </p>
              <p>Are types that important?</p>
              <p>
                The answer to that question is yes. Although I haven't actually
                used Vinalla Javascript enough to know how big the difference
                is, I can see how knowing the types of things, and when they
                don't match up, can save you tonnes of time.
              </p>
            </Struct>
            <Struct title="Frontend" importance={3}>
              <p>
                I just realised that most people don't really know what frontend
                actually is - I mean, even though I talk big, I didn't know,
                myself until I started making this.
              </p>
              <p>
                <b>
                  Basically, frontend is the stuff you guys see on this page.
                </b>
              </p>
              <p>
                The Frontend of this website was made using React which is a
                Javascript library developed by Facebook.
              </p>
            </Struct>
            <Struct title="Backend" importance={3}>
              <p>
                I remember when I was first starting out trying to make an API,
                I had no idea what I was doing because no one really had a good
                definition of what an API was.
              </p>
              <p>
                I'll try to explain what it is, but don't worry if you don't get
                it right away.
              </p>
              <p>
                <b>
                  Basically, it's a page, or a bunch of pages with JSON on it.
                </b>
              </p>
              <p>
                The backend was created using Node.js and Express. Here is a
                link to the API I created:{" "}
                <a href="https://limitless-springs-67845.herokuapp.com">
                  limitless-springs
                </a>
                . It's a default name...
              </p>
            </Struct>
            <Struct title="Database" importance={3}>
              <p>
                I used the MongoDB database for this website, mostly because I
                wanted to try out the MERN Stack.
              </p>
              <p>
                The database is basically for storing data that you don't want
                to lose when the user refreshes their browser, like comments.
              </p>
            </Struct>
          </div>
        </Struct>
      </Struct>
    </Layout>
  );
};
