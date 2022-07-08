/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { Post } from "../generated/graphql";
import { PostComponent } from "./PostComponent";

const post: Post = {
  id: "123",
  user: { username: "alfons", displayName: "Alfons User" },
  message: "this is my most important message of the day!",
  postedAt: new Date("June 14, 2022 11:24:00"),
};

describe("Post", () => {
  it("should render post", () => {
    //Act
    const { getByText, getByTestId } = render(<PostComponent post={post} />);

    //Assert
    expect(getByText(post.user.username)).toBeDefined();
    expect(getByText(post.message)).toBeDefined();
    expect(getByText(post.postedAt.toLocaleString())).toBeDefined();
    expect(getByTestId("ChatBubbleIcon")).toBeDefined();
    expect(getByTestId("RepeatIcon")).toBeDefined();
    expect(getByTestId("FavoriteBorderOutlinedIcon")).toBeDefined();
    expect(getByTestId("PublishIcon")).toBeDefined();
  });
});
