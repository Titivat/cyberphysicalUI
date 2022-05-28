import React from "react"
import { render } from "@testing-library/react";
import { WorldItem } from "./index.js"

describe("testing <worldItem> component", () => {
    test("testing handle change world page to cesium world map", () => {
        const props = {
            handleChangePage: jest.fn(),
            item: {
                id: "123",
                meta: {
                    nickname: "boss"
                }
            },
            displayEditItem: jest.fn(),
            isEdit: false,
        }
        const { getByTestId } = render(<WorldItem {...props} />)
        const worldCard = getByTestId("world-card")
        worldCard.click()
    })
    test("testing if text render", () => {
        const props = {
            handleChangePage: jest.fn(),
            item: {
                id: "123",
                meta: {
                    nickname: "boss"
                }
            },
            displayEditItem: jest.fn(),
            isEdit: false,
        }
        const { getByText } = render(<WorldItem {...props} />)
        const worldText = getByText(/boss/i)
        expect(worldText).toBeInTheDocument()
    })
})