import { PostModel } from "../components/Post";

export const repliesFixture: Omit<PostModel[], "replies"> = [
  {
    id: "456",
    user: { username: "peter", displayName: "Peter User" },
    message: "this is my most important message of the day!",
    postedAt: new Date("June 14, 2022 08:24:00"),
  },
];
