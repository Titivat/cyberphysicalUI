AFRAME.registerComponent("device", {
  schema: {
    type: { type: "string", default: "lightbulb" },
    system: { type: "string", default: "CyberPhys" },
    deviceData: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  },

  // onLockClick: function(){
  //   let object = this.el;

  //   if (this.lockMode.getAttribute("gui-radio").checked == true) {
  //     object.setAttribute("mixin", "cube");
  //     // object.setAttribute("grabbable", "maxGrabers:0")
  //     console.log("on lock click are true");
  //     console.log(object.getAttribute("mixin"));
  //     // console.log(this.lockMode);
  //   } else {
  //     object.setAttribute("mixin", "notcube");
  //     // object.setAttribute("grabbable", "maxGrabers:2");
  //     console.log("on lock click are false");
  //     console.log(object.getAttribute("mixin"));
  //   }
    
  // },

  init: function () {
    let col1 = "#F7FFFF";
    let col2 = "#E8DDFF";
    let col3 = "#E1CAF8";
    let col4 = "#B58BFF";
    let col5 = "#4C25A9";
    let col6 = "#1F0A70";
    let col7 = "#231B59";

    this.ddata = this.data.deviceData;
    console.log(this.data.deviceData);
    console.log("Device " + this.ddata.meta.nickname + " Initiating");

    this.isInteracting = false;
    this.el.setAttribute("id", this.ddata.id);
    let uiHeight = 0.3;
    let uiWidth = 2;

    //UI INITIATION
    //creating ui container for the device
    this.uiEl = document.createElement("a-gui-flex-container");
    this.uiEl.setAttribute("flex-direction", "column");
    this.uiEl.setAttribute("visible", true);
    this.uiEl.setAttribute("position", "0 2 0");
    this.uiEl.setAttribute("justify-content", "center");
    this.uiEl.setAttribute("align-items", "normal");
    this.uiEl.setAttribute("component-padding", "0.5");
    this.uiEl.setAttribute("opacity", ".7");
    this.uiEl.setAttribute("width", uiWidth + 0.5);
    this.uiEl.setAttribute("background-color", col7);

    //device name label
    let label = document.createElement("a-gui-label");
    label.setAttribute("value", this.ddata.meta.nickname);
    label.setAttribute("height", "0.3");
    label.setAttribute("width", uiWidth);
    label.setAttribute("background-color", col6);
    label.setAttribute("font-color", col1);
    this.uiEl.appendChild(label);

    //Delete objects
    let deleteButton = document.createElement("a-gui-button");
    let sure = document.createElement("a-gui-button");
    deleteButton.setAttribute("value", "Delete");
    deleteButton.setAttribute("height", "0.3");
    deleteButton.setAttribute("width", uiWidth);
    deleteButton.setAttribute("background-color", col7);
    deleteButton.setAttribute("font-color", col1);
    this.uiEl.appendChild(deleteButton);
    uiHeight += 0.45;

    this.states = {};
    this.widgets = [];
    for (let i = 0; i < this.ddata.tags.length; i++) {
      this.states[this.ddata.tags[i].name] = this.ddata.tags[i].value;
      //label for each widget
      let label = document.createElement("a-gui-label");
      label.setAttribute("value", this.ddata.tags[i].name);
      label.setAttribute("height", "0.3");
      label.setAttribute("background-color", col5);
      label.setAttribute("font-color", col1);
      label.setAttribute("width", uiWidth);
      this.uiEl.appendChild(label);
      let widget;
      switch (this.ddata.tags[i].widget) {
        case "switch":
          widget = document.createElement("a-gui-toggle");
          widget.setAttribute("height", ".2");
          widget.setAttribute("width", uiWidth);
          widget.setAttribute("checked", this.ddata.tags[i].value);
          widget.setAttribute(
            "onclick",
            'document.getElementById("' +
              this.ddata.id +
              "\").components['device'].setState(\"" +
              this.ddata.tags[i].name +
              '");'
          );
          //widget.setAttribute("on", this.data.tags[i]+"_changed")
          uiHeight += 0.5;
          this.uiEl.appendChild(widget);
          this.widgets.push(widget);
          break;
        case "slider":
          widget = document.createElement("a-gui-slider");
          widget.setAttribute(
            "onclick",
            'document.getElementById("' +
              this.ddata.id +
              "\").components['device'].setState(\"" +
              this.ddata.tags[i].name +
              '");'
          );
          widget.setAttribute(
            "percent",
            this.ddata.tags[i].value / this.ddata.tags[i].max
          );
          widget.setAttribute("height", ".15");
          widget.setAttribute("handle-outer-radius", "0.05");
          widget.setAttribute("handle-inner-radius", "0.04");
          uiHeight += 0.45;
          widget.setAttribute("width", uiWidth);
          this.uiEl.appendChild(widget);
          this.widgets.push(widget);
          break;
        case "color_picker":
          let preview = document.createElement("a-gui-label");
          preview.setAttribute("height", ".2");
          preview.setAttribute("width", uiWidth);
          preview.setAttribute("opacity", 1);
          preview.setAttribute("background-color", "#ffffff");
          preview.setAttribute(
            "value",
            "█████ " + this.ddata.tags[i].value + " █████"
          );
          preview.setAttribute("font-color", this.ddata.tags[i].value);

          let rgb = this.hexToRgb(this.ddata.tags[i].value);
          let red = document.createElement("a-gui-slider");
          red.setAttribute("height", ".15");
          red.setAttribute("percent", rgb.r / 255);
          red.setAttribute("handle-outer-radius", "0.05");
          red.setAttribute("handle-inner-radius", "0.04");
          red.setAttribute("left-right-padding", 0.03);
          red.setAttribute("opacity", "0");
          red.setAttribute("width", uiWidth);
          red.setAttribute(
            "onclick",
            'document.getElementById("' +
              this.ddata.id +
              "\").components['device'].setState(\"" +
              this.ddata.tags[i].name +
              '");'
          );
          red.setAttribute("active-color", "#ee0000");
          let green = red.cloneNode(true);
          red.setAttribute("percent", rgb.g / 255);
          green.setAttribute("active-color", "#00ee00");
          let blue = red.cloneNode(true);
          blue.setAttribute("percent", rgb.b / 255);
          blue.setAttribute("active-color", "#0000ee");

          this.uiEl.appendChild(preview);
          this.uiEl.appendChild(red);
          this.uiEl.appendChild(green);
          this.uiEl.appendChild(blue);
          this.widgets.push(preview);
          uiHeight += 1.05;
          break;
      }
      this.el.addEventListener(
        this.ddata.tags[i].name + "_changed",
        (event) => {
          console.log(event);
        }
      );
      console.log(uiHeight);
      this.el.appendChild(this.uiEl);
    }

    //change mode to lock the furniture or not
    // this.lockMode = document.createElement("a-gui-radio");
    // this.lockMode.setAttribute("value", "Lock");
    // this.lockMode.setAttribute("height", "0.3");
    // this.lockMode.setAttribute("width", uiWidth);
    // this.lockMode.setAttribute("background-color", col7);
    // this.lockMode.setAttribute("font-color", col1);
    // this.lockMode.setAttribute("align-items", "center");
    // this.lockMode.setAttribute("onclick", `document.getElementById("${this.el.id}").components["device"].onLockClick()`);
    // this.uiEl.appendChild(this.lockMode);
    // uiHeight += 0.45;

    this.uiEl.setAttribute("height", uiHeight.toString());

    //HIDE OR SHOW UI
    this.el.addEventListener("click", (event) => {
      if (event.target == this.el) {
        console.log(this.isInteracting);
        if (!this.isInteracting) {
          this.uiEl.setAttribute("visible", true);
        } else {
          this.uiEl.setAttribute("visible", false);
        }
        this.isInteracting = !this.isInteracting;
      } else {
        event.cancelBubbling = true;
      }
    });

    if (this.data.type == "lightbulb") {
      const newLightState =
        "type: point; intensity: " +
        (this.states["onoff"] ? this.states["brightness"] : 0.0).toString() +
        "; distance: 100; decay: 0; color:" +
        this.states["color"];
      console.log(newLightState);
      this.el.setAttribute("light", newLightState);
      this.setLightBulb = () => {
        const newLightState =
          "type: point; intensity: " +
          (this.states["onoff"] ? this.states["brightness"] : 0.0).toString() +
          "; distance: 100; decay: 0; color:" +
          this.states["color"];
        console.log(newLightState);
        this.el.setAttribute("light", newLightState);
      };
    }
  },

  setState: function (state) {
    console.log("STATE CHANGE");
    widgetnum = this.ddata.tags.indexOf(
      this.ddata.tags.find((element) => element.name == state)
    );
    let widget = this.widgets[widgetnum];
    if (this.ddata.tags[widgetnum].widget == "switch")
      this.states[state] = !widget.getAttribute("gui-toggle").checked;
    if (state == "onoff" && this.data.type == "lightbulb") {
      this.setLightBulb();
    } else if (this.ddata.tags[widgetnum].widget == "slider")
      this.states[state] = widget.getAttribute("gui-slider").percent;
    if (state == "brightness" && this.data.type == "lightbulb") {
      this.setLightBulb();
    } else if (this.ddata.tags[widgetnum].widget == "color_picker") {
      wel = widget;
      let r = parseInt(
        wel.nextElementSibling.getAttribute("gui-slider").percent * 255
      );
      wel = wel.nextElementSibling;
      let g = parseInt(
        wel.nextElementSibling.getAttribute("gui-slider").percent * 255
      );
      wel = wel.nextElementSibling;
      let b = parseInt(
        wel.nextElementSibling.getAttribute("gui-slider").percent * 255
      );
      console.log([r, g, b]);
      let tocolor = this.rgbToHex(r, g, b);
      console.log(tocolor);
      widget.setAttribute("value", "█████ " + tocolor.toUpperCase() + " █████");
      widget.setAttribute("font-color", tocolor);
      widget.setAttribute("background-color", tocolor);
      widget.components["material"];
      this.states[state] = tocolor;
      if (state == "color" && this.data.type == "lightbulb") {
        this.setLightBulb();
      }
    }
    data = {
      id: this.el.id,
      state: state,
      value : this.states[state]
    }
    this.el.emit("device_state_change",data)
  },

  rgbToHex: function (r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  hexToRgb: function (hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },
});
