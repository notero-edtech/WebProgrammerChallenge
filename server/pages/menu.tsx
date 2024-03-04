import { useState, useEffect } from 'react';
import Link from 'next/link'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  IconButton,
  Avatar,
  List,
  ListItem, 
  ListItemIcon,
  ListItemText,
  ListSubheader,
  TextField,
} from '@mui/material'

const getRandomUserData = () => {
  return fetch("https://randomuser.me/api")
    .then(response => response.json())
    .then(data => data.results[0]); // Random
};

interface Props {
  bookCount: number
}

interface BoxProps {
  item: number;
  handleAdd: () => void;
  handleRemove: () => void;
  onAddUserData: (userData: any) => void; // Add user data to the list
  onRemoveUserData: (userData: any) => void; // Remove user data from the list
}

const BoxWithAddIcon: React.FC<BoxProps> = ({ item, handleAdd, handleRemove, onAddUserData, onRemoveUserData }) => {
  const [userData, setUserData] = useState<any>(null);
  const [isAdd, setAdd] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getRandomUserData();
      setUserData(user);
    };
    fetchData();
  }, []);

  const handleAddChange = async () => {
    setAdd(prevState => !prevState); // Change state when clicked
    if (isAdd) {
      handleRemove(); 
    } else {
      handleAdd();
    }
    if (userData) {
      onAddUserData(userData); 
    }
  };

  const handleRemoveChange = async () => {
    setAdd(prevState => !prevState); // Change state when clicked
    handleRemove();
    if (userData) {
      onRemoveUserData(userData); 
    }
  };

  return (
    <Box
      key = {item}
      sx = {{
        width: '250px',
        height: '300px',
        color: 'black',
        backgroundColor: 'white',
        borderRadius: '8px',
        margin: '48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>

      {userData? (
        <div style = {{}}>
          <Avatar src={userData.picture.thumbnail} />
        </div>
      ) : (
        <Typography>Loading...</Typography>
      )}

      {userData? (
        <div style = {{}}>
          <Typography>{`${userData.name.first} ${userData.name.last}`}</Typography>
        </div>
      ) : (
        <Typography></Typography>
      )}

      <div style = {{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        fontSize: '24px',
      }}>{item}</div>

      <IconButton
        aria-label = "AddIcon"
        color = "success"
        onClick = {isAdd ? handleRemoveChange : handleAddChange}
        style = {{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          color: 'black',
          backgroundColor: '#EBEBEB',
        }}>
        {isAdd? <RemoveIcon /> : <AddIcon />}
      </IconButton>

    </Box>
  );
};

const Menu: React.FC<Props> = ({ bookCount }) => {

  bookCount = 0

  const [count, setCount] = useState<number>(bookCount); // Create a state to store the bookCount value.
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<any[]>([]); // State to store user data list

  const handleAddCount = () => {
    setCount(prevCount => prevCount + 1); // bookCount +1 when clicking on 'AddIcon' icon.
  };

  const handleRemoveCount = () => {
    setCount(prevCount => prevCount - 1); // bookCount -1 when clicking on 'RemoveIcon' icon.
  };

  const handleList = () => {
    setIsListOpen(prev => !prev); // Toggle list open/close state
  };

  const handleAddUserDataToList = (userData: any) => {
    setUserList(prevList => [...prevList, userData]); // Add user data to the list
  };
  
  const handleRemoveUserDataFromList = (userDataToRemove: any) => {
    setUserList(prevList => prevList.filter(user => user !== userDataToRemove)); // Remove user data from the list
  };

  const handleSearch = () => {
  };

  return (
    
    <AppBar
      sx = {{
        width: '100%',
        height: '100%',
        backgroundImage: `url("https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=600")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'auto',
        }}>

        <nav style = {{}}>
          <Toolbar
            sx = {{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#B57543',
              position: 'fixed',
              top: 0,
              zIndex: 999,
              width: '100%',
            }}>

            <Typography
              style = {{
                marginLeft: '40px',
                padding: 0,
                fontSize: '60px',
              }}>
              <Link href = "/" style = {{ 
                color: 'white',
                textDecoration: 'none', 
                }}>
                Library
              </Link>
            </Typography>

            {isListOpen && (
              <List
                sx = {{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '1000px',
                  height: '500px',
                  bgcolor: 'background.paper',
                  border: '2px solid black',
                  overflow: 'auto',
                  zIndex: 999,
                }}
                
                subheader = {<ListSubheader style = {{
                  fontSize: '36px',
                  backgroundColor: '#8A8A8A',
                  position: 'relative', 
                  zIndex: '1',
                }}>List</ListSubheader>}>

                {userList.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar src={user.picture.thumbnail} />
                    </ListItemIcon>
                    <ListItemText primary={`${user.name.first} ${user.name.last}`} />
                    <IconButton
                      aria-label="RemoveIcon"
                      onClick={() => handleRemoveUserDataFromList(user)}
                      style={{
                        color: 'black',
                        backgroundColor: '#EBEBEB',
                      }}>
                      <RemoveIcon />
                    </IconButton>
                  </ListItem>
                ))}

              </List>
            )}

            <Button
              aria-label = "FormatListBulletedIcon"
              color = "success"
              onClick = {handleList}
              style = {{
                marginRight: '104px',
                color: 'black',
                backgroundColor: '#EBEBEB',
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
              <FormatListBulletedIcon />
              <Typography>Book: {count}</Typography>
            </Button>
          </Toolbar>

          <div style = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            }}>
            <TextField
              id = "outlined-basic"
              variant = "outlined"
              label = "Search"/>

            <input
              type = "text"
              placeholder = "Search here"
              onChange = {handleSearch}
              style = {{
                width: '500px', 
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '4px', 
                fontSize: '24px',
                marginTop: '80px',
                paddingLeft: '24px',
            }}/>

          </div>
        </nav>

        <Box
          sx = {{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            transition: 'margin-right 0.3s ease',
            }}>

            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map ((item) => ( 
              <BoxWithAddIcon 
              key = {item} 
              item = {item} 
              handleAdd = {handleAddCount} 
              handleRemove = {handleRemoveCount} 
              onAddUserData = {handleAddUserDataToList}
              onRemoveUserData = {handleRemoveUserDataFromList} // Add this prop
              />
            ))}
        </Box>
    </AppBar>
  );
};

export default Menu;