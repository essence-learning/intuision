import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import ArticleContent from "@/components/articles/ArticleContent";
import ControlPanel from "@/components/articles/ControlPanel";
import NavBar from "@/components/NavBar";

import { useState } from "react";
// import Scene from "@/components/articles/Scene";

const Article: React.FC = () => {
  const [mdxContent, setMdxContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articleId, setArticleId] = useState<string>("default");

  const handlePageSelect = async (bookName: string, pageId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/article/${bookName}/${pageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }
      setArticleId(pageId);
      const content = await response.json();
      setMdxContent(JSON.stringify(content));
    } catch (err) {
      setError('Failed to load article');
    } finally {
      setIsLoading(false);
    }
  };

  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <NavBar />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <ControlPanel onPageSelect={handlePageSelect} />
      </AppShell.Navbar>

      <AppShell.Main>
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {mdxContent && (
            <ArticleContent article_id={articleId} content={mdxContent} />
          )}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default Article;