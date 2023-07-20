import { Hero } from "../components/Hero/Hero";
import { Section } from "components/Section/Section";
import { Container } from "components/Container/Container";
import { BgWrapper } from "components/BgWrapper/BgWrapper";

const MainPage = () => {
  return (
    <BgWrapper>
      <Section>
        <Container>
          <Hero />
        </Container>
      </Section>
    </BgWrapper>
  );
};

export default MainPage;
