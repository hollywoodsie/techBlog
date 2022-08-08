import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import styles from './AddPost.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios';

export function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');

  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);

      const { data } = await axios.post('/images', formData);
      const temporaryUrl = await axios.get(`images/${data}`);
      setImageUrl(temporaryUrl.data);
    } catch (error) {
      console.warn(error);
      alert('Error while uploading image');
    }
  };

  const onClickRemoveImage = async () => {
    setImageUrl('');
    // functional for removing from s3 incoming
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };
      const postData = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      // eslint-disable-next-line no-underscore-dangle
      const _id = isEditing ? id : postData.data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(','));
        setImageUrl(data.imageUrl);
      });
    }
  }, [id]);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Text here...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        onClick={() => inputFileRef.current.click()}
      >
        <PhotoCamera />
      </IconButton>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={onClickRemoveImage}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <img className={styles.image} src={imageUrl} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Save changes' : 'Submit post'}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
}
