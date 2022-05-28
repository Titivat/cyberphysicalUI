// import { CONTENT_PATH_NAME } from "../../constants/apiPath";

AFRAME.registerSystem("cyber-physical-system", {
  // Initial state.
  schema: {
    host: {
      type: "string",
      default:
        "wss://localhost:2077/ws/acb45c64-d79f-11ec-b916-0242ac150006/c8b3b298-d79f-11ec-a5f3-0242ac150006/",
    },
    content_host: {
      type: "string",
      default: "http://localhost:9000/cyberp/",
    },
    token: {
      type: "string",
      default: "01b104b7cfbaf7b596c225f6c3e520733c2c2dce",
    },
  },

  init: function () {
    var sceneEl = this.el;
    this.host = this.data.host;
    console.log("STARTING CONNECTION");
    sceneEl.emit("connection-start", { host: this.host });

    // DATA SENDING
    this.el.addEventListener("device_state_change", (e) => {
      let data = {
        action: "house_action",
        data: {
          command: 7,
          itemdata: e.detail,
        },
      };
      console.log(e.detail);
      //   this.ws.send(JSON.stringify(data));
    });

    this.el.addEventListener("move_item", (e) => {
      let data = {
        action: "house_action",
        data: {
          command: 4,
          itemdata: e.detail,
        },
      };
    });

    this.el.addEventListener("update_item", (e) => {
      let data = {
        action: "house_action",
        data: {
          command: 5,
          itemdata: e.detail,
        },
      };
      //   this.ws.send(JSON.stringify(data));
    });

    this.el.addEventListener("create_item", (e) => {
      let data = {
        action: "house_action",
        data: {
          command: 3,
          itemdata: e.detail,
        },
      };
      this.ws.send(JSON.stringify(data));
    });

    this.connect();
  },

  connect: function () {
    //CREATE CONNECTION
    this.ws = new WebSocket(this.data.host, this.data.token);
    //WHEN SUCCESSFULLY CONNECTS
    this.ws.onopen = function () {
      console.log("Connected to Cyber Physical System!");
    }.bind(this);
    //WHEN GETTING MESSAGE
    this.ws.onmessage = (evt) => {
      let received_msg = evt.data;
      const incomingData = JSON.parse(received_msg);
      if (incomingData.house_snapshot !== undefined) {
        this.handleHouseSnapshot(incomingData);
      } else {
        this.handleUpdates(incomingData);
      }
      console.log("incoming house data...");
    };
    //WHEN GETTING DISCONNECTED
    this.ws.onclose = function () {
      alert("Disconnected from the House");
    };
  },

  handleHouseSnapshot: function (incomingData) {
    console.log("initiating house.");
    let data = incomingData.house_snapshot.data;
    console.log(data);
    let newEntity;
    for (const item of data) {
      //CREATING ITEMS FROM HOUSE SNAPSHOT
      newEntity = document.createElement("a-entity");
      newEntity.setAttribute("position", item.position);
      newEntity.setAttribute("rotation", item.rotation);
      newEntity.setAttribute("scale", item.scale);
      newEntity.setAttribute("grabbable", "");
      newEntity.setAttribute("id", item.id);
      if (item.type == "device") {
        console.log("CREATING DEVICE");
        newEntity.setAttribute("device", "");
        newEntity.setAttribute(
          "gltf-model",
          `url(${this.data.content_host}${item.meta.avatar})`
        );
      } else if (item.type == "furniture") {
        console.log("CREATING FURNITURE OF ID " + item.id);
        console.log(
          "With avatar " + `url(${this.data.content_host + item.meta.avatar})`
        );
        newEntity.setAttribute(
          "gltf-model",
          `url(${this.data.content_host + item.meta.avatar})`
        );
      } else if (item.type == "primitive") {
        console.log("CREATING PRIMITIVE");
        newEntity = document.createElement(`a-${item.type}`)
      }
      this.el.appendChild(newEntity);
    }
    let currentUsers = incomingData.house_snapshot.current_users
    for (const user of currentUsers){
        let head = document.createElement("a-entity");
        let righthand = document.createElement("a-entity");
        let lefthand = document.createElement("a-entity");
        let headlabel = document.createElement("a-entity");
    
        // SET IMPORTANT ID FOR UPDATING
        head.setAttribute("id", user.sessionid);
        righthand.setAttribute("id", user.sessionid + "_rhand");
        lefthand.setAttribute("id", user.sessionid + "_lhand");

        // ADD MODEL
        head.setAttribute("gltf-model", "#headmodel");
        righthand.setAttribute("gltf-model", "#righthandmodel");
        lefthand.setAttribute("gltf-model", "#lefthandmodel");
    
        // ADD USERNAME LABEL
        headlabel.setAttribute(
          "text",
          `value:${user.username}; color:black; align:center; side:double`
        );
        head.appendChild(headlabel);
        head.appendChild(righthand);
        head.appendChild(lefthand);
        headlabel.setAttribute("position", "0 .4 0");
        headlabel.setAttribute("rotation", "0 180 0")
        this.el.appendChild(head);
    }
  },

  handleUpdates: function (incomingData) {
    console.log("New Update");
    console.log(incomingData);
    let data = incomingData;
    if (data.type == "user_move") this.handleUserMoveUpdate(data);
    else if (data.type == "item_move") this.handleItemMoveUpdate(data.data);
    else if (data.type == "item_update")this.handleItemPropertiesUpdate(data.data);
    else if (data.type == "item_remove") this.handleRemoveItemUpdate(data);
    else if (data.type == "device_interaction")this.handleDeviceUpdate(data.data);
    else if (data.type == "user_connect") this.handleUserConnect(data);
    else if (data.type == "user_disconnect") this.handleUserDisconnect(data);
  },

  handleItemMoveUpdate: function (data) {
    let tomove = document.getElementById(data.id);
    if (tomove !== null) tomove.setAttribute("position", data.position);
    tomove.setAttribute("rotation", data.rotation);
    tomove.setAttribute("scale", data.scale);
    console.log("moved item " + data.id);
  },

  handleItemPropertiesUpdate: function (data) {
    let toupdate = document.getElementById(data.id);
    if (toupdate !== null) {
      for (const property of data.properties)
        toupdate.setAttribute(property.name, property.value);
    }
    console.log("updated item " + data.id);
  },

  handleUserConnect: function (data) {
    //IF USER JOIN, CREATE AVATAR FOR THEM
    let head = document.createElement("a-entity");
    let righthand = document.createElement("a-entity");
    let lefthand = document.createElement("a-entity");
    let headlabel = document.createElement("a-entity");

    // SET IMPORTANT ID FOR UPDATING
    head.setAttribute("id", data.from_session);
    righthand.setAttribute("id", data.from_session + "_rhand");
    lefthand.setAttribute("id", data.from_session + "_lhand");

    // SET MODEL
    head.setAttribute("gltf-model", "#headmodel");
    righthand.setAttribute("gltf-model", "#righthandmodel");
    lefthand.setAttribute("gltf-model", "#lefthandmodel");

    // ADD USERNAME LABEL
    headlabel.setAttribute(
      "text",
      `value:${data.username}; color:black; align:center; side:double`
    );
    head.appendChild(headlabel);
    head.appendChild(righthand);
    head.appendChild(lefthand);
    headlabel.setAttribute("position", "0 .4 0");
    headlabel.setAttribute("rotation", "0 180 0")
    this.el.appendChild(head);
  },

  handleUserDisconnect: function (data) {
    //IF USER JOIN, CREATE AVATAR FOR THEM
    let toRemove = document.getElementById(data.from_session);
    toRemove.parentElement.removeChild(toRemove);
  },

  handleUserMoveUpdate: function (data) {
    let tomovehead = document.getElementById(data.sessionid);
    let tomoverighthand = document.getElementById(data.sessionid + "_rhand");
    let tomovelefthand = document.getElementById(data.sessionid + "_lhand");
    if (tomovehead !== null) {
      tomovehead.setAttribute("position", data["head"].position);
      tomovehead.setAttribute("rotation", data["head"].rotation);
    }
    if (tomovelefthand !== null) {
      tomovelefthand.setAttribute("position", data["lefthand"].position);
      tomovelefthand.setAttribute("rotation", data["lefthand"].rotation);
    }
    if (tomoverighthand !== null) {
      tomoverighthand.setAttribute("position", data["righthand"].position);
      tomoverighthand.setAttribute("rotation", data["righthand"].rotation);
    }
  },

  handleRemoveItemUpdate: function (data) {
    //PLUCKS THE ELEMENT OFF OF SCENE
    let toRemove = document.getElementById(data.item_id);
    toRemove.parentElement.removeChild(toRemove);
  },
});
