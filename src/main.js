let submenuTitle = document.querySelector(".submenu-title");
let submenuOpen = document.querySelector(".submenu-covert");

submenuTitle.onclick = function () {
  submenuOpen.classList.toggle("open");
};

const actions = {
  openModal: function () {
    const popupElement = document.querySelector(".popup");
    if (popupElement) {
      popupElement.classList.add("popup_active");
    }
  },
  closeModal: function () {
    const popupElement = document.querySelector(".popup");
    if (popupElement) {
      popupElement.classList.remove("popup_active");
    }
  },
  submitForm: async function (event) {
    event.preventDefault();
    const form = document.querySelector(".popup_registration");
    const formData = new FormData(form);
    const data = {};
    for (const key of formData.keys()) {
      data[key] = formData.get(key);
    }

    debugger;

    let response = await fetch("/form", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });
    let result = await response.json();
    console.log(result);
  },
};

class EventDelegationBus {
  constructor() {
    this.actions = {};

    document.addEventListener("click", this.listen.bind(this));
  }

  addAction(name, callback) {
    this.actions[name] = this.actions[name] || [];
    this.actions[name].push(callback);
  }

  removeAction(name, callback) {
    const arr = this.actions[name];

    if (!arr || arr.length === 0) {
      return;
    }

    this.actions = this.actions.filter((ls) => ls !== callback);
  }

  listen(event) {
    const target = event.target;

    if (
      target.dataset.action &&
      Array.isArray(this.actions[target.dataset.action])
    ) {
      this.actions[target.dataset.action].forEach((ls) => ls(event));
    }

    if (target.dataset.action && !this.actions[target.dataset.action]) {
      console.error(
        new Error("No handler for [" + target.dataset.action + "]")
      );
    }
  }
}

const eventBus = new EventDelegationBus();

eventBus.addAction("openModal", actions.openModal);
eventBus.addAction("openModal", () => {
  fetch("/analytics", { body: "{}", method: "post" });
});
eventBus.addAction("closeModal", actions.closeModal);
eventBus.addAction("submitForm", actions.submitForm);
