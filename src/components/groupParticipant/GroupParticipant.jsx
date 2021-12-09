import React, { useState } from 'react';

import { IconButton, Avatar, makeStyles } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import axios from '../../axios';

import './GroupParticipant.css';

const useStyles = makeStyles({
  deleteBtn: {
    color: 'black',
    '&:hover': {
      backgroundColor: '#ff9191',
    },
  },
});

const GroupParticipant = ({
  userInfo,
  isAdmin,
  adminFeatures,
  currentChat,
}) => {
  const classes = useStyles();
  const [seeInfo, setSeeInfo] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const deleteUser = async (event) => {
    event.preventDefault();
    let newAdmin;
    try {
      // delete yourself from be in the manager if you'r the only manager, and make someone else to be the manager.
      currentChat?.admin.length === 1 &&
        currentChat?.admin.forEach(async (admin) => {
          if (admin === userInfo.userid) {
            newAdmin = currentChat?.members.find(
              (member) => member !== currentUser.uid
            );
            await axios.patch(
              '/api/v1/conversations/?chatId=' + currentChat?._id,
              {
                delAdmin: currentUser.uid,
              }
            );
            await axios.patch(
              '/api/v1/conversations/?chatId=' + currentChat?._id,
              {
                newAdmin: newAdmin,
              }
            );
          }
        });

      const { userid, username, profilePicture, useremail } = { ...userInfo };
      // console.log(userid, username, profilePicture, useremail);

      await axios.patch('/api/v1/conversations/?chatId=' + currentChat?._id, {
        isGroup: currentChat?.isGroup,
        delId: userid,
        userInfo: { userid, username, profilePicture, useremail },
      });
      // console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={`groupPart-friend ${seeInfo ? 'toSeeInfo' : ''}`}>
      <div className='groupPart-friend-top'>
        <div className='groupPart-friend-left'>
          {adminFeatures ? (
            <IconButton onClick={deleteUser} className={classes.deleteBtn}>
              <CloseIcon />
            </IconButton>
          ) : null}

          <p className='groupPart-friend-name'>{userInfo.username}</p>
        </div>
        <div className='groupPart-friend-right'>
          {isAdmin ? <p className='groupPart-manager'>manager</p> : null}
          <IconButton onClick={() => setSeeInfo(!seeInfo)}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
      <div className={seeInfo ? 'groupPart-info' : 'hidden'}>
        <Avatar src={userInfo.profilePicture} />
        <p className='groupPart-email'>{userInfo.useremail}</p>
      </div>
    </div>
  );
};

export default GroupParticipant;