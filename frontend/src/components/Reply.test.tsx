/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import { Reply, ReplyModel } from "./Reply";

const reply: ReplyModel = {
  reply: {
    id: "123",
    user: { username: "alfons", displayName: "Alfons User" },
    message: "this is my most important message of the day!",
    postedAt: new Date("June 14, 2022 11:24:00"),
  },
};

describe("Reply", () => {
  it("should render reply", () => {
    //Act
    const { getByText, queryByTestId } = render(<Reply reply={reply.reply} />);

    //Assert
    expect(getByText(reply.reply.user.username)).toBeDefined();
    expect(getByText(reply.reply.message)).toBeDefined();
    expect(getByText(reply.reply.postedAt.toLocaleString())).toBeDefined();
    expect(queryByTestId("ChatBubbleIcon")).toBeNull();
    expect(queryByTestId("RepeatIcon")).toBeNull();
    expect(queryByTestId("FavoriteBorderOutlinedIcon")).toBeNull();
    expect(queryByTestId("PublishIcon")).toBeNull();
  });
});
