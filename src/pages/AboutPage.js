import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import aboutImg from "../assets/hero-bcg.jpeg";

const AboutPage = () => {
  return (
    <main>
      <PageHero title="about" />
      <Wrapper className="page section section-center">
        <img src={aboutImg} alt="" />
        <article>
          <div className="title">
            <h2>Our Story</h2>
            <div className="underline" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu
              sem magna. Donec ut arcu auctor, efficitur neque sit amet, aliquet
              arcu. Nullam rhoncus massa vel dignissim porttitor. Suspendisse
              finibus suscipit nisi imperdiet accumsan. Duis nec orci vel ex
              volutpat ornare.
            </p>
            <p>
              Praesent accumsan id felis in consequat. Suspendisse non tempus
              erat, ac pharetra enim. Quisque ac velit odio. Fusce vitae
              elementum lacus. Cras eros erat, aliquet ac magna id, malesuada
              sodales odio. Vivamus eget diam eget lacus pulvinar tempus. Ut
              nunc neque, mollis nec ante feugiat, vehicula pretium erat.
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
