class ControlPanel {
  private backClickEvent: CustomEvent;
  private toNowClickEvent: CustomEvent; 
  private nextClickEvent: CustomEvent;

  constructor() {
    this.backClickEvent = new CustomEvent("backClick", {bubbles: true});
    this.toNowClickEvent = new CustomEvent("toNowClick", {bubbles: true});
    this.nextClickEvent = new CustomEvent("nextClick", {bubbles: true});
  }

  private generateControlButtons() {
    const controlPanel = document.createElement("div");
    const backButton = document.createElement("button");
    const nowButton = document.createElement("button");
    const nextButton = document.createElement("button");
    
    controlPanel.className = "calendar__control-buttons";
    backButton.className = "calendar__control-button calendar__control-button_back";
    nowButton.className = "calendar__control-button calendar__control-button_now";
    nextButton.className = "calendar__control-button calendar__control-button_next";

    controlPanel.appendChild(backButton);
    controlPanel.appendChild(nowButton);
    controlPanel.appendChild(nextButton);

    backButton.onclick = (event) => {
      event.currentTarget.dispatchEvent(this.backClickEvent);
    }
    nowButton.onclick = (event) => {
      event.currentTarget.dispatchEvent(this.toNowClickEvent);
    }
    nextButton.onclick = (event) => {
      event.currentTarget.dispatchEvent(this.nextClickEvent);
    }

    return controlPanel;
  }

  public render() {
    const controlPanel = this.generateControlButtons()
    return controlPanel;
  }
}