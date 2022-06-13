import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material";

export interface sidebarOptionProps {
  text: string;
  Icon: any;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const SidebarOption: React.FC<sidebarOptionProps> = (props) => {
  const { text, Icon, active, onClick } = props;

  return (
    <MenuList>
      <StyledMenuItem
        onClick={onClick}
        className={` ${active ? "sidebarOption--active" : "sidebarOption"}`}
      >
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </StyledMenuItem>
    </MenuList>
  );
};

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #d3ffd8;
    border-radius: 30px;
    color: #2db83d;
    transition: color 100ms ease-out;
  }
  &.sidebarOption--active {
    color: #2db83d;
  }
`;
