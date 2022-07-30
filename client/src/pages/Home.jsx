import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { Pagination } from '@mui/material';
import { usePagination } from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  const [page, setPage] = React.useState(1);
  const postsPerPage = 5;

  const count = Math.ceil(posts.items.length / postsPerPage);
  const allDisplayedPosts = usePagination(posts.items, postsPerPage);

  const handleChange = (e, p) => {
    setPage(p);
    allDisplayedPosts.jump(p);
  };

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
          {(isPostsLoading
            ? [...Array(5)]
            : allDisplayedPosts.currentData()
          ).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>

        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {/* <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Test user1',
                  avatarUrl:
                    'https://media-exp1.licdn.com/dms/image/D4E35AQF-oTDoA35z8A/profile-framedphoto-shrink_200_200/0/1654843610141?e=1659463200&v=beta&t=hYYYAabV0OH1oT-fYqqMI47zJiGsm9eZDXZBqXYQ_Mg',
                },
                text: 'Test comment',
              },
              {
                user: {
                  fullName: 'Test user2',
                  avatarUrl:
                    'https://media-exp1.licdn.com/dms/image/D4E35AQF-oTDoA35z8A/profile-framedphoto-shrink_200_200/0/1654843610141?e=1659463200&v=beta&t=hYYYAabV0OH1oT-fYqqMI47zJiGsm9eZDXZBqXYQ_Mg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          /> */}
        </Grid>
      </Grid>
      <Pagination
        color="primary"
        sx={{
          justifyContent: 'center',
          display: 'flex',
        }}
        count={count}
        size="medium"
        page={page}
        onChange={handleChange}
      />
    </>
  );
};
