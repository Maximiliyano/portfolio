export type AboutImage = { src: string; alt: string; href?: string };
export type AboutItem = { title: string; text: string; images?: AboutImage[] };

export const about: { intro: string; items: AboutItem[] } = {
    intro: 'I like building small things end to end. Most of mine started as weekend hackathon projects.',
    items: [
        {
            title: 'Hackathons',
            text: 'Weekend builds: a budgeting service, a Tinder-style emergency help app, a recipe helper and a 2D platformer in Unity.',
            images: [
                { src: '/about/swipe2help.jpg', alt: 'Swipe2Help, a Tinder-style help finder built at a hackathon', href: 'https://swipe2help.netlify.app/' },
            ],
        },
        {
            title: 'Teaching',
            text: 'I wrote a starter .NET course for people taking their first steps in C#.',
        },
        {
            title: 'Practice',
            text: 'Small training repos in React and Angular where I practise new patterns.',
        },
        {
            title: 'Deed',
            text: 'My own finance tracker, which I keep extending as new ideas come up.',
        },
    ],
};

export default about;
