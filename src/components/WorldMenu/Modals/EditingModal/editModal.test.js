import React from "react";
import EditingModal from './index.js';
import { screen, render, fireEvent, waitFor } from "@testing-library/react";

describe('test component <CreationModal>', () => {
    test("test if the display name correctly for edit", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            editingName: "earth",
            handleEditWorld: jest.fn()
        };
        const { getByText, } = render(
            <EditingModal {...baseProps} />
        );
        const editName = getByText(/Editing earth/i)
        expect(editName).toBeInTheDocument()
    })

    test("test input file", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            editingName: "earth",
            handleEditWorld: jest.fn()
        };
        const { queryByTestId } = render(
            <EditingModal {...baseProps} />
        );
        const editName = queryByTestId("edit-mode-file-input")
        let file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
        fireEvent.change(editName, { target: { files: file } });
        expect(editName.files).toBe(file);
    })
    test("test input textfile", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            editingName: "earth",
            handleEditWorld: jest.fn()
        };
        const { queryByTestId } = render(
            <EditingModal {...baseProps} />
        );
        const editValue = "jupitor"
        const editName = queryByTestId("edit-modal-text-input")
        fireEvent.change(editName, { target: { value: editValue } });
        expect(editName.value).toBe(editValue);
    })
    test("test input textfile", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            editingName: "earth",
            handleEditWorld: jest.fn()
        };
        const { queryByTestId } = render(
            <EditingModal {...baseProps} />
        );

        const submitBtn = queryByTestId("edit-model-submit-btn");
        submitBtn.click()
    })
});