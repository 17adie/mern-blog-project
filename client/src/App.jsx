import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import PostPage from "./pages/blog/PostPage"
import EditPage from "./pages/blog/EditPage"
import axios from "axios"
import { Toaster } from "react-hot-toast"
import PrivateRoutes from "./utils/PrivateRoutes"
import PublicRoutes from "./utils/PublicRoutes"
import CreatePostPage from "./pages/blog/CreatePostPage"
import ViewPostPage from "./pages/blog/ViewPostPage"

// server url
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<ViewPostPage />} />

        {/* Public Routes. Redirect to home page when login */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/create-post" element={<CreatePostPage />} exact />
          <Route path="/post" element={<PostPage />} exact />
          <Route path="/post/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
