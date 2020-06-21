# learn-space

#SIGNUP
note - Signup.js & signup.js are different.

Signup form interacts with Signup.JS, and state is updated on onChange event.

onSubmit invokes register();
(from client/actions/auth.js)
register makes post request to /signup and receives token.

signup.js is responsible for auth: encryping pw, creating/sending token, creating new user in database.

loadUser() => store token; =>  setAuthToken() => sets headers of all requests to contain user token. => loadUsers now tries to get /dashboard.

/dashboard is handled in dashboard.js. if token => use jwt.verify with token & private key to generate userId.

then get user's information via query to DB.
render user info if exists.
directed to /dashboard now.

=> client/reducers/authReducer.js case user_loaded:
sets user authentication to true, & contains all relevant user info.

#LOGIN
similar to #Signup.

login form => Login.js => on submit dispatch Login_success with token. Once complete => dispatch(loadUser) => if token then header contains token. => Dispatch user_loaded => state updated => success? => /dashboard.

User is fetched from DB instead of being created. Encryption is not used, but token is created again and saved to local storage.


#COURSES
/dashboard => handled in Dashboard.js.
dashboard renders user and course data for display.

each course box will have tie to loadQuestions().
onclick => actions/questions.js => using courseId try to get questions from database.
=> reducers/questionreducer/questions_loaded => state updated.

#QUESTIONS
/questions => Questions.js
if question => get available answers
=> render answers.
when radio button clicked => state changed to store 'checkedName (checked answer) and checkedId (answer ID)'
onsubmit => invokes checkAnswer => post request to /answers. if correct => score updated / wrong => string "incorrect" is sent.

//
//
