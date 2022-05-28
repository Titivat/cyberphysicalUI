import React from "react";
import DeletingModal from './index.js';
import TestRenderer from 'react-test-renderer';
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

describe('test component <DeletingModal>', () => {
    test("test if the delete name dispaly correctly", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            editingItem: {
                id: "1234",
                meta: {
                    nickname: "boss"
                }
            },
            handleDeleteWorld: jest.fn()
        };
        const { getByText } = render(
            <DeletingModal {...baseProps} />
        );

        const editName = getByText(/Are you sure to delete boss/i)
        expect(editName).toBeInTheDocument()
    })
    test("test if the delete name dispaly correctly", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            editingItem: {
                id: "1234",
                meta: {
                    nickname: "boss"
                }
            },
            handleDeleteWorld: jest.fn()
        };
        const { queryByTestId } = render(
            <DeletingModal {...baseProps} />
        );

        const submit = queryByTestId("submit-delete-world")
        fireEvent.click(submit);
    })
});