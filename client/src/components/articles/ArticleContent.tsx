import { Heading, Flex } from "@radix-ui/themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import Scene from "./Scene";
// import Scene from "./Scene";

const ArticleContent = ({ onExpand }) => {
  return (
    <ScrollArea className="w-full h-full bg-[#181818]">
      <Flex justify="center" p="8" py="6">
        <Flex direction="column" align="start" justify="start">
          <Heading as="h1" size="9">
            Title
          </Heading>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nunc id ultrices ultricies, nisl nunc tum dolor sit amet,
            consectetur adipiscing elit. Nullam auctor, nunc id ultrices
            ultricies, nisl nunc tincidunt nunc, vitae efficitur nunc nunc id
            nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc lacinia
            nunc, vitae efficitur nunc nunc id nunc. Sed euismod, nunc id
            lacinia
          </p>

          <Scene
            in_article={true}
            onExpand={onExpand}
            caption={"This is a pink box!"}
          />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunncidunt,
          </p>
          <Scene
            in_article={true}
            onExpand={onExpand}
            caption={"This is a pink box!"}
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Sed
            euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
            nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Sed
            euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
            nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Sed
            euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
            nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae
            efficitur nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt,
            nunc nunc lacinia nunc, vitae efficitur nunc nunc id nunc. Sed
            euismod, nunc id lacinia
          </p>
        </Flex>
      </Flex>
    </ScrollArea>
  );
};

export default ArticleContent;
