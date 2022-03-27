#### We’ve created a React Application "Quiz Card":
- there is action to get the pack/card;
- there is action to create the pack/card (+ you can put status of pack to Private using private param);
- there is action to delete the pack/card;
- there is action to update the pack/card details;
- there is action to learn each pack with cards;
- there is a search bar for finding pack or card by name or by question;
- there is a checkbox bar for changing params of pack or params of card;
- there is a pagination for changing pages of application.

Technology:
 - react
 - typescript
 - react-redux 
 - redux 
 - redux-thunk 
 - react-router-dom 
 - axios

Description:
We’ve started with building the most independent parts like — Redux Actions, Reducers (we've combined the reducers using the combineReducer function).
We’ve created Redux store and applied the redux-thunk middleware to the store which allows us to support asynchronous actions. React Components work with the Store via dispatching an action or getting value using React-Redux Hooks. The reducer takes the action and returns new state.
We’ve wrapped our entire application in a <Provider> component to make the store available to its child components.

We've created a service that uses axios object to send requests (get, post, create, delete).

We’ve setup the routes by using the React Router. It has navbar that links to routes paths. We’ve wrapped our entire application in a <HashRouter> component  to keep UI in sync with the URL.

We’ve built components corresponding to Routes defined before (Registration, Login, PasswordRecovery, ForgotYourPassword, CheckEmail, Profile, PacksList, Cards, Learn).

We’ve created commonly needed UI (button, input, checkbox, preloader, modal window, pagination, etc) can be imported and used by any file in the app.
  
  
![Image alt](https://github.com/NastassiaMikhalenka/portfolio/blob/master/src/components/assets/ProjectsImg/QuizCards/QuizCards2.png?raw=true)

![Image alt](https://github.com/NastassiaMikhalenka/portfolio/blob/master/src/components/assets/ProjectsImg/QuizCards/QuizCards1.jpeg?raw=true)

![Image alt](https://github.com/NastassiaMikhalenka/portfolio/blob/master/src/components/assets/ProjectsImg/QuizCards/QuizCards5.png?raw=true)

![Image alt](https://github.com/NastassiaMikhalenka/portfolio/blob/master/src/components/assets/ProjectsImg/QuizCards/QuizCards6.png?raw=true)
