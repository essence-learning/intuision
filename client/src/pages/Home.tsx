import React from 'react';
import { Link } from 'react-router-dom';
import { MenuNavbar } from "@/components/ui/MenuNavbar";
import { AppShell, Group, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const Home = () => {
  const [opened, { toggle }] = useDisclosure();

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
          <Image src="/Logo1.png" height={40} width="auto" alt="Intuision Logo" />
          <Text size="xl" fw={700}>Intuision</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar><MenuNavbar /></AppShell.Navbar>

      <AppShell.Main>
        <h1 className="font-bold">intuision</h1>
        <p>"length" -lebron</p>
        <Link to="/book/Physics" className="text-blue-500 hover:underline">
          OpenStax Physics
        </Link>
        <br />
        <Link to="/book/lebron" className="text-blue-500 hover:underline">
          lebron read this textbook
        </Link>
      </AppShell.Main>
    </AppShell>
  );
};

export default Home;
