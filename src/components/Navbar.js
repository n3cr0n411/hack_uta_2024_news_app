import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";  // Firestore configuration

const Navbar = () => {
  const [interests, setInterests] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchInterests = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setInterests(docSnap.data().interests || []);
        }
      }
    };

    fetchInterests();
  }, [auth]);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          {interests.map((interest, index) => (
            <Button key={index} color="inherit" sx={{ margin: 1 }}>
              {interest}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
