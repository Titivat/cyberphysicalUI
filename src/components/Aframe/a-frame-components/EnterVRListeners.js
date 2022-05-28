AFRAME.registerComponent('vrmodelistener', {
    init: function () {
        this.el.addEventListener("enter-vr", function(e){
            // let cameraRig = document.getElementById("rig")
            // let lefthand = document.createElement("a-entity");

            // lefthand.setAttribute("hand-controls","hand: left")
            // lefthand.setAttribute("id", "lefthand")

            // let righthand = document.createElement("a-entity");
            // righthand.setAttribute("hand-controls","hand: right")
            // righthand.setAttribute("id", "righthand")
            
            // cameraRig.appendChild(lefthand)
            // cameraRig.appendChild(righthand)
            console.log("ENTERED VR!")
        }.bind(this))

        this.el.addEventListener("exit-vr", function(e){
            //remove hands from scene
            // let cameraRig = document.getElementById("rig")
            // cameraRig.removeChild(document.getElementById("lefthand"))
            // cameraRig.removeChild(document.getElementById("righthand"))
            // console.log("REMOVING VR CONTROLLERS")

            //append cursor entity
            // cameraRig = document.getElementById("rig")
            // let cursor = document.createElement("a-entity");
            // cursor.setAttribute("id", "cursor")
            // cursor.setAttribute("cursor", "")
            // cursor.setAttribute("raycaster", "far: 20; objects: [gui-interactable]")

            // cameraRig.appendChild(cursor)
        }.bind(this))
    },
    },
  );