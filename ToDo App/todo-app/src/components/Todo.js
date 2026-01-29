import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Dialog,
  Slide,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from '@mui/material';
import { AddCircle, Close } from '@mui/icons-material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Transition for dialogs
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      title: '',
      body: '',
      todoId: '',
      errors: {},
      open: false,
      uiLoading: true,
      buttonType: '',
      viewOpen: false,
    };
  }

  componentDidMount() {
    dayjs.extend(relativeTime);

    // TEMP: dummy todos so frontend shows immediately
    this.setState({
      todos: [
        {
          todoId: 1,
          title: 'Test Todo 1',
          body: 'This is the first test todo item.',
          createdAt: new Date(),
        },
        {
          todoId: 2,
          title: 'Test Todo 2',
          body: 'This is the second test todo item.',
          createdAt: new Date(),
        },
      ],
      uiLoading: false,
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ todoId: '', title: '', body: '', buttonType: '', open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert('Submit clicked! Backend API not connected yet.');
    this.setState({ open: false });
  };

  handleViewOpen = (todo) => {
    this.setState({ title: todo.title, body: todo.body, viewOpen: true });
  };

  handleViewClose = () => {
    this.setState({ viewOpen: false });
  };

  handleEditClickOpen = (todo) => {
    this.setState({
      title: todo.title,
      body: todo.body,
      todoId: todo.todoId,
      buttonType: 'Edit',
      open: true,
    });
  };

  deleteTodoHandler = (todo) => {
    alert('Delete clicked! Backend API not connected yet.');
  };

  render() {
    const { open, uiLoading, viewOpen, errors } = this.state;

    if (uiLoading) {
      return <CircularProgress size={100} style={{ marginTop: 100 }} />;
    }

    return (
      <div style={{ padding: 20 }}>
        {/* Floating Add Button */}
        <IconButton
          color="primary"
          onClick={this.handleClickOpen}
          style={{ position: 'fixed', bottom: 20, right: 20 }}
        >
          <AddCircle style={{ fontSize: 60 }} />
        </IconButton>

        {/* Add/Edit Dialog */}
        <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose}>
                <Close />
              </IconButton>
              <Typography variant="h6" style={{ flex: 1 }}>
                {this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
              </Typography>
              <Button color="inherit" onClick={this.handleSubmit}>
                {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
              </Button>
            </Toolbar>
          </AppBar>

          <form style={{ padding: 20 }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Todo Title"
                  name="title"
                  variant="outlined"
                  value={this.state.title}
                  onChange={this.handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Todo Details"
                  name="body"
                  variant="outlined"
                  multiline
                  rows={10}
                  value={this.state.body}
                  onChange={this.handleChange}
                  error={!!errors.body}
                  helperText={errors.body}
                />
              </Grid>
            </Grid>
          </form>
        </Dialog>

        {/* Todo Cards */}
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          {this.state.todos.map((todo) => (
            <Grid item xs={12} sm={6} key={todo.todoId}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5">{todo.title}</Typography>
                  <Typography color="textSecondary">{dayjs(todo.createdAt).fromNow()}</Typography>
                  <Typography variant="body2">
                    {todo.body.length > 65 ? todo.body.substring(0, 65) + '...' : todo.body}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => this.handleViewOpen(todo)}>
                    View
                  </Button>
                  <Button size="small" color="primary" onClick={() => this.handleEditClickOpen(todo)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => this.deleteTodoHandler(todo)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* View Dialog */}
        <Dialog open={viewOpen} onClose={this.handleViewClose} fullWidth maxWidth="sm">
          <AppBar position="static" style={{ background: '#FF5722' }}>
            <Toolbar>
              <Typography variant="h6" style={{ flex: 1 }}>
                {this.state.title}
              </Typography>
              <IconButton color="inherit" onClick={this.handleViewClose}>
                <Close />
              </IconButton>
            </Toolbar>
          </AppBar>
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={this.state.body}
              InputProps={{
                readOnly: true,
              }}
            />
          </CardContent>
        </Dialog>
      </div>
    );
  }
}

export default Todo;


// import React, { Component } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Button,
//   Dialog,
//   Slide,
//   TextField,
//   Grid,
//   Card,
//   CardContent,
//   CardActions,
//   CircularProgress,
// } from '@mui/material';
// import { AddCircle, Close } from '@mui/icons-material';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import { authMiddleWare } from '../util/auth';

// // Dialog Transition
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// class Todo extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       todos: [],
//       title: '',
//       body: '',
//       todoId: '',
//       errors: {},
//       open: false,
//       uiLoading: true,
//       buttonType: '',
//       viewOpen: false,
//     };
//   }

//   componentDidMount() {
//     authMiddleWare(this.props.history);
//     const authToken = localStorage.getItem('AuthToken');
//     axios.defaults.headers.common = { Authorization: `${authToken}` };

//     axios
//       .get('/todos')
//       .then((res) => this.setState({ todos: res.data, uiLoading: false }))
//       .catch((err) => console.log(err));
//   }

//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   handleClickOpen = () => {
//     this.setState({ todoId: '', title: '', body: '', buttonType: '', open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const userTodo = { title: this.state.title, body: this.state.body };
//     const authToken = localStorage.getItem('AuthToken');
//     axios.defaults.headers.common = { Authorization: `${authToken}` };

//     let options = {};
//     if (this.state.buttonType === 'Edit') {
//       options = { url: `/todo/${this.state.todoId}`, method: 'put', data: userTodo };
//     } else {
//       options = { url: '/todo', method: 'post', data: userTodo };
//     }

//     axios(options)
//       .then(() => {
//         this.setState({ open: false });
//         window.location.reload();
//       })
//       .catch((error) => this.setState({ errors: error.response?.data || {} }));
//   };

//   handleViewOpen = (todo) => {
//     this.setState({ title: todo.title, body: todo.body, viewOpen: true });
//   };

//   handleViewClose = () => {
//     this.setState({ viewOpen: false });
//   };

//   handleEditClickOpen = (todo) => {
//     this.setState({
//       title: todo.title,
//       body: todo.body,
//       todoId: todo.todoId,
//       buttonType: 'Edit',
//       open: true,
//     });
//   };

//   deleteTodoHandler = (todo) => {
//     const authToken = localStorage.getItem('AuthToken');
//     axios.defaults.headers.common = { Authorization: `${authToken}` };

//     axios
//       .delete(`/todo/${todo.todoId}`)
//       .then(() => window.location.reload())
//       .catch((err) => console.log(err));
//   };

//   render() {
//     const { open, errors, uiLoading, viewOpen } = this.state;
//     dayjs.extend(relativeTime);

//     if (uiLoading) {
//       return <CircularProgress size={100} style={{ marginTop: 100 }} />;
//     }

//     return (
//       <div style={{ padding: 20 }}>
//         {/* Floating Add Button */}
//         <IconButton
//           color="primary"
//           onClick={this.handleClickOpen}
//           style={{ position: 'fixed', bottom: 20, right: 20 }}
//         >
//           <AddCircle style={{ fontSize: 60 }} />
//         </IconButton>

//         {/* Add/Edit Dialog */}
//         <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
//           <AppBar position="static">
//             <Toolbar>
//               <IconButton edge="start" color="inherit" onClick={this.handleClose}>
//                 <Close />
//               </IconButton>
//               <Typography variant="h6" style={{ flex: 1 }}>
//                 {this.state.buttonType === 'Edit' ? 'Edit Todo' : 'Create a new Todo'}
//               </Typography>
//               <Button color="inherit" onClick={this.handleSubmit}>
//                 {this.state.buttonType === 'Edit' ? 'Save' : 'Submit'}
//               </Button>
//             </Toolbar>
//           </AppBar>

//           <form style={{ padding: 20 }} noValidate>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Todo Title"
//                   name="title"
//                   variant="outlined"
//                   value={this.state.title}
//                   onChange={this.handleChange}
//                   error={!!errors.title}
//                   helperText={errors.title}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Todo Details"
//                   name="body"
//                   variant="outlined"
//                   multiline
//                   rows={10}
//                   value={this.state.body}
//                   onChange={this.handleChange}
//                   error={!!errors.body}
//                   helperText={errors.body}
//                 />
//               </Grid>
//             </Grid>
//           </form>
//         </Dialog>

//         {/* Todo Cards */}
//         <Grid container spacing={2} style={{ marginTop: 20 }}>
//           {this.state.todos.map((todo) => (
//             <Grid item xs={12} sm={6} key={todo.todoId}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="h5">{todo.title}</Typography>
//                   <Typography color="textSecondary">
//                     {dayjs(todo.createdAt).fromNow()}
//                   </Typography>
//                   <Typography variant="body2">
//                     {todo.body.length > 65 ? todo.body.substring(0, 65) + '...' : todo.body}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" color="primary" onClick={() => this.handleViewOpen(todo)}>
//                     View
//                   </Button>
//                   <Button size="small" color="primary" onClick={() => this.handleEditClickOpen(todo)}>
//                     Edit
//                   </Button>
//                   <Button size="small" color="error" onClick={() => this.deleteTodoHandler(todo)}>
//                     Delete
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* View Dialog */}
//         <Dialog open={viewOpen} onClose={this.handleViewClose} fullWidth maxWidth="sm">
//           <AppBar position="static" style={{ background: '#FF5722' }}>
//             <Toolbar>
//               <Typography variant="h6" style={{ flex: 1 }}>
//                 {this.state.title}
//               </Typography>
//               <IconButton color="inherit" onClick={this.handleViewClose}>
//                 <Close />
//               </IconButton>
//             </Toolbar>
//           </AppBar>
//           <CardContent>
//             <TextField
//               fullWidth
//               multiline
//               rows={10}
//               value={this.state.body}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//           </CardContent>
//         </Dialog>
//       </div>
//     );
//   }
// }

// export default Todo;
