import { PostModel } from "../components/Post";
import { repliesFixture } from "./replies.fixture";

export const postsFixture: PostModel[] = [
  {
    id: "123",
    user: { username: "alfons", displayName: "Alfons User" },
    message: "this is my most important message of the day!",
    postedAt: new Date("June 14, 2022 11:24:00"),
    replies: repliesFixture,
  },
  {
    id: "456",
    user: { username: "peter", displayName: "Peter User" },
    message: "this is my most important message of the day!",
    postedAt: new Date("June 14, 2022 08:24:00"),
  },
  {
    id: "789",
    user: { username: "carl", displayName: "Carl User" },
    message: "this is my most important message of the day!",
    postedAt: new Date("June 13, 2022 17:24:00"),
  },
];
