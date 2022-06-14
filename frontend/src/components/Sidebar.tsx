import { Abc, Home } from "@mui/icons-material";
import { Button, Icon, styled } from "@mui/material";
import React, { useState } from "react";
import quaker from "../assets/quaker.png";
import { SidebarOption } from "./SidebarOption";

export const Sidebar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<Number>(1);

  const handleClickListItem = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(selectedIndex !== 1 ? 1 : index);
  };
  return (
    <div className="sidebar">
      <Icon>
        <img src={quaker} width={25} height={25} alt="quaker" />
      </Icon>
      <SidebarOption
        text="Home"
        Icon={Home}
        onClick={(event) => handleClickListItem(event, 1)}
        active={selectedIndex === 1}
      />
      <SidebarOption
        text="Another Menu Item"
        Icon={Abc}
        onClick={(event) => handleClickListItem(event, 2)}
        active={selectedIndex === 2}
      />
      <StyledButton>Quak</StyledButton>
    </div>
  );
};

const StyledButton = styled(Button)`
  background-color: #d3ffd8;
  color: #2db83d;
  border: none;
  font-weight: 900;
  text-transform: inherit;
  border-radius: 30px;
  margin-top: 20px;
  height: 40px;
  width: 100%;
`;
