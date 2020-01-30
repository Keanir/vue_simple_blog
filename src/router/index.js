import Vue from "vue";
import VueRouter from "vue-router";
import fb from "firebase";

import Home from "@/components/Home";
import Login from "@/components/Auth/Login";
import Registration from "@/components/Auth/Registration";
import Post from "@/components/Blog/Post";
import NewPost from "@/components/Blog/NewPost";
import EditPost from "@/components/Blog/EditPost";
import PostsList from "@/components/Blog/PostsList";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/post/:id",
    name: "Post",
    props: true,
    component: Post,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/posts",
    name: "PostsList",
    props: true,
    component: PostsList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/new",
    name: "New",
    component: NewPost,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/edit",
    name: "Edit",
    component: EditPost,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
