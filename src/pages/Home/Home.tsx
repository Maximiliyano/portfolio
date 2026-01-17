import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { Button } from "../../components/ui/Button";

export const Home = () => {
    return (
        <Section>
            <Container>
                <h1 className="text-5xl md:text-6xl font-bold">Welcome</h1>
                <p className="text-base text-gray-300">
                    This is the home page of our application.
                </p>
                <Button>Primary</Button>
            </Container>
        </Section>
    );
}