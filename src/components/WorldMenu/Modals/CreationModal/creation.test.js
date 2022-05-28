import React from "react";
import CreationModal from './index.js';
import TestRenderer from 'react-test-renderer';
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { logRoles } from '@testing-library/dom'

describe('test component <CreationModal>', () => {
    test("test handle input for new name", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            handleCreateWorld: jest.fn(),
        };
        const { queryByTestId, } = render(
            <CreationModal {...baseProps} />
        );
        const input = queryByTestId("name-input")
        const testValue = "test";
        fireEvent.change(input, { target: { value: testValue } });
        expect(input.value).toBe(testValue);
    })

    test("test handle input for input file", () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            handleCreateWorld: jest.fn(),
        };
        const { queryByTestId } = render(
            <CreationModal {...baseProps} />
        );
        const input = queryByTestId("input-file")
        let file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
        fireEvent.change(input, { target: { files: file } });
        expect(input.files).toBe(file);
    })

    test("test add new world", async () => {
        const baseProps = {
            open: jest.fn(),
            handleClose: jest.fn(),
            handleCreateWorld: jest.fn(),
        };

        const { queryByTestId } = render(
            <CreationModal {...baseProps} />
        );
        const fileInput = queryByTestId("input-file")
        let file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
        fireEvent.change(fileInput, { target: { files: file } });
        expect(fileInput.files).toBe(file);

        const input = queryByTestId("name-input")
        const testValue = "test";
        fireEvent.change(input, { target: { value: testValue } });
        expect(input.value).toBe(testValue);

        const submit = queryByTestId("submit-new-world")
        fireEvent.click(submit);
    })
});