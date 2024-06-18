import { Heading } from "@radix-ui/themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import Scene from "./Scene";
// import Scene from "./Scene";

const ArticleContent = () => {
  return (
    <ScrollArea className="w-full h-full py-2 px-6">
      <Heading as="h1">Title</Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
        nunc id ultrices ultricies, nisl nunc tum dolor sit amet, consectetur
        adipiscing elit. Nullam auctor, nunc id ultrices ultricies, nisl nunc
        tincidunt nunc, vitae efficitur nunc nunc id nunc. Sed euismod, nunc id
        lacinia tincidunt, nunc nunc lacinia nunc, vitae efficitur nunc nunc id
        nunc. Sed euismod, nunc id lacinia
      </p>

      <Scene in_article={true} caption={"This is a pink box!"} />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
        nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae efficitur
        nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc
        lacinia nunc, vitae efficitur nunc nunc id nunncidunt,
      </p>
      <Scene in_article={true} caption={"This is a pink box!"} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
        nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae efficitur
        nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc
        lacinia nunc, vitae efficitur nunc nunc id nunc. Sed euismod, nunc id
        lacinia tincidunt, nunc nunc lacinia nunc, vitae efficitur nunc nunc id
        nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc,
        vitae efficitur nunc nunc id nunc. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nullam auctor, nunc id ultrices ultricies,
        nisl nunc tincidunt nunc, vitae efficitur nunc nunc id nunc. Sed
        euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc, vitae
        efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
        nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Sed euismod,
        nunc id lacinia tincidunt, nunc nunc lacinia nunc, vitae efficitur nunc
        nunc id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Nullam auctor, nunc id ultrices ultricies, nisl nunc tincidunt nunc,
        vitae efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia
        tincidunt, nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc.
        Sed euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc, vitae
        efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
        nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id
        ultrices ultricies, nisl nunc tincidunt nunc, vitae efficitur nunc nunc
        id nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc,
        vitae efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia
      </p>
    </ScrollArea>
  );
};

export default ArticleContent;
