import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import AddTask from "../../features/forms/AddItemForm";
import TodoList from "../../features/catalog/TodoList";
import TaskBoard from "../../features/catalog/TaskBoard";
import ItemEditForm from "../../features/catalog/ItemEditForm";
import ItemEditDetailsForm from "../../features/catalog/ItemEditDetailsForm";
import VendorList from "../../features/catalog/VendorList";
import VendorEditDetailsForm from "../../features/catalog/VendorEditDetailsForm";
import { Routes } from "react-router-dom";
import AddVendor from "../../features/forms/AddVendorForm";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Routes>
          <Route path='/todolist' element={< TaskBoard />} />
          <Route path='/vendorlist' element={< VendorList />} />
          <Route path='/vendorlist/:id' element={ < VendorEditDetailsForm />} />
          <Route path='/todolist/:id' element={ < ItemEditDetailsForm />} />
          <Route path='/addtask' element={< AddTask />} />
          <Route path='/addvendor' element={< AddVendor />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
