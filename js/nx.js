(() => {

    const UP = 12;
    const DOWN = 13;
    const LEFT = 14;
    const RIGHT = 15;
    const A = 0;
    const B = 1;
    const L = 4;
    const R = 5;
    const START = 9;

    const buttonToKeyCode = {
        [UP]: 38,
        [DOWN]: 40,
        [LEFT]: 37,
        [RIGHT]: 39,
    }

    const buttonToKey = {
        [UP]: 'Up',
        [DOWN]: 'Down',
        [LEFT]: 'Left',
        [RIGHT]: 'Right',
    }

    let actions = {
        [A]: () => {
            document.activeElement.click();
        }
    };

    class GamepadHelper {
        buttonsCache = [];
        buttonsStatus = [];

        buttonPressed(button) {
            return this.buttonsStatus[button] && !this.buttonsCache[button];
        }
    }

    let gamepads = new Map();
    let gamepadPollInterval = 0;

    if (navigator.getGamepads) {
        function pollGamepads() {
            for (let pad of navigator.getGamepads()) {
                if (pad !== null && pad.mapping == "standard") {
                    let api = gamepads.get(pad.index);

                    api.buttonsCache = [];
                    for (let i = 0; i < api.buttonsStatus.length; i++) {
                        api.buttonsCache[i] = api.buttonsStatus[i];
                    }

                    api.buttonsStatus = []
                    for (var i = 0; i < pad.buttons.length; i++) {
                        api.buttonsStatus[i] = pad.buttons[i].pressed
                    }

                    let x = Math.min(Math.max(-1, pad.axes[0]), 1);
                    x = Math.abs(x) < 0.25 ? 0 : x;

                    let y = Math.min(Math.max(-1, pad.axes[1]), 1);
                    y = Math.abs(y) < 0.25 ? 0 : y;

                    api.buttonsStatus[UP] = api.buttonsStatus[UP] || (y == -1);
                    api.buttonsStatus[DOWN] = api.buttonsStatus[DOWN] || (y == 1);
                    api.buttonsStatus[LEFT] = api.buttonsStatus[LEFT] || (x == -1);
                    api.buttonsStatus[RIGHT] = api.buttonsStatus[RIGHT] || (x == 1);

                    for (var i = 0; i < api.buttonsStatus.length; i++) {
                        let pressed = api.buttonPressed(i);
                        if (pressed) {
                            let code = buttonToKeyCode[i]
                            if (code !== undefined) {
                                document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: code, key: buttonToKey[i] }));
                            }

                            let action = actions[i];
                            if (action !== undefined) action();
                        }
                    }
                }
            }
        }

        function onGamepadAdded(ev) {
            console.log(`Gamepad ${ev.gamepad.index} added! ${ev.gamepad.id}`);
            gamepads.set(ev.gamepad.index, new GamepadHelper());

            if (gamepadPollInterval === 0) {
                gamepadPollInterval = window.setInterval(pollGamepads, 66);
            }
        }
        function onGamepadRemoved(ev) {
            console.log("Gamepad", `Gamepad ${ev.gamepad.index} removed!`);
            gamepads.delete(ev.gamepad.index);

            if (gamepads.size === 0) {
                clearInterval(gamepadPollInterval);
                gamepadPollInterval = 0;
            }
        }

        let pads = navigator.getGamepads();
        for (let pad of pads) {
            if (pad !== null && !this.gamepads.has(pad.index)) {
                onGamepadAdded({ gamepad: pad })
            }
        }
        window.addEventListener("gamepadconnected", onGamepadAdded);
        window.addEventListener("gamepaddisconnected", onGamepadRemoved);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === "Backspace" || e.key === "Escape") {
            // Don't hijack Backspace while the person is typing in a text
            // field (e.g. the spoiler-log search box) - let it delete text
            // normally instead of treating it as the B button.
            var t = e.target;
            var tag = (t && t.tagName) ? t.tagName.toUpperCase() : "";
            var isEditable = tag === "INPUT" || tag === "TEXTAREA" || (t && t.isContentEditable);
            if (e.key === "Backspace" && isEditable) {
                return;
            }
            // Prevent the browser's own default action for these keys
            // (e.g. Backspace navigating back in history / leaving the page).
            e.preventDefault();
            actions[B]();
        }
    });

    window.addEventListener("DOMContentLoaded", () => {

        let bButtons = document.getElementsByClassName("footer-B")
        for (const button of bButtons) {
            button.addEventListener("click", (e) => { if (window.getComputedStyle(button).opacity) actions[B]() });
        }

        bButtons = document.getElementsByClassName("footer-back")
        for (const button of bButtons) {
            button.addEventListener("click", () => { if (window.getComputedStyle(button).opacity) actions[B]() });
        }

    })

    window.nx = {
        footer: {
            setAssign: ((char, tf, func) => {
                if (char === 'L') {
                    actions[L] = func;
                }
                if (char === 'R') {
                    actions[R] = func;
                }
                if (char === 'B') {
                    actions[B] = func;
                }
            }),
            unsetAssign: (() => { })
        }, playReport: { incrementCounter: (() => { }), setCounterSetIdentifier: (() => { }) }
    }
})()