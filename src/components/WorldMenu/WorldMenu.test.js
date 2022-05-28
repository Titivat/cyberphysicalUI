import React from "react"
import { render, fireEvent } from "@testing-library/react"
import WorldMenu from "./WorldMenu.js"
import { BrowserRouter as Router } from 'react-router-dom';
import { getApi, postApi } from '../../api'

jest.mock('../../api', () => ({
    getApi: jest.fn(() => {
        Promise.resolve([
            {
                id: "123",
                meta: {
                    avatar: "avatar2",
                    nickname: "boss"
                },
            }
        ])
    }),
    postApi: jest.fn(() => {
        Promise.resolve([
            {
                id: "123",
                meta: {
                    avatar: "avatar2",
                    nickname: "boss"
                }

            },
            {
                id: "456",
                meta: {
                    avatar: "avatar3",
                    nickname: "alex"
                }
            }
        ])
    })
}))

describe("Testing <WorldMenu />", () => {
    test("testing create a new world", () => {

        const { queryByTestId, queryAllByTestId ,debug } = render(
            <Router>
                <WorldMenu />
            </Router>
        )
        expect(1).toBe(1)
        const createNewWordlModal = queryByTestId("modify-item-create-modal")
        fireEvent.click(createNewWordlModal)

        const inputNewFile = queryByTestId("input-file")
        let file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
        fireEvent.change(inputNewFile, { target: { files: file } });
        expect(inputNewFile.files).toBe(file);

        const inputNewText = queryByTestId("name-input")
        const testValue = "test";
        fireEvent.change(inputNewText, { target: { value: testValue } });
        expect(inputNewText.value).toBe(testValue);

        const submit = queryByTestId("submit-new-world")
        fireEvent.click(submit);

        const card = queryAllByTestId("world-card")
        // expect( card ).toBeInTheDocument()
    })

})