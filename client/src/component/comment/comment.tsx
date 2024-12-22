'use client';
import { Avatar, Group, Text, Container, Stack, Rating, Paper, Pagination, Button, TextInput, Textarea, FileInput } from '@mantine/core';
import styles from './comments.module.css';
import { useState, useEffect } from 'react';
import { showNotification } from '@mantine/notifications';

interface CommentProps {
  comments: Array<{
    username: string;
    fullname: string;
    comment: string;
    images_url: string[];
    rating: number;
    time_ago: string;
  }>;
}

const Comment = ({ comments }: CommentProps) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const [localComments, setLocalComments] = useState(comments);
  const [openCommentForm, setOpenCommentForm] = useState(false);
  const [formCommentData, setFormCommentData] = useState({
    username: '',
    fullname: '',
    comment: '',
    images: [],
    rating: 0,
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (formCommentData.comment || localComments.length > comments.length) {
        console.log('Saving unsent comments to server...', localComments.slice(comments.length));
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [localComments, comments, formCommentData]);

  const paginateData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return localComments.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target || {};

    if (name === 'images') {
      setFormCommentData({
        ...formCommentData,
        images: e,
      });
    } else {
      setFormCommentData({
        ...formCommentData,
        [name]: value,
      });
    }
  };

  const handleSubmitCommentForm = (e: any) => {
    e.preventDefault();

    const newComment = {
      username: formCommentData.username || 'Tôi',
      fullname: formCommentData.fullname || 'Tôi',
      comment: formCommentData.comment,
      images_url: formCommentData.images.map((file: any) => URL.createObjectURL(file)),
      rating: formCommentData.rating,
      time_ago: 'Just now',
    };

    setLocalComments((prev) => [newComment, ...prev]);

    setFormCommentData({
      username: '',
      fullname: '',
      comment: '',
      images: [],
      rating: 0,
    });

    showNotification({
      title: 'Comment Added',
      message: 'Your comment has been added and will be saved when you exit.',
    });
    setOpenCommentForm(false);
  };

  if (!comments || comments.length === 0) {
    return <Text>No comments available.</Text>;
  }

  return (
    <Container size="lg" style={{ marginTop: '2rem' }}>
      <div>
        <Button onClick={() => setOpenCommentForm(true)} variant="filled">
          Add Comment
        </Button>
      </div>

      {openCommentForm && (
        <Paper p="lg" shadow="sm" style={{ borderRadius: '8px', marginTop: '1rem' }}>
          <form onSubmit={handleSubmitCommentForm}>
            <Stack gap="md">

              <Textarea
                label="Comment"
                name="comment"
                value={formCommentData.comment}
                onChange={handleChange}
                placeholder="Write your comment here..."
                required
              />

              <FileInput
                label="Upload Images"
                name="images"
                multiple
                onChange={(files) =>
                  setFormCommentData((prev: any) => ({
                    ...prev,
                    images: files || [],
                  }))
                }
                accept="image/*"
                placeholder="Upload one or more images"
              />

              <Button type="submit" fullWidth>
                Submit Comment
              </Button>
            </Stack>
          </form>
        </Paper>
      )}

      <Paper p="lg" shadow="sm" style={{ borderRadius: '8px', marginTop: '1rem' }}>
        <h2>Comments</h2>
        {paginateData().map((comment, index) => (
          <div key={index} className={styles.commentContainer}>
            <Group>
              <Avatar
                src={`https://ui-avatars.com/api/?name=${comment.username}&background=random`}
                alt={comment.username}
                radius="xl"
              />
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {comment.fullname}
                </Text>
                <Text size="xs" color="dimmed">
                  {comment.time_ago}
                </Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: '0.25rem' }}>
                <Rating value={comment.rating} readOnly style={{ fontSize: '0.5rem' }} />
              </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
              {comment.comment}
            </Text>
            {comment.images_url && (
              <div className={styles.imageContainer}>
                {comment.images_url.map((imageUrl, idx) => (
                  <img key={idx} src={imageUrl} alt={`Comment image ${idx}`} className={styles.commentImage} />
                ))}
              </div>
            )}
          </div>
        ))}
        <Group justify="center" mt="md">
          <Pagination
            className={styles.paginationGroup}
            value={currentPage}
            onChange={handlePageChange}
            total={totalPages}
            withEdges
          />
        </Group>
      </Paper>
    </Container>
  );
};

export default Comment;
