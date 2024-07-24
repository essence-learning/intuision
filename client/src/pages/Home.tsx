import React from 'react';
import { Link } from 'react-router-dom';
import { MenuNavbar } from "@/components/ui/MenuNavbar";
import { BookBadge, BookData } from "@/components/ui/BookBadge"
import { AppShell, Group, Image, Text, Grid, Skeleton, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const child = <Skeleton height={140} radius="md" animate={false} />;

const Home = () => {
  const [opened, { toggle }] = useDisclosure();

  const physicsData: BookData = {
    image: 'https://assets.openstax.org/oscms-prodcms/media/documents/high_school_physics_web_card.svg',
    title: 'Physics',
    source: 'OpenStax',
    description: 'Beginning with an introduction to physics and scientific processes and followed by chapters focused on motion, mechanics, thermodynamics, waves, and light, this book incorporates a variety of tools to engage and inspire students',
    link: '/book/Physics',
  };

  const astronomyData: BookData = {
    image: 'https://assets.openstax.org/oscms-prodcms/media/documents/astronomy_2e_webcard.svg',
    title: 'Astronomy 2e',
    source: 'OpenStax',
    description: 'Designed to meet the scope and sequence of your course, Astronomy 2e is written in clear non-technical language, with the occasional touch of humor and a wide range of clarifying illustrations.',
    link: '/book/Astronomy2e',
  };

  const microbiologyData: BookData = {
    image: 'https://assets.openstax.org/oscms-prodcms/media/documents/calculus-v1.svg',
    title: 'Calculus 1',
    source: 'OpenStax',
    description: 'Calculus is designed for the typical two- or three-semester general calculus course, incorporating innovative features to enhance student learning. Volume 1 covers functions, limits, derivatives, and integration.',
    link: '/book/Calculus1',
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
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
      <AppShell.Navbar><MenuNavbar /></AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/courses" element={
            <div></div>
          } />
          <Route path="/textbooks" element={
            <Container my="md">
              <Grid>
                <Grid.Col span={{ base: 12, xs: 4 }}>
                  <BookBadge data={physicsData}/>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 4 }}>
                  <BookBadge data={astronomyData}/>
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 4 }}>
                  <BookBadge data={microbiologyData}/>
                </Grid.Col>
              </Grid>
            </Container>
            // <div>
            //   <h1 className="font-bold">intuision</h1>
            //   <p>"length" -lebron</p>
            //   <Link to="/book/Physics" className="text-blue-500 hover:underline">
            //     OpenStax Physics
            //   </Link>
            //   <br />
            //   <Link to="/book/lebron" className="text-blue-500 hover:underline">
            //     lebron read this textbook
            //   </Link>
            // </div>
          } />
          <Route path="/" element={<Navigate to="/textbooks" replace />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
};

export default Home;
