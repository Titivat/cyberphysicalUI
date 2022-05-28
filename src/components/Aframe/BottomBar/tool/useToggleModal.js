import React from 'react'

const useToggleModal = () => {
    const [toggle, setToggle] = React.useState(false);

    const handleOpenModal = () => setToggle(true);
    const handleCloseModal = () => setToggle(false);

    return [
        toggle,
        handleOpenModal,
        handleCloseModal
    ];
}

export default useToggleModal
