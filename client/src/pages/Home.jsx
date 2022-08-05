import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';
import { Pagination } from '@mui/material';
import { usePagination } from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { useParams } from 'react-router-dom';
import { fetchAuthMe } from '../redux/slices/auth';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const [tag, setTag] = React.useState('');
  const [tabValue, setTabValue] = React.useState('new');
  const [page, setPage] = React.useState(1);
  const maxPagesCount = Math.ceil(posts.items.pagesCount);
  const paginator = usePagination(maxPagesCount);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleChangePage = (e, p) => {
    setPage(p);
    console.log(page);
    paginator.jump(p);
  };

  React.useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchAuthMe());
  }, [page]);

  React.useEffect(() => {
    dispatch(fetchPosts({ tag, page }));
  }, [tag, page]);

  React.useEffect(() => {
    setPage(1);
  }, [tag]);

  return (
    <>
      <TabContext value={tabValue}>
        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
          <Tab label="New" value="new" />
          <Tab label="Popular" value="popular" />
        </TabList>

        <TabPanel value="new">
          <Grid container spacing={4}>
            <Grid xs={8} item>
              {(isPostsLoading ? [...Array(5)] : posts.items.result).map(
                (obj, index) =>
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
              <TagsBlock
                items={tags.items}
                isLoading={isTagsLoading}
                setTag={setTag}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="popular">
          {/* <Grid container spacing={4}>
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
            </Grid>
          </Grid> */}
        </TabPanel>
      </TabContext>
      <Pagination
        color="primary"
        sx={{
          justifyContent: 'center',
          display: 'flex',
        }}
        count={maxPagesCount}
        size="medium"
        page={page}
        onChange={handleChangePage}
      />
    </>
  );
};
