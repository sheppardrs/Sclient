# Client for Sharity MVP
## Sheppard Somers
July 2018
Started from lab4 of CS52 at Dartmouth College taught by Timothy Pierson so this is built from course notes and assignments as well as stack exchange and [youtube](https://www.youtube.com/watch?v=Td-2D-_7Y2E&index=20&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b).

## with Regina Yan doing maybe some styling/front end engineering

# TODO
 * display errors for failures like unauthorized delete or any other error codes received from server
 * add profile pages
 * add landing page
 * add usernames*
 * display offers and requests*
 * add filters*
 * add sort*
 * add search bar*
 * add favorites*
 * number of views/upvotes/likes
 * remove delete button -- only show on profile page
 * add AWS S3 for image uploading*
 * add chat functionality between users*
 * add commenting?

`*` involves server side as well


# Do Some Extra Credit

# Functionality
From the assignment:
  * Use routing to navigate to home, add a post, edit, and full post pages
  * Use redux to handle a global state with the current list of posts as well as the current full single post
  * use redux thunk to make api calls from action creators
  * support get all (get), get specific (get w/ID), update (put), create (post), and delete (delete) for the herokuapp api through action creators and redux thunk functions in applyMiddleware
  * use containers to handle the global state and the functions for each action and use components that rely on props and presentational internal state for rendering so that they are agnostic to the use of redux.
  * Supports markdown in the post body


# Styling
Simple styling with a 3 color palette and some pin-line borders was used.
The goal of the functionality is to be a listing place for used items and requests for used items.

# Components
These are the presentational Components
## App
This the the overall app. It contains the navigation bar as well as the routing for the site. It also contains some pure elements such as ```Welcome``` which displays the list of posts.

## AddPost
This component creates a form for adding a new post. The component calls the given ```onSubmit``` function when submitted and is used in both creating and editing posts by changing this ```onSubmit``` from ```createPost``` action to the ```updatePost``` action. This does take a post as a prop but this post may contain empty fields for title, tags, content, and cover_url. The post.id should not be defined if it being used for creating a new post.

## FullPost
This renders a full page view of the whole post. It uses the same link for editing as the edit on the homepage does and an ```onDelete``` prop for deleting the post, which in this project uses the ```deletePost``` action which takes an ID and history (so that it can navigate back to the homepage).

## Post
This renders a single post 'preview' that is found on the home page. It supports editing by a ```NavLink``` to ```/posts/<POSTID>/edit```. It has two view links that navigate to ```/posts/<POSTID>``` these are the title and the view button (currently an arrow bottom right). Finally it has a delete button which utilizes the ```deletePost``` action creator.

# Containers
## AddAPost from addpost.js
This container give the ```AddPost``` component the ```onSubmit``` prop of the ```createPost``` action creator.

## Controls controls.js
This provides a refresh button that triggers ```fetchPosts```.

## EditAPost from editpost.js
This gives the ```AddPost``` component the ```onSubmit``` prop of the ```updatePost``` action creator and the ```post``` prop of the current post.

## SinglePost from post.js
This creates a ```FullPost``` with the props history for deleting, ```onDelete``` of ```deletePost``` and ```onSubmit``` of ```fetchPost``` for loading the post.

## Posts from posts.js
This container manages the list of all the posts by looping over the ```all``` field of the global state and creating ```Post``` component for each one.

# Reducers
## postReducer in post-reducer.js
This manages the ```post``` field of the global state which stores the full currently selected post.

## postsReducer in posts-reducer.js
This manages the ```all``` field of the global state which stores the whole list of posts.

# index.js
Creates the redux store and loads the ```App``` component to the id ```main``` from index.html.

# Running
Run ```yarn``` to import everything and make the linter happy. If that fails, run `yarn add --dev babel-preset-react babel-plugin-transform-class-properties` after copying if the compilation fails.
