class ControlPanel {
  private shiftBackEvent: CustomEvent;
  private shiftToNowEvent: CustomEvent; 
  private shiftNextEvent: CustomEvent;

  constructor() {
    this.shiftBackEvent = new CustomEvent("onBackPress", {bubbles: true});
    this.shiftToNowEvent = new CustomEvent("onNowPress", {bubbles: true});
    this.shiftNextEvent = new CustomEvent("onNextPress", {bubbles: true});
  }

  private generateControlPanel() {
    const controlPanel = document.createElement("div");
    const backButton = document.createElement("button");
    const nowButton = document.createElement("button");
    const nextButton = document.createElement("button");
    
    controlPanel.className = "calendar__control-panel";
    backButton.className = "calendar__control-button calendar__control-button_back";
    nowButton.className = "calendar__control-button calendar__control-button_now";
    nextButton.className = "calendar__control-button calendar__control-button_next";

    controlPanel.appendChild(backButton);
    controlPanel.appendChild(nowButton);
    controlPanel.appendChild(nextButton);

    backButton.onclick = (event) => {
      event.currentTarget.dispatchEvent(this.shiftBackEvent);
    }
    nowButton.onclick = (event) => {
      event.currentTarget.dispatchEvent(this.shiftToNowEvent);
    }
    nextButton.onclick = (event) => {
      event.currentTarget.dispatchEvent(this.shiftNextEvent);
    }

    return controlPanel;
  }

  public render() {
    const controlPanel = this.generateControlPanel()
    return controlPanel;
  }
}