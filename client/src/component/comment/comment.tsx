import { Avatar, Group, Text } from '@mantine/core';
import styles from './rate.module.css';

interface CommentProps {
//   avatar: string;
//   name: string;
  time: string;
  comment: string;
  rating: number;
}

const Comment: React.FC<CommentProps> = ({ time, comment, rating }) => {
  return (
    <div>
      <Group>
        {/* <Avatar src={avatar} alt={name} radius="xl" /> */}
        <div>
          {/* <Text size="sm">{name}</Text> */}
          <Text size="xs" color="dimmed">
            {time}
          </Text>
        </div>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {comment}
      </Text>
      <div className={styles.stars} style={{ '--rating': rating } as React.CSSProperties}>
        <Text size="xs" pt="sm">Rating: {rating} / 5</Text>
      </div>
    </div>
  );
};

export default Comment;
