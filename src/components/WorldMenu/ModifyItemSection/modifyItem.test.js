import React from "react";
import ModifyItemSection from "./index.js"
import { render } from "@testing-library/react"

describe('test component <CreationModal>', () => {
    test("test if the display name correctly for edit", () => {
        const baseProps = {
            triggerIsEdit: jest.fn(),
            setCreationModalShow: jest.fn()
        };
        const { getByTestId } = render(
            <ModifyItemSection {...baseProps} />
        );

        const showCreationBtn = getByTestId("modify-item-create-modal")
        showCreationBtn.click()
    })
})