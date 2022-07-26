import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import axios from '../redux/axios';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/slices/posts';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {[...Array(5)].map(() => (
            <Post
              id={1}
              title="Roast the code #1 | Rock Paper Scissors"
              imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
              user={{
                avatarUrl:
                  'https://media-exp1.licdn.com/dms/image/D4E35AQF-oTDoA35z8A/profile-framedphoto-shrink_200_200/0/1654843610141?e=1659463200&v=beta&t=hYYYAabV0OH1oT-fYqqMI47zJiGsm9eZDXZBqXYQ_Mg',
                fullName: 'User',
              }}
              createdAt={'12 Jun 2022 '}
              viewsCount={150}
              commentsCount={3}
              tags={['react', 'fun', 'typescript']}
              isLoading={true}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={['react', 'typescript', 'заметки']}
            isLoading={false}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Roman',
                  avatarUrl:
                    'https://media-exp1.licdn.com/dms/image/D4E35AQF-oTDoA35z8A/profile-framedphoto-shrink_200_200/0/1654843610141?e=1659463200&v=beta&t=hYYYAabV0OH1oT-fYqqMI47zJiGsm9eZDXZBqXYQ_Mg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Roman 2',
                  avatarUrl:
                    'https://media-exp1.licdn.com/dms/image/D4E35AQF-oTDoA35z8A/profile-framedphoto-shrink_200_200/0/1654843610141?e=1659463200&v=beta&t=hYYYAabV0OH1oT-fYqqMI47zJiGsm9eZDXZBqXYQ_Mg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
