import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WorldSelection from "./WorldSelection";
import ModifyItemSection from "./ModifyItemSection";
import { CreationModal, DeletingModal, EditingModal } from "./Modals";
import { getApi, postApi, deleteApi } from "../../api";
import { Drawer, Pagination, Typography, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./worldMenu.css";


const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

export default function WorldMenu() {
  let initialItem = { id: 0, meta: { nickname: "", avatar: "" } }

  const numberItems = { xs: 4, sm: 6, md: 9, lg: 15, xl: 18 }
  const itemsPerPage = numberItems[useWidth()]
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [currentItems, setCurrentItems] = React.useState(null);
  const [itemOffset, setItemOffset] = React.useState(0);

  const [deletingName, setDeletingName] = React.useState(null);
  const [deletingID, setDeletingID] = React.useState(null)
  const [isDelete, setIsDelete] = React.useState(false);

  const [editingItem, setEditingItem] = React.useState(initialItem)
  const triggerIsDelete = () => setIsDelete(!isDelete);

  const [editingName, setEditingName] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const triggerIsEdit = () => setIsEdit(!isEdit);

  const [creationModalShow, setCreationModalShow] = React.useState(false);
  const [deletingModalShow, setDeletingModalShow] = React.useState(false);
  const [editingModalShow, setEditingModalShow] = React.useState(false);

  async function fetchMyAPI() {
    try {
      const response = await getApi("cyber/universe/worlds/");
      setItems(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  // get world data
  useEffect(() => {
    fetchMyAPI();
  }, [isUpdate]);

  // add, delete, update modify thing in the list
  const createWorld = async (addName, image) => {
    const postData = {
      worldname: addName,
      photo: image,
    };
    try {
      const response = await postApi("cyber/universe/worlds/", postData);
      setItems(response.data);
      setIsUpdate(!isUpdate);
    } catch (err) {
      console.log(err)
    }
  };

  const editWorld = async (newimage, newname) => {
    const postData = {
      worldname: newimage,
      photo: newname,
    };
    const response = await postApi(`cyber/universe/${editingItem.id}}/`, postData);
    setItems(response.data);
    setIsUpdate(!isUpdate);
  };

  const deleteWorld = async (id) => {
    const deleteData = {
      worldID: id,
    };
    const response = await deleteApi("cyber/universe/worlds/", deleteData);
    setIsUpdate(!isUpdate);
  };

  // handle paging logic
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
  }, [itemOffset, itemsPerPage, items]);

  // click to next page
  const handlePageClick = (event, page) => {
    const newOffset = (page - 1) * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <Box
      className="worldMenuContainer"
    >
      <Typography style={{ margin: "40px 0 0 0" }} sx={{ fontSize: "3vw", pt: "40px" }}>
        Worlds
      </Typography>
      <WorldSelection
        currentItems={currentItems}
        isEdit={isEdit}
        setEditingItem={setEditingItem}
        setDeletingModalShow={setDeletingModalShow}
        setEditingModalShow={setEditingModalShow}
      />
      <ModifyItemSection
        setCreationModalShow={setCreationModalShow}
        triggerIsEdit={triggerIsEdit}
        addNewItem={createWorld}
        triggerIsDelete={triggerIsDelete}
        setEditingItem={setEditingItem}
      />
      <Pagination
        count={Math.ceil(items.length / itemsPerPage)}
        onChange={handlePageClick}
      />
      <CreationModal
        open={creationModalShow}
        handleClose={() => setCreationModalShow(false)}
        handleCreateWorld={createWorld}
      />
      <DeletingModal
        open={deletingModalShow}
        handleClose={() => setDeletingModalShow(false)}
        handleDeleteWorld={deleteWorld}
        editingItem={editingItem}
      />
      <EditingModal
        open={editingModalShow}
        handleClose={() => setEditingModalShow(false)}
        handleEditWorld={editWorld}
        editingItem={editingItem}
      />
    </Box>
  );
};
