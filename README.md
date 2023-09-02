# **GREDDIT**

 
## **Running the Code**
<br>

### Build docker services

``` 
$ sudo docker-compose build
```

### Run docker services
``` 
$ sudo docker-compose up
```
<hr>


## **Login and Registration**

This page contains login and registration functionalities. Email is taken to be unique. Passwords stored in the database are hashed and all backend routes are protected using JWT (jsonwebtoken).
<hr>

## **Profile Page**
 Shows basic detials of the user including a form to edit them. Also contains the list of followers and users followed.
 <hr>

 ## **My Subgreddit Page**
 Contains a form to create a new subgreddit. Displays list of already created subgreddits with necessary details such as number of users, posts, name, description and comma-separated list of banned words. Can only delete and open the subgreddits.
 <hr>

## **Subgreddit Page (Moderator View)**
Separate Tabs for showing existing users (as well as banned users), joining requests and reports.

### **Reports**
For each report there are 3 actions :
 

> 1. Ignore - In which case all other buttons are disabled
>
> 2. Block - The post's poster can be banned from the subgreddiit
>
> 3. Delete - The post can be deleted in which case all reports for the post are also deleted.

<hr>

## **All Subgreddits Page**
This page contains a search bar where a user can search for a subgreddit based on its name. Contains a filter based on the tags of the subgreddits. Can sort subgreddits based on number of followers, name, creation date.

<brbr>
Shows list of all joined subgreddits which can be opened to redirect to the personal subgreddit page. Also displays the remaining subgreddits which has a join request button.

<hr>

## **Subgreddit Page (User View)**
Displays information about the subgreddit on the left. Users can add their own posts, upvote/downvote other posts, follow the poster, save posts, report posts and comment on any post.
<br>
If a post contains banned keywords, it is replaced by asterisks.

<hr>

## **Saved Posts**
User can check all their saved posts and also unsave posts.
