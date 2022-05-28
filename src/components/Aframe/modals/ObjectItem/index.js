import React, { Suspense } from "react";
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

const Model = ({ modalUrl }) => {
    const { scene } = useGLTF(modalUrl);
    return <primitive object={scene} />;
}

const ObjectItem = ({ itemData, handleOpenPlaceModal, setPlaceObjectData }) => {
    if (itemData === []) {
        return null
    }

    const handleOpenPlaceObjectModal = (item) => {
        handleOpenPlaceModal()
        setPlaceObjectData(item)
    }

    return (
        <>
            {itemData.map((item) => {
                const { img: gltf, title: objectTitle } = item
                return (
                    <ImageListItem className="item-container" key={objectTitle}>
                        <Suspense fallback={<p>Loading...</p>}>
                            <Canvas camera={{ position: [0, 20, 19], fov: 4 }}>
                                <ambientLight />
                                <Model modalUrl={gltf} />
                                <OrbitControls enablePan={true}
                                    enableZoom={true}
                                    enableRotate={true} />
                            </Canvas>
                        </Suspense>
                        <ImageListItemBar
                            onClick={ () => handleOpenPlaceObjectModal(item)}
                            title={objectTitle}
                            actionIcon={
                                <IconButton
                                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                                    aria-label={`info about title`}
                                >
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                )
            })
            }
            {/* <PlaceObjectModal open={} handleClose={}/> */}
        </>
    )
}

export default ObjectItem