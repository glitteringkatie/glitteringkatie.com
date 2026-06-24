import { useStore } from '@nanostores/react';
import { balanceStore, type Balance } from '../store/balance';
import { FaGithub, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

type SocialEntry = {
  category: Balance | 'balance';
  icon: 'twitter' | 'insta' | 'github' | 'linkedin';
  url: string;
  display: string;
};

const socials: SocialEntry[] = [
  { category: 'balance', icon: 'twitter', url: 'https://twitter.com/glitteringkatie', display: 'twitter.com/glitteringkatie' },
  { category: 'life', icon: 'insta', url: 'https://www.instagram.com/glitteringkatie/', display: 'instagram.com/glitteringkatie' },
  { category: 'life', icon: 'insta', url: 'https://www.instagram.com/heykatiehues/', display: 'instagram.com/heykatiehues' },
  { category: 'work', icon: 'github', url: 'https://github.com/glitteringkatie', display: 'github.com/glitteringkatie' },
  { category: 'work', icon: 'linkedin', url: 'https://www.linkedin.com/in/katelhughes93', display: 'linkedin.com/in/katelhughes93' },
];

const icons = {
  twitter: <FaTwitter className="text-xl md:text-3xl mr-3" />,
  insta: <FaInstagram className="text-xl md:text-3xl mr-3" />,
  github: <FaGithub className="text-xl md:text-3xl mr-3" />,
  linkedin: <FaLinkedin className="text-xl md:text-3xl mr-3" />,
};

const content: Record<Balance, { bio: React.ReactNode; profilePic: string; altText: string; findMe: string }> = {
  balance: {
    bio: (
      <>
        <p>
          {`Hi, I'm Katie! I'm a software engineer living in Portland, OR, who loves interior design, making craft cocktails, and flying through the air at my local circus school. Finding a balance between a professional and personal website is just as hard (and rewarding) as finding that perfect work/life balance.`}
        </p>
        <p>
          {`On this site and in this blog you'll find me—the whole me. That means posts about Next.js or parsers side by side with posts about IKEA flips and vintage finds. I hope you'll have fun here and find something new. Happy reading!`}
        </p>
        <p>{`P.S. If you haven't yet, try the work/life balance slider above!`}</p>
      </>
    ),
    profilePic: '/assets/home/balance.png',
    altText: 'Profile picture of Katie Hughes',
    findMe: 'say hi!',
  },
  work: {
    bio: (
      <>
        <p>
          {`Hi, I'm Katie! I'm a senior software engineer working remotely in Oregon. I've been working in software engineering for five years now, majored in computer science at Oregon State (go beavs!), and started programming junior year of high school with Pascal.`}
        </p>
        <p>
          {`I love thinking through frontend architecture; I find it fun to work through the data flow puzzle. I also value collaboration. I love pairing with other engineers and working with designers or docs writers to see and understand that bigger picture.`}
        </p>
      </>
    ),
    profilePic: '/assets/home/work.png',
    altText: 'Profile picture of Katie Hughes',
    findMe: 'contact me!',
  },
  life: {
    bio: (
      <>
        <p>
          {`Hi, I'm Katie! I'm an Oregonian with a crafty streak who grew up on (too much?) HGTV and loves a good gin & tonic. I live in an apartment in Portland with my cat, Erwin Schrödinger, who might be a panther. We have fun here!`}
        </p>
        <p>
          {`I've found a lot of my hobbies (interior design, cocktail making, aerial) are all puzzles to find the intersection of functionality and beauty. Who wants a tasty but ugly cocktail? What's the point of a beautiful couch if it isn't comfy enough to take a nap? How do you look graceful while tangled up in silks? That intersection is where I love to play.`}
        </p>
      </>
    ),
    profilePic: '/assets/home/life.png',
    altText: 'Profile picture of Katie Hughes with cat ears holding her cat Erwin',
    findMe: 'swing by!',
  },
};

const headerStyles = 'text-center uppercase font-light text-3xl tracking-widest pb-4';

export default function HomeContent() {
  const balance = useStore(balanceStore);
  const { bio, profilePic, altText, findMe } = content[balance];

  const displaySocials = socials.filter(
    s => balance === 'balance' || s.category === balance || s.category === 'balance'
  );

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row mx-auto items-center pb-20">
        <div className="flex-1">
          <h2 className={headerStyles}>About me</h2>
          {bio}
        </div>
        <div className="flex-1 pb-10 md:pb-0 md:pl-6">
          <img src={profilePic} alt={altText} />
        </div>
      </div>
      <div className="mx-auto items-center py-20 px-16 bg-blob bg-stretch bg-center bg-no-repeat text-cream text-center">
        <h2 className="lowercase font-serif font-semibold text-4xl md:text-6xl pb-4">{findMe}</h2>
        <ul className="text-sm md:text-xl table mx-auto pb-8">
          {displaySocials.map(social => (
            <li key={social.url} className="pt-2">
              <a href={social.url} className="flex items-center text-cream hover:text-pine transition-colors">
                {icons[social.icon]}
                <div>{social.display}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
