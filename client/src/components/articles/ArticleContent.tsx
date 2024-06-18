import { Flex, Heading } from "@radix-ui/themes";
// import Scene from "./Scene";

const ArticleContent = () => {
  return (
    <Flex justify="start" direction="column">
      <Heading as="h1">Title</Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor,
        nunc id ultrices ultricies, nisl nunc tincidunt nunc, vitae efficitur
        nunc nunc id nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc
        lacinia nunc, vitae efficitur nunc nunc id nunc. Sed euismod, nunc id
        lacinia tincidunt, nunc nunc lacinia nunc, vitae efficitur nunc nunc id
        nunc. Sed euismod, nunc id lacinia tincidunt, nunc nunc lacinia nunc,
        vitae efficitur nunc nunc id nunc.
      </p>
    </Flex>
  );
};

export default ArticleContent;
