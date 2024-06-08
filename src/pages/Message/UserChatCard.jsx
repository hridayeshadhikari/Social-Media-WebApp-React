import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';

const UserChatCard = ({ chat }) => {

  const { auth} = useSelector(store => store)
  return (
    <Card>
      <CardHeader avatar={
        <Avatar sx={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
          src={chat.users[1].profileImage} />
      }
        action={<IconButton>
          <MoreHorizIcon />
        </IconButton>}
        title={auth?.user?.id === chat?.users[0]?.id ? chat?.users[1]?.firstName + " " +
          chat?.users[1]?.lastName : chat?.users[0]?.firstName + " " + chat?.users[0]?.lastName}
        subheader={"new message"}
      >

      </CardHeader>

    </Card>
  )
}

export default UserChatCard
