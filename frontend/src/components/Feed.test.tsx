/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { Feed } from "./Feed";
import { PostModel } from "./Post";

const post: PostModel[] = [
  {
    id: "123",
    user: { username: "alfons", displayName: "Alfons User" },
    message: "this is my most important message of the day!",
    postedAt: new Date("June 14, 2022 11:24:00"),
  },
];
describe("Feed", () => {
  it("should render feed", () => {
    //Act
    const { getByText } = render(<Feed posts={post} />);

    //Assert
    expect(getByText("Home")).toBeDefined();
    expect(getByText(post[0].user.username)).toBeDefined();
    expect(getByText(post[0].message)).toBeDefined();
    expect(getByText(post[0].postedAt.toLocaleString())).toBeDefined();
  });
});
