import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import AppBar from "./UI/components/NavigationBar/navigationBar";
import AuthorsPage from "./UI/pages/Authors/authorsPage";
import BooksPage from "./UI/pages/Books/booksPage";
import ReviewPage from "./UI/pages/Reviews/reviewPage";
import SignInPage from "./UI/pages/SignIn/signInPage";
import Message from "./UI/components/Message";
import PageNotFoundPage from "./UI/pages/PageNotFound/pageNotFoundPage";
import WelcomePage from "./UI/pages/Welcome/welcomePage";
import PrivateRoute from "./helpers/PrivateRoute";
import HomePage from "./UI/pages/Home/homePage";

export default function App() {
  return (
    <Box w="100%">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/home"
          element={
            <>
              <AppBar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/books"
          element={
            <>
              <AppBar />
              <BooksPage />
            </>
          }
        />
        <Route
          path="/authors"
          element={
            <>
              <AppBar />
              <AuthorsPage />
            </>
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/reviews"
          element={
            <PrivateRoute>
              <>
                <AppBar />
                <ReviewPage />
              </>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
      <Message />
    </Box>
  );
}
