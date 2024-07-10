import { AppShell, Flex, Group, Image, Loader, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

import ArticleContent from "@/components/articles/ArticleContent";
import ControlPanel from "@/components/articles/ControlPanel";
import NavBar from "@/components/NavBar";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Scene from "@/components/articles/Scene";

const Article: React.FC = () => {
  const [mdxContent, setMdxContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string>("default");
  const [bookName, setBookName] = useState<string>("default");

  const navigate = useNavigate();
  const { pageId } = useParams();

  const handlePageSelect = async (bookName: string, pageId: string) => {
    //TODO: implement highlighting the selected page on the left hand nav bar
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/article/${bookName}/${pageId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      navigate(`/book/${bookName.toLowerCase()}/${pageId}`);
      setArticleId(pageId);
      setBookName(bookName);
      const content = await response.json();
      setMdxContent(JSON.stringify(content));
      console.log('Loaded successfully');
    } catch (err) {
      console.log(err);
      setError("");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pageId) {
      handlePageSelect("physics", pageId);
    }
  }, [pageId]);

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Navbar p="0">
        <Group h="100%" px="md" mt="4.5px" className="border-b">
          <Link to="/" style={{ textDecoration: "none", display: "contents" }}>
            <Group>
              <Image
                src="../../Logo1.png"
                h={50}
                w="auto"
                alt="Intuision Logo"
              />
              <Text size="xl" fw={700}>
                Intuision
              </Text>
            </Group>
          </Link>
        </Group>
        <ControlPanel onPageSelect={handlePageSelect} />
      </AppShell.Navbar>

      <AppShell.Main pt="0">
        <div>
          {isLoading && !mdxContent && (
            <Flex w="100%" h="100vh" align="center" justify="center">
              <Loader />
            </Flex>
          )}
          {error && <p className="error">{error}</p>}
          {mdxContent && (
            <ArticleContent
              article_id={`${bookName}_${articleId}`}
              content={mdxContent}
            />
          )}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Article;
