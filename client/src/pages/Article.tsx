import { AppShell, Group, Image, Text } from "@mantine/core";
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
    } catch (err) {
      setError("Failed to load article");
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
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Link to="/" style={{ textDecoration: 'none', display: 'contents' }}>
            <Group>
              <Image src="../../Logo1.png" h={50} w="auto" alt="Intuision Logo" />
              <Text size="xl" fw={700}>Intuision</Text>
            </Group>
          </Link>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="0">
        <ControlPanel onPageSelect={handlePageSelect} />
      </AppShell.Navbar>

      <AppShell.Main>
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {mdxContent && (
            <ArticleContent article_id={`${bookName}_${articleId}`} content={mdxContent} />
          )}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Article;
