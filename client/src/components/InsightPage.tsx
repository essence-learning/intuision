import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InsightPage = () => {
  const { filename } = useParams<{ filename: string }>();
  const [content, setContent] = useState("");

  useEffect(() => {
    const loadInsight = async () => {
      if (filename) {
        const filePath = `/book-data/${filename}.insight`;
        try {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const text = await response.text();
          setContent(text);
        } catch (error) {
          setContent("Insight file not found");
        }
      }
    };
    loadInsight();
  }, [filename]);

  const parseContent = (content: string) => {
    // temporarily parsing as markdown, we can add our own language later
    const html = content
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
      .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
      .replace(/\n$/gim, '<br />');
    return html;
  };

  return <div dangerouslySetInnerHTML={{ __html: parseContent(content) }} />;
};

export default InsightPage;
