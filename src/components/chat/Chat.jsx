import React, { useState } from 'react';

import ChatBox from './../chatBox/ChatBox';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import NewMessageModal from '../newMessageModal/NewMessageModal';
import './Chat.css';

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [userPic, setUserPic] = useState([]);
  const [userNam, setUserName] = useState([]);
  const [showModal, setModal] = useState(null);
  const [isGroup, setGroup] = useState(null);

  return (
    <div className='chat'>
      <Header />

      <div className='chat-body'>
        <Sidebar
          setCurrentChat={setCurrentChat}
          setUserPic={setUserPic}
          setUserName={setUserName}
          setModal={setModal}
          setGroup={setGroup}
        />
        <ChatBox
          currentChat={currentChat}
          userPic={userPic}
          userNam={userNam}
        />
        <div className={showModal ? 'new-message' : 'hidden'}>
          <div className='chat-body-modal'>
            <NewMessageModal
              setModal={setModal}
              showModal={showModal}
              isGroup={isGroup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
