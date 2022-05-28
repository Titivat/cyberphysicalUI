import React from "react"
import { render, fireEvent } from "@testing-library/react";
import WorldSelection from "./index.js"
import { BrowserRouter as Router } from 'react-router-dom';
import WorldItem from "./WorldItem"
import Grid from "@mui/material/Grid";

describe("testing component <WorldSelection />", () => {
    test("test change  page to world map from worlItem component", () => {
        const props = {
            currentItems: [{
                id: "123",
                meta: {
                    avatar: "avata",
                    nickname: "boss"
                }
            },
            ],
            isEdit: false,
            setEditingItem: jest.fn(),
            setDeletingModalShow: jest.fn(),
            setEditingModalShow: jest.fn(),
        }

        const { getByTestId } = render(
            <Router>
                <WorldSelection {...props} />
            </Router>
        )
        const cardItem = getByTestId("world-card")
        fireEvent.click(cardItem)
    })
    test("test display edit button and click on edit and delete button", () => {
        const props = {
            currentItems: [{
                id: "123",
                meta: {
                    avatar: "avata",
                    nickname: "boss"
                }
            },
            ],
            isEdit: true,
            setEditingItem: jest.fn(),
            setDeletingModalShow: jest.fn(),
            setEditingModalShow: jest.fn(),
        }

        const { getByTestId } = render(
            <Router>
                <WorldSelection {...props} />
            </Router>
        )
        const editBtn = getByTestId("world-selection-editbtn")
        fireEvent.click(editBtn)

        const deleteBtn = getByTestId("world-selection-delete")
        fireEvent.click(deleteBtn)
    })
})