import { IconHeart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './BookBadge.module.css';

export interface BookData {
  image: string;
  title: string;
  source: string;
  description: string;
  link: string;
}

interface BookBadgeProps {
  data: BookData;
}

export function BookBadge({ data }: BookBadgeProps) {
  const { image, title, description, source, link } = data;

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={title} height={180} />
      </Card.Section>
      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="light">
            {source}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>
      <Group mt="xs">
        <Button
          component={Link}
          to={link}
          radius="md"
          style={{ flex: 1 }}
        >
          Open Textbook
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}