export const fetchMDXContent = async (filename: string) => {
    try {
      const response = await fetch(`/api/mdx/${filename}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching MDX content:', error);
      throw error;
    }
  };
  